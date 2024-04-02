import React, { useState, Fragment } from 'react';
import Modal from '../components/Navigation/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './Events.css';

const Events = () => {
    const [creating, setCreating] = useState(false);

    const startCreateHandler = () => {
        setCreating(true);
    }

    const modalCancelHandler = () => {
        setCreating(false);
    }
    const modalConfirmHandler = () => {
        setCreating(false);
    }
    return (
        <Fragment>
            {creating && <Backdrop />}
            {creating && <Modal title="Create Modal" canCancel canConfirm onCancel={modalCancelHandler} onConfirm={modalConfirmHandler}>
                <p>Modal Content</p>
            </Modal>}
            <div className='events-control'>
                <p>Create your own event!</p>
                <button className='btn' onClick={startCreateHandler}>Create Event</button>
            </div>
        </Fragment>
    );
}
export default Events;