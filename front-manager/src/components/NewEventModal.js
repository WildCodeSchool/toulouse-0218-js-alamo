/* global moment */
import React from 'react'
import { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import Collapse from '@material-ui/core/Collapse'
import PlusOne from '@material-ui/icons/PlusOne'
import Timer from '@material-ui/icons/Timer'
import { TimePicker as TimePickerBase } from 'material-ui-pickers'
import { DatePicker } from 'material-ui-pickers';
import withUtils from 'material-ui-pickers/_shared/WithUtils'
import FnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import TextField from '@material-ui/core/TextField';

const TimePicker = withUtils(new FnsUtils())(TimePickerBase)

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '40%', // theme.spacing.unit * 50,
    left: '30%',
    top: '20%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    padding: theme.spacing.unit * 4,
    textAlign: 'center'
  },
  input: {
    width: '100%'
  },
  logo: {
    paddingRight: theme.spacing.unit
  },
  mb: {
    marginBottom: theme.spacing.unit * 4
  }
})

class NewEventModal extends React.Component {
  state = {
    selectedDate: new Date(),
    timeStart: '',
    timeEnd: '',
    description: ''
  }
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleDateChange = date => {
    this.setState({
    selectedDate: date
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    const { timeStart, timeEnd, selectedDate, description } = this.state
    this.props.handleSubmit({ timeStart, timeEnd, selectedDate, description})
  }
  handleDateChange = (date) => {
    console.log(date)
    this.setState({ selectedDate: date });
  }
  render () {
    const { classes, handleOpen, handleClose, handleSubmit, open, date} = this.props
    const { selectedDate, timeStart, timeEnd, description} = this.state

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div className={classes.paper}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="title" id="modal-title" className={classes.mb}>
                  Nouvel évènement
                </Typography>
                <FormControl className={classes.mb}>
               <TextField
                required
                id="description"
                name="description"
                label="My event"
                value={description}
                className={classes.textField}
                onChange={this.handleInputChange}
                />
                </FormControl>
                <FormControl className={classes.mb}>
                  <InputLabel htmlFor="timeStart">Heure de début</InputLabel>
                  <Input
                    className={classes.input}
                    id="timeStart"
                    type="text"
                    name="timeStart"
                    value={timeStart}
                    onChange={this.handleInputChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <Timer />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl className={classes.mb}>
                  <InputLabel htmlFor="timeEnd">Heure de fin</InputLabel>
                  <Input
                    className={classes.input}
                    id="timeEnd"
                    type="text"
                    name="timeEnd"
                    value={timeEnd}
                    onChange={this.handleInputChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <Timer />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl className={classes.mb}>
                <DatePicker
                  keyboard
                  clearable
                  label="Choose a date"
                  helperText="Possible manual entry via keyboard"
                  maxDateMessage="Date must be less than today"
                  value={selectedDate}
                  onChange={this.handleDateChange}
                  animateYearScrolling={false}
                  startAdornment={
                    <InputAdornment position="start">
                      <Timer />
                    </InputAdornment>
            }
          />
                </FormControl>  
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.mb}
                  onClick={this.handleSubmit}>
                  <PlusOne className={classes.logo} onClick={handleSubmit} /> Créer
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    )
  }
}

NewEventModal.propTypes = {
  classes: PropTypes.object.isRequired
}

// We need an intermediary variable for handling the recursive nesting.
const NewEventModalWrapped = withStyles(styles)(NewEventModal)

export default NewEventModalWrapped
