import React, { Component, useState, useEffect } from 'react';
import './App.css';
import { request } from 'graphql-request';
// import Moment from 'react-moment';


function PastEvents() {

    const [events, setEvents] = useState(null);

    useEffect(() => {
        const fetchEvents = async() => {
            const { events } = await request('https://api-us-east-1.graphcms.com/v2/cky85ol262n3s01z42208339l/master', 
            `{
            events(where: {date_lt: TODAY}) {
                date
                description
                location
                photo {
                    url
                }
                rsvp
                title
                }
            }
            `
            );

    setEvents(events);
  };

  fetchEvents();

},[]);

        return (
            <div>
                {!events ? (
                    'Loading'
                ) : (
                        <ul>
                            {events.map((event, i) => (
                                <li key={event.title}>
                                    <h1>{event.title}</h1>
                                    <h1>{event.description}</h1>
                                </li>
                            ))}
                        </ul>
                )}
            </div>
        );
    };

export default PastEvents;
