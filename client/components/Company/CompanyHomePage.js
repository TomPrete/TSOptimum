import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

const CompaniesHomePage = props => {
  console.log("HERE")
  return (
    <div>
      HERE
      <div>
      CompaniesHomePage
      </div>
    </div>
  );
};

// CompaniesHomePage.propTypes = {

// };

const mapDispatch = {}

const CompaniesHomePageContainer = connect(null, mapDispatch)(CompaniesHomePage)

export default CompaniesHomePageContainer;
