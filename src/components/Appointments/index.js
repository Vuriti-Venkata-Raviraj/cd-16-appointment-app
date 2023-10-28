// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {initialInfo: [], title: '', date: '', starred: false}

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const data = {
      id: v4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      initialInfo: [...prevState.initialInfo, data],
      title: '',
      date: '',
    }))
  }

  titleChanged = event => {
    this.setState({title: event.target.value})
  }

  dateChanged = event => {
    this.setState({date: event.target.value})
  }

  makeStarred = id => {
    this.setState(prevState => ({
      initialInfo: prevState.initialInfo.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onlyStarred = () => {
    const {starred} = this.state
    this.setState({starred: !starred})
  }

  render() {
    const {title, date, initialInfo, starred} = this.state
    const filteredResults = starred
      ? initialInfo.filter(
          eachAppointment => eachAppointment.isStarred === starred,
        )
      : initialInfo

    const style = starred ? 'updated' : ''

    return (
      <div className="main-container">
        <div className="container">
          <div className="text-input-container">
            <div className="text-input">
              <h1 className="heading">Add Appointment</h1>
              <form className="form" onSubmit={this.addAppointment}>
                <label className="title">
                  TITLE <br />
                  <br />
                  <input
                    type="text"
                    className="title-input"
                    value={title}
                    name="name"
                    onChange={this.titleChanged}
                  />
                </label>
                <label className="date">
                  DATE <br />
                  <br />
                  <input
                    type="date"
                    className="date-input"
                    value={date}
                    name="name"
                    onChange={this.dateChanged}
                  />
                </label>
                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="img-card">
              <img
                alt="appointments"
                className="img"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              />
            </div>
          </div>

          <div className="appointment-container">
            <hr className="line" />
            <div className="appointments">
              <div className="appointment-title-container">
                <h1 className="appointment-title">Appointments</h1>
                <button
                  className={`starred ${style}`}
                  type="button"
                  onClick={this.onlyStarred}
                >
                  Starred
                </button>
              </div>
              <ul className="list">
                {filteredResults.map(eachAppointment => (
                  <AppointmentItem
                    data={eachAppointment}
                    key={eachAppointment.id}
                    makeStarred={this.makeStarred}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
