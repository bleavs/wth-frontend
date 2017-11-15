import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {Button} from 'semantic-ui-react'

class SimpleForm extends React.Component {

  constructor(props) {
    super(props)

    console.log(this.props)

    this.state = { address: '' }
    this.onChange = (address) => this.setState({ address })
  }


  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.searchLocation(latLng))
      .catch(error => console.error('Error', error))
  }


  render() {

    const inputProps = {
      value: this.state.address,
      placeholder: "Search Location",
      onChange: this.onChange,
    }

    return (
    <form className="button" style={{width: '100%'}} onSubmit={this.handleFormSubmit}>

          <PlacesAutocomplete inputProps={inputProps} />

          <Button color='grey'>Submit </Button>

     </form>

    )
  }
}

export default SimpleForm
