import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewUser } from '../store';



class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      title: "",
      password: "",
      confirmPassword: "",
      passwordsMatch: false,
      redirect: false,
    }

    this.inputFirstName = this.inputFirstName.bind(this);
    this.inputLastName = this.inputLastName.bind(this);
    this.inputEmail = this.inputEmail.bind(this);
    this.inputTitle = this.inputTitle.bind(this);
    this.inputPassword = this.inputPassword.bind(this);
    this.inputConfirmPassword = this.inputConfirmPassword.bind(this);
    // this.validatePassword = this.validatePassword.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
  };

  inputFirstName(e) {
    this.setState({
      firstName: e.target.value
    })
  }

  inputLastName(e) {
    this.setState({
      lastName: e.target.value
    })
  }

  inputEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  inputTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  inputPassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  inputConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    })
  }

  // validatePassword() {
  //   if (this.state.password === this.state.confirmPassword) {
  //     this.setState({
  //       passwordsMatch: true,
  //     })
  //   }
  // }

  handleSignupSubmit(e) {
    e.preventDefault()
    if (this.state.password === this.state.confirmPassword) {
      this.props.submitUser(this.state.firstName, this.state.lastName, this.state.email, this.state.title, this.state.password)
    }
  }


  render() {
    { console.log("STATE: ", this.state) }
    return (
      <div>
        <h1>You're just seconds away from Accelerating your work!</h1>
        <div id='signup-form-panel'>
          <form onSubmit={this.handleSignupSubmit} id='signup-form'>
            <div>
              <input className="name-input" value={this.state.firstName} onChange={this.inputFirstName} type="text" placeholder="First Name" required />
              <input className="name-input" value={this.state.lastName} onChange={this.inputLastName} type="text" placeholder="Last Name" required />
            </div>
            <div>
              <input className="input" value={this.state.email} onChange={this.inputEmail} type="text" placeholder="name@company.com" required />
            </div>
            <div>
              <input className="password input" value={this.state.password} onChange={this.inputPassword} type="password" placeholder="Enter Password" required />
            </div>
            <div>
              <input className="confirmPassword input" value={this.state.confirmPassword} onChange={this.inputConfirmPassword} type="password" placeholder="Confirm Password" required />
              {
                this.state.confirmPassword.length > 0 && this.state.password !== this.state.confirmPassword ? <p>Passwords must match</p> : null
              }
            </div>
            <label >Please select your title below.</label>
            <div>
              <select onChange={this.inputTitle} className="title-input" required>
                <option>Select...</option>
                <option value="Treasury Solutions Analyst">Treasury Solutions Analyst</option>
                <option value="Treasury Solutions Officer">Treasury Solutions Officer</option>
                <option value="Treasury Manager">Treasury Manager</option>
              </select>
            </div>
            <button className="signup-button" type='submit'>Sign Up!</button>
          </form>
        </div>
        <div className="form-submit">
          <p id="route-to-login">Have an account? <Link to="/login" className="component-link">Log in here</Link></p>
        </div>
      </div>
    )
  };
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitUser: (firstName, lastName, email, title, password) => {
      dispatch(addNewUser(firstName, lastName, email, title, password))
    }
  }
}

const AddNewUserContainer = connect(mapStateToProps, mapDispatchToProps)(Signup)

export default AddNewUserContainer

