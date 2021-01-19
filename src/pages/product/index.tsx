import React, { Component } from 'react';
import styles from './index.less';

export default class Product extends Component<{}, {}> {
  state = {};

  componentDidMount() {
    //获取商品详情
  }

  render() {
    return <div className={styles.main}></div>;
  }
}
