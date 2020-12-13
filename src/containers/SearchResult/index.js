import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import KeywordBox from './components/KeywordBox'
import SearchHeader from './components/SearchHeader'
import ShopList from './components/ShopList'

import { actions, getRelatedShops } from '../../redux/modules/search'

class SearchResult extends Component {
  constructor (props) {
    super(props)

    this.state = {
      keyword: ''
    }
  }
  handleSearch = () => {
    this.props.history.push({ pathname: '/search' })
  }

  componentDidMount () {
    const { search } = this.props.location
    const keyword = new URLSearchParams(search).get('keyword')
    this.setState({
      keyword
    })
    this.props.searchResultActions.fetchRelatedShops(keyword)
  }

  render() {
    const { keyword } = this.state
    const { relatedShops } = this.props
    return (
      <div>
        <SearchHeader
          onBack={ this.handleSearch }
          onSearch={ this.handleSearch }
        />
        <KeywordBox text={ keyword } />
        <ShopList data={ relatedShops } />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  relatedShops: getRelatedShops(state)
})

const mapDispatchToProps = (dispatch) => ({
  searchResultActions: bindActionCreators({ fetchRelatedShops: actions.fetchRelatedShops }, dispatch)
})

const SearchResultContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult)

export default SearchResultContainer;