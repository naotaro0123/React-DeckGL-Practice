/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import StartMap from './StartMap';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StartMap />, div);
  ReactDOM.unmountComponentAtNode(div);
});
