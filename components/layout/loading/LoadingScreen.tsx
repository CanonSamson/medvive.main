'use client'
import Lottie from 'lottie-react'
const LoadingScreen = () => {
  return (
    <div className='w-full overflow-hidden bg-white h-screen !h-[100dvh] flex justify-center  mt-20'>
      <Lottie
        autoPlay
        style={{
          width: 55,
          height: 55
        }}
        animationData={'@/public/animations/loading-primary.json'}
      />
    </div>
  )
}

export default LoadingScreen
