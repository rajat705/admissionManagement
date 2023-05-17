import { signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { auth, database } from '../firebase';
import { collection, deleteDoc, doc, getDocs, query, setDoc } from 'firebase/firestore';

export default function Proctors() {
    const [menu_btn, setMenu_btn] = useState('none');
    const [LoadData, set_LoadData] = useState(false)
    const [UserData, set_UserData] = useState([])

    const getData = async () => {
        const querySnapshot = await getDocs(collection(database, "Student"));
        var newObj = []
        querySnapshot.forEach((doc) => {
            newObj.push(doc.data())
        });

        set_UserData(newObj)
    }

    if (LoadData === false) {
        getData()
        set_LoadData(true)
    }

    const deleteData = async (id) => {
        console.log(id)
        await deleteDoc(doc(database, "Student", id))
    }

    const value_obj = { id: 50, studfname: 'Sandesh', studemail: 'sandeshtrivedi@ecajmer.ac.in', studpassword: '0db046d0de6a1a259bae454d2ebb162c', token: '211ed78fe91938b90f84a51944b08d5a', formStatus: 1, photo: '' }
    // setDoc(doc(database, 'Student', '50'), value_obj)


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
                    <div className="collapse navbar-collapse" id="navbarNav" style={{ display: menu_btn }}>
                        <ul className="navbar-nav">
                            <li className="nav-item navLinks">
                                <Link className="nav-link" to="/Admission_Home">Home</Link>
                            </li>
                            <li className="nav-item navLinks">
                                <a className="nav-link" href="https://firebasestorage.googleapis.com/v0/b/ecajmer-fc4e9.appspot.com/o/General%20Instructions.pdf?alt=media&token=2c095c4e-47a2-417c-8ef6-cfd22ae51647">General Instructions</a>
                            </li>
                            <li className="nav-item navLinks">
                                <Link className="nav-link" to="/admissionForm">Admission Form</Link>
                            </li>
                            <li className="nav-item navLinks">
                                <Link className="nav-link active" to="/Proctors">Proctors</Link>
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

            <div className='container-xxl'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">S.no</th>
                            <th scope="col">Student Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Branch</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            UserData.map(item => (
                                <tr>
                                    <th scope="row" style={{
                                        maxWidth: '50px',
                                        overflow: 'hidden'
                                    }}>{item.id}</th>
                                    <td>{item.studfname}</td>
                                    <td>{item.studemail}</td>
                                    <td>{item.studbranchname}</td>
                                    <td>{item.formStatus}</td>
                                    <td><button type="button" class="btn btn-danger" style={{ width: 'fit-content' }} onClick={() => deleteData(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossOrigin="anonymous"></script>
        </div>
    )
}
