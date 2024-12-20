import React from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"



const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
  
root.render(
  <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
    </React.StrictMode>
);

