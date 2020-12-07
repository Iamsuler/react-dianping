import React, { Component } from 'react'

import SearchBox from './components/SearchBox'
import PopularSearch from './components/PopularSearch'
import SearchHistory from './components/SearchHistory'

class Search extends Component {
  onCancel = () => {
    this.props.history.goBack()
  }

  render() {
    const relatedKeywords = []
    const historys = []
    const populars = []
    return (
      <div>
        <SearchBox relatedKeywords={ relatedKeywords } onCancel={ this.onCancel } />
        <PopularSearch  data={ populars } />
        <SearchHistory data={ historys } />
      </div>
    );
  }
}

export default Search;