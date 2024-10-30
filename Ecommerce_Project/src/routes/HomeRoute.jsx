import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const HomeRoute = ({val}) => {
  return (
    <>
        {!val && <Header />}
        <Outlet />
        {!val && <Footer />}
    </>
  )
}

export default HomeRoute