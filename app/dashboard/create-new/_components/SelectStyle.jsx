import Image from 'next/image'
import React, { useState } from 'react'

const SelectStyle = ({ onUserSelect }) => {

    const [setselectedOption, setSetselectedOption] = useState();

    const styleOptions = [
        {
            name: "Realistic",
            image: '/styleImg/real.jpg'
        },
        {
            name: "Cartoon",
            image: '/styleImg/cartoon.jpg'
        },
        {
            name: "Comic",
            image: '/styleImg/comic.jpg'
        },
        {
            name: "Watercolor",
            image: '/styleImg/watercolor.jpg'
        },
        {
            name: "GTA",
            image: '/styleImg/gta.jpg'
        },
    ]

    return (
        <div className='mt-10'>
            <h2 className='text-xl font-bold text-primary'>Style</h2>
            <p className='text-gray-600'>Select your video style</p>
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mt-6'>
                {styleOptions.map((option, index) => (
                    <div key={index} className={`relative hover:scale-105 transition-all duration-75 ease-in-out cursor-pointer min-h-[310px] ${setselectedOption === option.name ? 'border-4 border-primary rounded-xl scale-110' : ''}`}>
                        <Image
                            src={option.image}
                            alt={option.name}
                            width={100}
                            height={100}
                            className='h-48 md:h-52 lg:h-60 xl:h-72 object-cover rounded-lg w-full'
                            onClick={() => {
                                setSetselectedOption(option.name)
                                onUserSelect('imageStyle', option.name)
                            }}
                        />
                        <h2 className='absolute bottom-0 bg-black text-white font-semibold text-lg lg:text-xl w-full text-center rounded-b-lg'>
                            {option.name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectStyle