import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button';


const DefaultModal = (props) => {
  console.log("PROPS: ", props)
  return (
    <div>
      <Modal
        id='default-modal'
        open={props.open}
        onClose={props.showModal}
      >
        <div className='delete-modal'>
          Default Modal
          <Button onClick={props.removeFromPortfolio()}>Yes</Button>
          <Button onClick={props.showModal}>No</Button>
        </div>
      </Modal>
    </div>
  )
}

export default DefaultModal
