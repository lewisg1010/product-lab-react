// import gql from 'graphql-tag';
// import { GraphQLClient } from 'graphql-request';
// // import dotenv from 'dotenv';

// export default class GraphCMSContent {
//   constructor() {
//     // dotenv.config();

//     this.Client = new GraphQLClient(
//         'https://api-us-east-1.graphcms.com/v2/cky85ol262n3s01z42208339l/master',
//       {
//         headers: {
//           authorization: `Bearer https://api-us-east-1.graphcms.com/v2/cky85ol262n3s01z42208339l/master`
//         }
//       }
//     );
//   };

//   fetchPosts(){
//     const QUERY = gql`
//     query {
//         bios {
//           name
//           title
//           photo {
//             url
//           }
//           aboutme
//           board
//         }
//       }
//     `;
//     return QUERY;
//   };
// };