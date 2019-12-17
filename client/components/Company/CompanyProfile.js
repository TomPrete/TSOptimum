import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button';

import SideBar from '../SideBar'
import DefaultModal from '../Modals/DefaultModal'
import store, { fetchCompany, removeFromPortfolio } from '../../store'

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
    setCompanyId(compId)
    store.dispatch(fetchCompany(compId))
  }, [])

  const showRemoveCompanyModal = () => {
    if (showDelete === true) {
      setShowDelete(false)
    } else {
      setShowDelete(true)
    }
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
          <Button onClick={showRemoveCompanyModal}>Remove From Portfolio</Button>
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
    company: state.company
  }
}

const mapDispatch = { fetchCompany, removeFromPortfolio }

const CompanyProfileContainter = connect(mapState, mapDispatch)(CompanyProfile)

export default CompanyProfileContainter;
