import React, { Component } from 'react'
import './OrderItem.css'

class OrderItem extends Component {
  handleCommentChange = e => {
    this.props.onCommentChange(e.target.value)
  }

  renderStars = () => {
    const { stars, onStarsChange } = this.props
    return (
      <div>
        {
          [1, 2, 3, 4, 5].map((item, index) => {
            const lightClass = stars >= item ? 'orderItem__star--light' : ''
            return (
              <span
                className={'orderItem__star ' + lightClass}
                key={index}
                onClick={onStarsChange.bind(this, item)}
              >★</span>
            )
          })
        }
      </div>
    )
  }

  renderCommentArea = () => {
    const {
      comment,
      onCancelComment,
      onSubmitComment
    } = this.props
    return (
      <div className="orderItem__commentContainer">
        <textarea
          className="orderItem__comment"
          onChange={this.handleCommentChange}
          value={comment}
        />
        { this.renderStars() }
        <button
          className="orderItem__commentBtn"
          onClick={onSubmitComment}
        >提交</button>
        <button
          className="orderItem__commentBtn"
          onClick={onCancelComment}
        >取消</button>
      </div>
    )
  }

  render() {
    const {
      title,
      statusText,
      orderPicUrl,
      channel,
      text,
      type,
      commentId
    } = this.props.data
    const { onComment, onRemove, isCommenting } = this.props
    return (
      <div className="orderItem">
        <div className="orderItem__title">
          <span>{title}</span>
        </div>
        <div className="orderItem__main">
          <div className="orderItem__imgWrapper">
            <div className="orderItem__tag">{statusText}</div>
            <img
              alt=""
              className="orderItem__img"
              src={orderPicUrl}
            />
          </div>
          <div className="orderItem__content">
            <div className="orderItem__line">{text ? text[0] : ''}</div>
            <div className="orderItem__line">{text ? text[0] : ''}</div>
          </div>
        </div>
        <div className="orderItem__bottom">
          <div className="orderItem__type">{channel}</div>
          <div>
            {
              type === 1 && !commentId
                ? (
                    <div
                      className="orderItem__btn"
                      onClick={onComment}
                    >评价</div>
                  )
                : null
            }
            <div
              className="orderItem__btn"
              onClick={ onRemove }
            >删除</div>
          </div>
        </div>
        {
          isCommenting ? this.renderCommentArea() : null
        }
      </div>
    );
  }
}

export default OrderItem