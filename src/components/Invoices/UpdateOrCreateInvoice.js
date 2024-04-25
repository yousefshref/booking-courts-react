import { Button, DatePicker, Input, InputNumber, message, Modal, Select } from 'antd'
import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import { ApiContextProvider } from '../../contexts/ApiContext'
import { server } from '../../utlits/Variables'
import { Backdrop, CircularProgress } from '@mui/material'

const UpdateOrCreateInvoice = ({ open, setOpen, invoice, create, getInvoices, court, book, academy, request }) => {

  const apiContext = useContext(ApiContextProvider)

  const [profile, setProfile] = useState({})
  const checkProfile = async () => {
    const res = await apiContext?.checkProfile(localStorage.getItem('token'))
    setProfile(res?.data)
  }
  useEffect(() => {
    checkProfile()
  }, [])


  const [messageApi, contextHolder] = message.useMessage();

  const error = (message) => {
    messageApi.error(message);
  }

  const [openRenew, setOpenRenew] = useState(false)

  const [courtId, setCourtId] = useState(court?.id || null)
  const [bookId, setBookId] = useState(book?.id || null)
  const [academyId, setAcademyId] = useState(academy?.id || null)

  const [thePlayerImage, setThePlayerImage] = useState(invoice?.the_player_image || '')
  const [birthCertificateImage, setBirthCertificateImage] = useState(invoice?.birth_certificate_image || '')
  const [passport, setPassport] = useState(invoice?.passport || '')
  const [idCardImageOfPlayer, setIdCardImageOfPlayer] = useState(invoice?.id_card_image_of_player || '')
  const [idCardImageOfPlayerParent, setIdCardImageOfPlayerParent] = useState(invoice?.id_card_image_of_player_parent || '')
  const [name, setName] = useState(invoice?.name || null)
  const [phone, setPhone] = useState(invoice?.phone || null)
  const [age, setAge] = useState(invoice?.age || 0)
  const [gender, setGender] = useState(invoice?.gender || 'ذكر')
  const [nationality, setNationality] = useState(invoice?.nationality || null)
  const [fatherPhone, setFatherPhone] = useState(invoice?.father_phone || null)
  const [motherPhone, setMotherPhone] = useState(invoice?.mother_phone || null)
  const [address, setAddress] = useState(invoice?.address || null)
  const [startDate, setStartDate] = useState(invoice?.start_date || null)
  const [endDate, setEndDate] = useState(invoice?.end_date || null)


  const [amount, setAmount] = useState(invoice?.amount || 0)
  const [description, setDescription] = useState(invoice?.description || '')
  const [paiedWith, setPaiedWith] = useState(invoice?.paied_with || 'عند الحضور')

  const [isAcceptedState, setIsAcceptedState] = useState(invoice?.is_accepted || request ? 'True' : 'False' || '')




  const [loading, setLoading] = useState(false)


  const path = window.location.pathname


  const updateInvoice = async () => {

    setLoading(true)

    try {

      const formData = new FormData();

      if (typeof thePlayerImage === 'object') formData.append('the_player_image', thePlayerImage);
      if (typeof birthCertificateImage === 'object') formData.append('birth_certificate_image', birthCertificateImage);
      if (typeof passport === 'object') formData.append('passport', passport);
      if (typeof idCardImageOfPlayer === 'object') formData.append('id_card_image_of_player', idCardImageOfPlayer);
      if (typeof idCardImageOfPlayerParent === 'object') formData.append('id_card_image_of_player_parent', idCardImageOfPlayerParent);

      if (request) formData.append('is_accepted', isAcceptedState);
      if (request) formData.append('is_academy', 'True');



      if (name) formData.append('name', name);
      if (phone) formData.append('phone', phone);
      if (age) formData.append('age', age);
      if (gender) formData.append('gender', gender);
      if (nationality) formData.append('nationality', nationality);
      if (fatherPhone) formData.append('father_phone', fatherPhone);
      if (motherPhone) formData.append('mother_phone', motherPhone);
      if (address) formData.append('address', address);
      if (startDate) formData.append('start_date', startDate);
      if (endDate) formData.append('end_date', endDate);
      if (amount) formData.append('amount', amount);
      if (description) formData.append('description', description);
      if (paiedWith) formData.append('paied_with', paiedWith);


      const res = await apiContext?.updateInvoice(invoice?.id, formData)
      if (res?.data?.id) {
        getInvoices()
        setOpen(false)
      } else if (res?.data?.deleted) {
        getInvoices()
        setOpen(false)
        alert('تم حذف الطلب')
      } else {
        Object?.entries(res?.data || {}).forEach(([key, value]) => error(`${key}: ${value?.join(', ')}`))
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }


  const createInvoice = async () => {
    setLoading(true)
    const formData = new FormData();

    if (courtId) formData.append('court', courtId);
    if (bookId) formData.append('book', bookId);
    if (academyId && (request == false || !request)) formData.append('academy', academyId);
    if (request == true) formData.append('academy', academy?.id);

    if (request == true) formData.append('manager', academy?.manager);

    if (typeof thePlayerImage === 'object') formData.append('the_player_image', thePlayerImage);
    if (typeof birthCertificateImage === 'object') formData.append('birth_certificate_image', birthCertificateImage);
    if (typeof passport === 'object') formData.append('passport', passport);
    if (typeof idCardImageOfPlayer === 'object') formData.append('id_card_image_of_player', idCardImageOfPlayer);
    if (typeof idCardImageOfPlayerParent === 'object') formData.append('id_card_image_of_player_parent', idCardImageOfPlayerParent);

    if (request == true) formData.append('request', true);
    if (request == true) formData.append('user_profile', profile?.user?.id);

    if (name) formData.append('name', name);
    if (phone) formData.append('phone', phone);
    if (age) formData.append('age', age);
    if (gender) formData.append('gender', gender);
    if (nationality) formData.append('nationality', nationality);
    if (fatherPhone) formData.append('father_phone', fatherPhone);
    if (motherPhone) formData.append('mother_phone', motherPhone);
    if (address) formData.append('address', address);
    if (startDate) formData.append('start_date', startDate);
    if (endDate) formData.append('end_date', endDate);
    if (amount) formData.append('amount', amount);
    if (description) formData.append('description', description);
    if (paiedWith) formData.append('paied_with', paiedWith);

    const res = await apiContext?.createInvoice(formData)
    if (res?.data?.id) {
      if (request == false) {
        getInvoices()
      }
      setOpen(false)
      setOpenRenew(false)
    } else {
      Object?.entries(res?.data || {}).forEach(([key, value]) => error(`${key}: ${value?.join(', ')}`))
    }
    setLoading(false)
  }



  const deleteInvoice = async () => {
    const res = await apiContext?.deleteInvoice(invoice?.id)
    getInvoices()
    setOpen(false)
  }


  const [openImage, setopenImage] = useState(null)




  return (
    <Modal
      open={open}
      okText='تم'
      cancelText='الغاء'
      onOk={() => {
        if (create) {
          createInvoice()
        } else {
          updateInvoice()
        }
      }}
      onCancel={() => setOpen(false)}
      width={450}
      centered
      closeIcon={false}
      className='max-h-[700px] overflow-scroll'
    >

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {contextHolder}

      <div className='flex flex-col gap-3 p-4'>

        {
          !create &&
          <Button className='w-full font' type='primary' danger onClick={deleteInvoice}>
            حذف الفاتورة
          </Button>
        }

        {
          !create && !request && (path?.includes('manager') || path?.includes('staff')) && !path?.includes('books') && !path?.includes('courts') ?
            <Button className='w-full font' type='primary' onClick={() => setOpenRenew(true)}>
              تجديد الاشتراك
            </Button>
            : null
        }

        <Modal
          open={openRenew}
          onOk={createInvoice}
          onCancel={() => setOpenRenew(false)}
          okText='تم'
          cancelText='الغاء'
          width={450}
          centered
        >

          <div className='flex flex-col gap-2'>

            <div className='flex flex-col gap-2'>
              <p className='text-gray-500'>تاريخ البدء</p>
              <DatePicker value={startDate ? dayjs(startDate, 'YYYY-MM-DD') : ''} className='w-full' onChange={(date, d) => date ? setStartDate(d) : setStartDate('')} />
            </div>

            <div className='flex flex-col gap-2'>
              <p className='text-gray-500'>تاريخ الانتهاء</p>
              <DatePicker value={endDate ? dayjs(endDate, 'YYYY-MM-DD') : ''} className='w-full' onChange={(date, d) => date ? setEndDate(d) : setEndDate('')} />
            </div>

          </div>

        </Modal>


        {
          (path?.includes('manager') || path?.includes('staff')) && (!path?.includes('books') && !path?.includes('courts')) || request ?
            (
              <div className='academyCreateInvoice flex flex-col gap-4'>
                <div className='studentInfo flex flex-col gap-4'>
                  {
                    !request ? null :
                      <div className='invoiceInfo flex flex-col gap-4'>
                        <p>الموافقة</p>
                        <Select value={isAcceptedState} onChange={(e) => setIsAcceptedState(e)}>
                          <Select.Option value='True'>موافق</Select.Option>
                          <Select.Option value='False'>غير موافق</Select.Option>
                        </Select>
                      </div>
                  }
                  <div className='invoiceInfo flex flex-col gap-4'>
                    <p>الاسم</p>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='الاسم'
                    />
                  </div>
                  <div className='invoiceInfo flex flex-col gap-4'>
                    <p>الهاتف</p>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='الهاتف'
                    />
                  </div>
                  <div className='invoiceInfo flex flex-col gap-4'>
                    <p>السن</p>
                    <Input
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder='السن (اختياري)'
                    />
                  </div>
                  <div className='invoiceInfo flex flex-col gap-4'>
                    <p>الجنس (اختياري)</p>
                    <Select
                      value={gender}
                      onChange={(value) => setGender(value)}
                      placeholder='الجنس (اختياري)'
                    >
                      <Select.Option value='ذكر'>ذكر</Select.Option>
                      <Select.Option value='أنثى'>أنثى</Select.Option>
                    </Select>
                  </div>
                  <div className='invoiceInfo flex flex-col gap-4'>
                    <p>الجنسية (اختياري)</p>
                    <Input
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      placeholder='الجنسية (اختياري)'
                    />
                  </div>
                  <div className='invoiceInfo flex flex-col gap-4'>
                    <p>هاتف ولي الأمر (اختياري)</p>
                    <Input
                      value={fatherPhone}
                      onChange={(e) => setFatherPhone(e.target.value)}
                      placeholder='هاتف ولي الأمر (اختياري)'
                    />
                  </div>
                  <div className='invoiceInfo flex flex-col gap-4'>
                    <p>هاتف الام (اختياري)</p>
                    <Input
                      value={motherPhone}
                      onChange={(e) => setMotherPhone(e.target.value)}
                      placeholder='هاتف الام (اختياري)'
                    />
                  </div>

                  <Modal
                    open={openImage}
                    onOk={() => setopenImage(null)}
                    onCancel={() => setopenImage(null)}
                    width={400}
                    centered
                  >
                    {
                      typeof openImage === 'string' && (
                        <img onClick={() => setopenImage(openImage)} src={server + openImage} />
                      )
                    }
                    {
                      typeof openImage === 'object' && (
                        <img onClick={() => setopenImage(openImage)} src={openImage && URL?.createObjectURL(openImage)} />
                      )
                    }
                  </Modal>


                  <div className='flex flex-col gap-1'>
                    <p>الصورة الشخصية لللاعب</p>
                    {
                      typeof thePlayerImage === 'string' && (
                        <img onClick={() => setopenImage(thePlayerImage)} src={server + thePlayerImage} />
                      )
                    }
                    {
                      typeof thePlayerImage === 'object' && (
                        <img onClick={() => setopenImage(thePlayerImage)} src={thePlayerImage && URL?.createObjectURL(thePlayerImage)} />
                      )
                    }
                    <Input
                      type='file'
                      onChange={(e) => setThePlayerImage(e?.target?.files[0])}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p>شهادة ميلاد اللاعب</p>

                    {
                      typeof birthCertificateImage === 'string' && (
                        <img onClick={() => setopenImage(birthCertificateImage)} src={server + birthCertificateImage} />
                      )
                    }
                    {
                      typeof birthCertificateImage === 'object' && (
                        <img onClick={() => setopenImage(birthCertificateImage)} src={birthCertificateImage && URL?.createObjectURL(birthCertificateImage)} />
                      )
                    }
                    <Input
                      type='file'
                      onChange={(e) => setBirthCertificateImage(e?.target?.files[0])}
                    />
                  </div>

                  <div className='flex flex-col gap-1'>
                    <p>جواز السفر لللاعب</p>

                    {
                      typeof passport === 'string' && (
                        <img onClick={() => setopenImage(passport)} src={server + passport} />
                      )
                    }
                    {
                      typeof passport === 'object' && (
                        <img onClick={() => setopenImage(passport)} src={passport && URL?.createObjectURL(passport)} />
                      )
                    }
                    <Input
                      type='file'
                      onChange={(e) => setPassport(e?.target?.files[0])}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p>بطاقة الهوية لللاعب</p>

                    {
                      typeof idCardImageOfPlayer === 'string' && (
                        <img onClick={() => setopenImage(idCardImageOfPlayer)} src={server + idCardImageOfPlayer} />
                      )
                    }
                    {
                      typeof idCardImageOfPlayer === 'object' && (
                        <img onClick={() => setopenImage(idCardImageOfPlayer)} src={idCardImageOfPlayer && URL?.createObjectURL(idCardImageOfPlayer)} />
                      )
                    }
                    <Input
                      type='file'
                      onChange={(e) => setIdCardImageOfPlayer(e?.target?.files[0])}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p>بطاقة هوية الوالد</p>

                    {
                      typeof idCardImageOfPlayerParent === 'string' && (
                        <img onClick={() => setopenImage(idCardImageOfPlayerParent)} src={server + idCardImageOfPlayerParent} />
                      )
                    }
                    {
                      typeof idCardImageOfPlayerParent === 'object' && (
                        <img onClick={() => setopenImage(idCardImageOfPlayerParent)} src={idCardImageOfPlayerParent && URL?.createObjectURL(idCardImageOfPlayerParent)} />
                      )
                    }
                    <Input
                      type='file'
                      onChange={(e) => setIdCardImageOfPlayerParent(e?.target?.files[0])}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p>العنوان</p>
                    <Input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder='العنوان'
                    />
                  </div>
                  <DatePicker
                    value={startDate ? dayjs(startDate, 'YYYY-MM-DD') : null}
                    onChange={(date, dateString) => {
                      if (dateString) {
                        setStartDate(dateString)
                      }
                    }}
                    placeholder='تاريخ بدء (تاريخ الاشتراك)'
                  />
                  <DatePicker
                    value={endDate ? dayjs(endDate, 'YYYY-MM-DD') : null}
                    onChange={(date, dateString) => {
                      if (dateString) {
                        setEndDate(dateString)
                      }
                    }}
                    placeholder='تاريخ نهاية (تاريخ نهاية الاشتراك)'
                  />
                </div>

                <div className='invoiceInfo flex flex-col gap-4'>
                  <p>طريقة الدفع</p>
                  <Select value={paiedWith} onChange={(value) => setPaiedWith(value)} placeholder='طريقة الدفع'>
                    <Select.Option value=''>طريقة الدفع</Select.Option>
                    <Select.Option value='عند الحضور'>في الحضور</Select.Option>
                  </Select>
                </div>
              </div>
            ) : null
        }

        <div className='flex flex-col gap-4'>
          {
            !request &&
            <div className='invoiceInfo flex flex-col gap-4'>
              <p>المبلغ</p>

              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='المبلغ مثل: 300 او -130'
              />
            </div>
          }
          <div className='invoiceInfo flex flex-col gap-4'>
            {
              !request ?
                <p>وصف العملية</p>
                :
                <p>اكتب ماذا تريد للمدرب, وسيتم الرد عليكم في اقرب وقت</p>
            }
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='الوصف'
            />
          </div>
        </div>
      </div>


    </Modal>
  )
}

export default UpdateOrCreateInvoice