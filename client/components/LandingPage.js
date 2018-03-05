import React, { Component } from 'react'
// import LandingVideo from './landingVideo.js'
// import {Parallax} from 'react-parallax'
import { Login, Signup } from './index'
// import {NavLink} from 'react-router-dom'

let LandingPage = () => {

  return (
    <div className='landing-page'>
      <div id='cover-text'>
        <h1 id='cover-title'>ACCELERATE YOUR WORK</h1>
        <p id='cover-subtitle'>organize | measure | improve</p>
      </div>
      <img src='/img/img-home-business-2.jpg' id='cover-image' />
      <div className='page-center'>
        <div className='page-center-title'>
          <h2 className='page-center-top-title'>Organize your tasks and projects with us</h2>
          <p className='page-center-content'>hone lets you organize, prioritize, and measure your tasks and projects while keeping you up to date on what's due</p>
        </div>
        <div className='page-center-row'>
          <div>
            <h2>organize</h2>
            <p className='page-center-content'>text</p>
          </div>
          <div>
            <h2>measure</h2>
            <p className='page-center-content'>text</p>
          </div>
          <div>
            <h2>improve</h2>
            <p className='page-center-content'>text</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
