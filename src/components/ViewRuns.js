import React, { Component } from 'react';

var name;
var firstname;
var lastname;


let divStyle = {
  border: '3px solid #666699',
  margin: 'auto',

  width: '45vw',


  backgroundColor: 'white',
  color: 'black',

  fontSize: 13,
  padding: 4,


}

const RunBox = (props) => (


  <div style={{  border: '3px dashed #666699',

    backgroundColor: 'white',
    color: 'black',
    fontSize: 13,
    padding: 4,


    }}>

    <p><b>Name:</b> {props.run.name}</p>

    <p><b>Description:</b> {props.run.description}</p>

    <p><b>Distance(Miles):</b> {props.run.distance}</p>

    <p><b>Expected Pace:</b> {props.run.expected_pace}</p>

    <p><b>Start Time:</b> {props.run.start_time}</p>

    <p><b>Expected End Time:</b> {props.run.expected_end_time}</p>

    <p><b>Date:</b> {props.run.date}</p>

    <p><b>Distance from Location:</b> {props.run.dist_from_location}</p>





  </div>
);


class ViewRuns extends Component {

  constructor(props){
    super(props);
    console.log(props.username.split(' ')[0])
    console.log(props.username.split(' ')[1])


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
      viewFilter: ""

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
      }, () => console.log(this.state.currentUserRuns))

  )
}

componentWillReceiveProps(nextProps) {

  if (nextProps.currentUserRuns.length !== this.props.currentUserRuns.length) {

    this.setState({
      currentUserRuns: nextProps.currentUserRuns
    })

    this.setState({
      allRuns: nextProps.allRuns
    })

  }
}

handleFilterView = (event) => {


  console.log(event.target.value)

  this.setState({
    viewFilter: event.target.value
  }, () => console.log(this.state.viewFilter))
}


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

    const userRunsWithDistance = this.state.currentUserRuns.map((run, index) => {
      if (run.latitude === null || run.longitude === null){
       return null
     } else{
       run.dist_from_location = this.haversineFunction(run)
       return run
     }
   })



  return (

    <div className="ui container" style={divStyle}>

      <h1>Upcoming Runs</h1>


              <div className="ui form" onChange={this.handleFilterView}>
                <div className="inline fields">

                  <label>Filter Upcoming Runs by:</label>

                  <div className="field">
                    <div className="ui radio checkbox">
                      <input type="radio" name="frequency" value="Yours" />
                      <label>Yours</label>
                    </div>
                  </div>

                  <div className="field">
                    <div className="ui radio checkbox">
                      <input type="radio" name="frequency" value="Others" />
                      <label>Others</label>
                    </div>
                  </div>

                  <div className="field">
                    <div className="ui radio checkbox">
                      <input type="radio" name="frequency" value="All" />
                      <label>All</label>
                    </div>
                  </div>

                  <div className="field">
                    <div className="ui radio checkbox">
                      <input type="radio" name="frequency" value="Your Herds"/>
                      <label>Your Herds</label>
                    </div>
                  </div>

                </div>
              </div>



          <div>
            Distance Filter toggle (on/off) w/ radio buttons for w/in one mile and five miles
              w/ searchbar here to switch between relative to geoloc and searchedlocation
          </div>

          <div>
            Soonest Filter toggle (on/off) - and if toggled on a Today/Tomorrow radio buttons
          </div>

          <div>
            Below the Soonest filter should be a scrollable list of runs that presents relative to filters
            and on click- possibly displays its location
          </div>





          <div className="ui container" style={{overflow: 'scroll', position: 'absolute',

  width:'45vw',
  height: '45vw'
}}>


            {userRunsWithDistance.map(run =>

              <div className="ui card">
                <div className="card content">

                <RunBox
                  key={run.id}
                  lat={run.lat}
                  lng={run.lng}
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
