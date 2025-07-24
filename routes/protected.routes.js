import express from 'express';
import sessionAuth from '../middleware/sessionAuth.js';

const router = express.Router();

router.get('/dashboard', sessionAuth, (req, res) => {
  res.json({ message: `Welcome ${req.session.username} to the dashboard!` });
});

export default router;
