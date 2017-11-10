import React from 'react'
import { Button, Header, Image, Modal, Form, Checkbox, Icon, Grid} from 'semantic-ui-react'

import PlacesAutoCompleteForm from './PlacesAutoCompleteForm'

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


class CreateRunModal extends React.Component {

  constructor (){
    super()
    this.state = {
      name: '',
      description: '',
      distance: 'lost',
      expectedPace: '',
      startTime: '',
      expectedEndTime: '',
      date: '',
      lat: '',
      lng: '',
      modalOpen: false
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  // handleAddressChange = (event) => {
  //   this.setState({
  //     address: event.target.value
  //   })
  // }

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value
    })
  }

  handleDistanceChange = (event) => {
    this.setState({
      distance: event.target.value
    })
  }

  handleExpectedPaceChange = (event) => {
    this.setState({
      expectedPace: event.target.value
    })
  }

  handleStartTimeChange = (event) => {
    this.setState({
      startTime: event.target.value
    })
  }

  handleExpectedEndTimeChange = (event) => {
    this.setState({
      expectedEndTime: event.target.value
    })
  }

  handleDateChange = (event) => {
    this.setState({
      date: event.target.value
    })
  }

  handleLatLng = (latlng) => {
    console.log(latlng)
    this.setState({
      lat: latlng.lat,
      lng: latlng.lng
    })
  }


  handleSubmit = (event) => {

    event.preventDefault()


    console.log(this.state)

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

  let runCreateParams = {
    method: 'POST',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem('jwt')}`},
    body: JSON.stringify(newRun)
  }

  fetch('http://localhost:3000/api/v1/runs', runCreateParams)
    .then(resp=>resp.json())
    .then(resp => console.log(resp))

    this.setState({
      modalOpen: false
    })


}

  render() {
    return(

      <Modal
        trigger={<Button onClick={this.handleOpen} color="grey">Create a Run</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'

      >


      <Header icon='marker' align="center" size="large" content='Create a run!' />

        <Modal.Content>

        <Grid columns={2} divided>
          <Grid.Row>

            <Grid.Column>
              <Form
              size='large' key='large'
              onSubmit={this.handleSubmit}
              >
                <Form.Field>
                  <input
                    placeholder='Name'
                    onChange={this.handleNameChange}
                  />
                </Form.Field>

                <Form.Field>
                  <input
                    placeholder='Description'
                    onChange={this.handleDescriptionChange}/>
                </Form.Field>

                <Form.Field>
                  <input
                    placeholder='Distance'
                    onChange={this.handleDistanceChange}
                    />
                </Form.Field>

                <Form.Field>
                  <input
                    placeholder='Expected Pace'
                    onChange={this.handleExpectedPaceChange} />
                </Form.Field>


                <Form.Field>
                  <input
                    placeholder='Start Time'
                    onChange={this.handleStartTimeChange} />
                </Form.Field>

                <Form.Field>
                  <input
                    placeholder='Expected End Time'
                    onChange={this.handleExpectedEndTimeChange} />
                </Form.Field>

                <Form.Field>
                  <input
                    placeholder='Date'
                    onChange={this.handleDateChange} />
                </Form.Field>

                <Form.Field>
                  <PlacesAutoCompleteForm handleLatLng={this.handleLatLng}/>
                </Form.Field>

              </Form>

            </Grid.Column>

            <Grid.Column>

              <p>"Let's Run. There should be a map to pin coordinates to create run rather than just having option to add run by autocomplete"</p>

            </Grid.Column>

          </Grid.Row>

        </Grid>
    </Modal.Content>

    <Modal.Actions>
       <Button color='green' onClick={this.handleSubmit} inverted>
         <Icon name='marker' /> Submit
       </Button>
     </Modal.Actions>

  </Modal>

  )
  }
}

export default CreateRunModal
