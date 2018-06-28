/* global $, moment */
import React from 'react'
import Grid from '@material-ui/core/Grid'
// import CalendarBase from 'material-ui-pickers/DatePicker/Calendar'
import withUtils from 'material-ui-pickers/_shared/WithUtils'
import moment from 'moment'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import { schedulerLicenseKey } from '../schedulerLicenseKey.json'
import IconButton from '@material-ui/core/IconButton'
import PlusOne from '@material-ui/icons/PlusOne'
import NewEventModal from './NewEventModal'
import $ from 'jquery'

// Une version qui marche, modifiée à partir de:
// https://github.com/vadym-vorobel/fullcalendar-react
import { FullCalendar } from './fullcalendar-react/FullCalendar'

let i = 1

class MyClub extends React.Component {
  state = {
    date: moment(),
    modalOpen: false,
    resources: [],
    events: [
      // {
      //   "allDay": false,
      //   "end": "2018-06-18T13:30:04+00:00",
      //   "resourceId": "b",
      //   "start": "2018-06-18T12:00:04+00:00",
      //   "title": "dynamic event 0"
      // }
    ]
  }

  handleOpenModal = () => {
    this.setState({ modalOpen: true })
  }

  handleCloseModal = () => {
    this.setState({ modalOpen: false })
  }
  // C'est ici qu'on crée un nouvel évènement, une fois que
  // le formulaire de la modale de NewEventModal a été soumis
  handleSubmitModal = ({ timeStart, timeEnd, selectedDate, description, resourceId }) => {
    console.log(selectedDate)
    const { events} = this.state
    console.log('handleSubmitModal', this.state, timeStart, timeEnd)
    if(! timeStart || ! timeEnd) {
      return
    }

    const date = selectedDate.format('YYYY-MM-DD')
    const startHours = timeStart.format().substr(10)
    const endHours = timeEnd.format().substr(10)


    const timeslotData = {
      title: description + i++,
      resourceId,
      dayOfWeek: selectedDate.day(),
      startHour: timeStart.format('HH:mm'),
      endHour: timeEnd.format('HH:mm')
    }
    fetch('/api/timeslots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(timeslotData)
    })
    .then(response => response.json())
    .then(timeslot => {
      const newEvent = {
        id: timeslot.id,
        title: description + i++,
        start: date + startHours,
        end: date + endHours,
        resourceId,
        allDay: false
      }
      const {events} = this.state
      const newEvents = [
        ...events, newEvent
      ]
      this.setState({
        events: newEvents,
        modalOpen: false
      })
    })
  }

  onChange = date => {
    this.setState({ date })
    if(this.calendar) {
      this.calendar.fullCalendar('changeView', 'agendaDay', date.format('DD-MM-YYYY'))
    }
  }
  
  createResource = () => {
    var title = prompt('Room name');
    if (!title) return
    const data = {title, managerId:this.props.user.id}
    fetch('/api/resources', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(resource => {
      const {resources} = this.state
      const newResources = [
        ...resources, resource
      ]
      this.setState({
        resources: newResources
      })
    })
  }


  constructor (props) {
    super(props)
    // Options du calendrier
    // Créer un schedulerLicenseKey.json en s'inspirant de schedulerLicenseKey.sample.json
    this.calendarOptions = {
      schedulerLicenseKey,
      defaultView: 'agendaDay',
      groupByResource: true,
      header: {
        left: 'promptResource, prev,next',
        center: 'addEventButton',
        right: 'agendaDay,agendaWeek,month,deconnexion'
      },
      resourceLabelText: 'Rooms',
      events: this.state.events,

      customButtons: {
        deconnexion: {
          text: 'deconnexion',
          click: function() {
            alert('bientôt la déco');
          }
        },
          promptResource: {
            text: 'Salles',
            click:this.createResource
          },
        // Une façon d'ajouter un évènement en passant directement
        // par l'API du fullCalendar... a priori pas la bonne façon
        // car "pas très React"
        addEventButton: {
          text: 'Ajouter un évènement',
          click: this.handleOpenModal
        }
      }
    }
  }

  componentDidMount (){
    fetch('/api/resources', {
      credentials: 'include'
    })
    .then (res => res.json())
    .then (resources => {
      this.setState({
        resources
      })
    })
  }

  render () {
    const { date, modalOpen, events, resources } = this.state
    const { calendarOptions } = this
    const props = {...calendarOptions, events, resources}
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={12}>
          <NewEventModal open={modalOpen} resources={resources} handleSubmit={this.handleSubmitModal} handleOpen={this.handleOpenModal} handleClose={this.handleCloseModal} />
          <FullCalendar options={{...props}} />
        </Grid>
      </Grid>
    )
  }
}

export default MyClub
