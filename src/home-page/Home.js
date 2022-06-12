import React, { Component } from 'react';
import UserTest from './UserTest';
// import NLSubscribe from './NLSubscribe';
import Paneuretic from '../paneuretic-component/Paneuretic';

class Home extends Component {
  render() {
    return (
      <div>
        <div>Home</div>
        <UserTest />
        {/* <NLSubscribe /> */}
        <Paneuretic />
      </div>
    );
  }
}

export default Home;
