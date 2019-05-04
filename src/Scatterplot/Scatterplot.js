/* eslint-disable no-unused-vars */
import React from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL from 'deck.gl';
import taxiData from '../data/taxi';
import { renderLayers } from '../modules/deckgl-layers';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const INITIAL_VIEW_STATE = {
  longitude: -74,
  latitude: 40.74,
  zoom: 16,
  minZoom: 5,
  maxZoom: 20,
  pitch: 0,
  bearing: 0
};

export default class Scatterplot extends React.Component {
  state = {
    points: [],
    style: 'mapbox://styles/mapbox/light-v9'
  };

  componentDidMount() {
    this._processData();
  }

  _processData() {
    const points = taxiData.reduce((accu, curr) => {
      accu.push({
        position: [Number(curr.pickup_longitude), Number(curr.pickup_latitude)],
        pickup: true
      });
      accu.push({
        position: [
          Number(curr.dropoff_longitude),
          Number(curr.dropoff_latitude)
        ],
        pickup: false
      });
      return accu;
    }, []);
    this.setState({
      points
    });
  }

  onStyleChane = style => {
    this.setState({ style });
  };

  render() {
    return (
      <div>
        <DeckGL
          layers={renderLayers({ data: this.state.points })}
          initialViewState={INITIAL_VIEW_STATE}
          controller
        >
          <StaticMap mapboxApiAccessToken={MAPBOX_TOKEN} />
        </DeckGL>
      </div>
    );
  }
}
