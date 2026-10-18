const db = require('./_firebase');

function body(req) {
  if (!req.body) return {};
  if (typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body); } catch (_) { return {}; }
}
function isAdmin(req) {
  const expected = process.env.ADMIN_PIN || '1234';
  return String(req.headers['x-admin-pin'] || '') === expected;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const collection = db.collection('notices');
    if (req.method === 'GET') {
      const snapshot = await collection.orderBy('createdAt', 'desc').limit(100).get();
      return res.status(200).json(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    if (req.method === 'POST') {
      if (!isAdmin(req)) return res.status(401).json({ error: 'unauthorized' });
      const input = body(req);
      const text = String(input.text || '').trim().slice(0, 2000);
      const type = ['promo', 'info', 'warning'].includes(input.type) ? input.type : 'info';
      if (!text) return res.status(400).json({ error: 'text_required' });
      const ref = await collection.add({ text, type, createdAt: new Date().toISOString() });
      return res.status(201).json({ id: ref.id, text, type, createdAt: new Date().toISOString() });
    }
    if (req.method === 'DELETE') {
      if (!isAdmin(req)) return res.status(401).json({ error: 'unauthorized' });
      const id = String(req.query.id || body(req).id || '');
      if (!id) return res.status(400).json({ error: 'id_required' });
      await collection.doc(id).delete();
      return res.status(204).end();
    }
    return res.status(405).json({ error: 'method_not_allowed' });
  } catch (err) {
    console.error('Notices API error:', err);
    return res.status(500).json({ error: 'database_error' });
  }
};
