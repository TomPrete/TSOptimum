import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button';

import { DefaultButton } from '../'
import SideBar from '../SideBar'
import DefaultModal from '../Modals/DefaultModal'
import store, { fetchCompany, removeFromPortfolio, fetchUserPortfolio, addToUserPortfolio } from '../../store'

// Class Component
// class CompanyProfile extends Component {
//   constructor(props) {
//     super(props);
//   }


//   componentDidMount() {
//     const pathName = location.pathname
//     const companyId = pathName.substr(pathName.length - 8)
//     console.log(companyId)
//     store.dispatch(fetchCompany(companyId))
//     console.log(this.props)
//   }

//   // shouldComponentUpdate(nextProps, nextState) {
//   //   console.log(nextProps.companies)
//   //   return false
//   // }

//   render() {
//     return (
//       <MainContainer>
//         <div className='sidebar-container'>
//           <SideBar />
//         </div>

//           {
//             this.props.company
//             &&
//             <span>
//               <div>
//                 {this.props.company.companyId}
//               </div>
//               <div>
//                 {this.props.company.name}
//               </div>
//               <Link to={'/my-portfolio'}>Back</Link>
//             </span>
//           }

//       </MainContainer>
//     );
//   }
// }

// Functional Component
const CompanyProfile = (props) => {
  const [companyId, setCompanyId] = useState(null)
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    const pathName = location.pathname
    const compId = pathName.substr(pathName.length - 8)
    const userId = props.user.id
    setCompanyId(compId)
    store.dispatch(fetchCompany(compId))
    store.dispatch(fetchUserPortfolio(userId, props.user))
  }, [])

  const showRemoveCompanyModal = () => {
    if (showDelete === true) {
      setShowDelete(false)
    } else {
      setShowDelete(true)
    }
  }

  const onButtonSubmit = (company) => {
    store.dispatch(addToUserPortfolio(company, props.user))
  }

  const companyInPortfolio = () => {
    let counter = 0;
    return props.portfolio.map((company, index) => {
      if (company.companyId === +companyId) {
        return <Button key={index} onClick={showRemoveCompanyModal}>Remove From Portfolio</Button>
      }
      counter++
      if (counter === props.portfolio.length) {
        return  <DefaultButton
                  key={index}
                  onSubmit={() => onButtonSubmit(props.company.name)}
                  label='Add to Portfolio'
                  data={props.company}
                  disabled={false}
                />
      }
    })
  }

  return (
    <MainContainer>
      <div className='sidebar-container'>
        <SideBar />
      </div>
      {
        props.company
        &&
        <span>
          <div>
            {props.company.companyId}
          </div>
          <div>
            {props.company.name}
          </div>
          <Link to={'/my-portfolio'}>Back</Link>
          {
            companyInPortfolio()
          }
        </span>
      }
      <DefaultModal
        open={showDelete}
        data={props.company.id}
        userId={props.user.id}
        header="ALERT"
        message={`Are you sure you want to remove ${props.company.name} from your portfolio?`}
        handleClose={showRemoveCompanyModal}
        handleClick={removeFromPortfolio}
      />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  text-align: center;
`

CompanyProfile.propTypes = {

};

const mapState = state => {
  return {
    user: state.user,
    companies: state.companies,
    company: state.company,
    portfolio: state.portfolio
  }
}

const mapDispatch = { fetchCompany, removeFromPortfolio, fetchUserPortfolio, addToUserPortfolio }

const CompanyProfileContainter = connect(mapState, mapDispatch)(CompanyProfile)

export default CompanyProfileContainter;
