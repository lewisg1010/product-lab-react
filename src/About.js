import React, { Component, useState, useEffect } from 'react';
import './App.css';
import { request } from 'graphql-request';


function About() {

    const [bios, setBios] = useState(null);

    useEffect(() => {
        const fetchBios = async() => {
            const { bios } = await request('https://api-us-east-1.graphcms.com/v2/cky85ol262n3s01z42208339l/master', 
            `{
            bios {
                name
                title
                photo {
                url
                }
                aboutme
                board
                slug
            }
            }
            `
            );

    setBios(bios);
  };

  fetchBios();
}, []);


        return (
            <div>
                {!bios ? (
                    'Loading'
                ) : (
                        <ul>
                            {bios.map((bio, i) => (
                                <li key={bio.name}>
                                    <h1>{bio.title}</h1>
                                </li>
                            ))}
                        </ul>
                )}
            </div>
        );
    };

export default About;
