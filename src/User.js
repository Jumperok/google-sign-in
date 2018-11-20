import React from 'react'
import PropTypes from 'prop-types'
import './App.css'

const User = ({ name, imgUrl }) => {
  return (
    <React.Fragment>
      <p>Привет, {name}!</p>
      <img src={imgUrl} alt="profle" className="profileImg" />
    </React.Fragment>
  )
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
}

export { User }
