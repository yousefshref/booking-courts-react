import React, { useContext, useState } from 'react'
import { ApiContextProvider } from '../../contexts/ApiContext'
import dayjs from 'dayjs'
import Loading from '../Loading'
import { Button, DatePicker } from 'antd'
import CreateOrUpdateExpense from './CreateOrUpdateExpense'
import { MdCreate } from 'react-icons/md'
import { getCurrentDate } from '../../utlits/Functions'
import ExpenseContainer from './ExpenseContainer'

const ExpensesComponent = () => {
  const apiContext = useContext(ApiContextProvider)

  const expenses = apiContext?.expenses
  const expenseLoading = apiContext?.expenseLoading



  const [openCreateExpense, setOpenCreateExpense] = useState(false)

  return (
    <div className='flex flex-col gap-4 w-full max-w-6xl mx-auto'>
      <div className='flex flex-col gap-3 text-center'>
        <p className='text-neutral-800 text-3xl'>المصروفات</p>
        <p className='text-red-600 text-lg'>
          {
            expenses?.reduce((acc, expense) => acc + expense?.amount, 0)
          } EGP
        </p>
        <div className='flex justify-around items-center w-full gap-3 flex-wrap'>
          <span className='createIcon flex gap-2' onClick={() => setOpenCreateExpense(true)}>
            <MdCreate className='my-auto' />
            <p className='my-auto'>انشاء</p>
          </span>
        </div>
      </div>

      <CreateOrUpdateExpense open={openCreateExpense} setOpen={setOpenCreateExpense} />

      <hr />

      <div className='flex flex-col gap-3 p-5 rounded-xl bg-sky-200'>
        <div className='flex gap-4 md:flex-row flex-col justify-between'>
          <div className='flex flex-col gap-1 w-full md:max-w-lg'>
            <p className='text-neutral-800'>التاريخ من</p>
            <DatePicker value={dayjs(apiContext?.from_date_expense, "YYYY-MM-DD")} onChange={(e, date) => date ? apiContext?.setFromDateexpense(date) : apiContext?.setFromDateexpense(getCurrentDate())} />
          </div>
          <div className='flex flex-col gap-1 w-full md:max-w-lg'>
            <p className='text-neutral-800'>التاريخ من</p>
            <DatePicker value={dayjs(apiContext?.to_date_expense, "YYYY-MM-DD")} onChange={(e, date) => date ? apiContext?.setToDateexpense(date) : apiContext?.setToDateexpense(getCurrentDate())} />
          </div>
        </div>
        <Button type='primary' className='w-fit' onClick={() => apiContext?.getExpenses()}>بحث</Button>
      </div>

      <hr />
      <div className='flex flex-wrap gap-5 justify-around min-h-fit max-h-[500px] overflow-scroll p-4 rounded-xl bg-indigo-500'>
        {
          expenseLoading ? <Loading /> :
            expenses?.length > 0 ?
              expenses?.map((expense, index) => {
                return (
                  <ExpenseContainer key={index} expense={expense} />
                )
              })
              : <p className='text-white'>لا يوجد مصروفات</p>
        }
      </div>
    </div>
  )
}

export default ExpensesComponent