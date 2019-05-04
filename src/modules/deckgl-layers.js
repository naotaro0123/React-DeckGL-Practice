/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { ScatterplotLayer } from 'deck.gl';

const PICKUP_COLOR = [114, 19, 108];
const DROPOFF_COLOR = [243, 185, 72];

export function renderLayers(props) {
  const { data } = props;
  return [
    new ScatterplotLayer({
      id: 'scatterplot',
      getPosition: d => d.position,
      getColor: d => [0, 128, 255],
      getRadius: d => 5,
      opacity: 0.5,
      pickable: true,
      radiusMinPixels: 0.25,
      radiusMaxPixels: 30,
      data
    })
  ];
}
