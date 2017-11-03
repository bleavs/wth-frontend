import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Icon } from 'semantic-ui-react'




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

export default class SimpleMap extends React.Component {

  constructor(props){
    super(props);
    console.log(this.props)
    console.log(this.props.lat)

    this.state = {
      allRuns: [],
      infoBox: false
    }


  }

  // componentWillMount(){
  //
  //   fetch('http://localhost:3000/api/v1/runs')
  //     .then(res => res.json())
  //     .then(json => this.setState({
  //       allRuns: json
  //     }, () => console.log(this.state.allRuns))
  //
  // }

  static defaultProps = {

    center: {lat: 60.70, lng: -74.01},
    zoom: 14
  };



  render() {
    console.log(this.props)

    return (

      <div style={{height: '500px', width: '500px'}} >

       <GoogleMapReact

         bootstrapURLKeys={{
           key:'AIzaSyCUJqZayYP4n4ydUHOfTqBp5rHmVt2hHDE',
           language: 'en',
         }}

          center={{lat: this.props.lat, lng: this.props.long}}
          defaultZoom={this.props.zoom}

        >

          <AnyReactComponent
            lat={this.props.lat}
            lng={this.props.long}
            text={'UR Here'}
          />

          <AnyReactComponent
            lat={this.props.searchedLat}
            lng={this.props.searchedLong}
            text={'Searched Location'}
          />

          {this.state.allRuns.map(run =>

            <RunReactComponent
              key={run.id}
              lat={run.lat}
              lng={run.lng}
              run = {run}
            />
          )}




      </GoogleMapReact>
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
