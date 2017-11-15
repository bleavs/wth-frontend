import React from 'react'
import { connect } from 'react-redux'

import CreateRunModal from './CreateRunModal'

import SimpleMap from './MyMapComponent'
import SimpleForm from './SearchLocation'
import ViewRuns from './ViewRuns'
import {Container} from 'semantic-ui-react'


const Profile = (props) => {
  console.log(props)
  console.log(props.latitude)
  console.log(props.longitude)
  console.log(props.searchLocation)
  console.log(props.currentUser)
  console.log(props.geoLat)

  return (

    <div>

      <h1>Welcome Back to The Herd, {props.username}</h1>

      <div style={{float: 'left'}}>
        <CreateRunModal handleCreateRunSubmit={props.handleCreateRunSubmit} />
      </div>

      <div style={{float: 'right' }}>

        <SimpleForm
          searchLocation={props.searchLocation}
          />

      </div>



        <div style={{float: 'left'}}>
          <ViewRuns
            username={props.username}

            currentUserRuns={props.currentUserRuns}
            allRuns={props.allRuns}

            geoLat={props.geoLat}
            geoLong={props.geoLong}

            otherRuns={props.otherRuns}

            />
        </div>

        <div style={{display: 'block'}}>

          <div style={{float: 'right'}}>

            <SimpleMap
              lat={props.latitude}
              long={props.longitude}
              searchedLat={props.searchedLat}
              searchedLong={props.searchedLong}
              geoLat={props.geoLat}
              geoLong={props.geoLong}
              username={props.username}
              handleUsernameToApp={props.handleUsernameToApp}

              currentUserRuns={props.currentUserRuns}
              allRuns={props.allRuns}

              handleJoinRunSubmit={props.handleJoinRunSubmit}
              />

          </div>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />




      </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />



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
