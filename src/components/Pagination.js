import React, { Fragment } from 'react';

const Pagination = (props) => {
    
  return(
    <Fragment>
        <span className='inline-block mx-1'>
            <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={props.FirstArrowClickHandler}>First</button>
        </span>
        <span className='inline-block mx-1'>
            <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={props.leftArrowClickHandler}>Previous</button>
        </span>
        <span className='inline-block mx-1 px-2 text-lg font-bold text-blue-600 border-solid' >{props.page}</span>
        <span className='inline-block mx-1'>
            <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={props.rightArrowClickHandler}>Next</button>            
        </span>
        <span className='inline-block mx-1'>
            <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={props.LastArrowClickHandler}>Last</button>            
        </span>
    </Fragment>
)};

export default Pagination;
