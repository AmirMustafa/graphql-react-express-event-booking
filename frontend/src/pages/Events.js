import React, { useState, useRef, Fragment } from 'react';
import Modal from '../components/Navigation/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './Events.css';

const Events = () => {
    const [creating, setCreating] = useState(false);

    const titleRef = useRef(null);
    const priceRef = useRef(null);
    const descriptionRef = useRef(null);
    const dateRef = useRef(null);

    const validateData = (title, price, description, date) => {
        if (
            title.trim().length === 0 ||
            price.trim().length === 0 ||
            description.trim().length === 0 ||
            date.trim().length === 0) {
            return { res: false, msg: "Email or password cannot be empty!" }
        }
        return { res: true, msg: null }
    }

    const startCreateHandler = () => {
        setCreating(true);
    }

    const modalCancelHandler = () => {
        setCreating(false);
    }
    const modalConfirmHandler = () => {
        setCreating(false);
        const title = titleRef.current.value;
        const price = priceRef.current.value;
        const description = descriptionRef.current.value;
        const date = dateRef.current.value;

        const event = { title, price, description, date }

        // Clear form fields
        titleRef.current.value = '';
        priceRef.current.value = '';
        dateRef.current.value = '';
        descriptionRef.current.value = '';

        const isValid = validateData(title, price, description, date);
        if (!isValid.res) {
            return;
        }

        console.log("event ===> ", event);
    }
    return (
        <Fragment>
            {creating && <Backdrop />}
            {creating && <Modal title="Create Modal" canCancel canConfirm onCancel={modalCancelHandler} onConfirm={modalConfirmHandler}>
                <form>
                    <div className='form-control'>
                        <label htmlFor='title'>Title</label>
                        <input type="text" id="title" ref={titleRef} />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='price'>Price</label>
                        <input type="number" id="price" ref={priceRef} />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='date'>Date</label>
                        <input type="date" id="date" ref={dateRef} />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='description'>Description</label>
                        <textarea id='description' rows="4" ref={descriptionRef}></textarea>
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