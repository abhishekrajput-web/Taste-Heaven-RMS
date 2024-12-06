// models/TableReservation.js
import mongoose from "mongoose";

const tableReservationSchema = new mongoose.Schema({
  tableCount: { type: Number, default: 50 },
  reservations: [
    {
      customerName: { type: String, required: true },
      phone: { type: String, required: true },
      date: { type: Date, required: true },
      time: { type: String, required: true },
      duration: { type: Number, required: true }, // Duration in hours
    },
  ],
});

const TableReservation = mongoose.model( "TableReservation", tableReservationSchema);
export default TableReservation;
