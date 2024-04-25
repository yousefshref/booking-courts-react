import React, { useContext, useEffect } from 'react'
import Header from '../Header'
import ManagerLayout from './ManagerLayout'
import { ApiContextProvider } from '../../contexts/ApiContext'
import { useParams } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'
import { Pagination } from 'antd'
import AcademyCard from '../AcademyCard'
import Loading from '../Loading'
import AcademyCardClient from '../AcademyCardClient'

const ManagerAcademiesCheck = () => {
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
        open={apiContext?.manaerAcademyPaginationLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <ManagerLayout>
        <div className='flex flex-col gap-4'>
          <div className='search'></div>
          <div className='flex flex-wrap gap-5 justify-around'>

            {
              apiContext?.manaerAcademyPaginationLoading ? <Loading /> : (
                apiContext?.managerAcademies?.map((academy, index) => (
                  <AcademyCardClient academy={academy} key={index} />
                ))
              )
            }

          </div>
        </div>
        <Pagination onChange={(e) => {
          apiContext.setAcademyId(params.academyId)
          apiContext?.setManaerCourtPaginationPage(e)
        }} defaultCurrent={apiContext?.manaerAcademyPaginationPage} total={apiContext?.manaerAcademyPagination?.count} />
      </ManagerLayout>

    </div>
  )
}

export default ManagerAcademiesCheck