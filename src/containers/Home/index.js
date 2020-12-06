import React, { Component } from 'react'
import Header from './components/Header'
import Category from './components/Category'
import Headline from './components/Headline'
import Discount from './components/Discount'
import LikeList from './components/LikeList'
import Banner from './components/Banner'
import Activity from './components/Activity'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Banner />
        <Category />
        <Headline />
        <Activity />
        <Discount />
        <LikeList />
      </div>
    );
  }
}

export default Home;
