import React, { useContext } from 'react'
import CreateOrUpdateIncome from './CreateOrUpdateIncome'
import { FaEdit } from 'react-icons/fa'
import { BiTrash } from 'react-icons/bi'
import { ApiContextProvider } from '../../contexts/ApiContext'

const IncomeContainer = ({ income }) => {
  const [open, setOpen] = React.useState(false)

  const apiContext = useContext(ApiContextProvider)
  return (
    <div className='flex flex-col gap-3 p-5 from-white to-lime-50 bg-gradient-to-br rounded-xl w-full max-w-xs'>

      <div className='flex justify-between text-sm'>
        <span onClick={() => setOpen(true)} className='updateIcon'>
          <FaEdit />
        </span>

        <span onClick={() => apiContext?.deleteIncome(income?.id)} className='deleteIcon'>
          <BiTrash />
        </span>
      </div>

      <b className='text-2xl'>{income?.amount} EGP</b>
      <p className='text-zinc-600'>{income?.description}</p>
      <small>{`${new Date(income?.created_at).toISOString().slice(0, 10)} ${new Date(income?.created_at).toTimeString().slice(0, 5)}`}</small>

      <CreateOrUpdateIncome open={open} setOpen={setOpen} income={income} />
    </div>
  )
}

export default IncomeContainer