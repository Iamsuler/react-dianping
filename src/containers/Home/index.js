import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from './components/Header'
import Category from './components/Category'
import Headline from './components/Headline'
import Discount from './components/Discount'
import LikeList from './components/LikeList'
import Banner from './components/Banner'
import Activity from './components/Activity'

import { actions as homeActions, getDiscounts, getLikes, getLikesPageCount, getLikesIsFetching } from '../../redux/modules/home'

class Home extends Component {
  fetchLikes = () => {
    this.props.homeActions.fetchLikes()
  }

  componentDidMount () {
    this.props.homeActions.fetchDiscounts()
  }

  render() {
    const { discounts, likes, pageCount, isFetchingLikes } = this.props
    return (
      <div>
        <Header />
        <Banner />
        <Category />
        <Headline />
        <Activity />
        <Discount data={ discounts } />
        <LikeList
          data={ likes }
          pageCount={ pageCount }
          isFetchingLikes={ isFetchingLikes }
          fetchLikes={ this.fetchLikes }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  likes: getLikes(state),
  discounts: getDiscounts(state),
  pageCount: getLikesPageCount(state),
  isFetchingLikes: getLikesIsFetching(state)
})

const mapDispatchToProps = (dispatch) => ({
  homeActions: bindActionCreators(homeActions, dispatch)
})

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer;
