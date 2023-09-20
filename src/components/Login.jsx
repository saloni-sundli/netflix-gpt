import React, { useRef, useState } from 'react';
import Header from './Header.jsx';
import tw from 'tailwind-styled-components';
import { checkValidData } from '../utils/validate.js';
import { BACKGROUND, USER_AVATAR } from '../utils/constants.js';
import {
  createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile
} from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { addUser } from '../utils/userSlice.js';
import { useDispatch } from 'react-redux';


const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)

  function handleSubmit() {
    // validate form details
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    // Create a new user
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, 
            photoURL: USER_AVATAR,
          }).then(() => {
            // Profile updated!
            const { uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName : displayName,
                photoURL : photoURL
              })
            )
          }).catch((error) => {
            // An error occurred
            // ...
          });
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ": " + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ": " + errorMessage)
        });
    }
  }


  return (
    <div className='w-screen'>
      <Header />
      <ImageContainer>
        <img src={BACKGROUND} alt="background" />
      </ImageContainer>
      <Form onSubmit={(e) => e.preventDefault()}>
        <h1 className='text-2xl font-bold tracking-wider mb-2'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && (
          <Input onChange={() => setErrorMessage(null)}
            ref={name}
            type="text"
            placeholder='Full Name' />)}

        <Input onChange={() => setErrorMessage(null)}
          ref={email}
          type="text"
          placeholder='Email Address' />

        <Input onChange={() => setErrorMessage(null)}
          ref={password}
          type="password"
          placeholder='Password' />

        {errorMessage && <p className='text-red-500 text-center font-bold'>{errorMessage}</p>}

        <Button onClick={handleSubmit}>{isSignInForm ? "Sign In" : "Sign Up"}</Button>

        <div className='flex justify-between items-center text-sm'>
          <p className='text-gray-400'>{isSignInForm ? "New To Netflix?" : "Already have account?"}</p>

          <p className='cursor-pointer text-gray-50'
            onClick={() => {
              setErrorMessage(null);
              setIsSignInForm(!isSignInForm);
            }}
          >{isSignInForm ? "Sign Up" : "Sign In"}</p>
        </div>

      </Form>
    </div>
  )
}

export default Login

/* css tailwind */

const ImageContainer = tw.div`absolute w-full -z-10`;

const Form = tw.form`absolute text-white w-1/2 lg:w-1/3 h-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black max-auto flex flex-col px-12 py-12 gap-6 bg-opacity-95 rounded-lg border-2 border-gray-950`;

const Input = tw.input`rounded-md text-sm text-gray-400 bg-slate-900 px-2 py-4`;

const Button = tw.button`rounded-md text-sm text-white-400 bg-red-900 px-2 py-4 mt-3`
