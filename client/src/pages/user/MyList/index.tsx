import React, { useEffect } from 'react';
import { Link } from 'umi';
import classnames from 'classnames';
import s from './index.less';
import { Card, WingBlank, Icon } from 'antd-mobile';

const grids = [
  {
    icon: 'iconqiabao',
    text: '卡包',
    to: '/olist',
  },
  {
    icon: 'iconfahuo',
    text: '待发货',
    to: '/olist',
  },

  {
    icon: 'iconmdaishouhuo',
    text: '待收货',
    to: '/olist',
  },
  {
    icon: 'icondaifukuan',
    text: '待付款',
    to: '/olist',
  },
];

const MyList = () => {
  return (
    <WingBlank size="lg" className={s.main}>
      <Card full>
        <Card.Header
          title="我的订单"
          extra={<Link to="/olist">查看全部订单</Link>}
          className={classnames(s.header, 'font12')}
        />

        <Card.Body>
          <div className={classnames(s.grids, 'xyCenter ', 'font12')}>
            {grids.map((item, index) => (
              <Link key={'link' + index} to={item.to} className={s.grid}>
                <Icon type={item.icon} size="xs" />
                <div>{item.text}</div>
              </Link>
            ))}
          </div>
        </Card.Body>
      </Card>
    </WingBlank>
  );
};

export default MyList;
