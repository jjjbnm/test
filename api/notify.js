// Vercel serverless function.
// Called from the site after an admin publishes a new update — sends a real
// push notification to every device that opted in (Firestore collection
// "fcmTokens"), even if their browser/site is closed.
//
// Required Environment Variables (set in Vercel → Settings → Environment
// Variables, all as "Secret"):
//   FIREBASE_PROJECT_ID
//   FIREBASE_CLIENT_EMAIL
//   FIREBASE_PRIVATE_KEY   (paste the full value, including the
//                           -----BEGIN PRIVATE KEY----- / -----END----- lines)

const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Vercel stores newlines as literal "\n" — convert them back.
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { title, body } = req.body || {};
    if (!title || !body) {
      res.status(400).json({ error: 'Missing title or body' });
      return;
    }

    const tokensSnap = await db.collection('fcmTokens').get();
    const tokens = tokensSnap.docs.map((d) => d.id);

    if (tokens.length === 0) {
      res.status(200).json({ sent: 0, message: 'No registered devices yet.' });
      return;
    }

    const message = {
      notification: { title, body },
      tokens,
    };

    const response = await admin.messaging().sendEachForMulticast(message);

    // Clean up tokens that are no longer valid (uninstalled, permission revoked, etc.)
    const deletions = [];
    response.responses.forEach((r, idx) => {
      if (!r.success) {
        const code = r.error && r.error.code;
        if (
          code === 'messaging/invalid-registration-token' ||
          code === 'messaging/registration-token-not-registered'
        ) {
          deletions.push(db.collection('fcmTokens').doc(tokens[idx]).delete());
        }
      }
    });
    await Promise.all(deletions);

    res.status(200).json({ sent: response.successCount, failed: response.failureCount });
  } catch (err) {
    console.error('Error sending notification:', err);
    res.status(500).json({ error: 'Internal error' });
  }
};
