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
    events: [
    {"resourceId":"a","title":"Conference","start":"2018-06-16","end":"2018-06-18"},
    {"resourceId":"b","title":"Birthday Party","start":"2018-06-18T07:00:00+00:00"},
    {
      "allDay": false,
      "end": "2018-06-18T13:30:04+00:00",
      "resourceId": "b",
      "start": "2018-06-18T12:00:04+00:00",
      "title": "dynamic event 0"
    }]
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
    const { events, date } = this.state
    console.log('handleSubmitModal', timeStart, timeEnd)
    if(! timeStart || ! timeEnd) {
      return
    }

    const start = new Date()
    const [hoursStart, minutesStart] = timeStart.split(':')
    start.setHours(Number(hoursStart) + getOffsetHours())
    start.setMinutes(Number(minutesStart))
    const startMoment = moment(start)

    const end = new Date()
    const [hoursEnd, minutesEnd] = timeEnd.split(':')
    end.setHours(Number(hoursEnd) + getOffsetHours())
    end.setMinutes(Number(minutesEnd))
    const endMoment = moment(end)

    const offsetString = getOffsetString()

    const newEvent = {
      title: description + i++,
      resourceId: 'b',
      // start: startMoment.format(),
      // end: endMoment.format(),
      start: start.toISOString().substr(0, 19) + offsetString,
      end: end.toISOString().substr(0, 19) + offsetString,
      allDay: false
    }
    console.log([].concat(events, newEvent))
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

    // Options du calendrier
    // Créer un schedulerLicenseKey.json en s'inspirant de schedulerLicenseKey.sample.json
    this.calendarOptions = {
      schedulerLicenseKey,
      defaultView: 'agendaDay',
      groupByResource: true,
      header: {
        left: 'prev,next',
        // center: 'title',
        center: 'addEventButton',
        right: 'agendaDay,agendaWeek'
      },
      resources: [
        { id: 'a', title: 'Room A' },
        { id: 'b', title: 'Room B' }
      ],
      events: this.state.events,

      customButtons: {
        // Une façon d'ajouter un évènement en passant directement
        // par l'API du fullCalendar... a priori pas la bonne façon
        // car "pas très React"
        addEventButton: {
          text: 'add event...',
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
    const { date, modalOpen, events } = this.state
    const { calendarOptions } = this
    const props = {...calendarOptions, events}
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
