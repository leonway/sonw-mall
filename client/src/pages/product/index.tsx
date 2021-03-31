import React, { Component } from 'react';
import styles from './index.less';
import { IRoute } from 'umi';
import { query } from '@/services/product';
import { ProductType } from '@/@types/product';
import Carousel from './Carousel';
import { Card, WhiteSpace } from 'antd-mobile';
import Tags from '@/components/Tags';
import classNames from 'classnames';
import CartAndBuy from './CartAndBuy';

export default class Product extends Component<IRoute, {}> {
  state: ProductType = {
    imgs: [],
    price: 0,
    title: '',
    tags: [],
    id: '',
  };

  componentDidMount() {
    //获取商品详情
    const { id } = this.props.match.params;
    query({ id }).then((res) => {
      this.setState({ ...res.data });
    });
  }

  render() {
    const { imgs, price, title, tags } = this.state;
    return (
      <div className={styles.main}>
        <Carousel data={imgs} />
        <WhiteSpace size="lg" />
        <Card full>
          <p className={classNames('red', 'bold')}>￥{price}</p>
          <p className="font14">{title}</p>
          <Tags tags={tags} />
        </Card>
        <CartAndBuy product={{ ...this.state }} />
      </div>
    );
  }
}
