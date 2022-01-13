// import Moment from 'react-moment';
// import { useState } from 'react';

// const Post = () => {
//     const [data, setData] = useState({posts: []});
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('https://product-lab-main.herokuapp.com/ghost/api/v3/content/posts/?key=f06429d3909d92f90c46971143&fields=title,slug,feature_image,featured,updated_at,custom_excerpt,reading_time&filter=featured:true&limit=4');
//                 setData(response.data);
//             }
//             catch(error) {
//                 console.log(error);
//             }
//         }
//         fetchData();
//     }, []);

// export default Post;
