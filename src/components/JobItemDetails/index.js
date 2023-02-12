import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsStarFill} from 'react-icons/bs'
import {MdWork, MdPlace} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'
import SimilarJobItem from '../SimilarJobItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: '',
    apiStatus: apiStatusConstants.initial,
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedData = job => ({
    companyLogoUrl: job.job_details.company_logo_url,
    companyWebsiteUrl: job.job_details.company_website_url,
    employmentType: job.job_details.employment_type,
    id: job.job_details.id,
    jobDescription: job.job_details.job_description,
    skills: job.job_details.skills,
    lifeAtCompany: job.job_details.life_at_company,
    location: job.job_details.location,
    packagePerAnnum: job.job_details.package_per_annum,
    rating: job.job_details.rating,
    title: job.job_details.title,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      const updatedData = this.getFormattedData(data)
      const SimilarJobsData = await data.similar_jobs
      const updatedSimilarJobs = SimilarJobsData.map(eachItem =>
        this.getFormattedSimilarJobData(eachItem),
      )
      this.setState({similarJobs: updatedSimilarJobs})
      console.log(updatedData)
      this.setState({
        jobDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  getFormattedSimilarJobData = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    rating: job.rating,
    title: job.title,
  })

  renderJobItem = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemSuccess()

      default:
        return null
    }
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <div className="similar-jobs-container">
        <h1 className="desc">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {console.log(similarJobs)}
          {similarJobs.map(eachItem => (
            <SimilarJobItem similarJobDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobItemSuccess = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      employmentType,
      skills,
      packagePerAnnum,
      jobDescription,
      location,
      lifeAtCompany,
    } = jobDetails
    return (
      <>
        <div className="job-item-container">
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
          <div className="description-visit-link">
            <p className="description">Description</p>
            <div className="visit-link">
              <a href={companyWebsiteUrl} className="link">
                Visit
                <FiExternalLink className="link-icon" />
              </a>
            </div>
          </div>
          <p className="job-desc">{jobDescription}</p>
          <div className="skills-container">
            <h1 className="small-heading">Skills Container</h1>
            <ul className="skills-list">
              {skills.map(eachItem => (
                <li className="skill-item">
                  <img
                    src={eachItem.image_url}
                    alt="skill"
                    className="skill-image"
                  />
                  <p className="para">{eachItem.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="life-at-company">
            <div className="life-at-company-text">
              <h1 className="small-heading">Life at Compnany</h1>
              <p className="para">{lifeAtCompany.description}</p>
            </div>

            <img
              src={lifeAtCompany.image_url}
              className="company-image"
              alt="company"
            />
          </div>
        </div>
        {this.renderSimilarJobs()}
      </>
    )
  }

  render() {
    return (
      <div className="job-item-bg-container">
        <Header />
        {this.renderJobItem()}
      </div>
    )
  }
}

export default JobItemDetails
