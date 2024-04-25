import React, { useContext, useEffect } from 'react'
import Header from '../Header'
import ManagerLayout from './ManagerLayout'
import { ApiContextProvider } from '../../contexts/ApiContext'
import { useParams } from 'react-router-dom'
import { Pagination } from 'antd'
import Loading from '../Loading'
import CourtCard from '../CourtCard'
import Court from '../Court'
import { Backdrop, CircularProgress } from '@mui/material'

const ManagerCourtsCheck = () => {
  const apiContext = useContext(ApiContextProvider)

  const params = useParams()

  useEffect(() => {
    apiContext.setAcademyId(params.academyId)
  }, [])



  return (
    <div className='flex flex-col gap-4'>
      <Header />

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={apiContext?.manaerCourtPaginationLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <ManagerLayout>
        <div className='flex flex-col gap-4'>
          <div className='search'></div>
          <div className='flex flex-wrap gap-5 justify-around'>

            {
              apiContext?.manaerCourtPaginationLoading ? <Loading /> : (
                apiContext?.managerCourts?.map((court, index) => (
                  <Court court={court} key={index} />
                ))
              )
            }

          </div>
        </div>
        <Pagination onChange={(e) => {
          apiContext.setAcademyId(params.academyId)
          apiContext?.setManaerCourtPaginationPage(e)
        }} defaultCurrent={apiContext?.manaerCourtPaginationPage} total={apiContext?.manaerCourtPagination?.count} />
      </ManagerLayout>

    </div>
  )
}

export default ManagerCourtsCheck
