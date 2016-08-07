import React from 'react';
import { connect } from 'react-redux';
import { usernameChanged } from '../actions';
import Root from '../components/Root';

class App extends React.Component {

  componentDidMount() {
    if (this.props.username) {
      this.props.onUsernameChanged(this.props.username);
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.username !== this.props.username) {
      this.props.onUsernameChanged(nextProps.username);
    }
  }

  render() {
    const props = this.props;
    return (<Root {...props} />);
  }

};

App.propTypes = {
  onUsernameChanged: React.PropTypes.func,
  username: React.PropTypes.string
};

const mapStateToProps = state => ({
  repos: state.get('repos')
});

export default connect(
  mapStateToProps,
  {
    // onUserQueryChanged: e => userQueryChanged(e.target.value),
    onUsernameChanged: value => usernameChanged(value)
  }
)(App);
