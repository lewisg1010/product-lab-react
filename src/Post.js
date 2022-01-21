import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';


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
<div id="postcontainer">
<div id="divmesomespacesmall"></div>
  {data.posts[0] && (
      <React.Fragment>
          <h1 id="bold">{data.posts[0].title}</h1>
          <h6 id="italic">{data.posts[0].custom_excerpt}</h6>
          <div dangerouslySetInnerHTML={{ __html: data.posts[0].html}} class="postbody" id="postbody"></div>
      </React.Fragment>
  )}

</div>
    )
}

export default Post;
