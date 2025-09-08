import Link from 'next/link'

interface PrivacyPolicyProps {
  setShowTemsModal: (show: boolean) => void
  showTemsModal: boolean
  handleAcceptedTems: () => void
  acceptTems: boolean
}

const PrivacyPolicy = ({
  setShowTemsModal,
  showTemsModal,
  handleAcceptedTems,
  acceptTems
}: PrivacyPolicyProps) => {
  if (!showTemsModal || acceptTems) return null
  
  return (
    <>
      <div className=' text-[12px] h-screen !h-[100dvh] items-end justify-center   fixed w-full bottom-0 right-0 flex z-[9999]'>
        <div
          onClick={() => {
            setShowTemsModal(false)
          }}
          className=' h-full   z-0 absolute flex top-0 bg-black/5 right-0  w-full '
        />
        <div className=' relative p-4 z-10'>
          <div className='text-center  max-w-[500px]  w-full rounded-lg  p-4 shadow-xl bg-primary flex flex-col  text-white '>
            <div>Agree to all Terms and Privacy Policy</div>
            <p className=' mt-4'>
              This website uses cookies to optimize your experience and to
              provide us insight on how to interact with the site. All
              information shared with us through cookies are secure and covered
              by our data privacy obligations. You can access our{' '}
              <Link href={`#`} className=' underline'>
                Privacy Policy
              </Link>
            </p>
            <div className=' mt-4 flex items-center justify-between gap-4'>
              <button
                className=''
                onClick={() => {
                  setShowTemsModal(false)
                }}
              >
                Decline
              </button>
              <button
                onClick={handleAcceptedTems}
                className=' flex  bg-white text-primary px-4 py-3 rounded-lg'
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy
