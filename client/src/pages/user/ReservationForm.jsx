import React, { useState } from 'react';
import { TableReservationModal } from '../../components';

const ReservationForm = () => {
    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    return (
        <div className="container mt-5">
            <h1>Restaurant Table Reservation</h1>
            <button className="btn btn-success" onClick={handleModalShow}>
                Reserve a Table
            </button>
            {showModal && <TableReservationModal onClose={handleModalClose} />}
        </div>
    );
};

export default ReservationForm;
