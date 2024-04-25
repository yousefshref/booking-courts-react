import React from 'react'
import Header from '../components/Header'
import InvoicesComponent from '../components/Invoices/InvoicesComponent'
import ManagerProfileComponent from '../components/ManagerProfile/ManagerProfileComponent'


const Manager = () => {



  return (
    <div className='flex flex-col gap-5'>
      <Header />

      <div className='flex flex-col gap-8 p-5'>
        <ManagerProfileComponent />
        <InvoicesComponent />
      </div>

    </div>
  )
}

export default Manager