import { call, put, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "../../services/api";
import { Creators as UsersActions } from "../ducks/users";
import { Creators as ModalActions } from "../ducks/modal";

export function* addUser(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.login}`);

    const isDuplicated = yield select(state => state.users.data.find(user => user.id === data.id));

    if (isDuplicated) {
      yield put(UsersActions.addUserFail("Usuário já inserido!"));
      toast("Usuário já inserido!", { type: toast.TYPE.ERROR });
    } else {
      const user = {
        id: data.id,
        name: data.name,
        login: data.login,
        url: data.html_url,
        avatar: data.avatar_url,
        coords: action.payload.coords,
      };

      yield put(UsersActions.addUserSuccess(user));
      toast(`${user.name} adicionado com sucesso!`, { type: toast.TYPE.SUCCESS });
    }
  } catch (err) {
    yield put(UsersActions.addUserFail("Erro ao adicionar usuário."));
    toast("Erro ao adicionar usuário!", { type: toast.TYPE.ERROR });
  } finally {
    yield put(ModalActions.hideModal());
  }
}
