import { Input, Modal } from 'antd'
import React, { useContext, useState } from 'react'
import { ApiContextProvider } from '../../contexts/ApiContext'

const CreateOrUpdateIncome = ({ open, setOpen, income }) => {

  const apiContext = useContext(ApiContextProvider)


  const [amount, setAmount] = useState(income?.amount || 0)
  const [description, setDescription] = useState(income?.description || '')


  return (
    <Modal
      centered
      width={600}
      open={open}
      onOk={() => {
        if (income?.id) {
          apiContext?.updateIncome(income?.id, { amount, description })
        } else {
          apiContext?.createIncome({ amount, description })
          setAmount(0)
          setDescription('')
          setOpen(false)
        }
      }}
      onCancel={() => setOpen(false)}
      closeIcon={false}
    >
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2 border border-indigo-200 p-4 rounded-xl'>
          <p className='text-zinc-500'>المبلغ</p>
          <Input value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div className='flex flex-col gap-2 border border-indigo-200 p-4 rounded-xl'>
          <p className='text-zinc-500'>وصف (أختياري)</p>
          <Input.TextArea value={description} onChange={e => setDescription(e.target.value)} />
        </div>
      </div>
    </Modal>
  )
}

export default CreateOrUpdateIncome