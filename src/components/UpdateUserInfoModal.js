import { Button, Modal } from 'antd'
import React, { useContext, useState } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'

const UpdateUserInfoModal = ({ open, setOpen, user }) => {
  const apiCotext = useContext(ApiContextProvider)

  const [username, setUsername] = useState(user?.username || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')


  const [openVerification, setOpenVerification] = useState(false)

  const [code, setCode] = useState('')
  const sendWhastappCode = async () => {
    setOpenVerification(true)
    const verification = Math.floor(100000 + Math.random() * 900000);
    const res = await apiCotext?.sendWhastappCode({
      phone: user?.phone,
      verification: verification
    })
    console.log(res);
    // if(res.data.success){
    //   setOpenVerification(true)
    // }
  }

  const updateUserInfo = async () => {
    const data = new FormData()

    data.append('username', username)
    data.append('email', email)
    data.append('password', password)

  }


  return (
    <Modal
      centered
      title="تعديل المعلومات الشخصية"
      open={open}
      onCancel={() => setOpen(false)}
      width={500}
      onOk={() => sendWhastappCode()}
      className='font'
    >

      <Modal
        className='font'
        centered
        title="الكود المرسل الي محادثة الواتساب الخاصة بك"
        open={openVerification}
        onCancel={() => setOpenVerification(false)}
        width={400}
        onOk={() => updateUserInfo()}
      >
        <div className='flex flex-col gap-1'>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <p>انتظر يتم ارسال لك الكود....</p>
        </div>
      </Modal>

      <form className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <label>اسم المستخدم</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label>رقم الهاتف</label>
          <input
            readOnly
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label>البريد الالكتروني</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label>كلمة المرور</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  )
}

export default UpdateUserInfoModal