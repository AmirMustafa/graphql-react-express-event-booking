import React from 'react';
import './EventItem.css';

const eventItem = props => (
    <li key={props.eventId} className='events__list-item'>
        <div>
            <h1>{props.title}</h1>
            <h2>${props.price} - {new Date(props.date).toLocaleDateString()}</h2>
        </div>
        <div>
            {props.authUserId === props.creator._id
                ? <p>Your the owner</p>
                : <button className='btn' onClick={props.onDetail.bind(this, props.eventId)}>View Details</button>
            }
        </div>
    </li>
);

export default eventItem;