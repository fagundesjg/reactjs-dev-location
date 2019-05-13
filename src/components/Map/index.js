import React, { Component } from "react";
import MapGL, { Marker } from "react-map-gl";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.scss";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ModalActions } from "../../store/ducks/modal";

class Map extends Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        login: PropTypes.string,
        url: PropTypes.string,
        avatar: PropTypes.string,
        coords: PropTypes.shape({
          longitude: PropTypes.number,
          latitude: PropTypes.number,
        }),
      }),
    ).isRequired,
  };

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
    const { showModal } = this.props;
    showModal({ latitude, longitude });
  };

  render() {
    const { viewport } = this.state;
    const { users } = this.props;
    return (
      <MapGL
        {...viewport}
        onClick={this.handleMapClick}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={vp => this.setState({ viewport: vp })}
      >
        {users.map(user => (
          <Marker
            id={user.id}
            latitude={user.coords.latitude}
            longitude={user.coords.longitude}
            onClick={this.handleMapClick}
            captureClick
          >
            <img className="avatar" alt={`${user.name} Avatar`} src={user.avatar} />
          </Marker>
        ))}
      </MapGL>
    );
  }
}

const mapStateToProps = state => ({
  showModal: state.modal.showModal,
  users: state.users.data,
});

const mapDispatchToProps = dispatch => bindActionCreators(ModalActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
