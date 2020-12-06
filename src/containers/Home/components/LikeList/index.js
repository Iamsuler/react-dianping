import React, { Component } from 'react'
import LikeListItem from '../LikeListItem'
import { get } from '@/utils/request'
import { getProdustcList } from '@/utils/url'

import './style.css'

class LikeList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      likeList: []
    }
  }

  componentDidMount () {
    get(getProdustcList(1, 10)).then(response => {
      const { success, data } = response
      if (success) {
        this.setState({
          likeList: data.list
        })
      }
    })
  }
  render() {
    const { likeList } = this.state
    return (
      <div className="likeList" ref={this.myRef}>
        <div className="likeList__header">猜你喜欢</div>
        <div className="likeList__list">
          {
            likeList.map((item, index) => (
              <LikeListItem key={index} id={item.id} data={item} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default LikeList
