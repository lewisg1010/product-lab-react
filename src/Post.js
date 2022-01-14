import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Tilt from 'react-parallax-tilt';
import Moment from 'react-moment';
import { Link, useParams } from 'react-router-dom';
import { Card, Row, Col, Container, Image } from 'react-bootstrap';


const Post = () => {
    let { slug } = useParams();

    const [data, setData] = useState({posts: []});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://product-lab-main.herokuapp.com/ghost/api/v3/content/posts/?key=f06429d3909d92f90c46971143&fields=title,slug,feature_image,featured,updated_at,custom_excerpt,html,reading_time&filter=slug:${slug}`);
                setData(response.data);
            }
            catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }, [slug]);
    return(
<div id="container">
  <h3>Post Page</h3>
  {data.posts[0] && (
      <React.Fragment>
          <h1>{data.posts[0].title}</h1>
          <p>{data.posts[0].custom_excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: data.posts[0].html}}></div>
      </React.Fragment>
  )}

</div>
    )
}

export default Post;
