import React, { useState, useEffect } from 'react';
import { StaticMap } from 'react-map-gl';
import { PhongMaterial } from '@luma.gl/core';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import DeckGL from 'deck.gl';
import { PolygonLayer } from '@deck.gl/layers';
import { TripsLayer } from '@deck.gl/geo-layers';
import TRIP_DATA from '../data/trips.json';
import BUILDING_DATA from '../data/buildings.json';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [-74.5, 40.7, 8000]
});

const lightingEffect = new LightingEffect({ ambientLight, pointLight });

const material = new PhongMaterial({
  ambient: 0.1,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [60, 64, 70]
});

export const INITIAL_VIEW_STATE = {
  longitude: -74,
  latitude: 40.72,
  zoom: 13,
  pitch: 45,
  bearing: 0
};

const App = props => {
  const [_time, setTime] = useState(0);

  useEffect(() => {
    // Similar to componentDidMount
    animate();

    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });

  let animationFrame;
  const animate = () => {
    const { loopLength = 1000, animationSpeed = 30 } = props;
    const timestamp = Date.now() / 1000;
    const loopTime = loopLength / animationSpeed;

    setTime(((timestamp % loopTime) / loopTime) * loopLength);
    console.log(_time);
    animationFrame = requestAnimationFrame(animate);
  };

  const renderLayers = () => {
    return [
      new TripsLayer({
        id: 'trips',
        data: TRIP_DATA,
        getPath: d => d.segments,
        getColor: d => (d.vendor === 0 ? [253, 128, 93] : [23, 184, 190]),
        opacity: 0.3,
        widthMinPixels: 2,
        rounded: true,
        trailLength: 180,
        currentTime: _time
      }),
      new PolygonLayer({
        id: 'buildings',
        data: BUILDING_DATA,
        extruded: true,
        wireframe: false,
        opacity: 0.5,
        getPolygon: f => f.polygon,
        getElevation: f => f.height,
        getFillColor: [74, 80, 87],
        material
      })
    ];
  };

  return (
    <DeckGL
      layers={renderLayers()}
      effects={[lightingEffect]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
    >
      <StaticMap
        reuseMaps
        mapStyle="mapbox://styles/mapbox/dark-v9"
        preventStyleDiffing={true}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
    </DeckGL>
  );
};

export default App;
