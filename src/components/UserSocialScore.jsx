import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const UserSocialScore = props => (
  <div>
    <div>
      {'Stars: '}{ props.totals.get('stars') }
    </div>
    <div>
      {'Forks: '}{ props.totals.get('forks') }
    </div>
  </div>
);

UserSocialScore.propTypes = {
  totals: ImmutablePropTypes.contains({
    forks: React.PropTypes.number.isRequired,
    stars: React.PropTypes.number.isRequired
  })
};

export default UserSocialScore;
