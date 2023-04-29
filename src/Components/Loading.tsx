import React from 'react'
import Spinner from "react-bootstrap/Spinner";
import styled from 'styled-components';


const Loading = () => {
  return (
    <Loader>
      <div className="spinner">
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="primary" />
      </div>
    </Loader>
  );
}
 const Loader = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:4rem 0;
    .spinner{
        display:flex;
        gap:2rem;
    }
 `
export default Loading