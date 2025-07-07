import React from 'react';
import { useParams } from 'react-router-dom';

<Card.Img variant="top" src={bio.photo.url} className="card-photo" />

function Bio({ bios }) {
    const { slug } = useParams();

    const bio = bios.find((bio) => bio.slug == slug);

    return <h1>hi from bio</h1>
}

export default Bio;