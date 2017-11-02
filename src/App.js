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

const App = () => {
  return (
    <div>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/login" component={LoginForm} />
    </div>
  )
}

export default App;
