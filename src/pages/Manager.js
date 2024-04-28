import React from 'react'
import Header from '../components/Header'
import ManagerProfileComponent from '../components/ManagerProfile/ManagerProfileComponent'
import ManagerUserInfoComponent from '../components/Managers/ManagerUserInfoComponent'


const Manager = () => {

  return (
    <div className='flex flex-col gap-5'>
      <Header />

      <div className='flex flex-col gap-8 p-5 w-full max-w-5xl mx-auto'>
        <ManagerProfileComponent />

        <ManagerUserInfoComponent />

      </div>

    </div>
  )
}

export default Manager