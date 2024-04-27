import { Button } from 'antd'
import React from 'react'
import CreateOrUpdateSubscribePlanModal from '../Subscribe/CreateOrUpdateSubscribePlanModal'

const AcademyPlan = ({ plan }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <div className='p-3 rounded-xl from-sky-200 to-blue-200 gap-4 flex flex-col bg-gradient-to-tr w-full max-w-xs' key={plan?.id}>
      <h3 className='text-2xl text-zinc-700'>{plan?.name}</h3>
      <p>{plan?.description}</p>
      <div className='flex flex-col gap-1 p-3 rounded-xl bg-indigo-200'>
        {
          plan?.price_per_class &&
          <p>{plan?.price_per_class} EGP / في الحصة</p>
        }
        {
          plan?.price_per_week &&
          <p>{plan?.price_per_week} EGP / في الاسبوع</p>
        }
        {
          plan?.price_per_month &&
          <p>{plan?.price_per_month} EGP / في الشهر</p>
        }
        {
          plan?.price_per_year &&
          <p>{plan?.price_per_year} EGP / في السنة</p>
        }
      </div>
      <Button onClick={() => setOpen(true)} size='large' className='font rounded-full' type='primary'>اشتراك</Button>

      <CreateOrUpdateSubscribePlanModal open={open} setOpen={setOpen} plan={plan} />

    </div>
  )
}

export default AcademyPlan
