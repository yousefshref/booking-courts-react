import { Button, DatePicker, Input, Modal, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { ApiContextProvider } from '../../contexts/ApiContext'
import InvoiceComponent from './InvoiceComponent'
import UpdateOrCreateInvoice from './UpdateOrCreateInvoice'
import moment from 'moment'
import dayjs from 'dayjs'

const DisplayInvoicesModal = ({ open, setOpen, court, academy, book, request }) => {

  const apiContext = useContext(ApiContextProvider)


  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isREquest, setIsRequest] = useState(request ? 'True' : 'False' || '')
  const [created_at, setCreated_at] = useState(null)
  const [endTime, setEndtime] = useState(null)

  const [invoices, setInvoices] = useState([])

  const getInvoices = async () => {
    const res = await apiContext?.getInvoices({
      created_at_start: created_at,
      end_date: endTime,
      book_id: book?.id,
      academy_id: academy?.id,
      court_id: court?.id,
      name: name,
      phone: phone,
      request: isREquest
    })
    setInvoices(res.data)
  }

  useEffect(() => {
    getInvoices()
  }, [court?.id, academy?.id])



  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false)

  const [seeInvoiceOpen, setseeInvoiceOpen] = useState(false)

  return (
    <Modal
      open={open}
      onOk={() => setCreateInvoiceOpen(true)}
      onCancel={() => setOpen(false)}
      okText='انشاء فاتورة'
      cancelText='الغاء'
      width={650}
      centered
      closeIcon={false}
    >

      <div className='flex bg-zinc-200 max-h-[500px] min-h-fit overflow-scroll flex-col gap-3 p-4 rounded-xl'>

        <div className='flex flex-col search'>
          <div className='flex flex-col gap-2'>
            <p>اسم</p>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='flex flex-col gap-2'>
            <p>رقم الهاتف</p>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className='flex flex-col gap-2'>
            <p>طلبات الاشتراكات</p>
            <Select value={isREquest} onChange={(e) => setIsRequest(e)}>
              <Select.Option value=''>اختر</Select.Option>
              <Select.Option value='True'>نعم</Select.Option>
              <Select.Option value='False'>لا</Select.Option>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <p>تاريخ انشاء الفاتورة</p>
            <DatePicker value={created_at ? dayjs(created_at, 'YYYY-MM-DD') : null} onChange={(e, date) => e ? setCreated_at(date) : setCreated_at(null)} />
          </div>
          <div className='flex flex-col gap-2'>
            <p>تاريخ الانتهاء</p>
            <DatePicker value={endTime ? dayjs(endTime, 'YYYY-MM-DD') : null} onChange={(e, date) => e ? setEndtime(date) : setEndtime(null)} />
          </div>
          <Button className='w-full font mt-3' type='primary' onClick={getInvoices}>ابحث</Button>
        </div>

        <div className='flex flex-col bg-white p-3 rounded-xl totalOfPrices'>

          <div className='flex flex-col gap-2'>
            <p>المجموع</p>
            <p>{parseFloat(invoices?.reduce((acc, invoice) => acc + invoice?.amount, 0))} EGP</p>
          </div>

        </div>

        {
          invoices?.length > 0 ? (
            invoices?.map((invoice, index) => (
              <InvoiceComponent request={request} getInvoices={getInvoices} key={index} invoice={invoice} />
            ))
          ) : (
            <p className='text-center text-red-600'>لا يوجد فواتير</p>
          )
        }

      </div>

      <UpdateOrCreateInvoice book={book} academy={academy} getInvoices={getInvoices} court={court} create={true} open={createInvoiceOpen} setOpen={setCreateInvoiceOpen} />

    </Modal>
  )
}

export default DisplayInvoicesModal