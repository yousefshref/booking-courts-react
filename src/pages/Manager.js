import React from 'react'
import Header from '../components/Header'
import ManagerProfileComponent from '../components/ManagerProfile/ManagerProfileComponent'
import IncomeComponent from '../components/Income/IncomeComponent'
import ExpensesComponent from '../components/Expense/ExpensesComponent'
import { useNavigate } from 'react-router-dom'


const Manager = () => {

  const navigate = useNavigate()

  return (
    <div className='flex flex-col gap-5'>
      <Header />

      <div className='flex flex-col gap-8 p-5 w-full max-w-5xl mx-auto'>
        <ManagerProfileComponent />

        <div onClick={() => { navigate(`/manager/${localStorage.getItem('username')}/balance/`) }} className='flex text-center flex-col transition-all duration-200 hover:text-white cursor-pointer hover:bg-indigo-900 gap-8 p-3 bg-zinc-300 rounded-xl'>
          <b>تفاصيل رصيد اليوم</b>
        </div>

        {/* <IncomeComponent />
        <hr className='py-[0.5px] bg-indigo-300' />
        <ExpensesComponent /> */}
      </div>

    </div>
  )
}

export default Manager