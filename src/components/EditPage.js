import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editActions } from '../store/edit-slice';
import Modal from './Modal';


const EditCampaign = (props) => {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    
    const nameChangeHandler = (event) =>{
        setName(event.target.value);
    };
    const emailChangeHandler = (event) =>{
        setEmail(event.target.value);
    };
    const roleChangeHandler = (event) =>{
        setRole(event.target.value);
    };
    const cancelButtonHandler = () => {
        dispatch(editActions.toggle());
    };
    const submitHandler = (event) => {
        event.preventDefault();
        if(name.trim().length === 0){
            return;    
        }
        if(email.trim().length === 0){
            return;    
        }
        if(role.trim().length === 0){
            return;    
        }
        console.log('After Editing name=', name);
        console.log('After Editing email=', email);
        console.log('After Editing role=', role);

        props.onEditSubmit(name, email, role);

        setName('');
        setEmail('');
        setRole('');

        dispatch(editActions.toggle());
    };



  return(
    <Modal onClose={props.onClose}>
        <form onSubmit={submitHandler} className=' flex flex-col m-10'>
            <div className=' flex flex-col m-2 w-[32rem]'>
                <label htmlFor="name">Name</label>        
                <input className='border-2' type="text" value={name} onChange={nameChangeHandler}  size="20"/>
                <label htmlFor="email"> Email </label> 
                <input className='border-2' type="email" value={email} onChange={emailChangeHandler} id="email" />     
                <label htmlFor="role"> Role </label> 
                <input className='border-2' type="text" value={role} onChange={roleChangeHandler} size="20"/>                 
            </div>  
            <div>
                <button className='mx-2 px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out' type="submit" >Submit</button>
                <button className='mx-2 px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out' onClick={ cancelButtonHandler } >Cancel</button>
            </div>            
        </form>  

    </Modal>
  );
};


export default EditCampaign;
