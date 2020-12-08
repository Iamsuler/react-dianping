import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getHistoryKeywords, getInputText, getPopularKeywords, getRelatedKeywords, actions as searchActions } from '../../redux/modules/search'
import SearchBox from './components/SearchBox'
import PopularSearch from './components/PopularSearch'
import SearchHistory from './components/SearchHistory'

class Search extends Component {
  onCancel = () => {
    this.props.searchActions.clearInputText()
    this.props.history.goBack()
  }

  handleClickItem = (item) => {
    const { id, keyword } = item
    this.props.searchActions.addHistoryKeyword(id)
    this.handleSetInputText(keyword)
  }

  handleClearHistory = () => {
    this.props.searchActions.clearHistoryKeywords()
  }

  handleClearInputText = () => {
    this.props.searchActions.clearInputText()
  }

  handleSetInputText = (text) => {
    this.props.searchActions.setInputText(text)
    this.props.searchActions.fetcheRelatedKeywords(text)
  }

  componentDidMount () {
    this.props.searchActions.fetchePopularKeywords()
  }

  render() {
    const {
      historyKeywords,
      relatedKeywords,
      inputText,
      popularKeywords,
    } = this.props
    return (
      <div>
        <SearchBox
          inputText={ inputText }
          relatedKeywords={ relatedKeywords }
          onCancel={ this.onCancel }
          setInputText={ this.handleSetInputText }
          clearInputText={ this.handleClearInputText }
        />
        <PopularSearch
          data={ popularKeywords }
          handleClickItem={ this.handleClickItem }
        />
        <SearchHistory
          data={ historyKeywords }
          clearHistoryKeywords={ this.handleClearHistory }
          handleClickItem={ this.handleClickItem }
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  historyKeywords: getHistoryKeywords(state),
  relatedKeywords: getRelatedKeywords(state),
  inputText: getInputText(state),
  popularKeywords: getPopularKeywords(state)
})

const mapDispatchToProps = (dispatch) => ({
  searchActions: bindActionCreators(searchActions, dispatch)
})

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)

export default SearchContainer
