import React, { Component } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './style.css'
import { dataSource } from './dataSource'

class Category extends Component {
  render() {
    const settings = {
      dots: true,
      arrow: false,
      slidesToShow: 1,
      swipeToSlide: true,
      autoplay: true
    }
    return (
      <div>
        <Slider {...settings}>
          {
            dataSource.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {
                  section.map((item, index) => (
                    <div
                      className="category__section"
                      key={index}
                    >
                      <img
                        className="category__icon"
                        src={item.src}
                        alt="加载图片"
                      />
                      <div>
                        <span className="category__text">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </Slider>
      </div>
    )
  }
}

export default Category;
