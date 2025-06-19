const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).end();

  try {
    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(payload.id);
    next();
  } catch {
    res.status(401).end();
  }
}

function requireAdmin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send('Admin only');
  next();
}

module.exports = { authenticate, requireAdmin };
