/* eslint-disable no-unused-vars */
import React from 'react';
import MapGL from 'react-map-gl';
import { MapStylePicker } from '../modules/controls';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

export default class StartMap extends React.Component {
  state = {
    style: 'mapbox://styles/mapbox/light-v9',
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      longitude: -74,
      latitude: 40.7,
      zoom: 11,
      maxZoom: 16
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  onStyleChange = style => {
    this.setState({ style });
  };

  _onViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  _resize = () => {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  render() {
    return (
      <div>
        <MapStylePicker
          onStyleChange={this.onStyleChange}
          currentStyle={this.state.style}
        />
        <MapGL
          {...this.state.viewport}
          mapStyle={this.state.style}
          onViewportChange={viewport => this._onViewportChange(viewport)}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      </div>
    );
  }
}
