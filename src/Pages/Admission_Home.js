import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, database } from '../firebase';
import { Link } from 'react-router-dom';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

export default function Admission_Home() {

    const [menu_btn, setMenu_btn] = useState('none');
    
    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossOrigin="anonymous"></link>
            <nav className="navbar navbar-expand-lg p-0 d-flex bg-white">
                <div className="container-xxl px-5 py-2">
                    <div className="container-xxl">
                        <a className="navbar-brand" href="#">
                            <img src="https://www.ecajmer.ac.in/proctorwebsite/proctors/images/download.jpg" alt="Logo" height='80' width='80' className="d-inline-block align-text-top" />
                        </a>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => {
                        if (menu_btn === 'none') {
                            setMenu_btn('block')
                        } else {
                            setMenu_btn('none')
                        }
                    }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav" style={{display: menu_btn}}>
                        <ul className="navbar-nav">
                            <li className="nav-item navLinks">
                                <Link className="nav-link active" to="/Admission_Home">Home</Link>
                            </li>
                            <li className="nav-item navLinks">
                                <a className="nav-link" href="https://firebasestorage.googleapis.com/v0/b/ecajmer-fc4e9.appspot.com/o/General%20Instructions.pdf?alt=media&token=2c095c4e-47a2-417c-8ef6-cfd22ae51647">General Instructions</a>
                            </li>
                            <li className="nav-item navLinks">
                                <Link className="nav-link" to="/admissionForm">Admission Form</Link>
                            </li>
                            <li className="nav-item navLinks">
                                <Link className="nav-link" to="/Proctors">Proctors</Link>
                            </li>
                            <li className="nav-item navLinks">
                                <button type='button' className="nav-link" onClick={() => {
                                    signOut(auth).then((val) => {
                                        window.location.href = '/';
                                    })
                                }}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-sm" style={{ marginTop: "100px" }}>
                <br />
                <center><h2>Engineering College Ajmer Welcomes New Students</h2></center>
                <div className="row" style={{ marginTop: "40px" }}>
                    <div className="col-md-6 mt-md-0 mt-3">
                        <center><h5>PRINCIPAL'S MESSAGE</h5></center>
                        <center><img src="https://www.ecajmer.ac.in/proctorwebsite/admission2022/images/principal2021.jpg" alt="principal's photo" width="300" height="200" /></center>
                        <p style={{ textAlign: "center" }}><b> </b></p>
                        <p style={{ textAlign: "justify" }}>The journey of a thousand miles begins with a single step. The first step which a student takes with this institute of excellence goes a long way in shaping his destiny . As Mahatma Gandhi said, "By Education I mean an all round drawing out of the best in child and man-body, mind and spirit". The ultimate goal of education is the discovery of the meaning of life and the fulfillment of life for all mankind as well as for oneself. The quest of education is knowledge, humanity, culture, wisdom and sharpness but it should be noted that knowledge is not given but earned and character is not granted but cultivated. Engineering College Ajmer with its dedicated team of faculty members leaves no stone unturned in shaping the future of its students. It is not an institute but a family that takes care of every member, gives personal attention to their overall personality development and academic growth. We accord prime importance to the behavioral discipline, moral integrity and cognitive development of our students.</p>
                        <p style={{ textAlign: "justify" }}>Highly trained and resourceful faculty, rich library, placement cell, teaching methods, liberty to think and express are our strengths. We have been blessed with highest number of placements among all Government Engineering Colleges of Rajasthan in past few years. Our students have brought us laurels and are permeating the light of knowledge all around .</p>
                        <p style={{ textAlign: "justify" }}>We are honored to be a droplet contributor in prestigious World Bank Project, Technical Education Quality Improvement Program (TEQIP) phase III where we are enthusiastically working towards attaining Sustainable Development Goal (SDG)–IV through education and empowerment. Our students, faculty and staff members strive hard for obtaining benefits of various sponsoring and funding schemes to improve academic and administrative practices for upliftment of technical education in India and future generations.</p><p>
                        </p><p style={{ textAlign: "justify" }}>We believe that</p>
                        <p style={{ textAlign: "justify" }}><b> "We cannot always build the future for our youth, but we can
                            build our youth for the future”. Jai Hind !!</b> </p><br />
                        <p style={{ textAlign: "Right" }}><b> Dr. Rekha Mehra</b> </p>
                        <p style={{ textAlign: "Right" }}><b> Principal</b> </p>
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                        <center><h5>CHIEF PROCTOR'S MESSAGE</h5></center>
                        <center><img src="http://ecajmer.ac.in/facultylogin/basic_details_panel/upload/25_02_2019_01_52_41_R%20K%20Motwani.jpg" alt="Chief Proctor's photo" width="200" height="200" /></center>
                        <p style={{ textAlign: "center" }}><b> </b></p>
                        <p style={{ textAlign: "justify" }}>I, on behalf of the Proctorial Board, wish heartiest congratulations to you for joining
                            ENGINEERING COLLEGE AJMER.
                            It gives us immense pleasure to welcome you all to be a part of this Institution that strives to
                            provide students a healthy atmosphere to learn, practice and excel in their lives.
                            Our warm wishes for your outstanding academic careers.</p>
                        <p style={{ textAlign: "justify" }}><b> Keep learning, keep progressing, and keep smiling. Jai Hind !!</b> </p>
                        <p style={{ textAlign: "Right" }}><b> Dr. R. K. Motwani</b> </p>
                        <p style={{ textAlign: "Right" }}><b> Chief Proctor</b> </p>
                    </div>
                </div>

            </div>

            <div className="container-sm" style={{ marginBottom: '30px' }}>
                <br />
                <center>EC, Ajmer Admission Website Prepared and Designed by : <b>Ravinder Singh, Assistant Professor (IT)</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a className="nav-link" href="../admission2022/contact">Contact Us</a></center>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossOrigin="anonymous"></script>
        </div>
    )
}
