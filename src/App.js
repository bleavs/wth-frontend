import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'
import Profile from './components/Profile'
import LoginForm from './components/LoginForm'

var name;
var firstname;
var lastname;

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
      simpleMapLat: "",
      simpleMapLong: "",
      infoBox: false,
      joinBox: false,
      simpleMapSendName: ""


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
        searchedLat: latlng.lat,
        searchedLong: latlng.lng
      }, () => console.log(this.state))

    })

handleUsernameToApp = ((username) => {

  console.log(username)

  if (username.split(' ')[1]){
     firstname = username.split(' ')[0]
     lastname = username.split(' ')[1]

     name = `${firstname}%20${lastname}`

   }
   else {
     name = username
   }


  this.setState({

    sendname: name

  }, () => fetch(`http://localhost:3000/api/v1/users/${this.state.sendname}`)
    .then(res => res.json())
    .then(json => this.setState({
      currentUserRuns: json.runs
    }, () => console.log(this.state.currentUserRuns)))
  )

  fetch('http://localhost:3000/api/v1/runs')
    .then(res => res.json())
    .then(json => this.setState({
      allRuns: json
    }, () => console.log(this.state.allRuns)))

  }
  )



handleCreateRunSubmit = ((stuff) => {

  console.log(stuff)

  fetch('http://localhost:3000/api/v1/runs')
    .then(res => res.json())
    .then(json => this.setState({
      allRuns: json
    }, () => console.log(this.state.allRuns))).then( () => {

      fetch(`http://localhost:3000/api/v1/users/${this.state.sendname}`)
    .then(res => res.json())
    .then(json => this.setState({
      currentUserRuns: json.runs
    }, () => console.log(this.state.currentUserRuns))
  )

})

})

handleJoinRunSubmit = ((stuff) => {

  console.log(stuff)

  fetch('http://localhost:3000/api/v1/runs')
    .then(res => res.json())
    .then(json => this.setState({
      allRuns: json
    }, () => console.log(this.state.allRuns))).then( () => {

      fetch(`http://localhost:3000/api/v1/users/${this.state.sendname}`)
    .then(res => res.json())
    .then(json => this.setState({
      currentUserRuns: json.runs
    }, () => console.log(this.state.currentUserRuns))
  )

})

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

        currentUser={this.currentUser}

        username={this.state.username}
        currentUserRuns={this.state.currentUserRuns}
        runBox={this.state.runBox}
        sendname={this.state.sendname}

        allRuns={this.state.allRuns}
        userRuns={this.state.userRuns}
        userId={this.state.userId}
        simpleMapLat={this.state.simpleMapLat}
        simpleMapLong={this.state.simpleMapLong}
        infoBox={this.state.infoBox}
        joinBox={this.state.joinBox}
        simpleMapSendName={this.state.simpleMapSendName}

        handleUsernameToApp={this.handleUsernameToApp}

        handleCreateRunSubmit={this.handleCreateRunSubmit}

        handleJoinRunSubmit={this.handleJoinRunSubmit}




        />} />

      <Route exact path="/login" component={LoginForm} />
    </div>
  )
}
}

export default App;
