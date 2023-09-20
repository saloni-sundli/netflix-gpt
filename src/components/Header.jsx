import React, { useEffect } from 'react'
import { Logo } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { auth } from '../utils/firebase';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        const { uid, email, displayName, photoURL} = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName : displayName,
            photoURL : photoURL
          })
          )
          navigate("/browse");
      } else{
          dispatch(removeUser());
          navigate("/")
      }
    });

    return () => {
      unsubscribe()
    }
  },[])

  return (
    <div className='absolute w-screen bg-gradient-to b from-black'>
        <img className='w-44 px-8 py-2' src={Logo} alt="logo"/>
    </div>
  )
}

export default Header