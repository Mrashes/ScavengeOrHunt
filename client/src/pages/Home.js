import React from 'react';
import { FormBtn } from "../components/Form";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
// import "./Home.css";

const Home = () => 
  <Wrapper>
    <Header>
      <div>Scavenge</div>
      <div> ~ </div>
      <div>Or</div>
      <div> ~ </div>
      <div>Hunt</div>
    </Header>
    <form>
      <FormBtn
        className="btn btn-success"
        role="button"
        to="/create"
      >
        CREATE
      </FormBtn>

      <FormBtn
        className="btn btn-success"
        role="button"
        to="/start"
      >
        PLAY
      </FormBtn>
    </form>
  </Wrapper>;

export default Home;