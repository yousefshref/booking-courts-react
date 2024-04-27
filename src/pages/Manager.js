import React from 'react'
import Header from '../components/Header'
import ManagerProfileComponent from '../components/ManagerProfile/ManagerProfileComponent'
import IncomeComponent from '../components/Income/IncomeComponent'
import ExpensesComponent from '../components/Expense/ExpensesComponent'


const Manager = () => {



  return (
    <div className='flex flex-col gap-5'>
      <Header />

      <div className='flex flex-col gap-8 p-5'>
        <ManagerProfileComponent />

        <IncomeComponent />
        <hr className='py-[0.5px] bg-indigo-300' />
        <ExpensesComponent />
      </div>

    </div>
  )
}

export default Manager