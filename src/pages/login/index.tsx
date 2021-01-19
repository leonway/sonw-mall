import React, { useEffect } from 'react';
import { connect, Redirect } from 'umi';
import s from './index.less';
import { ConnectState, ConnectProps, UserModelState } from '@/models/connect.d';
import LoginForm from './LoginForm';
import { LoginParams } from '@/services/login';

interface LoginProps extends ConnectProps {
  user: UserModelState;
  login: Function;
}

const Login: React.FC<LoginProps> = ({ user, location, login }) => {
  const { userid } = user.currentUser;
  const hasLogin = !!userid;
  console.log(hasLogin);

  if (hasLogin) {
    const { from = '/' } = location.state || {};
    return <Redirect to={from} />;
  }
  const handleSubmit = (value: LoginParams) => {
    // dispatch login
    login(value);
  };
  return (
    <div className={s.main}>
      <div className={s.logo}></div>
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};

const mapStateToProps = ({ user }: ConnectState) => ({
  user,
});

const mapDispatchToProps = {
  login: (value: LoginParams) => ({ type: 'user/login', payload: value }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
