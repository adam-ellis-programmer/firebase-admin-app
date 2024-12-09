import React from 'react'
import PageHeader from '../layout/PageHeader'
import img from '../imgs/firebase logo-1.png'
const Home = () => {
  return (
    <div>
      <div className="home-page-header-div">
        <PageHeader text={`welcome to firebase admin SDK app`} />
      </div>

      <div className="home-image-container">
        <img src={img} alt="" className="home-logo-img" />
      </div>
    </div>
  )
}

export default Home
