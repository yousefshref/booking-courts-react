import React, { useEffect } from 'react'
import { BiEdit } from 'react-icons/bi'
import CreateOrUpdateSubscribePlanModal from './CreateOrUpdateSubscribePlanModal'
import { ApiContextProvider } from '../../contexts/ApiContext'

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
    <div className='relative flex flex-col gap-1 border border-zinc-700 rounded-xl p-2 bg-white'>

      {
        !profile?.user &&
        <span onClick={() => setUpdateSubscripe(true)} className='absolute top-1 left-1 updateIcon'>
          <BiEdit />
        </span>
      }

      <CreateOrUpdateSubscribePlanModal open={updateSubscripe} setOpen={setUpdateSubscripe} subscripe={subscripe} />

      <div className='flex flex-col'>
        <p className='text-zinc-700'>{subscripe?.academy_subscribe_plan_details?.name}</p>
        <p className='text-zinc-700'>{subscripe?.academy_subscribe_plan_details?.price_per_class === subscripe?.price && 'في الحصة'}</p>
        <p className='text-zinc-700'>{subscripe?.academy_subscribe_plan_details?.price_per_week === subscripe?.price && 'في الاسبوع'}</p>
        <p className='text-zinc-700'>{subscripe?.academy_subscribe_plan_details?.price_per_month === subscripe?.price && 'في الشهر'}</p>
        <p className='text-zinc-700'>{subscripe?.academy_subscribe_plan_details?.price_per_year === subscripe?.price && 'في السنة'}</p>
      </div>
      <hr />
      <p className='text-zinc-700'>{subscripe?.name}</p>
      <p className='text-zinc-700'>{subscripe?.phone}</p>
      <p className='text-zinc-700'>{subscripe?.birth_date}</p>
      <p className='text-zinc-700'>{subscripe?.gender}</p>
      {
        subscripe?.father_phone &&
        <p className='text-zinc-700 flex gap-1'>هاتف الاب: {subscripe?.father_phone}</p>
      }
      {
        subscripe?.mother_phone &&
        <p className='text-zinc-700 flex gap-1'>هاتف الام: {subscripe?.mother_phone}</p>
      }
      <hr className='bg-zinc-700 py-[0.5px]' />
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
                  <p className='text-zinc-700'>يبدأ في: {subscripe?.start_from}</p>
                  <p className='text-zinc-700'>ينتهي في: {subscripe?.end_to}</p>
                  <hr className='bg-zinc-700 py-[0.5px]' />
                </>
              ) :
                <>
                  <p className='text-red-700'>طلب من لاعب علي الاشتراك</p>
                </>
            }
          </>
      }
      <small>تم الانشاء في: {subscripe?.created_at}</small>
    </div>
  )
}

export default Subscription
