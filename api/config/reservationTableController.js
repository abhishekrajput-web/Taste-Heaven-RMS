// controllers/tableReservationController.js
import TableReservation from '../mongodb/models/TableReservation.js';

export const initializeTables = async (req, res) => {
    try {
        const existing = await TableReservation.findOne();
        if (!existing) {
            const tableReservation = new TableReservation();
            await tableReservation.save();
            res.status(201).json({ message: 'Table reservation system initialized', tableReservation });
        } else {
            res.status(200).json({ message: 'Already initialized', existing });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const bookTable = async (req, res) => {
    const { customerName, phone, date, time, duration } = req.body;

    try {
        const tableData = await TableReservation.findOne();
        if (!tableData || tableData.tableCount <= 0) {
            return res.status(400).json({ message: 'No tables available' });
        }

        tableData.reservations.push({ customerName, phone, date, time, duration });
        tableData.tableCount -= 1;
        await tableData.save();

        res.status(200).json({ message: 'Table booked successfully', tableData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const freeTables = async (req, res) => {
    try {
        const now = new Date();
        const tableData = await TableReservation.findOne();

        if (tableData) {
            tableData.reservations = tableData.reservations.filter(reservation => {
                const reservationEnd = new Date(reservation.date);
                reservationEnd.setHours(reservationEnd.getHours() + reservation.duration);
                return reservationEnd > now;
            });

            tableData.tableCount = 50 - tableData.reservations.length;
            await tableData.save();
        }

        res.status(200).json({ message: 'Updated table availability', tableData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
