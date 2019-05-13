import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as UsersActions } from "../../store/ducks/users";

import "./styles.scss";

const Sidebar = ({ users, userRemove }) => (
  <div className="box-sidebar">
    {users.map(user => (
      <div id={user.id} className="row-user">
        <div className="row-img">
          <img src={user.avatar} alt={`${user.name} Avatar`} />
        </div>
        <div className="row-info">
          <p>
            <strong>{user.name}</strong>
          </p>
          <p>
            <small>{user.login}</small>
          </p>
        </div>
        <div className="row-actions">
          <button
            type="button"
            onClick={() => {
              userRemove(user.id);
            }}
          >
            <i className="fa fa-2x fa-times-circle delete" />
          </button>
          <button type="button" onClick={() => window.open(user.url, "_blank")}>
            <i className="fa fa-2x fa-angle-right" />
          </button>
        </div>
      </div>
    ))}
  </div>
);

Sidebar.propTypes = {
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
  userRemove: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: state.users.data,
  userRemove: state.users.userRemove,
});

const mapDispatchToProps = dispatch => bindActionCreators(UsersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
