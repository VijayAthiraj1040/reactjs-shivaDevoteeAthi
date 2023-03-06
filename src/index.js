import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import Kumar from './Task/kumar';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    
      <App/>
      {/* <Kumar/> */}
    </BrowserRouter>
);

