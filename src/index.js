import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Pages/App';
import SignPage from './Pages/SignPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preview from './Pages/Preview';
import ForgetPassWord from './Pages/ForgetPassWord';
import ResendVerificationLink from './Pages/ResendVerificationLink';
import Admission_Home from './Pages/Admission_Home';
import StudentForm from './Pages/StudentForm';
import Proctors from './Pages/Proctors';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignPage />} />
      <Route path='/admissionForm' element={<App />} />
      <Route path='/previewForm' element={<Preview />} />
      <Route path='/forgetpassword' element={<ForgetPassWord />} />
      <Route path='/resendactivationlink' element={<ResendVerificationLink />} />
      <Route path='/Admission_Home' element={<Admission_Home />} />
      <Route path='/Student_Form' element={<StudentForm />} />
      <Route path='/Proctors' element={<Proctors />} />
      
  
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


