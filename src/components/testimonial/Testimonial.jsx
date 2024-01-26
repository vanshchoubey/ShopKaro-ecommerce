import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'

function Testimonial() {
    const context = useContext(myContext)
    const { mode } = context
    return (
        <div>
            <section className="text-gray-600 body-font mb-10">
                <div className="container px-5 py-10 mx-auto">
                    <h1 className=' text-center text-3xl font-bold text-black' style={{color: mode === 'dark' ? 'white' : ''}}>Testimonial</h1>
                    <h2 className=' text-center text-2xl font-semibold mb-10' style={{color: mode === 'dark' ? 'white' : ''}}>What our <span className=' text-purple-500'>customers</span> are saying</h2>
                    <div className="flex flex-wrap -m-4 items-center justify-center">
                        
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://res.cloudinary.com/dhedlu6ec/image/upload/v1701317392/umj6yocsxcowos4gfpwt.jpg" />
                                <p  style={{color: mode === 'dark' ? 'white' : ''}}className="leading-relaxed">An adept React developer with a passion for crafting efficient, user-centric web applications. Proficient in React.js, they excel in creating scalable UIs with clean, maintainable code. Skilled in component-based architecture, they ensure seamless cross-browser functionality and prioritize a responsive design approach. Collaborative, detail-oriented, and dedicated to leveraging the latest React trends, they contribute to building robust, high-performance applications..</p>
                                <span className="inline-block h-1 w-10 rounded bg-purple-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? 'purple-500' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">vansh choubey</h2>
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="text-gray-500">UI Develeoper</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonial