import React from 'react';
import './EventItem.css';

const eventItem = props => (
    <li key={props.eventId} className='events__list-item'>
        <div>
            <h1>{props.title}</h1>
            <h2>{`$999.99`}</h2>
        </div>
        <div>
            {props.authUserId === props.creator._id
                ? <p>Your the owner</p>
                : <button className='btn'>View Details</button>
            }
        </div>
    </li>
);

export default eventItem;