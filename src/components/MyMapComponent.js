import React from 'react'
import Moment from 'react-moment'
import * as moment from 'moment';

import GoogleMapReact from 'google-map-react';
import { Icon, Button, Form } from 'semantic-ui-react'


var name;
var firstname;
var lastname;





const RunReactComponent = ({ text }) => (
  <Icon name='map pin' color='green' size="large" />
);

const UserRunReactComponent = ({ text }) => (
  <Icon name='street view' color='blue' size="large" />
);

const HereReactComponent = ({ text }) => (
  <Icon name='crosshairs' color='red' size="large" />
);




let divStyle = {
  border: '3px solid #666699',


  backgroundColor: 'white',
  color: 'black',
  fontSize: 13,
  padding: 4,
  cursor: 'pointer',
  borderRadius: '5%',
  float: 'right'
}

let divJoinStyle = {
  border: '3px solid #666699',

  backgroundColor: 'white',
  color: 'black',
  fontSize: 13,
  padding: 4,
  cursor: 'pointer',
  borderRadius: '5%',
  float: 'right'
}

// let divWraoMapStyle = {
//   height: '1000px',
//   width: '1000px'
// }

let divMapStyle = {
  height: '400px',
  width: '40%',
  position: 'relative',
  float: 'right'
}


const InfoBox = (props) => (

  <div style={divStyle}>

  <p> <b>When:</b>
      <Moment calendar>
        {props.run.run_day}
      </Moment>
      (<Moment format="MMM Do, YY">
        {props.run.run_day}
      </Moment>)
  </p>


  <p><b>Expected End Time:</b>
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

const JoinBox = (props) => (

  <div style={divJoinStyle}>

    <p><b>Would You Like To Join this Run?:</b></p>


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


    <p><b>Expected End Time:</b>
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



    <Form
    size='large' key='large'
    onSubmit={props.handleSubmit}
    >
      <Button color='grey'>
        <Icon name='marker' />  Join Run
      </Button>

  </Form>


  </div>

);

export default class SimpleMap extends React.Component {

  constructor(props){
    super(props);

    console.log(this.props)
    console.log(this.props.lat)
    console.log(this.props.geoLat)
    console.log(this.props.geoLong)

    this.childMouseEnter = this.childMouseEnter.bind(this)
    this.childMouseLeave = this.childMouseLeave.bind(this)
    this.childClick = this.childClick.bind(this)

    console.log(this.props.username.split(' ')[0])
    console.log(this.props.username.split(' ')[1])


    if (this.props.username.split(' ')[1]){
      firstname = this.props.username.split(' ')[0]
      lastname = this.props.username.split(' ')[1]

      name = `${firstname}%20${lastname}`

    }
    else {
      name = this.props.username
    }

    this.state = {
      allRuns: [],
      userRuns: [],
      userId: "",
      lat: "",
      lng: "",
      infoBox: false,
      joinBox: false,
      sendname: name


    }



  }

  // make get  fetch to runs controller route -- set upcoming runs to returned data

  componentWillMount(){
    console.log(this.state.sendname)

    this.props.handleUsernameToApp(this.props.username)


    // users runs

      fetch(`http://localhost:3000/api/v1/users/${this.state.sendname}`)
      .then(res => res.json())
      .then(json => this.setState({
        userId: json.id,
        userRuns: json.runs

      }, () => console.log(this.state.userId)))


    // all runs

    fetch('http://localhost:3000/api/v1/runs')
      .then(res => res.json())
      .then(json => this.setState({
        allRuns: json
      }, () => console.log(this.state.allRuns)))

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.currentUserRuns.length !== this.props.currentUserRuns.length) {

      this.setState({
        userRuns: nextProps.currentUserRuns
      })

      this.setState({
        allRuns: nextProps.allRuns
      })

    }
    // else if (nextProps.allRuns.length !== this.props.allRuns.length) {
    //
    //   this.setState({
    //     allRuns: nextProps.allRuns
    //   })
    //
    // }

  }



  static defaultProps = {
    center: {lat: 60.70, lng: -74.01},
    zoom: 14
  };

  // write childMouseEnter -- to setstate on lat, long, and info toggle --
  // also write childMouseLeave- to set toggle on infobox

  childMouseEnter(num, childProps){

    if (childProps.run !== undefined && this.state.userRuns.filter(userrun => userrun.id === childProps.run.id).length !== 0){

      this.setState({
        lat: childProps.lat,
        lng: childProps.lng,
        infoBox: true,
        joinBox: false,

        run: childProps.run
      })

    }

    else if (childProps.run !== undefined){

      this.setState({
      lat: childProps.lat,
      lng: childProps.lng,
      infoBox: true,
      run: childProps.run
    })

  }

}


  childMouseLeave(num, childProps){
    this.setState({
      infoBox: false,

    })
  }

  childClick(num, childProps){


    if (childProps.run !== undefined && this.state.userRuns.filter(userrun => userrun.id === childProps.run.id).length === 0){

      this.setState({
        joinBox: true
      })
    }

    else if (childProps.run !== undefined && this.state.userRuns.filter(userrun => userrun.id === childProps.run.id).length !== 0){
      this.setState({
        joinBox: false
      })
    }

  }

  handleSubmit = (event) => {

    event.preventDefault()
    console.log(this.state)
    console.log(this.state.run.id)

    let newRun = {
    name: this.state.name,
    description: this.state.description,
    distance: this.state.distance,
    expected_pace: this.state.expectedPace,

    expected_end_time: this.state.expectedEndTime,
    run_day: this.state.run_day,
    lat: this.state.lat,
    lng: this.state.lng
  }

  let runUpdateParams = {
    method: 'PATCH',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem('jwt')}`},
    body: JSON.stringify(newRun)
  }

  fetch(`http://localhost:3000/api/v1/runs/${this.state.run.id}`, runUpdateParams)
    .then(resp=>resp.json())
    .then(resp => console.log(resp))
    .then( () => {
      fetch(`http://localhost:3000/api/v1/users/${this.state.sendname}`)
      .then(res => res.json())
      .then(json => this.setState({
        userRuns: json.runs

      },
      () => console.log(this.state.userRuns)))
      .then((resp) => {
      this.props.handleJoinRunSubmit(resp)
    })
    }

    )

    this.setState({
      joinBox: false
    })
}



  render() {
    console.log(this.props)
    console.log(this.state)

    return (
      <div style={{display: 'block'}}>






      <div style={{width: '45vw', height: '45vh', float: 'right'}}>

       <GoogleMapReact

         bootstrapURLKeys={{
           key:'AIzaSyCUJqZayYP4n4ydUHOfTqBp5rHmVt2hHDE',
           language: 'en',
         }}

          center={{lat: this.props.lat, lng: this.props.long}}

          defaultZoom={this.props.zoom}
          onChildMouseEnter={this.childMouseEnter}
          onChildMouseLeave={this.childMouseLeave}
          onChildClick={this.childClick}

        >

          <HereReactComponent lat={this.props.geoLat} lng={this.props.geoLong} />

          {this.state.allRuns.filter((allrun) => moment().isSameOrBefore(allrun.run_day, 'hour')).map((run, index) => this.state.userRuns.filter((userrun) => moment().isSameOrBefore(userrun.run_day, 'hour') && userrun.id === run.id).length > 0 ?

              <UserRunReactComponent
                key={index}
                lat={run.lat}
                lng={run.lng}
                run = {run}
              />

              :

            <RunReactComponent
              key={index}
              lat={run.lat}
              lng={run.lng}
              run = {run}
            />


          )
        }

          {this.state.infoBox ?
            <InfoBox lat={this.state.lat} lng={this.state.lng} run={this.state.run}/>

          : console.log("noinfobox")}

      </GoogleMapReact>

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
  






      <div style={{float: 'right'}}>
          {this.state.joinBox ?
          <JoinBox lat={this.state.lat} lng={this.state.lng} run={this.state.run} handleSubmit={this.handleSubmit}/>

        : console.log("noinfobox")}
      </div>


      </div>

    );
  }
}


// ReactDOM.render(
//   <div style={{width: '100%', height: '400px'}}>
//     <SimpleMap/>
//   </div>,
//   document.getElementById('main')
// );
