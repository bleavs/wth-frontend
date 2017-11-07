import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'
import Profile from './components/Profile'
import LoginForm from './components/LoginForm'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      geolat: "",
      geolong: "",
      searchedLat: "",
      searchedLong: "",
      currentUser: ""
    }

  }

  componentDidMount() {

    this.watchID = navigator.geolocation.watchPosition((position) => {

    //It’s got a GPS location, so save to to the state to feed through your components

    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      geolat: position.coords.latitude,
      geolong: position.coords.longitude
    }, () => console.log(this.state))

  })
}

  searchLocation = ((latlng) => {
      console.log(latlng)

      this.setState({
        latitude: latlng.lat ,
        longitude: latlng.lng,
        searchedLat: latlng.lat ,
        searchedLong: latlng.lng
      }, () => console.log(this.state))



    })



  render() {
  return (
    <div>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/profile">Profile</NavLink>

      <Route exact path="/profile" render={()=><Profile latitude={this.state.latitude} longitude={this.state.longitude} searchedLat={this.state.searchedLat} searchedLong={this.state.searchedLong} searchLocation={this.searchLocation} currentUser={this.currentUser}/>} />

      <Route exact path="/login" component={LoginForm} />
    </div>
  )
}
}

export default App;
