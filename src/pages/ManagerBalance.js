import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { Button, Input } from 'antd'
import CreateOrUpdateIncome from '../components/Income/CreateOrUpdateIncome'
import { ApiContextProvider } from '../contexts/ApiContext'
import CreateOrUpdateExpense from '../components/Expense/CreateOrUpdateExpense'
import dayjs from 'dayjs'
import { BiTrash } from 'react-icons/bi'
import { getCurrentDate } from '../utlits/Functions'

const ManagerBalance = () => {
  const apiContext = useContext(ApiContextProvider)

  const incomes = apiContext?.incomes
  const expenses = apiContext?.expenses


  const [openIncome, setOpenIncome] = useState(false)
  const [openExpense, setOpenExpense] = useState(false)


  const [originalInvoices, setOriginalInvoices] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Add a sortable date field to each income and expense object
    const incomesWithField = incomes?.map(income => ({
      ...income,
      income: true,
      sortableDate: new Date(`1970-01-01T${income.created_time}`), // Assuming your created_time field format is 'HH:MM:SS'
    }));

    const expensesWithField = expenses?.map(expense => ({
      ...expense,
      expense: true,
      sortableDate: new Date(`1970-01-01T${expense.created_time}`), // Assuming your created_time field format is 'HH:MM:SS'
    }));

    // Combine incomes and expenses into a single array
    const combinedInvoices = [...incomesWithField, ...expensesWithField];

    // Sort the combined array by created_time
    const sortedInvoices = combinedInvoices.sort((a, b) => b.sortableDate - a.sortableDate);

    // Update state with the sorted array and store original sorted invoices
    setInvoices(sortedInvoices);
    setOriginalInvoices(sortedInvoices);
  }, [incomes, expenses]);

  const [createdAt, setCreatedAt] = useState(getCurrentDate());
  const [endAt, setEndAt] = useState(getCurrentDate());
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (description || createdAt || endAt) {
      const filteredInvoices = originalInvoices.filter(invoice => {
        const descriptionMatch = description ? invoice.description?.includes(description) : true;
        const dateMatch = createdAt ? new Date(invoice.created_at) >= new Date(createdAt) : true;
        const dateEndMatch = endAt ? new Date(invoice.created_at) <= new Date(endAt) : true;
        return descriptionMatch && dateMatch && dateEndMatch;
      });
      setInvoices(filteredInvoices);
    } else {
      // If both description and createdAt become null, revert back to original sorted invoices
      setInvoices(originalInvoices);
    }
  }, [description, createdAt, originalInvoices, endAt]);


  return (
    <div className='flex flex-col gap-5'>
      <Header />

      <div className='flex flex-col gap-8 p-5 w-full max-w-5xl mx-auto'>
        {/* header */}
        <div className='flex flex-col'>
          <div className='flex flex-col md:flex-row justify-between gap-3 p-4 rounded-t-xl from-indigo-300 to-blue-300 bg-gradient-to-bl'>
            <div className='search_container flex gap-4'>
              <div className='flex flex-col gap-1 w-full max-w-[300px]'>
                <p>الوصف</p>
                <Input className='w-full' value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className='flex flex-col gap-1 w-full max-w-[300px]'>
                <p>تم الانشاء من يوم</p>
                <Input className='w-full' type='date' value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} />
              </div>
              <div className='flex flex-col gap-1 w-full max-w-[300px]'>
                <p>حتي يوم</p>
                <Input className='w-full' type='date' value={endAt} onChange={(e) => setEndAt(e.target.value)} />
              </div>
            </div>
            <div className='createButtons flex flex-col justify-center gap-3'>
              <Button onClick={() => setOpenIncome(true)} className='font' type='primary' style={{ backgroundColor: '#00b894' }}>انشاء ايراد</Button>
              <CreateOrUpdateIncome open={openIncome} setOpen={setOpenIncome} />

              <Button onClick={() => setOpenExpense(true)} className='font' type='primary' style={{ backgroundColor: '#e84118' }}>انشاء مصروف</Button>
              <CreateOrUpdateExpense open={openExpense} setOpen={setOpenExpense} />
            </div>
          </div>
          <div className='w-full max-w-lg mx-auto p-3 rounded-b-xl bg-indigo-300 text-zinc-800 flex gap-7 flex-wrap justify-around'>
            <b>الايرادات: {invoices?.filter(inv => inv?.income)?.reduce((a, b) => a + b.amount, 0)} EGP</b>
            <b>المصروفات: {invoices?.filter(inv => inv?.expense)?.reduce((a, b) => a + b.amount, 0)} EGP</b>
            <b>صافي الربح: {invoices?.filter(inv => inv?.income)?.reduce((a, b) => a + b.amount, 0) - invoices?.filter(inv => inv?.expense)?.reduce((a, b) => a + b.amount, 0)} EGP</b>
          </div>
        </div>

        {/* summry */}
        <div className='flex flex-col gap-4'>
          {
            invoices?.length > 0 ?
              invoices?.map((invoice, index) => (
                <div key={index} className={`relative ${invoice?.income && 'bg-green-300'} ${invoice?.expense && 'bg-red-300'} flex flex-col p-4 rounded-xl transition-all cursor-pointer border hover:border-indigo-500`}>
                  <span onClick={() => {
                    if (invoice?.income) {
                      apiContext?.deleteIncome(invoice?.id)
                    } else {
                      apiContext?.deleteExpense(invoice?.id)
                    }
                  }} className={`absolute top-2 left-2 deleteIcon`}>
                    <BiTrash />
                  </span>
                  <p className='text-xl text-zinc-700'>{invoice?.amount} EGP</p>
                  {
                    invoice?.description &&
                    <p>{invoice?.description}</p>
                  }
                  <small>{invoice?.created_at}</small>
                  <small>{dayjs(invoice?.created_time, 'HH:mm:ss').format('hh:mm A')}</small>
                </div>
              ))
              : <p>لا يوجد ايرادات او مصروفات اليوم</p>
          }
        </div>
      </div>
    </div>
  )
}

export default ManagerBalance