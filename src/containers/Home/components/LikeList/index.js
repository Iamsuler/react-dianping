import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loading from '@/components/Loading'
import LikeListItem from '../LikeListItem'

import './style.css'

class LikeList extends Component {
  constructor (props) {
    super(props)

    this.myRef = React.createRef()
  }

  handleScroll = () => {
    // LikeList组件首页可视高度 = 当前窗口高度 - LikeList组件offsetTop
    const visibleHeight =
    document.documentElement.clientHeight - this.myRef.current.offsetTop
    // LikeList组件实际高度
    const actualHeight = this.myRef.current.offsetHeight
    // 滚动高度
    const scrollHeight = document.documentElement.scrollTop
    // 可视高度 + 滚动高度 >= LikeList组件实际高度时就加载
    if (scrollHeight + visibleHeight >= actualHeight && !this.props.isFetchingLikes) {
      this.props.fetchLikes()
    }
  }

  componentDidMount () {
    this.props.fetchLikes()
    document.addEventListener('scroll', this.handleScroll)
  }
  componentDidUpdate () {
    if (this.props.pageCount > 3) {
      document.removeEventListener('scroll', this.handleScroll)
    }
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { data, pageCount } = this.props
    return (
      <div className="likeList" ref={this.myRef}>
        <div className="likeList__header">猜你喜欢</div>
        <div className="likeList__list">
          {
            data.map((item, index) => (
              <LikeListItem key={index} id={item.id} data={item} />
            ))
          }
          {
            pageCount < 3 ? <Loading /> : <Link to="/more" className="likeList__viewAll">查看更多</Link>
          }
        </div>
      </div>
    );
  }
}

export default LikeList
