import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'

const DefaultButton = ({label, disabled, c, data}) => {

  return (
    <ButtonContainer>
      <Button color='primary' variant='contained' className="" form="edit-project-form" type="submit" disabled={disabled} onClick={() => onSubmit(data)} >{label}</Button>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  padding: 10px
`

export default DefaultButton
