import React, { useContext, useState } from 'react'
import { ApiContextProvider } from '../../contexts/ApiContext'
import Loading from '../Loading'
import IncomeContainer from './IncomeContainer'
import { MdCreate } from 'react-icons/md'
import CreateOrUpdateIncome from './CreateOrUpdateIncome'
import { Button, DatePicker } from 'antd'
import { getCurrentDate, getCurrentDateYMD } from '../../utlits/Functions'
import dayjs from 'dayjs'

const IncomeComponent = () => {
  const apiContext = useContext(ApiContextProvider)

  const incomes = apiContext?.incomes
  const incomeLoading = apiContext?.incomeLoading



  const [openCreateIncome, setOpenCreateIncome] = useState(false)


  return (
    <div className='flex flex-col gap-4 w-full max-w-6xl mx-auto'>
      <div className='flex flex-col gap-3 text-center'>
        <p className='text-neutral-800 text-3xl'>الايرادات</p>
        <p className='text-green-600 text-lg'>
          {
            incomes?.reduce((acc, income) => acc + income?.amount, 0)
          } EGP
        </p>
        <div className='flex justify-around items-center w-full gap-3 flex-wrap'>
          <span className='createIcon flex gap-2' onClick={() => setOpenCreateIncome(true)}>
            <MdCreate className='my-auto' />
            <p className='my-auto'>انشاء</p>
          </span>
        </div>
      </div>
      <CreateOrUpdateIncome open={openCreateIncome} setOpen={setOpenCreateIncome} />

      <hr />

      <div className='flex flex-col gap-3 p-5 rounded-xl bg-sky-200'>
        <div className='flex gap-4 md:flex-row flex-col justify-between'>
          <div className='flex flex-col gap-1 w-full md:max-w-lg'>
            <p className='text-neutral-800'>التاريخ من</p>
            <DatePicker value={dayjs(apiContext?.from_date, "YYYY-MM-DD")} onChange={(e, date) => date ? apiContext?.setFromDate(date) : apiContext?.setFromDate(getCurrentDate())} />
          </div>
          <div className='flex flex-col gap-1 w-full md:max-w-lg'>
            <p className='text-neutral-800'>التاريخ من</p>
            <DatePicker value={dayjs(apiContext?.to_date, "YYYY-MM-DD")} onChange={(e, date) => date ? apiContext?.setToDate(date) : apiContext?.setToDate(getCurrentDate())} />
          </div>
        </div>
        <Button type='primary' className='w-fit' onClick={() => apiContext?.getIncomes()}>بحث</Button>
      </div>

      <hr />
      <div className='flex flex-wrap gap-5 justify-around min-h-fit max-h-[500px] overflow-scroll p-4 rounded-xl bg-indigo-500'>
        {
          incomeLoading ? <Loading /> :
            incomes?.length > 0 ?
              incomes?.map((income, index) => {
                return (
                  <IncomeContainer key={index} income={income} />
                )
              })
              : <p className='text-white'>لا يوجد ايرادات</p>
        }
      </div>
    </div>
  )
}

export default IncomeComponent