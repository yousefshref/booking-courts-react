import { DatePicker, Input, Modal, Select } from 'antd'
import React, { useEffect } from 'react'
import { server } from '../../utlits/Variables'
import dayjs from 'dayjs'
import { ApiContextProvider } from '../../contexts/ApiContext'
import axios from 'axios'
import { FiDelete } from 'react-icons/fi'
import { TiDelete } from 'react-icons/ti'
import { Backdrop, CircularProgress } from '@mui/material'

const CreateOrUpdateSubscribePlanModal = ({ open, setOpen, plan, subscripe }) => {

  const apiContext = React.useContext(ApiContextProvider)

  const [planDetail, setPlanDetail] = React.useState({})

  const getPlanDetail = async () => {
    const res = await axios.get(`${server}academy-subscribe-plan/${plan?.id || subscripe?.academy_subscribe_plan}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    setPlanDetail(res?.data)
  }

  useEffect(() => {
    if (plan || subscripe?.academy_subscribe_plan) getPlanDetail()
  }, [])




  const [profile, setProfile] = React.useState({})

  const checkProfile = async () => {
    const res = await apiContext?.checkProfile(localStorage.getItem('token'))
    setProfile(res?.data)
  }

  useEffect(() => {
    checkProfile()
  }, [])





  const [academySubscribePlan, setAcademySubscribePlan] = React.useState(plan?.id || subscripe?.academy_subscribe_plan || '')

  const [playerImage, setPlayerImage] = React.useState(subscripe?.player_image || '')
  const [birthCirtificate, setBirthCirtificate] = React.useState(subscripe?.birth_cirtificate || '')
  const [nationalIdImage1, setNationalIdImage1] = React.useState(subscripe?.national_id_image1 || '')
  const [nationalIdImage2, setNationalIdImage2] = React.useState(subscripe?.national_id_image2 || '')
  const [nationalIdParent1, setNationalIdParent1] = React.useState(subscripe?.national_id_parent1 || '')
  const [nationalIdParent2, setNationalIdParent2] = React.useState(subscripe?.national_id_parent2 || '')
  const [passportImage, setPassportImage] = React.useState(subscripe?.passport_image || '')

  const [name, setName] = React.useState(subscripe?.name || '')
  const [phone, setPhone] = React.useState(!profile?.user ? subscripe?.phone || '' : profile?.user?.user_details?.phone || '')
  const [birthDate, setBirthDate] = React.useState(subscripe?.birth_date || '')
  const [gender, setGender] = React.useState(subscripe?.gender || '')
  const [motherPhone, setMotherPhone] = React.useState(subscripe?.mother_phone || '')
  const [fatherPhone, setFatherPhone] = React.useState(subscripe?.father_phone || '')

  const [price, setPrice] = React.useState(subscripe?.price || '')

  const [startFrom, setStartFrom] = React.useState(subscripe?.start_from || '')
  const [endTo, setEndTo] = React.useState(subscripe?.end_to || '')

  const [isApproved, setIsApproved] = React.useState(subscripe?.is_approved || false)


  useEffect(() => {
    if (profile?.user) {
      setPhone(!profile?.user ? subscripe?.phone || '' : profile?.user?.user_details?.phone || '')
    }
  }, [profile?.user])


  const createSubscription = () => {
    const formData = new FormData()

    formData.append('academy_subscribe_plan', academySubscribePlan)

    if (playerImage) formData.append('player_image', playerImage)
    if (birthCirtificate) formData.append('birth_cirtificate', birthCirtificate)
    if (nationalIdImage1) formData.append('national_id_image1', nationalIdImage1)
    if (nationalIdImage2) formData.append('national_id_image2', nationalIdImage2)
    if (nationalIdParent1) formData.append('national_id_parent1', nationalIdParent1)
    if (nationalIdParent2) formData.append('national_id_parent2', nationalIdParent2)
    if (passportImage) formData.append('passport_image', passportImage)

    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('birth_date', birthDate)
    formData.append('gender', gender)
    formData.append('mother_phone', motherPhone)
    formData.append('father_phone', fatherPhone)

    formData.append('price', price)

    formData.append('start_from', startFrom)
    formData.append('end_to', endTo)


    if (!profile?.user) {
      formData.append('is_approved', true)
    }



    apiContext?.createSubscription(formData, setOpen)

  }



  const updateSubscription = () => {
    const formData = new FormData()

    if (playerImage == '' || typeof playerImage == 'object') formData.append('player_image', playerImage)
    if (birthCirtificate == '' || typeof birthCirtificate == 'object') formData.append('birth_cirtificate', birthCirtificate)
    if (nationalIdImage1 == '' || typeof nationalIdImage1 == 'object') formData.append('national_id_image1', nationalIdImage1)
    if (nationalIdImage2 == '' || typeof nationalIdImage2 == 'object') formData.append('national_id_image2', nationalIdImage2)
    if (nationalIdParent1 == '' || typeof nationalIdParent1 == 'object') formData.append('national_id_parent1', nationalIdParent1)
    if (nationalIdParent2 == '' || typeof nationalIdParent2 == 'object') formData.append('national_id_parent2', nationalIdParent2)
    if (passportImage == '' || typeof passportImage == 'object') formData.append('passport_image', passportImage)

    if (name) formData.append('name', name)
    if (phone) formData.append('phone', phone)
    if (birthDate) formData.append('birth_date', birthDate)
    if (gender) formData.append('gender', gender)
    if (motherPhone) formData.append('mother_phone', motherPhone)
    if (fatherPhone) formData.append('father_phone', fatherPhone)


    if (price) formData.append('price', price)

    if (startFrom) formData.append('start_from', startFrom)
    if (endTo) formData.append('end_to', endTo)

    formData.append('is_approved', isApproved)


    apiContext?.updateSubscription(subscripe?.id, formData, setOpen)

  }

  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      closeIcon={false}
      onOk={() => {
        if (subscripe?.id) {
          updateSubscription()
        } else {
          createSubscription()
        }
      }}
    >
      {apiContext?.messageApi}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={apiContext?.loadingSubscriptions}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className='flex flex-col gap-8 font min-h-fit max-h-[500px] overflow-scroll'>
        {/* subscriptions */}
        <div className='flex flex-col gap-2'>
          <p className='text-xl text-blue-600'>معلومات الاشتراك</p>
          <div className='flex flex-col'>
            <p className='text-zinc-600'>اسم الخطة:</p>
            <p>{plan?.name || subscripe?.academy_subscribe_plan_details?.name}</p>
          </div>
        </div>
        <hr className='py-[0.5px] bg-indigo-200' />
        {/* images */}
        <div className='flex flex-col gap-2'>
          <p className='text-xl text-blue-600'>صور الاشتراك</p>
          <div className='flex flex-col'>
            <p className='text-zinc-600'>صورة اللاعب (اختياري):</p>
            <Input onChange={(e) => setPlayerImage(e.target.files[0])} type='file' />
            {
              typeof playerImage === 'string' &&
              <img src={server + playerImage} alt={name || ''} className='rounded-xl w-full max-w-[200px]' />
            }
            {
              typeof playerImage === 'object' && playerImage ?
                <img src={URL.createObjectURL(playerImage)} alt={name || ''} className='rounded-xl w-full max-w-[200px]' />
                : null
            }
            <span onClick={() => setPlayerImage('')} className='flex gap-2 text-xs text-red-600 cursor-pointer'>
              <TiDelete className='my-auto' />
              <p className='my-auto'>حذف الصورة</p>
            </span>
          </div>

          <div className='flex flex-col'>
            <p className='text-zinc-600'>شهادة الميلاد (اختياري):</p>
            <Input onChange={(e) => setBirthCirtificate(e.target.files[0])} type='file' />
            {
              typeof birthCirtificate === 'string' &&
              <img src={server + birthCirtificate} alt={name || ''} className='rounded-xl w-full max-w-[200px]' />
            }
            {
              typeof birthCirtificate === 'object' && birthCirtificate ?
                <img src={URL.createObjectURL(birthCirtificate)} alt={name || ''} className='rounded-xl w-full max-w-[200px]' />
                : null
            }
            <span onClick={() => setBirthCirtificate('')} className='flex gap-2 text-xs text-red-600 cursor-pointer'>
              <TiDelete className='my-auto' />
              <p className='my-auto'>حذف الصورة</p>
            </span>
          </div>

          <div className='flex flex-col'>
            <p className='text-zinc-600'>وش صورة بطاقة اللاعب (اختياري):</p>
            <Input onChange={(e) => setNationalIdImage1(e.target.files[0])} type='file' />
            {
              typeof nationalIdImage1 === 'string' &&
              <img src={server + nationalIdImage1} alt={name || ''} className='rounded-xl w-full max-w-[200px]' />
            }
            {
              typeof nationalIdImage1 === 'object' && nationalIdImage1 ?
                <img src={URL.createObjectURL(nationalIdImage1)} alt={name || ''} className='rounded-xl w-full max-w-[200px]' />
                : null
            }
            <span onClick={() => setNationalIdImage1('')} className='flex gap-2 text-xs text-red-600 cursor-pointer'>
              <TiDelete className='my-auto' />
              <p className='my-auto'>حذف الصورة</p>
            </span>
          </div>


          <div className='flex flex-col'>
            <p className='text-zinc-600'>ظهر صورة بطاقة اللاعب (اختياري):</p>
            <Input onChange={(e) => setNationalIdImage2(e.target.files[0])} type='file' />
            {
              typeof nationalIdImage2 === 'string' &&
              <img src={server + nationalIdImage2} alt={name || ''} className='rounded-xl w-full max-w-[200px]' />
            }
            {
              typeof nationalIdImage2 === 'object' && nationalIdImage2 ?
                <img src={URL.createObjectURL(nationalIdImage2)} alt={name || ''} className='rounded-xl w-full max-w-[200px]' />
                : null
            }
            <span onClick={() => setNationalIdImage2('')} className='flex gap-2 text-xs text-red-600 cursor-pointer'>
              <TiDelete className='my-auto' />
              <p className='my-auto'>حذف الصورة</p>
            </span>
          </div>

          <div className='flex flex-col'>
            <p className='text-zinc-600'>وش صورة بطاقة شخصية للوالد (اختياري):</p>
            <Input onChange={(e) => setNationalIdParent1(e.target.files[0])} type='file' />
            {
              typeof nationalIdParent1 === 'string' &&
              <img src={server + nationalIdParent1} alt={name || ''} className='rounded-xl w-full max-w-[200px]' />
            }
            {
              typeof nationalIdParent1 === 'object' && nationalIdParent1 ?
                <img src={URL.createObjectURL(nationalIdParent1)} alt={name || ''} className='rounded-xl w-full max-w-[200px]' />
                : null
            }
            <span onClick={() => setNationalIdParent1('')} className='flex gap-2 text-xs text-red-600 cursor-pointer'>
              <TiDelete className='my-auto' />
              <p className='my-auto'>حذف الصورة</p>
            </span>
          </div>

          <div className='flex flex-col'>
            <p className='text-zinc-600'>ظهر صورة بطاقة شخصية للوالد (اختياري):</p>
            <Input onChange={(e) => setNationalIdParent2(e.target.files[0])} type='file' />
            {
              typeof nationalIdParent2 === 'string' &&
              <img src={server + nationalIdParent2} alt={name || ''} className='rounded-xl w-full max-w-[200px]' />
            }
            {
              typeof nationalIdParent2 === 'object' && nationalIdParent2 ?
                <img src={URL.createObjectURL(nationalIdParent2)} alt={name || ''} className='rounded-xl w-full max-w-[200px]' />
                : null
            }
            <span onClick={() => setNationalIdParent2('')} className='flex gap-2 text-xs text-red-600 cursor-pointer'>
              <TiDelete className='my-auto' />
              <p className='my-auto'>حذف الصورة</p>
            </span>
          </div>

          <div className='flex flex-col'>
            <p className='text-zinc-600'>صورة جواز السفر (اختياري):</p>
            <Input onChange={(e) => setPassportImage(e.target.files[0])} type='file' />
            {
              typeof passportImage === 'string' &&
              <img src={server + passportImage} alt={name || ''} className='rounded-xl w-full max-w-[200px]' />
            }
            {
              typeof passportImage === 'object' && passportImage ?
                <img src={URL.createObjectURL(passportImage)} alt={name || ''} className='rounded-xl w-full max-w-[200px]' />
                : null
            }
            <span onClick={() => setPassportImage('')} className='flex gap-2 text-xs text-red-600 cursor-pointer'>
              <TiDelete className='my-auto' />
              <p className='my-auto'>حذف الصورة</p>
            </span>
          </div>

        </div>
        <hr className='py-[0.5px] bg-indigo-200' />
        {/* infos */}
        <div className='flex flex-col gap-2'>
          <p className='text-xl text-blue-600'>معلومات المشترك</p>
          <div className='flex flex-col'>
            <p className='text-zinc-600'>اسم المشترك:</p>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='flex flex-col'>
            <p className='text-zinc-600'>رقم الهاتف:</p>
            <Input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className='flex flex-col'>
            <p className='text-zinc-600'>تاريخ الولادة:</p>
            <DatePicker value={birthDate ? dayjs(birthDate, 'YYYY-MM-DD') : ''} onChange={(e, date) => e ? setBirthDate(date) : setBirthDate('')} />
          </div>
          <div className='flex flex-col'>
            <p className='text-zinc-600'>الجنس:</p>
            <Select value={gender} onChange={(e) => setGender(e)}>
              <Select.Option value='ذكر'>ذكر</Select.Option>
              <Select.Option value='انثى'>انثى</Select.Option>
            </Select>
          </div>
          <div className='flex flex-col'>
            <p className='text-zinc-600'>رقم هاتف الام (اختياري):</p>
            <Input type='number' value={motherPhone} onChange={(e) => setMotherPhone(e.target.value)} />
          </div>
          <div className='flex flex-col'>
            <p className='text-zinc-600'>رقم هاتف الاب (اختياري):</p>
            <Input type='number' value={fatherPhone} onChange={(e) => setFatherPhone(e.target.value)} />
          </div>
        </div>
        <hr className='py-[0.5px] bg-indigo-200' />
        {/* last */}
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col'>
            <p className='text-zinc-600'>سعر الاشتراك:</p>
            <Select value={price} onChange={(e) => setPrice(e)}>
              <Select.Option value=''>أختر سعر الاشتراك</Select.Option>
              {
                planDetail?.price_per_class &&
                <Select.Option value={planDetail?.price_per_class}>{planDetail?.price_per_class} EGP / في الحصة</Select.Option>
              }
              {
                planDetail?.price_per_week &&
                <Select.Option value={planDetail?.price_per_week}>{planDetail?.price_per_week} EGP / في الاسبوع</Select.Option>
              }
              {
                planDetail?.price_per_month &&
                <Select.Option value={planDetail?.price_per_month}>{planDetail?.price_per_month} EGP / في الشهر</Select.Option>
              }
              {
                planDetail?.price_per_year &&
                <Select.Option value={planDetail?.price_per_year}>{planDetail?.price_per_year} EGP / في السنة</Select.Option>
              }
            </Select>
          </div>
          {
            profile?.user ? null :
              <>
                <div className='flex flex-col'>
                  <p className='text-zinc-600'>هل تقبل طلب الاشتراك:</p>
                  <Select value={isApproved} onChange={(e) => setIsApproved(e)}>
                    <Select.Option value={false}>لا</Select.Option>
                    <Select.Option value={true}>نعم</Select.Option>
                  </Select>
                </div>
                <div className='flex flex-col'>
                  <p className='text-zinc-600'>تاريخ بدايه الاشتراك:</p>
                  <DatePicker value={startFrom ? dayjs(startFrom, 'YYYY-MM-DD') : ''} onChange={(e, date) => e ? setStartFrom(date) : setStartFrom('')} />
                </div>
                <div className='flex flex-col'>
                  <p className='text-zinc-600'>تاريخ نهاية الاشتراك:</p>
                  <DatePicker value={endTo ? dayjs(endTo, 'YYYY-MM-DD') : ''} onChange={(e, date) => e ? setEndTo(date) : setEndTo('')} />
                </div>
              </>
          }
        </div>
      </div>
    </Modal>
  )
}

export default CreateOrUpdateSubscribePlanModal
