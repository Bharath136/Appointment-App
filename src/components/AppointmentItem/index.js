import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, onFavoriteButton} = props
  const {id, title, date, isFavorite} = eachAppointment

  const onFavorite = () => {
    onFavoriteButton(id)
  }
  const n = new Date(date)

  const isFav = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointment-item">
      <div className="top-item">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-button"
          data-testid="star"
          onClick={onFavorite}
        >
          <img src={isFav} alt="starred" className="starr-image" />
        </button>
      </div>
      <p className="date">{`Date: ${format(n, `dd MMMM yyyy, EEEE`)}`}</p>
    </li>
  )
}

export default AppointmentItem
