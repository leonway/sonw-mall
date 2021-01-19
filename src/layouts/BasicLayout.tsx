import React, { useEffect } from 'react';
import BottomNav from '@/components/BottomNav';
import { Location, connect } from 'umi';
import { UserModelState } from '@/models/user';
import s from './BasicLayout.less';
import { ConnectState } from '@/models/connect.d';

interface BasicLayoutProps {
  location: Location;
  fetchCurrent: Function;
}

const BasicLayout: React.FC<BasicLayoutProps> = (componentProps) => {
  const { children, location, fetchCurrent } = componentProps;
  console.log(componentProps);

  useEffect(() => {
    fetchCurrent && fetchCurrent();
  }, []);

  return (
    <div className={s.main}>
      <article>{children}</article>
      <footer>
        <BottomNav pathname={location.pathname} />
      </footer>
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({ user }), {
  fetchCurrent: () => ({ type: 'user/fetchCurrent' }),
})(BasicLayout);
