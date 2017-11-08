import React, { Component } from 'react';

var name;
var firstname;
var lastname;


let divStyle = {
  border: '3px solid #666699',
  margin: 'auto',
  width: '75%',

  backgroundColor: 'white',
  color: 'black',

  fontSize: 13,
  padding: 4,
  cursor: 'pointer',


}

const RunBox = (props) => (

  <div style={{  border: '3px dashed #666699',

    backgroundColor: 'white',
    color: 'black',
    fontSize: 13,
    padding: 4,
    cursor: 'pointer'
    }}>

    <p><b>Name:</b> {props.run.name}</p>

    <p><b>Description:</b> {props.run.description}</p>

    <p><b>Distance(Miles):</b> {props.run.distance}</p>

    <p><b>Expected Pace:</b> {props.run.expected_pace}</p>

    <p><b>Start Time:</b> {props.run.start_time}</p>

    <p><b>Expected End Time:</b> {props.run.expected_end_time}</p>

    <p><b>Date:</b> {props.run.date}</p>


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
      sendname: name
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

  )}


  render() {
  return (
    <div style={divStyle}>
      <h1>Your Upcoming Runs</h1>

      {this.state.currentUserRuns.map(run =>

        <RunBox
          key={run.id}
          lat={run.lat}
          lng={run.lng}
          run = {run}
        />
      )}


    </div>

  )

  }

}

export default ViewRuns
