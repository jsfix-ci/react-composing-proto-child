import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App';
import createNewStore from './store';
import AppComponent from './containers/AppComponent';

export { AppComponent };

export function createRoot() {
  const store = createNewStore();
  return React.createElement(
      Provider,
      { store: store },
      React.createElement(App, null)
  );
};

export function renderRoot(domElement) {
  return render(createRoot(), domElement);
};
