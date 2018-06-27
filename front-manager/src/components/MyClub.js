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

// Une fonction pour calculer le décalage par rapport à GMT (temps universel)
import { getOffsetHours, getOffsetString } from './helpers/computeTimeOffset'

// DES VERSIONS QUE J'AI TESTEES ET QUI NE MARCHAIENT PAS
// import FullCalendar from './FullCalendar'
// import FullCalendar from 'fullcalendar-reactwrapper'

const Calendar = withUtils()

const calendarProps = {
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  disablePast: false,
  disableFuture: false,
  allowKeyboardControl: false,
  animateYearScrolling: undefined,
  openToYearSelection: false,
  children: null,
  leftArrowIcon: undefined,
  rightArrowIcon: undefined,
  renderDay: undefined,
  shouldDisableDate: undefined
}
let i = 1

class MyClub extends React.Component {
  state = {
    date: moment(),
    modalOpen: false,
    resources: [
      { id: 'a', title: 'Auditorium A' },
      { id: 'b', title: 'Auditorium B' },
    ],
    events: [
      {"resourceId":"a","title":"Conference","start":"2018-06-16","end":"2018-06-18"},
      {"resourceId":"b","title":"Birthday Party","start":"2018-06-18T07:00:00+00:00"},
      {
        "allDay": false,
        "end": "2018-06-18T13:30:04+00:00",
        "resourceId": "b",
        "start": "2018-06-18T12:00:04+00:00",
        "title": "dynamic event 0"
      }
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
  handleSubmitModal = ({ timeStart, timeEnd, selectedDate, description }) => {
    console.log(selectedDate)
    const { events} = this.state
    console.log('handleSubmitModal', this.state, timeStart, timeEnd)
    if(! timeStart || ! timeEnd) {
      return
    }

    const date = selectedDate.format('YYYY-MM-DD')
    const startHours = timeStart.format().substr(10)
    const endHours = timeEnd.format().substr(10)

    const newEvent = {
      title: description + i++,
      resourceId: 'b',
      start: date + startHours,
      end: date + endHours,
    
      allDay: false
    }
    console.log([...events, newEvent])
    this.setState({
      events: [].concat(events, newEvent),
      modalOpen: false
    })
  }

  onChange = date => {
    this.setState({ date })
    if(this.calendar) {
      this.calendar.fullCalendar('changeView', 'agendaDay', date.format('DD-MM-YYYY'))
    }
  }
  constructor (props) {
    super(props)
    const that = this

    // Options du calendrier
    // Créer un schedulerLicenseKey.json en s'inspirant de schedulerLicenseKey.sample.json
    this.calendarOptions = {
      schedulerLicenseKey,
      defaultView: 'agendaDay',
      groupByResource: true,
      header: {
        left: 'promptResource, prev,next',
        // center: 'title',
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
            text: '+ room',
            click: function() {
              var title = prompt('Room name');
              if (title) {
                const {resources} = that.state
                const newResource = {
                  title: title,
                  id: 'C' + Date.now()
                }
                const newResources = [
                  ...resources, newResource
                ]
                that.setState({
                  resources: newResources
                })
                // $('#calendar').fullCalendar(
                //   'addResource',
                //   { title: title },
                //   true // scroll to the new resource?
                // );
              }
            }
          },
        // Une façon d'ajouter un évènement en passant directement
        // par l'API du fullCalendar... a priori pas la bonne façon
        // car "pas très React"
        addEventButton: {
          text: 'Ajouter un évènement',
          click: this.handleOpenModal
          //  () => {
          //   const { date } = this.state
          
          //   if (date.isValid()) {
          //     $('#calendar').fullCalendar('renderEvent', {
          //       title: 'dynamic event',
          //       resourceId: 'b',
          //       start: date,
          //       allDay: true
          //     })
          //     // alert('Great. Now, update your database...');
          //   } else {
          //     alert('Invalid date.')
          //   }
          // }
        }
      }
    }
  }
  render () {
    const { date, modalOpen, events, resources } = this.state
    const { calendarOptions } = this
    const props = {...calendarOptions, events, resources}
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={12}>
          <NewEventModal open={modalOpen} date={date} handleSubmit={this.handleSubmitModal} handleOpen={this.handleOpenModal} handleClose={this.handleCloseModal} />
          <Calendar utils={new MomentUtils()} date={date} {...calendarProps} onChange={this.onChange} />
          <FullCalendar options={{...props}} />
        </Grid>
      </Grid>
    )
  }
}

export default MyClub
