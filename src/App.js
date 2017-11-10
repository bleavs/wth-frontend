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
      currentUser: "",

      username: "",
      currentUserRuns: [],
      runBox: false,
      sendname: "",

      allRuns: [],
      userRuns: [],
      userId: "",
      simpleMap: ""


    }

  }

  //what other state should be passed up?

  // on submission of a create run or join run -- the App state should know the new allruns + userruns to display

  // App should then pass down those allruns + userruns down to childComponents and they should then rerender the viewruns list as well as the display of the map

  // should filter states for the viewruns list also be at app-level? -- possibly
      // the view runs components and the map component both need to be aware of those changes so it makes sense that it's parent would need to pass that down

  componentDidMount() {

    this.watchID = navigator.geolocation.watchPosition((position) => {

    //It’s got a GPS location, so save to to the state to feed through your components
    //currently setting geolat + geolong as same thing as latitude and longitude -- look into this reasoning - does it make sense

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

      // this overrides latitude and longitude-- to the searched address- which changes what the map shows -- but also sets a searchedLat + searched Long

      this.setState({
        latitude: latlng.lat ,
        longitude: latlng.lng,
        searchedLat: latlng.lat ,
        searchedLong: latlng.lng
      }, () => console.log(this.state))

    })




  render() {
  return (
    <div style={{background: '#339966'}}>

      <NavLink to="/login">Login</NavLink>
      <NavLink to="/profile">Profile</NavLink>

      <Route exact path="/profile" render={()=><Profile
        latitude={this.state.latitude}
        longitude={this.state.longitude}
        searchedLat={this.state.searchedLat}
        searchedLong={this.state.searchedLong}
        searchLocation={this.searchLocation}
        geoLat={this.state.geolat}
        geoLong={this.state.geolong}
        currentUser={this.currentUser}/>} />

      <Route exact path="/login" component={LoginForm} />
    </div>
  )
}
}

export default App;
