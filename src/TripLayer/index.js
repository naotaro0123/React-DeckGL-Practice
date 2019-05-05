/* eslint-disable no-unused-vars */
import React from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL from 'deck.gl';
import { TripsLayer } from '@deck.gl/geo-layers';
import TRIP_DATA from '../data/sf.trips.json';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const INITIAL_VIEW_STATE = {
  longitude: -122.4,
  latitude: 37.74,
  zoom: 11,
  minZoom: 0,
  maxZoom: 20,
  pitch: 30,
  bearing: 0,
  visible: true
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
  }

  _renderLayers() {
    return [
      new TripsLayer({
        id: 'trips',
        data: TRIP_DATA,
        getPath: d =>
          d.waypoints.map(p => [
            p.coordinates[0],
            p.coordinates[1],
            p.timestamp - 1554772579000
          ]),
        getColor: [253, 128, 93],
        opacity: 0.8,
        widthMinPixels: 5,
        rounded: true,
        trailLength: 200,
        currentTime: 100
      })
    ];
  }

  render() {
    return (
      <DeckGL
        layers={this._renderLayers()}
        initialViewState={INITIAL_VIEW_STATE}
        controller
      >
        <StaticMap mapboxApiAccessToken={MAPBOX_TOKEN} />
      </DeckGL>
    );
  }
}
