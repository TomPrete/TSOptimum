import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import AsyncSelect from 'react-select/lib/Async';
import { DefaultButton } from '../'
import Button from '@material-ui/core/Button';

import SideBar from '../SideBar'
import store, { fetchUserPortfolio, addToUserPortfolio } from '../../store'

class MyPortfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      multiValue: []
    }
  }

  filterCompanies = (companyName) => {
    return this.props.companies.filter(i =>
      i.label.toLowerCase().includes(companyName.toLowerCase())
    );
  };

  loadOptions = (companyName, callback) => {
    setTimeout(() => {
      callback(this.filterCompanies(companyName));
    }, 500);
  };

  handlePortfolioChange = (option) => {
    this.setState({
        multiValue: option
      });
  }



  onSubmit = (values) => {
    store.dispatch(addToUserPortfolio(values, this.props.user))
  }

  render() {
    return (
      <PortfolioContainer>
        <div className='sidebar-container'>
          <SideBar />
        </div>
          <CompanySearch>
          <form>
          <p>Search Companies</p>
          <AsyncSelect
            name="companyName"
            loadOptions={this.loadOptions}
            isMulti
            placeholder='Search Companies...'
            cacheOptions
            onChange={this.handlePortfolioChange}
          />
          <DefaultButton label='Add to Portfolio' disabled={!this.state.multiValue.length} onSubmit={() => this.onSubmit(this.state.multiValue)} data={this.state.multiValue} />
          </form>
          </CompanySearch>
      </PortfolioContainer>
    );
  };
}

const PortfolioContainer = styled.div`
  display: flex;
  text-align: center;
`

const CompanySearch = styled.div`
  margin: 3px;
  padding: 10px
  font-size: 14px;
  color: rgb(93, 93, 94);
  outline: none;
  width: 100%;
  transition: border 0.15s ease-in-out;
`

const mapState = state => {
  return {
    user: state.user,
    teamMates: state.teamMates,
    companies: state.companies,
    projects: state.projects
  }
}

const mapDispatch = { fetchUserPortfolio, addToUserPortfolio}

const MyPortfolioContainter = connect(mapState, mapDispatch)(MyPortfolio)

export default MyPortfolioContainter;
