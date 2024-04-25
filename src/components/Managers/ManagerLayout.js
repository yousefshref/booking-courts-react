import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ManagerLayout = ({ children }) => {
  const path = window.location.pathname

  const navigate = useNavigate()

  const params = useParams()

  return (
    <div className='flex flex-col gap-6 w-full max-w-6xl mx-auto p-5'>
      <div className='chooseOne flex flex-wrap gap-5 justify-around p-5 bg-white rounded-xl mb-5'>
        <div onClick={() => navigate(`/managers/${params?.academyName}/${params?.academyId}/courts/`)} className={`${path.split('/')?.length === 6 && path?.includes("managers") && path?.includes("courts") ? " bg-lime-200" : " bg-indigo-100 hover:bg-lime-100"} flex flex-col justify-center cursor-pointer transition-all text-center gap-3 p-4 rounded-xl w-full md:max-w-[200px]`}>
          <p>الملاعب</p>
        </div>
        <div onClick={() => navigate(`/managers/${params?.academyName}/${params?.academyId}/academies/`)} className={`${path.split('/')?.length === 6 && path?.includes("managers") && path?.includes("academies") ? " bg-lime-200" : " bg-indigo-100 hover:bg-lime-100"} flex flex-col justify-center cursor-pointer transition-all text-center gap-3 p-4 rounded-xl w-full md:max-w-[200px]`}>
          <p>الاكاديميات</p>
        </div>
      </div>
      {children}
    </div>
  )
}

export default ManagerLayout
