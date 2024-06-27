import React from 'react';

const Error = ({error}) => {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh_-_170px)] gap-3 flex-col">
            <img src='imgs/main-error.png' alt='error' className='max-w-full lg:max-w-[500px]'/>
            <h1 className='text-[18px] text-bgTableGray'>{error}</h1>
        </div>
    );
};

export default Error;
