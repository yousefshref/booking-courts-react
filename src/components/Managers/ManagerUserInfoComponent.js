import React, { useContext, useEffect, useState } from 'react'
import { ApiContextProvider } from '../../contexts/ApiContext'
import Loading from '../Loading'
import { BiEdit } from 'react-icons/bi'
import UpdateUserInfoModal from '../UpdateUserInfoModal'

const ManagerUserInfoComponent = () => {
  const apiContext = useContext(ApiContextProvider)

  const user = apiContext?.user
  useEffect(() => {
    apiContext?.getUser()
  }, [])

  const [openEditUser, setOpenEditUser] = useState(false)

  return (
    <div className='flex flex-col gap-2 bg-white p-3 rounded-xl'>
      <div className='flex gap-2 justify-between'>
        <p className='my-auto font-bold'>المعلومات الشخصية</p>
        {/* <span onClick={() => setOpenEditUser(true)} className='updateIcon'>
          <BiEdit />
        </span> */}
        {/* <UpdateUserInfoModal user={user} open={openEditUser} setOpen={setOpenEditUser} /> */}
      </div>
      <hr />
      {
        user?.id ?
          <div className='flex flex-col gap-1'>
            <p>الاسم: {user?.username}</p>
            <p>رقم الهاتف: {user?.phone}</p>
            {
              user?.email &&
              <p>البريد الالكتروني: {user?.email}</p>
            }
          </div>
          : <Loading />
      }
    </div>
  )
}

export default ManagerUserInfoComponent