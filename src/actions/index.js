import { createAction } from 'redux-actions';

export const usernameChanged = createAction('USERNAME_CHANGED');
export const fetchingRepos = createAction('FETCHING_REPOS');
export const fetchFailedRepos = createAction('FETCH_FAILED_REPOS');
export const fetchedRepos = createAction('FETCHED_REPOS');
