import React, { useContext, useEffect } from 'react'
import ProfileLayout from '../../components/UserProfile/ProfileLayout'
import { ApiContextProvider } from '../../contexts/ApiContext'
import Loading from '../../components/Loading'
import Subscription from '../../components/Subscribe/Subscription'

const UserSubscriptions = () => {

  const apiContext = useContext(ApiContextProvider)

  const subsription = apiContext?.subscriptions


  return (
    <ProfileLayout>
      {
        apiContext?.loadingSubscriptions ? <Loading /> :
          subsription?.length > 0 ? subsription?.map((sub, index) => (
            <Subscription subscripe={sub} key={index} />
          )) : null
      }
    </ProfileLayout>
  )
}

export default UserSubscriptions