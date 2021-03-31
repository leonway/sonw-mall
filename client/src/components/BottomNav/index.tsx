import React, { Component } from 'react';
import { TabBar, Icon } from 'antd-mobile';
import { history } from 'umi';

const menu = [
  {
    title: '首页',
    link: '/',
    icon: 'iconshouye',
  },
  {
    title: '购物车',
    link: '/cart',
    icon: 'iconqicheqianlian-',
  },
  {
    title: '订单列表',
    link: '/olist',
    icon: 'icondingdanliebiao',
  },
  {
    title: '我的',
    link: '/user',
    icon: 'iconwode',
  },
];

interface BottomNavProps {
  pathname: string;
}
export default class index extends Component<BottomNavProps> {
  render() {
    const { pathname } = this.props;
    return (
      <TabBar tintColor="#ff7800">
        {menu.map(({ link, icon, title }) => (
          <TabBar.Item
            key="link"
            title={title}
            icon={<Icon type={icon} size="xs" />}
            onPress={() => {
              history.push(link);
            }}
            selectedIcon={<Icon type={icon} size="xs" color="#ff7800" />}
            selected={pathname === link}
          />
        ))}
      </TabBar>
    );
  }
}
