import React from 'react';
import { useParams } from 'react-router-dom';

<Card.Img
  variant="top"
  src="https://us-east-1.graphassets.com/ANbsyxEKT0KZO3ZL8LdIfz/cmcshi8x3pb0h07ir94hk2rql"
  style={{ width: "318px", height: "230px", objectFit: "cover" }}
/>

function Bio({ bios }) {
    const { slug } = useParams();

    const bio = bios.find((bio) => bio.slug == slug);

    return <h1>hi from bio</h1>
}

export default Bio;