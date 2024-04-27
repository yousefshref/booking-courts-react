import React from 'react'
import { server } from '../utlits/Variables'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const AcademyCardClient = ({ academy }) => {
  const navigate = useNavigate()
  return (
    <div className='flex h-fit shadow-xl bg-white p-3 rounded-xl w-full max-w-xs flex-col gap-3'>
      <img className='w-full rounded-xl' alt={academy?.name} src={server + academy?.image} />
      <hr />
      <h3 className='text-lg font-bold'>{academy?.name}</h3>
      <p className='text-zinc-600'>{academy?.type_details?.name}</p>
      <small className='text-zinc-600'>{academy?.location}</small>
      <Button onClick={() => navigate(`/academies/${academy?.id}`)} className='font h-[50px] rounded-full' type='primary'>تفاصيل</Button>
    </div>
  )
}

export default AcademyCardClient