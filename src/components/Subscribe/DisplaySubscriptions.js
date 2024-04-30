import { Button, DatePicker, Input, Modal, Select } from 'antd'
import React, { useContext, useEffect } from 'react'
import { ApiContextProvider } from '../../contexts/ApiContext'
import Subscription from './Subscription'
import dayjs from 'dayjs'
import Loading from '../Loading'
import { getCurrentDate } from '../../utlits/Functions'

const DisplaySubscriptions = ({ open, setOpen, plan }) => {
  const apiContext = useContext(ApiContextProvider)

  const subscriptions = apiContext?.subscriptions

  const [subscriptionPhone, setSubscriptionPhone] = React.useState('')
  const [subscriptionDateFrom, setSubscriptionDateFrom] = React.useState(getCurrentDate())
  const [subscriptionDateTo, setSubscriptionDateTo] = React.useState('')
  const [isRequest, setIsRequest] = React.useState('')
  const [subscriptionStatus, setSubscriptionStatus] = React.useState('')



  useEffect(() => {
    apiContext?.getSubscriptions({
      plan_id: plan?.id,
      from_date: subscriptionDateFrom,
      to_date: subscriptionDateTo,
      is_approved: subscriptionStatus,
      requests_from_profile: isRequest,
    })
  }, [plan?.id])

  return (
    <Modal
      centered
      width={700}
      open={open}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      footer={null}
    >
      <div className='flex flex-col gap-2 bg-indigo-200 p-4 rounded-xl mb-4'>
        <div className='flex gap-3 md:flex-row flex-col w-full'>
          <div className='flex flex-col gap-1 md:w-1/2'>
            <p className='text-zinc-700'>تاريخ بدأ الاشتراك</p>
            <DatePicker value={subscriptionDateFrom ? dayjs(subscriptionDateFrom, 'YYYY-MM-DD') : ''} onChange={(date, dateString) => date ? setSubscriptionDateFrom(dateString) : setSubscriptionDateFrom('')} />
          </div>
          <div className='flex flex-col gap-1 md:w-1/2'>
            <p className='text-zinc-700'>تاريخ نهاية الاشتراك</p>
            <DatePicker value={subscriptionDateTo ? dayjs(subscriptionDateTo, 'YYYY-MM-DD') : ''} onChange={(date, dateString) => date ? setSubscriptionDateTo(dateString) : setSubscriptionDateTo('')} />
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-zinc-700'>رقم الهاتف</p>
          <Input type='number' value={subscriptionPhone} onChange={(e) => setSubscriptionPhone(e.target.value)} />
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-zinc-700'>الطلبات فقط</p>
          <Select value={isRequest} onChange={(e) => setIsRequest(e)}>
            <Select.Option value=''>ليس مهم</Select.Option>
            <Select.Option value={'True'}>نعم</Select.Option>
            <Select.Option value={'False'}>لا</Select.Option>
          </Select>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-zinc-700'>تم الموافقة علي الطلب</p>
          <Select value={subscriptionStatus} onChange={(e) => setSubscriptionStatus(e)}>
            <Select.Option value=''>ليس مهم</Select.Option>
            <Select.Option value={'True'}>نعم</Select.Option>
            <Select.Option value={'False'}>لا</Select.Option>
          </Select>
        </div>
        <div className='flex flex-col gap-1'>
          <Button onClick={() => {
            apiContext?.getSubscriptions({
              plan_id: plan?.id,
              from_date: subscriptionDateFrom,
              to_date: subscriptionDateTo,
              is_approved: subscriptionStatus,
              requests_from_profile: isRequest,
            })
          }} className='w-fit' type='primary'>بحث</Button>
        </div>
      </div>

      <hr className='bg-indigo-700 py-[0.5px] my-2' />

      <div className='summerizeOfTotalEarn flex flex-wrap gap-5 justify-around'>
        <p>المنتظر من طلبات الاشتراكات: {subscriptions?.filter(sub => sub?.request_from_profile && !sub?.is_approved)?.reduce((a, b) => a + b?.price, 0)} EGP</p>
        <p>اجمالي المدفوع: {subscriptions?.filter(sub => sub?.is_approved)?.reduce((a, b) => a + b?.price, 0)} EGP</p>
      </div>

      <hr className='bg-indigo-700 py-[0.5px] my-2' />

      <div className='flex flex-col gap-5 min-h-fit max-h-[500px] overflow-scroll bg-indigo-300 rounded-xl p-3'>

        {
          apiContext?.loadingSubscriptions ? <Loading /> :
            subscriptions?.length > 0 ?
              subscriptions?.map((subscripe, index) => (
                <Subscription key={index} subscripe={subscripe} />
              ))
              : <p className='text-center'>لا يوجد اشتراكات</p>
        }

      </div>
    </Modal>
  )
}

export default DisplaySubscriptions
