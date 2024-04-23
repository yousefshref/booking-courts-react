import React, { useRef, useState } from 'react'
import { Button } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css/mousewheel'

import 'swiper/less';
import 'swiper/less/navigation';
import 'swiper/less/pagination';
import { Keyboard, Mousewheel } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate()

  return (
    <Swiper
      direction='vertical'
      keyboard={true}
      mousewheel={true}
      slidesPerView={1}
      className='h-[100vh]'
      modules={[Keyboard, Mousewheel]}
      speed={1000}
    >
      <SwiperSlide className='h-[100vh]'>
        <div className='flex flex-col justify-center gap-2 bg-[url("https://images.pexels.com/photos/61135/pexels-photo-61135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")] p-3 h-screen bg-cover bg-bottom w-screen'>
          <div className='absolute w-screen h-screen top-0 right-0 from-black to-transparent bg-gradient-to-t'></div>
          <div className='absolute w-screen h-screen top-0 right-0 blur-2xl'></div>
          <div className='flex gap-6 md:flex-row flex-col justify-around w-full mx-auto md:max-w-7xl text-white z-50'>
            <div className='text text-center md:text-start flex md:w-1/2 flex-col gap-5'>
              <h1 className='text-5xl font-bold flex gap-4 tracking-wide'>احجز اي ملعب, في رياضة, في اي وقت.</h1>
              {/* <hr className='my-5' /> */}
              <div className='flex flex-col text-white'>
                <p>احجز ملعبك في اي رياضة انت بتحبها.</p>
                <p>شوف النوادي والكادريميات واشترك فيها</p>
                <p>مدربيين لكل رياضة.</p>
              </div>
            </div>
            <div className='actions md:my-auto md:w-1/2 flex text-3xl flex-col gap-3'>
              <Button onClick={() => navigate('/auth/login')} type="primary" size="large">تسجيل الدخول</Button>
              <Button href='https://www.youtube.com/watch?v=6lTqQx7b4Rg' size="large" >فديو تعريفي</Button>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide className='h-[100vh]'>
        <div className='flex h-[100vh] bg-no-repeat bg-cover flex-col gap-7 justify-center bg-[url(https://images.pexels.com/photos/12917757/pexels-photo-12917757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]'>

          <div className='absolute w-screen h-screen top-0 right-0 from-zinc-950 to-transparent bg-gradient-to-t'></div>


          <div className='p-5 flex flex-col gap-5 mx-auto text-white z-30 text-center'>
            <h3 className='text-5xl'>ابحث عن مدربك المحترف في لعبتك الرياضية</h3>
            <hr />
            <div className='flex flex-wrap gap-6 justify-around text-neutral-700'>
              <div className='md:w-1/3 flex flex-col gap-3 h-fit from-indigo-200 to-orange-50 bg-gradient-to-tr p-5 rounded-lg'>
                <b className='text-2xl'>ابحث بعنايه</b>
                <p>ستبحث عن افضل المدربين المتخصصين, نحن نختارهم بحرص</p>
              </div>
              <div className='md:w-1/3 flex flex-col gap-3 h-fit from-indigo-200 to-orange-50 bg-gradient-to-tr p-5 rounded-lg'>
                <b className='text-2xl'>امان الاماكن</b>
                <p>لا تقلق من ناحية امان اولادك, الملاعب تمون بأحسن حالة وافضل الادوات</p>
              </div>
            </div>
          </div>

          <div className='flex mt-5 flex-col gap-3 text-white text-center z-20 md:absolute md:bottom-10 w-full'>
            <p>ابدأ الرحلة</p>
            <div className='flex flex-wrap gap-6 justify-around w-full max-w-[700px] mx-auto'>
              <Button onClick={() => navigate('/auth/signup')} type="primary" size="large">انشاء حساب</Button>
              <Button onClick={() => navigate('/auth/login')} type="primary" size="large">سجل حسابك الموجود</Button>
            </div>
          </div>

        </div>
      </SwiperSlide>
    </Swiper>

  )
}

export default Home
