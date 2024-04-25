import React, { useContext, useEffect, useRef, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import UpdateOrCreateInvoice from './UpdateOrCreateInvoice'

import ObjectField from '../ObjectField';
import { ApiContextProvider } from '../../contexts/ApiContext';


const InvoiceComponent = ({ invoice, getInvoices, request, academy }) => {
  const [editOpen, updateOpen] = useState(false)

  const invoiceRef = useRef(null);

  const handlePrint = () => {
    const invoiceElement = invoiceRef.current;
    if (invoiceElement) {
      const printWindow = window.open('', '', 'height=400,width=800');
      printWindow.document.write(`
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <title>Invoice</title>
          <style>
            .invoice_row span{
              display: none;
            }
            .invoice_row{
              padding: 10px;
              border-radius: 10px;
              border: 1px solid #ccc;
              margin-bottom: 10px;
              width:'100%';
              display:flex;
              flex-direction: column;
              justify-content: space-between;
              direction:rtl;
              height:fit-content;
            }
          </style>
          <script>
            function onTailwindLoad() {
              window.print();
              window.close();
            }
          </script>
        </head>
      <body onload="onTailwindLoad()">
      `);
      printWindow.document.write(invoiceElement.outerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
    }
  }


  const path = window.location.pathname

  const apiContext = useContext(ApiContextProvider)

  const [profile, setProfile] = useState(null)
  const checkProfile = async () => {
    const res = await apiContext?.checkProfile(localStorage.getItem('token'))
    setProfile(res?.data)
  }
  useEffect(() => {
    checkProfile()
  }, [])



  return (
    <div ref={invoiceRef} id={`invoice_${invoice?.id}`} className={`invoice_row relative p-4 rounded-xl bg-white border ${invoice?.amount > 0 ? 'border-green-400' : 'border-red-400'}`}>

      {
        profile?.manager || profile?.staff ?
          <span onClick={() => updateOpen(true)} className='absolute top-2 print:hidden cursor-pointer text-blue-600 left-2'>
            <BiEdit />
          </span>
          : null
      }

      {
        profile?.manager || profile?.staff ?
          <span onClick={handlePrint} className='absolute bottom-2 print:hidden cursor-pointer text-blue-600 left-2'>
            طباعة
          </span>
          : null
      }


      <UpdateOrCreateInvoice request={request} create={false} invoice={invoice} getInvoices={getInvoices} open={editOpen} setOpen={updateOpen} />

      {
        (path?.includes('manager') || path?.includes('staff')) && path?.includes('academies') && !academy ? (
          <div className='academies flex flex-col gap-5'>
            {
              Object?.entries(invoice || {}).filter(([key]) => !['id', 'manager', 'court', 'book', 'academy'].includes(key)).map(([key, value]) => (
                value &&
                <ObjectField keyName={key} key={key} value={value} />
              ))
            }
          </div>
        ) : null
      }

      {
        (path?.includes('manager') || path?.includes('staff')) && (path?.includes('courts') || path?.includes('books')) && !academy ? (
          <div className='academies flex flex-col gap-5'>
            {
              Object?.entries(invoice || {}).filter(([key]) => ['amount', 'description', 'created_at', 'updated_at'].includes(key)).map(([key, value]) => (
                value &&
                <ObjectField keyName={key} key={key} value={value} />
              ))
            }
          </div>
        ) : null
      }

      {
        (path?.includes('manager') || path?.includes('staff')) && (!path?.includes('books') && !path?.includes('courts') && !path?.includes('academies')) && !academy ? (
          <div className='academies flex flex-col gap-5'>
            {
              Object?.entries(invoice || {}).filter(([key]) => ['amount', 'name', 'phone', 'start_date', 'end_date', 'created_at', 'updated_at'].includes(key)).map(([key, value]) => (
                value &&
                <ObjectField keyName={key} key={key} value={value} />
              ))
            }
          </div>
        ) : null
      }

      {
        academy ? (
          <div className='academies flex flex-col gap-5'>
            {
              Object?.entries(invoice || {}).filter(([key]) => ['amount', 'academy', 'is_accepted', 'name', 'phone', 'start_date', 'end_date', 'created_at', 'updated_at'].includes(key)).map(([key, value]) => (
                value &&
                <ObjectField academy={invoice?.academy_details?.name} keyName={key} key={key} value={value} />
              ))
            }
          </div>
        ) : null
      }


    </div>
  )
}

export default InvoiceComponent