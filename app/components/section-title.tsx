import React from 'react'

const SectionTitle = ({ title, icon }) => {
    return (
        <div className="h-[120px] flex items-center bg-white border-b mb-12">
            <div className="flex gap-3 items-center  mx-12">
                {icon}

                <h1 className='title'>{title}</h1>
            </div>
        </div>
    )
}

export default SectionTitle