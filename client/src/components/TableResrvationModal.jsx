// components/TableReservationModal.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TableReservationModal = ({ onClose }) => {
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/tables/book', {
                customerName,
                phone,
                date,
                time,
                duration,
            });
            alert(response.data.message);
            onClose();
        } catch (error) {
            alert(error.response?.data?.message || 'Error booking table');
        }
    };

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Reserve a Table</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Customer Name</label>
                                <input type="text" className="form-control" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Date</label>
                                <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Time</label>
                                <input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Duration (hours)</label>
                                <input type="number" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Reserve</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableReservationModal;
