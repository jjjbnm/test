const db = require('./_firebase');

function body(req) {
  if (!req.body) return {};
  if (typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body); } catch (_) { return {}; }
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const collection = db.collection('reviews');
    if (req.method === 'GET') {
      const snapshot = await collection.orderBy('date', 'desc').limit(100).get();
      return res.status(200).json(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    if (req.method === 'POST') {
      const input = body(req);
      const name = String(input.name || 'לקוח/ה').trim().slice(0, 80) || 'לקוח/ה';
      const text = String(input.text || '').trim().slice(0, 2000);
      const rating = Math.min(5, Math.max(1, Number(input.rating) || 5));
      if (!text) return res.status(400).json({ error: 'text_required' });
      const date = new Date().toISOString();
      const ref = await collection.add({ name, text, rating, date });
      return res.status(201).json({ id: ref.id, name, text, rating, date });
    }
    return res.status(405).json({ error: 'method_not_allowed' });
  } catch (err) {
    console.error('Reviews API error:', err);
    return res.status(500).json({ error: 'database_error' });
  }
};
