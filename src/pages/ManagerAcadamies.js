import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import CreateAcademyButton from '../components/CreateAcademyButton'
import { ApiContextProvider } from '../contexts/ApiContext'
import { Backdrop, CircularProgress } from '@mui/material'
import AcademyCard from '../components/AcademyCard'
import { Button, Result } from 'antd'

const ManagerAcadamies = () => {

  const apiContext = useContext(ApiContextProvider)


  const [checkProfile, setCheckProfile] = useState(null)

  const checkUser = async () => {
    const res = await apiContext?.checkProfile(localStorage.getItem('token'))
    setCheckProfile(res.data)
  }
  useEffect(() => {
    const token = localStorage.getItem('token'); // Fetch token only once
    if (token) {
      checkUser();
    }
  }, [])



  const [academies, setAcademies] = useState([])
  const [loading, setLoading] = useState(true)

  const getAcademies = async () => {
    setLoading(true)
    try {
      const res = await apiContext?.getAcademies()
      setAcademies(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkProfile && getAcademies()
  }, [checkProfile])




  if (checkProfile?.manager && !checkProfile?.manager?.can_academy && !checkProfile?.manager?.is_verified) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="ليس لديك الصلاحية للدخول, لتفعيل حسابك وادارة الملاعب او الاكاديميات يرجي التواصل مع الدعم"
        extra={<Button href='https://wa.me/201229977573' className='font' type="primary">الدعم</Button>}
      />
    )
  }

  return (
    <div className='flex flex-col'>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Header />
      <div className='flex flex-col gap-3 mt-5 p-5 w-full max-w-5xl mx-auto'>
        {/* academies and create new one */}
        <CreateAcademyButton getAcademies={getAcademies} />

        <div className='flex flex-wrap gap-5 p-5 justify-around bg-indigo-100 rounded-xl max-h-[700px] min-h-fit overflow-scroll'>
          {
            academies?.length > 0 ?
              academies?.map((academy) => (
                <AcademyCard key={academy?.id} academy={academy} getAcademies={getAcademies} />
              ))
              : <p className='my-auto text-red-600'>لا يوجد اكاديميات</p>
          }
        </div>

      </div>



    </div>
  )
}

export default ManagerAcadamies
