// routes/tableReservationRoutes.js
import express from 'express';
import { initializeTables, bookTable, freeTables } from '../config/reservationTableController.js';

const router = express.Router();

router.post('/initialize', initializeTables);
router.post('/book', bookTable);
router.post('/free', freeTables);

export default router;
