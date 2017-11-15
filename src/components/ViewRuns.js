import React, { Component } from 'react';
import Moment from 'react-moment'
import { Checkbox } from 'semantic-ui-react'
import { Radio } from 'semantic-ui-react'


var name;
var firstname;
var lastname;


let divStyle = {
  border: '3px solid #666699',
  margin: 'auto',

  width:'45vw',
  height: '45vw',


  backgroundColor: 'white',
  color: 'black',




}

const RunBox = (props) => (


  <div >

    <p><b>Distance from Location:</b> {props.run.dist_from_location}</p>

    <p> <b>When:</b>
      <Moment calendar>
        {props.run.run_day}
      </Moment>
      (
      <Moment format="MMM Do, YY">
        {props.run.run_day}
      </Moment>
    )
    </p>

    <p><b>Expected Finish:</b>

      <Moment format="h:mm: a">
        {props.run.expected_end_time}
      </Moment>

    </p>


    <p><b>Name:</b> {props.run.name}</p>
    <p><b>Distance(Miles):</b> {props.run.distance}</p>
    <p><b>Description:</b> {props.run.description}</p>
    <p><b>Expected Pace:</b> {props.run.expected_pace}</p>


    <p> <b>Time til Run:</b>
      <Moment fromNow>
        {props.run.run_day}
      </Moment>
    </p>



  </div>
);


class ViewRuns extends Component {

  constructor(props){
    super(props);



    if (props.username.split(' ')[1]){
      firstname = props.username.split(' ')[0]
      lastname = props.username.split(' ')[1]

      name = `${firstname}%20${lastname}`

    }
    else {
      name = props.username
    }

    this.state = {
      currentUserRuns: [],
      runBox: false,
      sendname: name,
      allRuns: [],
      viewFilter: false,
      otherRuns: [],

      runsToDisplay: [],
      distanceFilter: false

    }

  }


  componentWillMount(){
    console.log(name)
    console.log(this.state.sendname)

    let name;

      fetch(`http://localhost:3000/api/v1/users/${this.state.sendname}`)
      .then(res => res.json())
      .then(json => this.setState({
        currentUserRuns: json.runs
      }, () => console.log(this.state.currentUserRuns))).then( () =>

      this.setState({
        runsToDisplay: this.state.currentUserRuns,

        allRuns: this.props.allRuns
      }, () => console.log(this.state.runsToDisplay)))



}

componentWillReceiveProps(nextProps) {

  if (nextProps.currentUserRuns.length !== this.props.currentUserRuns.length || nextProps.allRuns.length !== this.props.allRuns.length || nextProps.otherRuns.length !== this.props.otherRuns.length ) {

    this.setState({
      currentUserRuns: nextProps.currentUserRuns
    })

    this.setState({
      allRuns: nextProps.allRuns
    })

    this.setState({
      otherRuns: nextProps.otherRuns
    })

  }
}

handleFilterView = (event) => {



  console.log(event.target.value)

  this.setState({
    viewFilter: !(this.state.viewFilter)
  }, () => { if (this.state.viewFilter === false){
    this.setState({
      runsToDisplay: this.state.currentUserRuns
    }, () => console.log(this.state.runsToDisplay))
  } else if (this.state.viewFilter === true){
    fetch('http://localhost:3000/api/v1/runs')
      .then(res => res.json())
      .then(json => this.setState({
        runsToDisplay: json
      }, () => console.log(this.state.runsToDisplay)))
  }



})
}

handleDistanceFilter = (event) => {

  this.setState({
    distanceFilter: !(this.state.distanceFilter)
  }, () => console.log(this.state.distanceFilter))

  }
//
// checkDistanceFilter = (runs) => {
//
//   if (this.state.distanceFilter === true){
//
//     runs.sort(function(a, b){
//       if (a === null || b === null){
//         null
//       } else {
//         return parseInt(a.distance.split(" ")[0]) - parseInt(b.distance.split(" ")[0])
//       }
//     })
//
//   }
//
// }


  // this.setState({
  //   distanceFilter: !this.state.distanceFilter
  // }, () => {
  //   if (this.state.distanceFilter ===)
  // })



//   console.log(this.state)
//
//   let newRun = {
//   name: this.state.name,
//   description: this.state.description,
//   distance: this.state.distance,
//   expected_pace: this.state.expectedPace,
//   start_time: this.state.startTime,
//   expected_end_time: this.state.expectedEndTime,
//   date: this.state.date,
//   lat: this.state.lat,
//   lng: this.state.lng
// }
//
// let runCreateParams = {
//   method: 'POST',
//   headers: {
//     'Accept':'application/json',
//     'Content-Type':'application/json',
//     'Authorization':`Bearer ${localStorage.getItem('jwt')}`},
//   body: JSON.stringify(newRun)
// }
//
// fetch('http://localhost:3000/api/v1/runs', runCreateParams)
//   .then(resp=>resp.json())
//   .then(resp => console.log(resp)).then((resp) => {
//   this.props.handleCreateRunSubmit(resp)
// })
//
// this.setState({
//   modalOpen: false
// })

// }

haversineFunction = (run) => {
  console.log(run)
    var haversine = require('haversine')

    let start = {
      latitude: this.props.geoLat,
      longitude: this.props.geoLong
    }

    let end = {
      latitude: run.lat,
      longitude: run.lng
    }

    const haversineCoords = (haversine(start, end, {unit: 'mile'}))

    if (this.props.geoLat === "" || this.props.geoLong === ""){
      return "Calculating..."
    }
     else {

      if (run.lng === null || run.lat === null){
        return "No Data"
      } else {
        run.dist_from_location = haversineCoords

        return parseFloat(haversineCoords).toFixed(0) + " miles away"
      }

    }

  }





  render() {

   let runsWithDistance = this.state.runsToDisplay.map((run, index) => {
     if (run.latitude === null || run.longitude === null){
      return null
    } else{
      run.dist_from_location = this.haversineFunction(run)
      return run
    }
  })

  let runsWithDistanceFilter = this.state.distanceFilter === false ?
    runsWithDistance :

       runsWithDistance.filter((run, index) => {
        return parseInt(run.dist_from_location.split(" ")[0]) <= 1
      })






  return (

    <div className="ui container" >

      <h1>Upcoming Runs</h1>




              <Radio toggle onChange={this.handleFilterView} label="Yours/All" />
              <br />

               <Radio toggle onChange={this.handleDistanceFilter} label="w/in a mile?" />




                  <div className="ui container" style={{overflow: 'scroll', position: 'absolute',

  width:'45vw',
  height: '30vw'
}}>


            {runsWithDistanceFilter.map((run, index) =>

              <div className="ui card" style={{  border: '3px dashed #666699',
              width:'45vw',
                backgroundColor: 'white',
                color: 'black',


                }}>
                <div className="card content">

                <RunBox

                  run = {run}
                />


              </div>
            </div>

            )}

        </div>


    </div>

  )

  }

}

export default ViewRuns
