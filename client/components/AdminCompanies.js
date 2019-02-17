import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminSideBar from './AdminSideBar'
import store, { fetchAllUsers } from '../store'
import users from '../store/users';




const AdminCompanies = (props) => {
  const companies = props.companies

  return (
    <div id="completed-projects-container">
      <div className='sidebar-container'>
        <AdminSideBar />
      </div>
      <div>
        {
          companies.length > 0
          ?

          companies.map(company => {
            return (
              <div key={company.id}>
              {company.name}
              </div>
            )
          })
          :
          null
        }


        </div>

    </div>
  )
}


const mapState = state => {
  return {
    companies: state.companies
  }
}


const mapDispatch = { fetchAllUsers }


const AdminCompaniesContainer = connect(mapState, mapDispatch)(AdminCompanies)

export default AdminCompaniesContainer
