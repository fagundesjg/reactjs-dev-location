import React, { Component } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ModalActions } from "../../store/ducks/modal";
import { Creators as UsersActions } from "../../store/ducks/users";

import "./styles.scss";

Modal.setAppElement(document.getElementById("root"));

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: { zIndex: 10 },
};

class AddUser extends Component {
  state = {
    login: "",
  };

  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    coords: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }).isRequired,
    addUserRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  handleAddUser = (event) => {
    event.preventDefault();
    this.setState({ login: "" });
  };

  render() {
    const { login } = this.state;
    const {
      isVisible, hideModal, coords, addUserRequest, loading,
    } = this.props;

    return (
      <Modal
        isOpen={isVisible}
        onAfterOpen={() => {}}
        onRequestClose={hideModal}
        contentLabel="Adicionar Usuário"
        style={customStyles}
      >
        <div className="box-add-user">
          <form onSubmit={this.handleAddUser}>
            <p>Adicionar novo usuário</p>
            <input
              placeholder="Usuário no Github"
              value={login}
              onChange={e => this.setState({ login: e.target.value })}
            />
            <div>
              <button className="btn btn-back" type="button" onClick={hideModal}>
                Cancelar
              </button>
              <button
                className="btn btn-save"
                type="submit"
                onClick={() => addUserRequest(login, coords)}
              >
                {loading ? <i className="fa fa-spinner fa-pulse" /> : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isVisible: state.modal.isVisible,
  hideModal: state.modal.hideModal,
  coords: state.modal.coords,
  addUserRequest: state.users.addUserRequest,
  loading: state.users.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...ModalActions, ...UsersActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
