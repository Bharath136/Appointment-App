import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

export default class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isActive: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {appointmentsList, date, title} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isFavorite: false,
      isActive: false,
    }
    if (title !== '' && date !== '') {
      this.setState({
        appointmentsList: [...appointmentsList, newAppointment],
        title: '',
        date: '',
      })
    }
  }

  onFavoriteButton = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onStarredButton = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  render() {
    const {appointmentsList, date, title, isActive} = this.state
    const starredAppointmentsList = appointmentsList.filter(
      eachAppointment => eachAppointment.isFavorite === true,
    )
    const list = isActive ? starredAppointmentsList : appointmentsList

    const buttonClass = isActive ? 'back-ground' : ''
    return (
      <div className="container">
        <div className="appointment-card-container">
          <div className="appointment-form-container">
            <form className="appointment-form">
              <h1 className="heading">Add appointment</h1>
              <div className="title-input-container">
                <label htmlFor="title" className="label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="title-input"
                  placeholder="title"
                  value={title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="date-input-container">
                <label htmlFor="date" className="label">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="date-input"
                  value={date}
                  onChange={this.onChangeDate}
                />
              </div>
              <button
                type="submit"
                className="submit-btn"
                onClick={this.onAddAppointment}
              >
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <div className="appointments-container-bottom">
            <div className="appointments-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={`starred-button ${buttonClass}`}
                onClick={this.onStarredButton}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list">
              {list.map(eachAppointment => (
                <AppointmentItem
                  eachAppointment={eachAppointment}
                  key={eachAppointment.id}
                  onFavoriteButton={this.onFavoriteButton}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
