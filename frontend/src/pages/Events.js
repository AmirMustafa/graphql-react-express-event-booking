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
                <form>
                    <div className='form-control'>
                        <label htmlFor='title'>Title</label>
                        <input type="text" id="title" />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='price'>Price</label>
                        <input type="number" id="price" />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='date'>Date</label>
                        <input type="date" id="date" />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='description'>Description</label>
                        <textarea id='description' rows="4"></textarea>
                    </div>
                </form>
            </Modal>}
            <div className='events-control'>
                <p>Create your own event!</p>
                <button className='btn' onClick={startCreateHandler}>Create Event</button>
            </div>
        </Fragment>
    );
}
export default Events;