import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { convertToAMPM } from '../utlits/Functions';
import { server } from '../utlits/Variables';
import { Modal } from 'antd';

const ObjectField = ({ keyName, value, academy }) => {


  const [openImage, setopenImage] = useState(null)

  return (
    <div className='flex flex-col' style={{ direction: 'rtl' }}>
      {
        value ?
          <p className='text-gray-500 font-bold'>{keyName}: </p>
          : null
      }
      {
        academy && keyName == 'academy' ? academy :
          // Check if keyName is 'created_at' or 'updated_at'
          keyName === 'created_at' || keyName === 'updated_at' ? (
            // If true, format date and time
            <p>{new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })} - {convertToAMPM(new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))}</p>
          ) :
            // Check if keyName is 'amount'
            keyName === 'amount' ? (
              // If true, display amount with currency
              <p>{parseFloat(value)} EGP</p>
            ) :
              // Check if keyName includes 'image' or 'passport'
              keyName?.includes('image') || keyName?.includes('passport') ? (
                // If true, check if value is a string or object
                value && typeof value === 'string' ? (
                  // If string, display as image src
                  <img className='max-w-[200px] print:hidden' src={server + value} />
                ) : typeof value === 'object' && (
                  // If object, display as object URL
                  <img className='max-w-[200px] print:hidden' src={value && URL?.createObjectURL(value)} />
                )
              ) :
                value == false && keyName == 'is_accepted' ? (
                  <p className='text-red-500'>غير مقبول</p>
                ) :
                  value == true && keyName == 'is_accepted' ? (
                    <p className='text-green-500'>مقبول</p>
                  ) :
                    // If none of the above conditions are met, simply display value
                    <p>{value}</p>

      }


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

    </div>
  )
}

export default ObjectField
