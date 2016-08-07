
import * as actions from '../actions';
import { takeLatest } from 'redux-saga';
import { put, call, fork } from 'redux-saga/effects';
import { fetchReposByUser } from '../services/github-api';

function * loadRepos(action) {
  try {
    yield put(actions.fetchingRepos(action.payload));
    const repos = yield call(fetchReposByUser, action.payload);
    yield put(actions.fetchedRepos(repos));
  } catch (err) {
    yield put(actions.fetchFailedRepos(err));
  }
}

function * watchUsername() {
  yield * takeLatest(actions.usernameChanged.toString(), loadRepos);
}

export default function * rootSaga() {
  // fork to start the watchers in parallel
  yield fork(watchUsername);
};
