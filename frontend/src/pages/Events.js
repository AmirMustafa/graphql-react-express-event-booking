import React, { Fragment } from 'react';
import Modal from '../components/Navigation/Modal/Modal';
import './Events.css';

const Events = () => {
    return (
        <Fragment>
            <Modal title="Create Modal" canCancel canConfirm>
                <p>Modal Content</p>
            </Modal>
            <div className='events-control'>
                <p>Create your own event!</p>
                <button className='btn'>Create Event</button>
            </div>
        </Fragment>
    );
}
export default Events;