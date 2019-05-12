/* eslint-disable no-unused-vars */
import React from 'react';
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
  }

  componentDidMount() {
    this._animate();
  }

  componentWillMount() {
    if (this._animationFrame) {
      window.cancelAnimationFrame(this._animationFrame);
    }
  }

  _animate() {
    const { loopLength = 1000, animationSpeed = 30 } = this.props;
    const timestamp = Date.now() / 1000;
    const loopTime = loopLength / animationSpeed;

    this.setState({
      time: ((timestamp % loopTime) / loopTime) * loopLength
    });
    console.log(this.state.time)
    this._animationFrame = window.requestAnimationFrame(
      this._animate.bind(this)
    );
  }

  _renderLayers() {
    const {
      buildings = BUILDING_DATA,
      trip = TRIP_DATA,
      trailLength = 180
    } = this.props;

    return [
      new TripsLayer({
        id: 'trips',
        data: trip,
        getPath: d => d.segments,
        getColor: d => (d.vendor === 0 ? [253, 128, 93] : [23, 184, 190]),
        opacity: 0.3,
        widthMinPixels: 2,
        rounded: true,
        trailLength,
        currentTime: this.state.time
      }),
      new PolygonLayer({
        id: 'buildings',
        data: buildings,
        extruded: true,
        wireframe: false,
        opacity: 0.5,
        getPolygon: f => f.polygon,
        getElevation: f => f.height,
        getFillColor: [74, 80, 87],
        material
      })
    ];
  }

  render() {
    const { viewState, controller = true } = this.state;
    return (
      <DeckGL
        layers={this._renderLayers()}
        effects={[lightingEffect]}
        initialViewState={INITIAL_VIEW_STATE}
        viewState={viewState}
        controller={controller}
      >
        <StaticMap
          reuseMaps
          mapStyle="mapbox://styles/mapbox/dark-v9"
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      </DeckGL>
    );
  }
}
