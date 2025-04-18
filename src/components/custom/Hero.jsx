import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      
      <h1 className='font-extrabold text-[50px] text-center mt-16 text-white'>
        <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips
      </h1>

      <p className='text-xl text-white text-center'>
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

      <Link to={'/create-trip'}>
        <Button className="bg-green-500 hover:bg-green-600 text-black font-bold">
          Get Started, only 1.99
        </Button>
      </Link>

      {/* Removed the image */}
      {/* <img src='/landing.png' className='' /> */}
    </div>
  )
}

export default Hero
