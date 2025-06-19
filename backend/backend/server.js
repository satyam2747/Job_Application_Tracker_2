require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./db');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
app.use(cors(), express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

sequelize.sync()
  .then(() => app.listen(process.env.PORT || 5000, () => {
    console.log('Backend listening');
  }))
  .catch(console.error);
