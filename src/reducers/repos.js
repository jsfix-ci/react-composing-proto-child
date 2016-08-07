import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { Map } from 'immutable';

const initialState = new Map({});

export default handleActions({
  [actions.fetchingRepos]: (state, action) => state.merge({
    fetching: true,
    fetchError: undefined,
    data: undefined,
    totals: undefined
  }),
  [actions.fetchFailedRepos]: (state, action) => state.merge({
    fetching: false,
    fetchError: action.payload,
    data: undefined,
    totals: undefined
  }),
  [actions.fetchedRepos]: (state, action) => state.merge({
    fetching: false,
    fetchError: undefined,
    data: action.payload,
    totals: Object.keys(action.payload || {}).reduce((totals, name) => {
      const repo = action.payload[name];
      return {
        stars: totals.stars + repo.stargazersCount,
        forks: totals.forks + repo.forksCount
      };
    }, { stars: 0, forks: 0 })
  })
}, initialState);
