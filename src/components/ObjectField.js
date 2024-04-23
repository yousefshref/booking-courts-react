import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { convertToAMPM } from '../utlits/Functions';
import { server } from '../utlits/Variables';
import { Modal } from 'antd';

const ObjectField = ({ keyName, value }) => {

  // const [data, setData] = React.useState('')

  // const trnslate = async (word) => {
  //   const options = {
  //     method: 'POST',
  //     url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
  //     headers: {
  //       'content-type': 'application/json',
  //       'X-RapidAPI-Key': 'b4eb774f83msh2d3670da713c6a5p141db3jsnfa729f40a5fb',
  //       'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
  //     },
  //     data: {
  //       q: word,
  //       source: 'en',
  //       target: 'ar'
  //     }
  //   };
  //   try {
  //     const response = await axios.request(options);
  //     setData(response.data.data.translations.translatedText)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   trnslate(keyName?.replace('_', ' '))
  // }, [])

  const [openImage, setopenImage] = useState(null)

  return (
    <div className='flex flex-col' style={{ direction: 'rtl' }}>
      {
        value &&
        <p className='text-gray-500 font-bold'>{keyName}: </p>
      }
      {
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
              // If none of the above conditions are met, simply display value
              <p>{value}</p>
      }


      <Modal
        visible={openImage}
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
