import React, {Component} from 'react';
import { FormBtn } from "../../components/Form";
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";

class Home extends Component {
  
  isMobile = () => {
    if(window.innerWidth<=800 && window.innerHeight<=600){
      return true
    }
    else{
      return false
    }
  }

render(){
  return(
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
        {
          this.isMobile() ? (
            <FormBtn
              className="btn btn-success"
              role="button"
              to="/start"
            >
              PLAY
            </FormBtn>) : "" }
      </form>
    </Wrapper>
  )}
}

export default Home;