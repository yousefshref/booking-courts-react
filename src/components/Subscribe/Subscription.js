import React, { useEffect } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import CreateOrUpdateSubscribePlanModal from './CreateOrUpdateSubscribePlanModal'
import { ApiContextProvider } from '../../contexts/ApiContext'
import { Button } from 'antd'

const Subscription = ({ subscripe }) => {

  const apiContext = React.useContext(ApiContextProvider)

  const [profile, setProfile] = React.useState({})

  const checkProfile = async () => {
    const res = await apiContext?.checkProfile(localStorage.getItem('token'))
    setProfile(res?.data)
  }

  useEffect(() => {
    checkProfile()
  }, [])

  const [updateSubscripe, setUpdateSubscripe] = React.useState(false)

  return (
    <div className='relative w-full flex flex-col sm:flex-row gap-1 border border-zinc-700 rounded-xl p-2 bg-white'>

      <span onClick={() => setUpdateSubscripe(true)} className='text-blue-600 cursor-pointer absolute left-1'>
        <BiEdit />
      </span>
      {
        !profile?.user &&
        <span onClick={() => apiContext?.deleteSubscribe(subscripe?.id)} className='text-red-600 cursor-pointer absolute top-8 left-1'>
          <BiTrash />
        </span>
      }

      <CreateOrUpdateSubscribePlanModal open={updateSubscripe} setOpen={setUpdateSubscripe} subscripe={subscripe} />

      <div className='flex flex-col w-full max-w-[200px] my-auto'>
        <p className='text-zinc-700 my-auto'>{subscripe?.academy_subscribe_plan_details?.name || subscripe?.trainer_details?.trainer}</p>
        <p className='text-zinc-700 my-auto'>{subscripe?.academy_subscribe_plan_details?.price_per_class === subscripe?.price && 'في الحصة' || subscripe?.trainer_details?.price_per_class === subscripe?.price && 'في الحصة'}</p>
        <p className='text-zinc-700 my-auto'>{subscripe?.academy_subscribe_plan_details?.price_per_week === subscripe?.price && 'في الاسبوع' || subscripe?.trainer_details?.price_per_week === subscripe?.price && 'في الاسبوع'}</p>
        <p className='text-zinc-700 my-auto'>{subscripe?.academy_subscribe_plan_details?.price_per_month === subscripe?.price && 'في الشهر' || subscripe?.trainer_details?.price_per_month === subscripe?.price && 'في الشهر'}</p>
        <p className='text-zinc-700 my-auto'>{subscripe?.academy_subscribe_plan_details?.price_per_year === subscripe?.price && 'في السنة' || subscripe?.trainer_details?.price_per_year === subscripe?.price && 'في السنة'}</p>
      </div>
      <hr />
      <div className='flex flex-col w-full max-w-[200px] my-auto'>
        <p className='text-zinc-700 my-auto'>{subscripe?.name}</p>
        <p className='text-zinc-700 my-auto'>{subscripe?.phone}</p>
        <p className='text-zinc-700 my-auto'>{subscripe?.gender}</p>
        {
          subscripe?.father_phone &&
          <p className='text-zinc-700 my-auto flex gap-1'>هاتف الاب: {subscripe?.father_phone}</p>
        }
        {
          subscripe?.mother_phone &&
          <p className='text-zinc-700 my-auto flex gap-1'>هاتف الام: {subscripe?.mother_phone}</p>
        }
      </div>
      <div className='flex flex-col w-full max-w-[200px] my-auto'>
        <p className='text-green-800'>{subscripe?.price} EGP</p>
        {
          profile?.user && !subscripe?.is_approved ? (
            <div>
              <p className='text-red-800'>لم يتم الموافقة علي طلب الاشتراك</p>
            </div>
          ) :
            <>
              {
                subscripe?.is_approved ? (
                  <>
                    <p className='text-zinc-700 my-auto'>يبدأ في: {subscripe?.start_from}</p>
                    <p className='text-zinc-700 my-auto'>ينتهي في: {subscripe?.end_to}</p>
                  </>
                ) :
                  <>
                    <p className='text-red-700'>طلب من لاعب علي الاشتراك</p>
                  </>
              }
            </>
        }
      </div>
      <small className='flex w-full max-w-[200px] my-auto'>تم الانشاء في: {subscripe?.created_at}</small>
    </div>
  )
}

export default Subscription
