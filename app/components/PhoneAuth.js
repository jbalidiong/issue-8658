'use client'

import React, { useState } from 'react';
import {auth} from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const handleSendCode = () => {
    const recaptchaVerifier = new RecaptchaVerifier( auth, 'send-code-button', {
      size: 'invisible',
    });

    signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
      .then((verificationId) => {
        setVerificationId(verificationId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleVerifyCode = () => {
    const credential = PhoneAuthProvider.credential(verificationId, verificationCode);

    signInWithCredential(auth, credential)
      .then((userCredential) => {
        // User signed in successfully
        console.log(userCredential);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button id="send-code-button" onClick={handleSendCode}>Send Code</button>
      <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
      <button onClick={handleVerifyCode}>Verify Code</button>
    </>
  );
};

export default PhoneAuth;
