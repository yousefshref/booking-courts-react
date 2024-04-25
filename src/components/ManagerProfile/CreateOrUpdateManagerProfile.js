import React, { useContext, useEffect } from 'react'
import { ApiContextProvider } from '../../contexts/ApiContext'
import { CgClose } from 'react-icons/cg'
import { Input, message, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'
import { server } from '../../utlits/Variables'

const CreateOrUpdateManagerProfile = ({ open, setOpen, create, profile, checkProfile }) => {

  const apiContext = useContext(ApiContextProvider)

  const navigate = useNavigate()

  const [msg, setMsg] = message.useMessage();

  const success = (text) => {
    msg.success(text);
  }

  const error = (text) => {
    msg.error(text);
  }

  const [loading, setLoading] = React.useState(false)

  const [profileImage, setProfileImage] = React.useState('')
  const [brandName, setBrandName] = React.useState('')
  const [bio, setBio] = React.useState('')

  useEffect(() => {
    if (profile) {
      setProfileImage(profile?.logo)
      setBrandName(profile?.brand_name)
      setBio(profile?.bio)
    }
  }, [profile])

  const createManagerProfile = async () => {
    setLoading(true)

    const data = new FormData()

    data.append('logo', profileImage)
    data.append('brand_name', brandName)
    data.append('bio', bio)

    try {
      const res = await apiContext?.createManagerProfile(data)
      if (res?.data?.id) {
        success('تم انشاء ملفك الشخصي بنجاح')
        navigate(`/manager/${res.data.user_details?.username}`)
      } else {
        Object?.entries(res?.data || {}).forEach(([key, value]) => error(`${key}: ${value?.join(', ')}`))
      }
    } catch (err) {
      error('تأكد من ملئ الخانات المطلوبة')
    } finally {
      setLoading(false)
    }
  }

  const updateManagerProfile = async () => {
    setLoading(true)

    const data = new FormData()

    if (typeof profileImage == 'object') data.append('logo', profileImage)
    if (profileImage == '') data.append('logo', profileImage)

    data.append('brand_name', brandName)
    data.append('bio', bio)

    try {
      const res = await apiContext?.updateManagerProfile(data)
      if (res?.data?.id) {
        success('تم تعديل ملفك الشخصي بنجاح')
        checkProfile()
      } else {
        Object?.entries(res?.data || {}).forEach(([key, value]) => error(`${key}: ${value?.join(', ')}`))
      }
    } catch (err) {
      error('تأكد من ملئ الخانات المطلوبة')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="انشاء حساب مدير ملاعب"
      open={open}
      onOk={() => {
        if (create) {
          createManagerProfile()
        } else {
          updateManagerProfile()
        }
      }
      }
      onCancel={() => setOpen(false)}
      centered
      className='font'
      closeIcon={false}
    >
      {setMsg}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <p>لوجو/ صورة للصفحة الشخصية</p>
          {
            typeof profileImage == 'object' && profileImage && <img src={URL.createObjectURL(profileImage)} width={100} />
          }
          {
            typeof profileImage == 'string' && profileImage && <img src={server + profileImage} width={100} />
          }
          {
            profileImage && <CgClose className='cursor-pointer text-red-700 text-2xl' onClick={() => setProfileImage('')} />
          }
          <Input onChange={(e) => setProfileImage(e.target.files[0])} type='file' />
        </div>
        <div className='flex flex-col gap-2'>
          <p>اسم الاكاديمية/ النادي *</p>
          <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} type='text' />
        </div>
        <div className='flex flex-col gap-2'>
          <p>وصف في الصفحة الشخصية</p>
          <Input.TextArea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
      </div>
    </Modal>
  )
}

export default CreateOrUpdateManagerProfile
