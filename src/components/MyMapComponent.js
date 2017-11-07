import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Icon, Button, Form } from 'semantic-ui-react'


const AnyReactComponent = ({ text }) => (

  <div style={{
    position: 'relative',
    color: 'white',
    background: 'red',
    height: 40,
    width: 60,
    top: -20,
    left: -30
  }}>

    {text}

  </div>
);

const RunReactComponent = ({ text }) => (
  <Icon name='circle' color='green' size="large" />
);

let divStyle = {
  border: '3px solid #7e20db',
  minWidth: "170px",
  backgroundColor: 'white',
  color: 'black',
  fontSize: 13,
  padding: 4,
  cursor: 'pointer',
  borderRadius: '10%',
  float: 'right'
}

const InfoBox = (props) => (

  <div style={divStyle}>

    <p><b>Name:</b> {props.run.name}</p>
    <p><b>Description:</b> {props.run.description}</p>

    <p><b>Distance(Miles):</b> {props.run.distance}</p>
    <p><b>Expected Pace:</b> {props.run.expected_pace}</p>

    <p><b>Start Time:</b> {props.run.start_time}</p>
    <p><b>Expected End Time:</b> {props.run.expected_end_time}</p>

    <p><b>Date:</b> {props.run.date}</p>

  </div>

);

const JoinBox = (props) => (

  <div style={divStyle}>

    <p><b>Would You Like To Join this Run?:</b></p>

    <p><b>Name:</b> {props.run.name}</p>
    <p><b>Description:</b> {props.run.description}</p>

    <p><b>Distance(Miles):</b> {props.run.distance}</p>
    <p><b>Expected Pace:</b> {props.run.expected_pace}</p>

    <p><b>Start Time:</b> {props.run.start_time}</p>
    <p><b>Expected End Time:</b> {props.run.expected_end_time}</p>

    <p><b>Date:</b> {props.run.date}</p>

    <Form
    size='large' key='large'
    onSubmit={props.handleSubmit}
    >
      <Button color='grey' onSubmit={props.handleSubmit}>
        <Icon name='marker' /> Submit
      </Button>

  </Form>


  </div>

);

export default class SimpleMap extends React.Component {

  constructor(props){
    super(props);

    console.log(this.props)
    console.log(this.props.lat)

    this.childMouseEnter = this.childMouseEnter.bind(this)
    this.childMouseLeave = this.childMouseLeave.bind(this)
    this.childClick = this.childClick.bind(this)

    this.state = {
      allRuns: [],
      userRuns: [],
      lat: "",
      lng: "",
      infoBox: false,
      joinBox: false
    }

  }

  // make get  fetch to runs controller route -- set upcoming runs to returned data

  componentWillMount(){

    fetch('http://localhost:3000/api/v1/runs')
      .then(res => res.json())
      .then(json => this.setState({
        allRuns: json
      }, () => console.log(this.state.allRuns))

  )}

  static defaultProps = {
    center: {lat: 60.70, lng: -74.01},
    zoom: 14
  };

  // write childMouseEnter -- to setstate on lat, long, and info toggle --
  // also write childMouseLeave- to set toggle on infobox

  childMouseEnter(num, childProps){
    this.setState({
      lat: childProps.lat,
      lng: childProps.lng,
      infoBox: true,
      run: childProps.run
    })
  }

  childMouseLeave(num, childProps){
    this.setState({
      infoBox: false
    })
  }

  childClick(num, childProps){

    this.setState({
      joinBox: true
    })

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
    start_time: this.state.startTime,
    expected_end_time: this.state.expectedEndTime,
    date: this.state.date,
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
}

  render() {
    console.log(this.props)
    console.log(this.state)

    return (
      <div>



            {this.state.joinBox ?
            <JoinBox lat={this.state.lat} lng={this.state.lng} run={this.state.run} handleSubmit={this.handleSubmit}/>

          : console.log("noinfobox")}

      <div style={{height: '500px', width: '500px'}} >

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



          {this.state.allRuns.map(run =>

            <RunReactComponent
              key={run.id}
              lat={run.lat}
              lng={run.lng}
              run = {run}
            />
          )}

          {this.state.infoBox ?
            <InfoBox lat={this.state.lat} lng={this.state.lng} run={this.state.run}/>

          : console.log("noinfobox")}

      </GoogleMapReact>

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
