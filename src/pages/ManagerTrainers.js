import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { Button } from 'antd'
import CreateOrUpdateTrainers from '../components/CreateOrUpdateTrainers'
import { ApiContextProvider } from '../contexts/ApiContext'
import { server } from '../utlits/Variables'
import Trainer from '../components/Trainer'
import Loading from '../components/Loading'
import DisplaySubscriptions from '../components/Subscribe/DisplaySubscriptions'

const ManagerTrainers = () => {
  const apiContext = useContext(ApiContextProvider)

  useEffect(() => {
    apiContext?.getTrainers({})
  }, [])

  const [openTrainer, setOpenTrainer] = useState(false)
  const [openSubscribe, setOpenSubscribe] = useState(false)
  return (
    <div className='flex flex-col'>
      <Header />

      <div className='flex flex-col gap-3 w-full max-w-5xl mx-auto mt-8'>

        <div className='flex gap-3 justify-between my-auto'>
          <p className='my-auto'>المدربيين</p>
          <div className='flex gap-3 my-auto'>
            <Button onClick={() => setOpenTrainer(true)} className='font bg-indigo-300' type='primary'>انشاء مدرب</Button>
            <CreateOrUpdateTrainers open={openTrainer} setOpen={setOpenTrainer} />

            <Button onClick={() => setOpenSubscribe(true)} className='font border-indigo-300' type='default'>الاشتراكات</Button>
            <DisplaySubscriptions open={openSubscribe} setOpen={setOpenSubscribe} />
          </div>
        </div>

        <hr />

        <div className='flex gap-6 flex-wrap justify-around'>
          {
            apiContext?.trainerLoading ? <Loading /> :
              apiContext?.trainers?.length > 0 ?
                apiContext?.trainers?.map((item, index) => (
                  <Trainer item={item} key={index} />
                ))
                : <p>لا يوجد مدربين</p>
          }
        </div>

      </div>

    </div>
  )
}

export default ManagerTrainers