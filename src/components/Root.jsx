import React from 'react';
import UserSocialScore from './UserSocialScore';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Root = props => (
  <section>
    <div>
      {'Social Coding Score for '}
      <a href={'https://github.com/' + props.username}
          target="_blank"
          rel="noopener noreferrer"
      >
        {props.username}
      </a>
    </div>

    { props.repos && props.repos.get('fetching') ? 'loading...' : '' }
    { props.repos && props.repos.get('fetchError') ? props.repos.get('fetchError').message : (
        props.repos && props.repos.get('totals')
          ? <UserSocialScore
              totals={props.repos.get('totals')}
            />
          : 'no repo totals loaded yet'
      )
    }

  </section>
);

Root.propTypes = {
  onUserQueryChanged: React.PropTypes.func,
  repos: ImmutablePropTypes.contains({
    fetching: React.PropTypes.bool,
    fetchError: React.PropTypes.error,
    totals: ImmutablePropTypes.contains({
      stars: React.PropTypes.number.isRequired,
      forks: React.PropTypes.number.isRequired
    })
  }),
  username: React.PropTypes.string
};

export default Root;
