import React, { Component } from "react";
import MapGL, { Marker } from "react-map-gl";

// eslint-disable-next-line import/no-extraneous-dependencies
import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.scss";

export default class Map extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -23.5439948,
      longitude: -46.6065452,
      zoom: 14,
    },
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleMapClick = (e) => {
    const [longitude, latitude] = e.lngLat;

    console.log.tron(`Latitude: ${latitude} \nLongitude: ${longitude}`);
  };

  render() {
    const { viewport } = this.state;
    return (
      <MapGL
        {...viewport}
        onClick={this.handleMapClick}
        mapStyle="mapbox://styles/mapbox/basic-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiZGllZ28zZyIsImEiOiJjamh0aHc4em0wZHdvM2tyc3hqbzNvanhrIn0.3HWnXHy_RCi35opzKo8sHQ"
        onViewportChange={vp => this.setState({ viewport: vp })}
      >
        <Marker
          latitude={-23.5439948}
          longitude={-46.6065452}
          onClick={this.handleMapClick}
          captureClick
        >
          <img
            className="avatar"
            alt="Avatar"
            src="https://avatars2.githubusercontent.com/u/2254731?v=4"
          />
        </Marker>
      </MapGL>
    );
  }
}
