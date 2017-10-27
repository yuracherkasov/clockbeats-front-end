import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';

class Carousel extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="home-carousel-wrapper">
        <div className="carousel-item" style={{ backgroundImage: "url('/assets/images/home/hero-bg-01.jpg')" }}>
          <div className="carousel-table">
            <div className="carousel-bg">
              <div className="carousel-content">
                <h2 className="carousel-heading">
                  Welcome to Clockbeats
                  <div className="carousel-heading-text">Ready to break the sound barriers?</div> 
                </h2>
                <a href="" className="carousel-button">
                  <i className="fa fa-fw fa-arrow-down" />
                  Learn more
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel