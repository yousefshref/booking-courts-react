import React, { useContext, useEffect, useState } from 'react'
import { server } from '../utlits/Variables'
import { Button } from 'antd'
import CreateOrUpdateTrainers from './CreateOrUpdateTrainers'
import { ApiContextProvider } from '../contexts/ApiContext'
import CreateOrUpdateSubscribePlanModal from './Subscribe/CreateOrUpdateSubscribePlanModal'

const Trainer = ({ item }) => {
  const apiContext = useContext(ApiContextProvider)

  const [open, setOpen] = useState(false)

  const [openSubscribe, setOpenSubscribe] = useState(false)


  return (
    <div className='w-full max-w-[350px] shadow-xl shadow-indigo-100 flex flex-col gap-3 p-4 rounded-xl from-white to-indigo-50 bg-gradient-to-tr'>
      <img className='rounded-xl' src={server + item?.image} alt={item?.trainer} />
      <div className='flex flex-col'>
        <p className='text-zinc-700 text-2xl'>{item?.trainer}</p>
        <p>{item?.type_details?.name}</p>
        {
          item?.price_per_class !== 0 &&
          <p className='text-green-600'>{item?.price_per_class} EGP / في الحصة</p>
        }
        {
          item?.price_per_week !== 0 &&
          <p className='text-green-600'>{item?.price_per_week} EGP / في الاسبوع</p>
        }
        {
          item?.price_per_month !== 0 &&
          <p className='text-green-600'>{item?.price_per_month} EGP / في الشهر</p>
        }
        {
          item?.price_per_year !== 0 &&
          <p className='text-green-600'>{item?.price_per_year} EGP / في السنة</p>
        }
      </div>
      <Button onClick={() => setOpenSubscribe(true)} className='font h-[48px] bg-indigo-500 w-full' type='primary'>اشتراك</Button>
      <CreateOrUpdateSubscribePlanModal open={openSubscribe} setOpen={setOpenSubscribe} trainer={item} />
      {
        !apiContext?.profile?.user && (
          <>
            <Button onClick={() => setOpen(true)} className='font h-[48px] bg-blue-500 w-full' type='primary'>تعديل</Button>
            <Button onClick={() => apiContext?.deleteTrainer(item?.id, setOpen)} className='font h-[48px] bg-red-500 w-full' type='primary'>حذف</Button>
            <CreateOrUpdateTrainers open={open} setOpen={setOpen} trainer={item} />
          </>
        )
      }
      <p>{!item?.is_active && 'لم يتم الموافقة عليه بعد'}</p>
    </div>
  )
}

export default Trainer