import React, { useEffect } from 'react'
import { InputNumber } from 'antd';

const Offers = ({ court, setOfferPrice, setOfferFrom, setOfferTo, setEventPrice, setEventFrom, setEventTo, offerPrice, offerFrom, offerTo, eventPrice, eventFrom, eventTo }) => {


  useEffect(() => {
    if (court !== null) {
      setOfferPrice(court?.offer_price ?? 0)
      setOfferFrom(court?.offer_time_from)
      setOfferTo(court?.offer_time_to)
      setEventPrice(court?.event_price ?? 0)
      setEventFrom(court?.event_time_from)
      setEventTo(court?.event_time_to)
    }
  }, [court?.id])

  return (
    <div className='my-3 flex flex-col gap-2 bg-zinc-200 rounded-md p-2 w-full'>

      <div className='flex flex-col gap-1'>
        <div className='flex flex-wrap gap-1'>
          <p>سعر العرض</p>
          <small className='text-red-800 my-auto'>لو تركته فارغه لن يكون هناك عرض</small>
        </div>
        <InputNumber size='large' value={offerPrice} onChange={(e) => setOfferPrice(e)} required addonAfter="EGP" />
      </div>

      <div className='flex flex-col gap-1'>
        <p>وقت العرض يبدأ من</p>
        <div className="relative">
          <input value={offerFrom?.slice(0, 5)} onChange={(e) => setOfferFrom(e.target.value)} type="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-xl outline-none transition-all focus:border-blue-500 block w-full p-2.5" required />
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <p>وقت العرض ينتهي في</p>
        <div className="relative">
          <input value={offerTo?.slice(0, 5)} onChange={(e) => setOfferTo(e.target.value)} type="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-xl outline-none transition-all focus:border-blue-500 block w-full p-2.5" required />
        </div>
      </div>

      {/* --------------------------------------Events------------------------ */}

      <div className='flex flex-col gap-1'>
        <div className='flex flex-wrap gap-1'>
          <p>سعر المناسبات</p>
          <small className='text-red-800 my-auto'>لو تركته فارغه لن يكون هناك مناسبات</small>
        </div>
        <InputNumber size='large' value={eventPrice} onChange={(e) => setEventPrice(e)} required addonAfter="EGP" />
      </div>

      <div className='flex flex-col gap-1'>
        <p>وقت المناسبات يبدأ من</p>
        <div className="relative">
          <input value={eventFrom?.slice(0, 5)} onChange={(e) => setEventFrom(e.target.value)} type="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-xl outline-none transition-all focus:border-blue-500 block w-full p-2.5" required />
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <p>وقت المناسبات ينتهي في</p>
        <div className="relative">
          <input value={eventTo?.slice(0, 5)} onChange={(e) => setEventTo(e.target.value)} type="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-xl outline-none transition-all focus:border-blue-500 block w-full p-2.5" required />
        </div>
      </div>

    </div>
  )
}

export default Offers
