import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import AsyncSelect from 'react-select/lib/Async';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import DefaultButton from '../Buttons/DefaultButton'
import SideBar from '../SideBar'
import store, { fetchUserPortfolio, addToUserPortfolio } from '../../store'
// import { linkToCompany } from './helperFunctions'


class MyPortfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      company: null
    }
  }

  componentDidMount() {
    let id = this.props.user.id
    store.dispatch(fetchUserPortfolio(id, this.props.user))
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
      company: option.value
    });
  }

  onFormSubmit = (company) => {
    store.dispatch(addToUserPortfolio(company, this.props.user))
  }

  onEnterSubmit = (evt) => {
    evt.preventDefault()
    store.dispatch(addToUserPortfolio(this.state.company, this.props.user))
  }


  render() {
    console.log("STATE: ", this.state.company)
    return (
      <MainContainer>
        <div className='sidebar-container'>
          <SideBar />
        </div>
        <PortfolioContainer>
          <CompanySearch>
            <form onSubmit={this.onEnterSubmit}>
              <p>Search Companies</p>
              <AsyncSelect
                name="companyName"
                loadOptions={this.loadOptions}
                placeholder='Search Companies...'
                cacheOptions
                onChange={this.handlePortfolioChange}
              />
              <DefaultButton label='Add to Portfolio' disabled={!this.state.company} onSubmit={() => this.onFormSubmit(this.state.company)} data={this.state.company} />
            </form>
          </CompanySearch>
          <Paper>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell className="column-titles">ID</TableCell>
                  <TableCell className="column-titles">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.props.portfolio.length
                  ?
                  this.props.portfolio.map(elem => {
                    return (
                      <TableRow key={elem.id} className='company-row' onClick={() => this.props.history.push(`/${elem.companyId}`)}>
                        <TableCell>{elem.companyId}</TableCell>
                        <TableCell>{elem.name}</TableCell>
                      </TableRow>
                    )
                  })
                  :
                  null
                }
              </TableBody>
            </Table>
          </Paper>
        </PortfolioContainer>
      </MainContainer>
    );
  };
}

const MainContainer = styled.div`
  display: flex;
  text-align: center;
  max-height: 100%
`

const CompanySearch = styled.div`
  font-size: 16px;
  color: rgb(93, 93, 94);
  outline: none;
  width: 100%;
  transition: border 0.15s ease-in-out;
`

const PortfolioContainer = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 3px;
  padding: 10px;

`

const mapState = state => {
  return {
    user: state.user,
    teamMates: state.teamMates,
    companies: state.companies,
    projects: state.projects,
    portfolio: state.portfolio
  }
}

const mapDispatch = { fetchUserPortfolio, addToUserPortfolio }

const MyPortfolioContainter = connect(mapState, mapDispatch)(MyPortfolio)

export default MyPortfolioContainter;
