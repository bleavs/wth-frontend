import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'
import Profile from './components/Profile'
import LoginForm from './components/LoginForm'
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      latitude: "",
      longitude: ""
    }

  }



  componentDidMount() {

    this.watchID = navigator.geolocation.watchPosition((position) => {

    //It’s got a GPS location, so save to to the state to feed through your components

    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, () => console.log(this.state))

  })
}



  render() {
  return (
    <div>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/login" component={LoginForm} />
    </div>
  )
}
}

export default App;
