// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {data, makeStarred} = props
  const {id, title, date, isStarred} = data

  const starred = () => {
    makeStarred(id)
  }

  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="item">
      <div className="card">
        <p className="name">{title}</p>
        <button
          data-testid="star"
          className="star-btn"
          type="button"
          onClick={starred}
        >
          <img className="star-img" src={starImg} alt="star" />
        </button>
      </div>
      <p className="date-para">{date}</p>
    </li>
  )
}

export default AppointmentItem
