import { ConnectProps, ConnectState, UserModelState } from '@/models/connect.d';
import React, { useEffect } from 'react';
import { connect } from 'umi';
import Header from './Header/index';
import MyList from './MyList';
import Logout from './Logout';

interface UserProps extends ConnectProps {
  user: UserModelState;
  queryDetail: Function;
  logout: Function;
}

const User: React.FC<UserProps> = ({ queryDetail, user, logout }) => {
  useEffect(() => {
    queryDetail && queryDetail();
  }, []);

  const { name, icon } = user.detail;
  return (
    <div>
      <Header name={name} icon={icon} />
      <MyList />
      <Logout logout={logout} />
    </div>
  );
};

const mapStateToProps = ({ user }: ConnectState) => ({
  user,
});

const mapDispatchToProps = {
  queryDetail: () => ({ type: 'user/queryDetail' }),
  logout: () => ({ type: 'user/logout' }),
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
