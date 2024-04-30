import React, { useContext, useEffect } from 'react'
import ProfileLayout from '../../components/UserProfile/ProfileLayout'
import { ApiContextProvider } from '../../contexts/ApiContext'
import Subscription from '../../components/Subscribe/Subscription'
import Loading from '../../components/Loading'

const TrainersClientSubscriptions = () => {
  const apiContext = useContext(ApiContextProvider)

  const subscriptions = apiContext?.subscriptions
  useEffect(() => {
    apiContext?.getSubscriptions({})
  }, [])

  return (
    <ProfileLayout>
      <div className='flex flex-col p-5 rounded-xl bg-white shadow-lg shadow-indigo-50'>
      </div>
      <div className='flex flex-wrap gap-5'>
        {
          apiContext?.loadingSubscriptions ? <Loading /> :
            subscriptions?.length > 0 ?
              subscriptions?.map((sub, index) => (
                <Subscription subscripe={sub} key={index} />
              ))
              : <p>لا يوجد اشتراكات</p>
        }
      </div>
    </ProfileLayout>
  )
}

export default TrainersClientSubscriptions