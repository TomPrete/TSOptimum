import React, { Component } from 'react'
// import LandingVideo from './landingVideo.js'
// import {Parallax} from 'react-parallax'
import { Login, Signup } from './index'
// import {NavLink} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


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
          <Card className="landing-card">
            <CardHeader title="Organize" />
            <CardMedia image="/img/organize.png" />
            <CardContent>
              <Typography component="h1">
                Create and assign projects based on project type and manage your project details over time.
              </Typography>
            </CardContent>
          </Card>
          <Card className="landing-card">
            <CardHeader title="Measure" />
            <CardMedia image="/img/measure.png" />
            <CardContent>
              <Typography component="h1">
                Visualize and track your projects to see what's going on in your world.
              </Typography>
            </CardContent>
          </Card>
          <Card className="landing-card">
            <CardHeader title="Improve" />
            <CardMedia image="/img/improve.png" />
            <CardContent>
              <Typography component="h1">
                Analyze how you manage projects overtime to improve your business.
              </Typography>
            </CardContent>
          </Card>
        </div>

      </div>
      <div className="footer">
        THIS IS THE div
      </div>
    </div>
  )
}

export default LandingPage
