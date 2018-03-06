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
      redirect: false
    }

    this.inputFirstName = this.inputFirstName.bind(this);
    this.inputLastName = this.inputLastName.bind(this);
    this.inputEmail = this.inputEmail.bind(this);
    this.inputTitle = this.inputTitle.bind(this);
    this.inputPassword = this.inputPassword.bind(this);
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

  handleSignupSubmit(e) {
    e.preventDefault()
    this.props.submitUser(this.state.firstName, this.state.lastName, this.state.email, this.state.title, this.state.password)
  }


  render() {
    { console.log("STATE: ", this.state) }
    return (
      <div>
        <h1>You're just seconds away from Accelerating your work!</h1>
        <form onSubmit={this.handleSignupSubmit}>
          <input value={this.state.firstName} onChange={this.inputFirstName} type="text" placeholder="First Name" />
          <input value={this.state.lastName} onChange={this.inputLastName} type="text" placeholder="Last Name" />
          <input value={this.state.email} onChange={this.inputEmail} type="text" placeholder="name@company.com" />
          <input value={this.state.password} onChange={this.inputPassword} type="password" placeholder="Enter Password" />
          <label >Please select your title below.</label>
          <select onChange={this.inputTitle}>
            <option>Select...</option>
            <option value="Treasury Solutions Analyst">Treasury Solutions Analyst</option>
            <option value="Treasury Solutions Officer">Treasury Solutions Officer</option>
            <option value="Treasury Manager">Treasury Manager</option>
          </select>
          <button className="submit-button" type='submit'>Sign Up!</button>
        </form>
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

