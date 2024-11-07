import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from '../components/core/HomePage/HighlightText'

import CTAButton from '../components/core/HomePage/Button'
import TimeLineSection from '../components/core/HomePage/TimeLineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import ReviewSlider from "../components/common/ReviewSlider"
import Studentimage from '../assets/Images/homepage-img-showcase.jpg'
import Footer from '../components/common/Footer'

const Home = () => {
  return (
    <div>

        {/* Section-1 */}
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">

            <div className='text-center mt-11 text-4xl font-semibold'>
                Unlock Your Potential with
                <HighlightText text={"Quality Education"} />
            </div>

            <div className='-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300'>
            Unlock your coding potential with our comprehensive online courses. Learn at your own pace, from the comfort of your home or any location worldwide. Access a wealth of learning resources, including practical projects, interactive quizzes, and personalized mentorship from experienced instructors.
            </div>
            
            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>
            
            <div className='mx-3 my-7 shadow-blue-200 shadow-[10px_-5px_50px_-5px] w-11/12'>
                <img src={Studentimage} alt='banner' />
            </div>

        
            <ExploreMore/>
        </div>


        {/* Section-2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[320px]'>   
                <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8'>
                    <div className="lg:h-[150px]"></div>
                    <div className='flex flex-row gap-7 text-white lg:mt-8'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-2'>
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/login"}>
                            Learn More
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
                <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                    <div className="text-4xl font-semibold lg:w-[45%] ">
                        Get the Skills you need for a 
                        <HighlightText text={"Job that is in demand."} />
                    </div>
                    <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                        <div className='text-[16px]'>
                            The modern EduHub is the dictates its own terms. Today, to be a competitive 
                            specialist requires more than professional skills.
                        </div>
                        <CTAButton active={true} linkto={"/signup"}>
                            Learn More
                        </CTAButton>
                    </div>
                </div>
            
                {/* Timeline Section - Section 2 */}
                <TimeLineSection />

                {/* Learning Language Section - Section 3 */}
                <LearningLanguageSection />
            </div>
        </div>


        {/* Section-3 */}
        <div className='relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
            
            <InstructorSection/>
            
            <h1 className="text-center text-4xl font-semibold mt-8">
                Review from Other Learners
            </h1>

            {/* Review Slider here */}
            <ReviewSlider />
        </div>

        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default Home