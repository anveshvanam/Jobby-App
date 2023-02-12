import {Link} from 'react-router-dom'
import {BsStarFill} from 'react-icons/bs'
import {MdWork, MdPlace} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    jobDescription,
    location,
    rating,
    packagePerAnnum,
    title,
    employmentType,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="nav-link">
      <li className="job-item">
        <div className="title-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <BsStarFill className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary">
          <div className="location-job-type">
            <MdPlace className="icon" />
            <p className="info">{location}</p>
            <MdWork className="icon" />
            <p className="info">{employmentType}</p>
          </div>
          <p className="info">{packagePerAnnum}</p>
        </div>
        <hr className="h-line" />
        <p className="description">Description</p>
        <p className="job-desc">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
