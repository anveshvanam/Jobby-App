import './index.css'

const UserProfile = props => {
  const {profileInfo} = props
  return (
    <>
      <img
        src={profileInfo.profileImageUrl}
        alt="profile"
        className="profile-image"
      />
      <h1 className="profile-name">{profileInfo.name}</h1>
      <p className="profile-description">{profileInfo.shortBio}</p>
    </>
  )
}

export default UserProfile
