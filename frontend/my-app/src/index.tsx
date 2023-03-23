import * as React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import { createRoot } from 'react-dom/client';
import App from "./App";


// @ts-ignore
const root= createRoot(document.getElementById('root'));
root.render(

    <CookiesProvider>
    <Router>
  <React.StrictMode>
    <App/>
  </React.StrictMode>
    </Router>
    </CookiesProvider>

);


