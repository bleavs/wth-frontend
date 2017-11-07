import React from 'react'
import { connect } from 'react-redux'

import CreateRunModal from './CreateRunModal'

import SimpleMap from './MyMapComponent'
import SimpleForm from './SearchLocation'
import ViewRuns from './ViewRuns'


const Profile = (props) => {
  console.log(props)
  console.log(props.latitude)
  console.log(props.longitude)
  console.log(props.searchLocation)
  console.log(props.currentUser)



  return (
    <div>

      <h1>Hello, {props.username}</h1>

      <h1> Your Upcoming Runs: </h1>

        <ViewRuns username={props.username} />


      <CreateRunModal />

      <SimpleMap lat={props.latitude} long={props.longitude} searchedLat={props.searchedLat} searchedLong={props.searchedLong} />

      <SimpleForm searchLocation={props.searchLocation} />


    </div>
  )
}

// trying to render simple map- google map react -relative to user's current location

// then will have them set a pin by an autocomplete form (think another location) or self pinning visually -

    // this pin set will have a form -- to create a run instance --

        // a user will have many runs
              // runs will have a single leader(user is leader), or a herd -- think user_id
                  // runs can have many followers-- runners

                  // a herd can have many users-- may or may not have leader


// this is for getting state of Redux store  as props to show username from backend

const mapStateToProps = (state) => ({ username: state.usersReducer.username })

export default connect(mapStateToProps)(Profile)

//
