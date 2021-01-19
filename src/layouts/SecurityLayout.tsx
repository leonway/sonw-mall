import React, { useEffect } from 'react';
import { connect, Redirect } from 'umi';
import { ConnectState, ConnectProps, UserModelState } from '@/models/connect.d';

interface SecurityLayoutProps extends ConnectProps {
  user: UserModelState;
}

const SecurityLayout: React.FC<SecurityLayoutProps> = ({
  user,
  children,
  location,
}) => {
  const { userid } = user.currentUser;
  const hasLogin = !!userid;
  console.log(hasLogin);

  if (!hasLogin) {
    return (
      <Redirect
        to={{ pathname: '/login', state: { from: location.pathname } }}
      />
    );
  }
  return <div>{children}</div>;
};

const mapStateToProps = ({ user }: ConnectState) => ({
  user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SecurityLayout);
