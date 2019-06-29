import React, { useState, useEffect } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL from 'deck.gl';
import taxiData from '../data/taxi';
import { renderLayers } from '../modules/deckgl-layers';
import {
  LayerControls,
  MapStylePicker,
  SCATTERPLOT_CONTROLS
} from '../modules/controls';
import { tooltipStyle } from '../modules/style';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const INITIAL_VIEW_STATE = {
  longitude: -74,
  latitude: 40.74,
  zoom: 11,
  minZoom: 5,
  maxZoom: 20,
  pitch: 0,
  bearing: 0
};

const App = () => {
  const [_hover, setHover] = useState({
    hover: {
      x: 0,
      y: 0,
      hoveredObject: null
    }
  });
  const [_points, setPoints] = useState([]);
  const [_settings, setSettings] = useState(
    Object.keys(SCATTERPLOT_CONTROLS).reduce(
      (accu, key) => ({
        ...accu,
        [key]: SCATTERPLOT_CONTROLS[key].value
      }),
      {}
    )
  );
  const [_style, setStyle] = useState('mapbox://styles/mapbox/light-v9');

  useEffect(() => {
    // Similar to componentDidMount
    processData();
  });

  const updateLayerSettings = settings => {
    setSettings(settings);
  };

  const onHover = ({ x, y, object }) => {
    const label = object ? (object.pickup ? 'Pickup' : 'Dropoff') : null;
    setHover({ hover: { x: x, y: y, hoveredObject: object, label } });
  };

  const processData = () => {
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
    setPoints(points);
  };

  const onStyleChange = style => {
    setStyle(style);
  };

  return (
    <>
      {!_points.length ? null : (
        <div>
          {_hover.hoveredObject && (
            <div
              style={{
                ...tooltipStyle,
                transform: `translate(${_hover.x}px, ${_hover.y}px)`
              }}
            >
              <div>{_hover.label}</div>
            </div>
          )}
          <MapStylePicker onStyleChange={onStyleChange} currentStyle={_style} />
          <LayerControls
            settings={_settings}
            propTypes={SCATTERPLOT_CONTROLS}
            onChange={settings => updateLayerSettings(settings)}
          />
          <DeckGL
            layers={renderLayers({
              data: _points,
              onHover: hover => onHover(hover),
              settings: _settings
            })}
            initialViewState={INITIAL_VIEW_STATE}
            controller
          >
            <StaticMap mapStyle={_style} mapboxApiAccessToken={MAPBOX_TOKEN} />
          </DeckGL>
        </div>
      )}
    </>
  );
};

export default App;
