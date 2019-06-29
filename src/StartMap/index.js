import React, { useState, useEffect } from 'react';
import MapGL from 'react-map-gl';
import { MapStylePicker } from '../modules/controls';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const App = () => {
  const [_style, setStyle] = useState('mapbox://styles/mapbox/light-v9');
  const [_viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    longitude: -74,
    latitude: 40.7,
    zoom: 11,
    maxZoom: 16
  });

  useEffect(() => {
    // Similar to componentDidMount
    window.addEventListener('resize', resize);
    resize();

    // Similar to componentWillUnmount
    return () => {
      window.removeEventListener('resize', resize);
    };
  });

  const onStyleChange = style => {
    setStyle(style);
  };

  const onViewportChange = viewport => {
    setViewport({ ...viewport, _viewport });
  };

  const resize = () => {
    onViewportChange(_viewport);
  };

  return (
    <div>
      <MapStylePicker onStyleChange={onStyleChange} currentStyle={_style} />
      <MapGL
        {..._viewport}
        mapStyle={_style}
        onViewportChange={_viewport => onViewportChange(_viewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
    </div>
  );
};

export default App;
