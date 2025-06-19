const express = require('express');
const { authenticate, requireAdmin } = require('../middleware/auth');
const Job = require('../models/Job');
const sendMail = require('../utils/mailer');
const router = express.Router();

router.use(authenticate);

// User-specific job routes
router.get('/', async (req, res) => {
  const jobs = await Job.findAll({
    where: { UserId: req.user.id },
    order: [['appliedDate', 'DESC']]
  });
  res.json(jobs);
});

router.post('/', async (req, res) => {
  const job = await Job.create({ ...req.body, UserId: req.user.id });
  res.json(job);
});

router.put('/:id', async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  if (job.UserId !== req.user.id) return res.status(403).end();

  const oldStatus = job.status;
  await job.update(req.body);

  if (req.body.status && req.body.status !== oldStatus) {
    sendMail(req.user.email, {
      company: job.company,
      role: job.role,
      oldStatus,
      newStatus: job.status
    });
  }

  res.json(job);
});

router.delete('/:id', async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  if (job.UserId !== req.user.id) return res.status(403).end();
  await job.destroy();
  res.json({ deleted: true });
});

// Admin: view all jobs
router.get('/all', requireAdmin, async (req, res) => {
  const jobs = await Job.findAll({ include: ['User'], order: [['createdAt','DESC']] });
  res.json(jobs);
});

module.exports = router;
