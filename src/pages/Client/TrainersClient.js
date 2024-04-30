import React, { useContext, useEffect } from 'react'
import Header from '../../components/Header'
import { ApiContextProvider } from '../../contexts/ApiContext'
import Trainer from '../../components/Trainer'
import { Button, Input, Select } from 'antd'
import Loading from '../../components/Loading'

const TrainersClient = () => {
  const apiContext = useContext(ApiContextProvider)

  const trainers = apiContext?.trainers
  useEffect(() => {
    apiContext?.getTrainers({})
  }, [])

  useEffect(() => {
    apiContext?.getAcademyTypes()
  }, [])

  const [type, setType] = React.useState('')
  const [priceFrom, setPriceFrom] = React.useState('')
  const [priceTo, setPriceTo] = React.useState('')

  return (
    <div className='flex flex-col gap-4'>
      <Header />
      <div className='flex flex-col gap-7 my-5 w-full max-w-5xl mx-auto'>
        {/* header */}
        <div className='flex flex-col gap-2 p-5 rounded-xl bg-white justify-between'>
          <div className='flex sm:flex-row flex-col gap-5'>
            <div className='flex flex-col w-full sm:max-w-xs'>
              <p>نوع الرياضة</p>
              <Select value={type} onChange={(e) => setType(e)}>
                <Select.Option value=''>الكل</Select.Option>
                {
                  apiContext?.types?.map(type => <Select.Option key={type.id} value={type.id}>{type.name}</Select.Option>)
                }
              </Select>
            </div>
            <div className='flex flex-col w-full sm:max-w-xs'>
              <p>السعر يبدأ من</p>
              <Input
                type='number'
                placeholder='مثال: 130'
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
              />
            </div>
            <div className='flex flex-col w-full sm:max-w-xs'>
              <p>اقصي سعر</p>
              <Input
                type='number'
                placeholder='مثال: 800'
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
              />
            </div>
          </div>
          <Button type='primary' size='large' className='w-full max-w-[160px] h-[45px]' onClick={() => apiContext?.getTrainers({ type: type, priceFrom: priceFrom, priceTo: priceTo })}>بحث</Button>
        </div>
        {/* trainers */}
        <div className='flex flex-wrap gap-5 p-4 justify-around'>
          {
            apiContext?.trainerLoading ? <Loading /> :
              trainers?.length > 0 ?
                trainers?.map((trainer, index) => (
                  <Trainer item={trainer} key={index} />
                ))
                : <p>لا يوجد مدربين</p>
          }
        </div>
      </div>
    </div>
  )
}

export default TrainersClient