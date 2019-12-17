import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button';


const DefaultModal = (props) => {
  const { data, userId, message, header, handleClose, handleClick } = props
  return (
    <div>
      <Modal
        id='default-modal'
        open={props.open}
        onClose={props.showModal}
      >
        <div className='delete-modal'>
          <div >
            <div className='alert-message'>
              {header}
            </div>
            <div className="delete-user-message">
              {message}
            </div>
          </div>
          <div className='delete-user-buttons'>
            <Button color='secondary' className='delete-button' onClick={handleClick(data, userId)}>YES</Button>
            <Button color='primary' className='primary-button' onClick={handleClose}>NO</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DefaultModal
