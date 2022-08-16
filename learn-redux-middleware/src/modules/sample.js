import { createAction, handleActions } from "redux-actions";
import * as api from "../lib/api";
import createRequestThunk from "../lib/createRequestThunk";
import { delay, put, takeEvery, takeLatest, call } from "redux-saga/effects";
import { finishLoading, startLoading } from "./loading";
import createRequestSaga from "../lib/createRequestSaga";

const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

//export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getPost = createAction(GET_POST, (id) => id);
// export const getPost = (id) => async (dispatch) => {
//     dispatch({ type: GET_POST });
//     try {
//         const response = await api.getPost(id);
//         dispatch({
//             type: GET_POST_SUCCESS,
//             payload: response.data,
//         });
//     } catch (e) {
//         dispatch({
//             type: GET_POST_FAILURE,
//             payload: e,
//             error: true,
//         });
//         throw e;
//     }
// };
//export const getUsers = createRequestThunk(GET_USERS, api.getUsers);
export const getUsers = createAction(GET_USERS);
// export const getUsers = (id) => async (dispatch) => {
//     dispatch({ type: GET_USERS });
//     try {
//         const response = await api.getUsers(id);
//         dispatch({
//             type: GET_USERS_SUCCESS,
//             payload: response.data,
//         });
//     } catch (e) {
//         dispatch({
//             type: GET_USERS_FAILURE,
//             payload: e,
//             error: true,
//         });
//         throw e;
//     }
// };

const getPostSaga = createRequestSaga(GET_POST, api.getPost);
// function* getPostSaga(action) {
//     yield put(startLoading(GET_POST));

//     try {
//         const post = yield call(api.getPost, action.payload);

//         yield put({
//             type: GET_POST_SUCCESS,
//             payload: post.data,
//         });
//     } catch (e) {
//         yield put({
//             type: GET_POST_FAILURE,
//             payload: e,
//             error: true,
//         });
//     }
//     yield put(finishLoading(GET_POST));
// }
const getUserSaga = createRequestSaga(GET_USERS, api.getUsers);
// function* getUserSaga() {
//     yield put(startLoading(GET_USERS));

//     try {
//         const users = yield call(api.getUsers);

//         yield put({
//             type: GET_USERS_SUCCESS,
//             payload: users.data,
//         });
//     } catch (e) {
//         yield put({
//             type: GET_USERS_FAILURE,
//             payload: e,
//             error: true,
//         });
//     }
//     yield put(finishLoading(GET_USERS));
// }

export function* sampleSaga() {
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(GET_USERS, getUserSaga);
}

const initialState = {
    post: null,
    users: null,
};

const sample = handleActions(
    {
        [GET_POST_SUCCESS]: (state, action) => ({
            ...state,
            post: action.payload,
        }),
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            users: action.payload,
        }),
    },
    initialState
);

export default sample;
