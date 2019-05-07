/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './StartMap/index';
// import App from './Scatterplot/index';
// import App from './Hexagons/index';
// import App from './TripLayer/index';
// import App from './RealTimeTrip/index';
import App from './OriginalTrip/index';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
