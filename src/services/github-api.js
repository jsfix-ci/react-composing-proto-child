import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import 'isomorphic-fetch';
/* global fetch */
const API_ROOT = 'https://api.github.com/';

// Extracts the next page URL from Github API response.
function getNextPageUrl(response) {
  const link = response.headers.get('link');
  if (!link) {
    return null;
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
  if (!nextLink) {
    return null;
  }

  return nextLink.split(';')[0].slice(1, -1);
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (json.error) {
        throw new Error(json.error);
      }
      if (!response.ok) {
        throw new Error(json && json.message || response.statusText || response.status + ' http error');
      }

      const camelizedJson = camelizeKeys(json);
      const nextPageUrl = getNextPageUrl(response);

      return Object.assign({},
        normalize(camelizedJson, schema),
        { nextPageUrl }
      );
    })
    .then(
      response => ({response})
    );
}

const userSchema = new Schema('users', {
  idAttribute: 'login'
});

const repoSchema = new Schema('repos', {
  idAttribute: 'fullName'
});

/*
repoSchema.define({
  owner: userSchema
});
*/

export const fetchUser = login => callApi(`users/${login}`, userSchema)
  .then(res => res.response.entities.users[login]);

export const fetchReposByUser = login => callApi(`users/${login}/repos?sort=pushed&per_page=100`, arrayOf(repoSchema))
  .then(res => res.response.entities.repos);
