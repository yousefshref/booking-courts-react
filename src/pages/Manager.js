import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { ApiContextProvider } from '../contexts/ApiContext'
import InvoiceComponent from '../components/Invoices/InvoiceComponent'
import { BiFilter } from 'react-icons/bi'
import { DatePicker, Input, Modal, Select } from 'antd'
import { Backdrop, CircularProgress } from '@mui/material'
import dayjs from 'dayjs'
import moment from 'moment'


const Manager = () => {

  const apiContext = useContext(ApiContextProvider)


  const [openSearch, setOpenSearch] = useState(false)

  const [createdAtStart, setCreatedAtStart] = useState('')
  const [createdAtEnd, setCreatedAtEnd] = useState('')
  const [onlyCourts, setOnlyCourts] = useState('')
  const [onlyBooks, setOnlyBooks] = useState('')
  const [onlyAcademies, setOnlyAcademies] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')



  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  const getInvoices = async () => {
    setLoading(true)
    try {
      const res = await apiContext.getInvoices(createdAtStart, createdAtEnd, onlyCourts, onlyBooks, onlyAcademies, startDate, endDate, '', '', '', name, phone)
      setInvoices(res.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getInvoices()
  }, [])




  return (
    <div className='flex flex-col gap-5'>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>


      <Header />
      <div className='p-5 w-full max-w-5xl mx-auto'>
        {/* <h1>Dashboad & details about courts court and books</h1> */}
        <div className='flex flex-col gap-4 p-5 rounded-lg bg-white'>

          <div className='flex flex-col gap-3'>
            <div className='flex gap-3 justify-between'>
              <p> جميع الفواتير</p>
              <span onClick={() => setOpenSearch(true)} className='cursor-pointer'>
                <BiFilter />
              </span>

              <Modal
                open={openSearch}
                onOk={() => {
                  getInvoices()
                  setOpenSearch(false)
                }}
                onCancel={() => setOpenSearch(false)}
                okText='اظهار الفواتير'
                title='البحث عن الفواتير'
                width={650}
                centered
                closeIcon={false}
              >

                <div className='flex flex-col gap-5'>

                  <div className='flex gap-3 justify-between'>
                    <div className='flex flex-col gap-2 w-1/2'>
                      <p className='text-xs md:text-base'>بداية تاريخ إنشاء الفاتورة</p>
                      <DatePicker

                        value={createdAtStart ? moment(createdAtStart, 'YYYY-MM-DD') : null}
                        onChange={(date, d) => date ? setCreatedAtStart(d) : setCreatedAtStart(null)}

                        className='w-full'
                        placeholderText='بداية تاريخ إنشاء الفاتورة'
                      />
                    </div>

                    <div className='flex flex-col gap-2 w-1/2'>
                      <p className='text-xs md:text-base'>نهاية تاريخ إنشاء الفاتورة</p>
                      <DatePicker

                        value={createdAtEnd ? moment(createdAtEnd, 'YYYY-MM-DD') : null}
                        onChange={(date, d) => date ? setCreatedAtEnd(d) : setCreatedAtEnd(null)}

                        className='w-full'
                        placeholderText='نهاية تاريخ إنشاء الفاتورة'
                      />
                    </div>
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label htmlFor='onlyCourts'>فواتير الملاعب فقط</label>
                    <Select
                      value={onlyCourts}
                      onChange={(e) => setOnlyCourts(e)}
                    >
                      <Select.Option value=''>لا يهم</Select.Option>
                      <Select.Option value='True'>نعم</Select.Option>
                    </Select>
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label htmlFor='onlyBooks'>فواتير الحجوزات فقط</label>
                    <Select
                      value={onlyBooks}
                      onChange={(e) => setOnlyBooks(e)}
                    >
                      <Select.Option value=''>لا يهم</Select.Option>
                      <Select.Option value='True'>نعم</Select.Option>
                    </Select>
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label htmlFor='onlyAcademies'>اسم مشترك</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label htmlFor='onlyAcademies'>رقم هاتف</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label htmlFor='onlyAcademies'>فقط الاكاديميات فقط</label>
                    <Select
                      value={onlyAcademies}
                      onChange={(e) => setOnlyAcademies(e)}
                    >
                      <Select.Option value=''>لا يهم</Select.Option>
                      <Select.Option value='True'>نعم</Select.Option>
                    </Select>
                  </div>

                  <div className='flex gap-2 justify-between'>
                    <div className='flex flex-col gap-2 w-1/2'>
                      <label className='text-xs md:text-base'>بداية الفترة</label>
                      <DatePicker
                        value={startDate ? moment(startDate, 'YYYY-MM-DD') : null}
                        onChange={(date, d) => date ? setStartDate(d) : setStartDate(null)}
                        className='w-full'
                        placeholderText='بداية الفترة'
                      />
                    </div>

                    <div className='flex flex-col gap-2 w-1/2'>
                      <p className='text-xs md:text-base'>نهاية الفترة</p>
                      <DatePicker
                        value={endDate ? moment(endDate, 'YYYY-MM-DD') : null}
                        onChange={(date, d) => date ? setEndDate(d) : setEndDate(null)}
                        className='w-full'
                        placeholderText='نهاية الفترة'
                      />
                    </div>
                  </div>

                </div>



              </Modal>


            </div>
            <hr />
            <div className='invoices flex flex-col gap-3 overflow-scroll min-h-fit max-h-[500px]'>

              {
                invoices?.length > 0 ? (
                  invoices?.map((invoice, index) => (
                    <InvoiceComponent getInvoices={getInvoices} key={index} invoice={invoice} />
                  ))
                )
                  : <p className='textred-500'> لا يوجد فواتير</p>
              }

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Manager