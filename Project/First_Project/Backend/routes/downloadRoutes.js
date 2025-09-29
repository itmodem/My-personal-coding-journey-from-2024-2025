// server/routes/downloadRoutes.js
import express from 'express';
import { downloadPlaylist } from '../controllers/downloadController.js';

const router = express.Router();

router.post('/playlist', downloadPlaylist);

export default router;