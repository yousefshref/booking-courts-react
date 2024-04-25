import { Button, Input, message, Modal } from 'antd'
import React, { useContext } from 'react'
import { ApiContextProvider } from '../contexts/ApiContext'
import { useNavigate } from 'react-router-dom'
import { CgClose } from 'react-icons/cg'
import CreateOrUpdateManagerProfile from '../components/ManagerProfile/CreateOrUpdateManagerProfile'
import CreateOrUpdateUserProfile from '../components/UserProfile/CreateOrUpdateUserProfile'

const ChooseProfile = () => {

  const [createManagerOpen, setCreateManagerOpen] = React.useState(false)


  const [createPlayerOpen, setCreatePlayerOpen] = React.useState(false)



  return (
    <div className='h-screen p-4 flex flex-col justify-center w-full mx-auto'>

      <p className='text-center mb-5 text-3xl'>أختر نوع حسابك</p>

      <div className='flex flex-col md:flex-row gap-16 justify-around w-full max-w-7xl mx-auto'>

        <div onClick={() => setCreateManagerOpen(true)} className='relative transition-all cursor-pointer hover:scale-105 duration-500 active:scale-100 flex flex-col justify-center text-center w-1/2 h-[400px] overflow-hidden shadow-lg p-5 rounded-xl bg-center bg-cover' style={{ backgroundImage: "url('/images/manager.jpeg')" }}>
          <div className='absolute top-0 left-0 w-full h-full from-black to-indigo-100 bg-gradient-to-t opacity-40'></div>
          <div className='flex flex-col gap-2'>
            <b className='text-white text-3xl z-10'>اكاديمية/ مدير ملاعب</b>
          </div>
        </div>
        <CreateOrUpdateManagerProfile create={true} open={createManagerOpen} setOpen={setCreateManagerOpen} />


        <div onClick={() => setCreatePlayerOpen(true)} className='relative transition-all cursor-pointer hover:scale-105 duration-500 active:scale-100 flex flex-col justify-center text-center w-1/2 h-[400px] overflow-hidden shadow-lg p-5 rounded-xl bg-center bg-cover' style={{ backgroundImage: "url('/images/player.jpg')" }}>
          <div className='absolute top-0 left-0 w-full h-full from-black to-indigo-100 bg-gradient-to-t opacity-40'></div>
          <div className='flex flex-col gap-2'>
            <b className='text-white text-3xl z-10'>لاعب</b>
          </div>
        </div>
        <CreateOrUpdateUserProfile create={true} open={createPlayerOpen} setOpen={setCreatePlayerOpen} />


      </div>
    </div>
  )
}

export default ChooseProfile