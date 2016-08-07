import React from 'react';
import {Provider} from 'react-redux';
import {createNewStore} from '../store';
import App from './App';

/* eslint-disable fp/no-class, fp/no-mutation */
class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.store = createNewStore();
  }

  render() {
    return (<Provider store={this.store}>
      <App username={this.props.username} />
    </Provider>);
  }
}

AppComponent.propTypes = {
  username: React.PropTypes.string
};

export default AppComponent;
