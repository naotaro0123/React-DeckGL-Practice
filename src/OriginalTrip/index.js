/* eslint-disable no-unused-vars */
import React from 'react';
import { StaticMap } from 'react-map-gl';
import { AmbientLight, PointLight } from '@deck.gl/core';
import DeckGL from 'deck.gl';
import { TripsLayer } from '@deck.gl/geo-layers';
import TRIP_DATA from '../data/trips.json';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

export const INITIAL_VIEW_STATE = {
  // longitude: -74,
  // latitude: 40.72,
  longitude: 134.82,
  latitude: 34.78,
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
    const { loopLength = 10, animationSpeed =100 } = this.props;
    const timestamp = Date.now() / 10;
    const loopTime = loopLength / animationSpeed;

    this.setState({
      time: ((timestamp % loopTime) / loopTime) * loopLength
    });
    this._animationFrame = window.requestAnimationFrame(
      this._animate.bind(this)
    );
  }

  _renderLayers() {
    const { trip = TRIP_DATA, trailLength = 180 } = this.props;

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
      })
    ];
  }

  render() {
    const { viewState, controller = true } = this.state;
    return (
      <DeckGL
        layers={this._renderLayers()}
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
