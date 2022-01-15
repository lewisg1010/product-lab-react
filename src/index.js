import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
// import dotenv from 'dotenv';

// const graphqlAPI = process.env.REACT_APP_GCMS_URL;

// dotenv.config();

// const apollo_client = new ApolloClient({
//   uri: 'https://api-us-east-1.graphcms.com/v2/cky85ol262n3s01z42208339l/master'
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
