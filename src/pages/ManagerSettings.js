import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { Button, Input, message, Modal, Upload } from 'antd'
import ManagerSettingsComponent from '../components/ManagerSettingsComponent'
import { ApiContextProvider } from '../contexts/ApiContext'
import { BiEdit, BiTrash } from 'react-icons/bi'
import DisplayWhiteLists from '../components/DisplayWhiteLists'
import { UploadOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const ManagerSettings = ({ open, setOpen }) => {

  const apiContext = useContext(ApiContextProvider)

  const [messageApi, contextHolder] = message.useMessage();

  const success = (msg) => {
    messageApi.success(msg);
  };

  const error = (msg) => {
    messageApi.error(msg);
  };




  const [displayWhiteLists, setDisplayWhiteLists] = useState(false)

  const [whitelist, setWhitelist] = useState({ phone: '', image: null, image2: null })

  const createWhtieList = async () => {
    const data = new FormData()

    data.append('phone', whitelist?.phone)
    if (whitelist?.image) {
      data.append('image', whitelist?.image)
    }
    if (whitelist?.image2) {
      data.append('image2', whitelist?.image2)
    }

    const res = await apiContext?.createWhtieList(data)

    if (res.data.id) {
      success('تم الانشاء بنجاح')
      setDisplayWhiteLists(false)
      setWhitelist({ phone: '', image: null, image2: null })
    } else {
      Object?.entries(res?.data)?.forEach(([key, value]) => {
        error(value)
      })
    }
  }


  const navigate = useNavigate()

  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      className='flex flex-col gap-4 max-h-[500px] overflow-y-scroll'
      closeIcon={false}
      footer={null}
    >
      {contextHolder}

      <div onClick={() => { navigate(`/manager/${localStorage.getItem('username')}/balance/`) }} className='flex w-full max-w-4xl mx-auto text-center flex-col transition-all duration-200 hover:text-white cursor-pointer hover:bg-indigo-900 gap-8 p-3 bg-indigo-300 rounded-xl'>
        <b>تفاصيل رصيد اليوم</b>
      </div>


      <ManagerSettingsComponent success={success} error={error} />


      {/* white list */}
      <div className='flex flex-col gap-4 p-4 w-full max-w-4xl mx-auto'>
        <div className='flex gap-2 justify-between flex-wrap'>
          <p>القائمة البيضاء</p>
          <small className='text-blue-600'>يمكنك اضافة اشخاص يمكنهم الحجز بدون قيود, او الدفع في اي وقت</small>
        </div>
        <hr />
        <div className='flex flex-col gap-4 bg-white p-4 shadow-md'>
          <div className='flex flex-col gap-2'>
            <p>رقم هاتف اللاعب</p>
            <Input className='p-4' value={whitelist?.phone} onChange={(e) => setWhitelist({ ...whitelist, phone: e.target.value })} />
          </div>
          <div className='flex flex-col gap-2'>
            <p>صورة 1</p>
            <Input type='file' className='p-4' onChange={(e) => setWhitelist({ ...whitelist, image: e?.target?.files[0] })} />
          </div>
          <div className='flex flex-col gap-2'>
            <p>صورة 2</p>
            <Input type='file' className='p-4' onChange={(e) => setWhitelist({ ...whitelist, image2: e?.target?.files[0] })} />
          </div>
          <div className='flex gap-5 flex-wrap'>
            <Button onClick={createWhtieList} className='font w-fit rounded-xl bg-green-500' type='primary'>انشاء</Button>
            <Button onClick={() => setDisplayWhiteLists(true)} className='font w-fit rounded-xl' type='default'>رؤية القائمة البيضاء</Button>
          </div>

          {/* whitelists */}
          <DisplayWhiteLists open={displayWhiteLists} setOpen={setDisplayWhiteLists} />

        </div>
      </div>


    </Modal>
    // <div className='flex flex-col gap-4'>
    //   {contextHolder}
    //   <Header />

    //   <div onClick={() => { navigate(`/manager/${localStorage.getItem('username')}/balance/`) }} className='flex w-full max-w-4xl mx-auto text-center flex-col transition-all duration-200 hover:text-white cursor-pointer hover:bg-indigo-900 gap-8 p-3 bg-indigo-300 rounded-xl'>
    //     <b>تفاصيل رصيد اليوم</b>
    //   </div>


    //   <ManagerSettingsComponent success={success} error={error} />


    //   {/* white list */}
    //   <div className='flex flex-col gap-4 p-4 w-full max-w-4xl mx-auto'>
    //     <div className='flex gap-2 justify-between flex-wrap'>
    //       <p>القائمة البيضاء</p>
    //       <small className='text-blue-600'>يمكنك اضافة اشخاص يمكنهم الحجز بدون قيود, او الدفع في اي وقت</small>
    //     </div>
    //     <hr />
    //     <div className='flex flex-col gap-4 bg-white p-4 shadow-md'>
    //       <div className='flex flex-col gap-2'>
    //         <p>رقم هاتف اللاعب</p>
    //         <Input className='p-4' value={whitelist?.phone} onChange={(e) => setWhitelist({ ...whitelist, phone: e.target.value })} />
    //       </div>
    //       <div className='flex flex-col gap-2'>
    //         <p>صورة 1</p>
    //         <Input type='file' className='p-4' onChange={(e) => setWhitelist({ ...whitelist, image: e?.target?.files[0] })} />
    //       </div>
    //       <div className='flex flex-col gap-2'>
    //         <p>صورة 2</p>
    //         <Input type='file' className='p-4' onChange={(e) => setWhitelist({ ...whitelist, image2: e?.target?.files[0] })} />
    //       </div>
    //       <div className='flex gap-5 flex-wrap'>
    //         <Button onClick={createWhtieList} className='font w-fit rounded-xl bg-green-500' type='primary'>انشاء</Button>
    //         <Button onClick={() => setDisplayWhiteLists(true)} className='font w-fit rounded-xl' type='default'>رؤية القائمة البيضاء</Button>
    //       </div>

    //       {/* whitelists */}
    //       <DisplayWhiteLists open={displayWhiteLists} setOpen={setDisplayWhiteLists} />

    //     </div>
    //   </div>


    // </div>
  )
}

export default ManagerSettings