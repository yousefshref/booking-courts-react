import React, { useContext, useEffect, useState } from 'react'
import ProfileLayout from './ProfileLayout'
import { ApiContextProvider } from '../../contexts/ApiContext'
import InvoiceComponent from '../Invoices/InvoiceComponent'

const UserProfileAcademiesSubscribations = () => {
  const apiContext = useContext(ApiContextProvider)

  const [invoices, setInvoices] = useState([])

  const getInvoices = async () => {
    const res = await apiContext?.getInvoices({
    })
    setInvoices(res?.data)
  }

  useEffect(() => {
    getInvoices()
  }, [])


  return (
    <ProfileLayout>
      {
        invoices?.length > 0 ? (
          invoices?.map((invoice, index) => (
            <InvoiceComponent academy={true} key={index} invoice={invoice} />
          ))
        )
          : (
            <p className='text-center text-gray-500'>لا يوجد اشتراكات</p>
          )
      }
    </ProfileLayout>
  )
}

export default UserProfileAcademiesSubscribations