import React from 'react'
import { ApiContextProvider } from '../../contexts/ApiContext'
import Loading from '../Loading'
import { server } from '../../utlits/Variables'
import { BiEdit } from 'react-icons/bi'
import CreateOrUpdateManagerProfile from './CreateOrUpdateManagerProfile'

const ManagerProfileComponent = () => {
  const apiContext = React.useContext(ApiContextProvider)

  const [profile, setProfile] = React.useState({})

  const [loading, setLoading] = React.useState(true)

  const checkProfile = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.checkProfile(localStorage.getItem('token'))
      setProfile(res?.data?.manager)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    localStorage.getItem('token') && checkProfile()
  }, [])


  const [openUpdateProfile, setOpenUpdateProfile] = React.useState(false)

  return (
    <div className='relative flex flex-col gap-2 p-5 rounded-xl bg-white shadow-md w-full max-w-5xl mx-auto'>

      <span onClick={() => setOpenUpdateProfile(true)} className='absolute text-2xl top-2 left-2 cursor-pointer text-blue-700'>
        <BiEdit />
      </span>

      <CreateOrUpdateManagerProfile checkProfile={checkProfile} profile={profile} create={false} open={openUpdateProfile} setOpen={setOpenUpdateProfile} />

      {
        loading ? <Loading /> : (
          <div className='flex flex-col gap-4'>
            <img src={server + profile?.logo} alt={profile?.brand_name} className='w-1/3 mx-auto' />
            <div className='bg-indigo-200 p-4 rounded-xl text-start'>
              <p className='text-3xl font-medium'>{profile?.brand_name}</p>
              <p className='text-lg mt-2 text-zinc-600'>{profile?.bio}</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ManagerProfileComponent
