import React, { useContext } from 'react'
import { BiTrash } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import CreateOrUpdateExpense from './CreateOrUpdateExpense'
import { ApiContextProvider } from '../../contexts/ApiContext'

const ExpenseContainer = ({ expense }) => {

  const apiContext = useContext(ApiContextProvider)

  const [open, setOpen] = React.useState(false)
  return (
    <div className='flex flex-col gap-3 p-5 from-white to-lime-50 bg-gradient-to-br rounded-xl w-full max-w-xs'>

      <div className='flex justify-between text-sm'>
        <span onClick={() => setOpen(true)} className='updateIcon'>
          <FaEdit />
        </span>

        <span onClick={() => apiContext?.deleteExpense(expense?.id)} className='deleteIcon'>
          <BiTrash />
        </span>
      </div>

      <b className='text-2xl'>{expense?.amount} EGP</b>
      <p className='text-zinc-600'>{expense?.description}</p>
      <small>{`${new Date(expense?.created_at).toISOString().slice(0, 10)} ${new Date(expense?.created_at).toTimeString().slice(0, 5)}`}</small>

      <CreateOrUpdateExpense open={open} setOpen={setOpen} expense={expense} />
    </div>
  )
}

export default ExpenseContainer
