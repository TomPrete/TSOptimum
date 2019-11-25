import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components'

const CircularLoading = () => {
  return (
    <Loading>
      <CircularProgress />
    </Loading>
  );
};

const Loading = styled.div`
  text-align: center;
  margin: 25px
`

export default CircularLoading;
