import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainMap from './MainMap';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(<BrowserRouter><MainMap /></BrowserRouter>, document.getElementById('root'));