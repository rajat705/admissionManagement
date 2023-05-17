
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, database, storage } from '../firebase';
import './App.css';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function StudentForm() {

  const [menu_btn, setMenu_btn] = useState('none');

  const [userImage, setUserImage] = useState(null)

  const [formData, setFormData] = useState({
    id: '',
    studImage: '',
    studfname: '',
    studdob: '',
    studgender: '',
    studemail: '',
    studcontactno: '',
    studreligion: '',
    studcoursename: '',
    studbranchname: '',
    studnationality: '',
    studdomicile: '',
    studmaritial: '',
    studhandicapped: '',
    studaadhar: '',
    studvoteridopt: '',
    studpermaddr: '',
    studlocation: '',
    studaddrsoptn: '',
    studprntajaddrs: '',
    studcategory: '',
    studsubcategory: '',
    studhostelreq: '',
    studtranptchoice: '',
    studrailwaystn: '',
    fathername: '',
    fatheroccupation: '',
    mothersname: '',
    parentscontactno: '',
    parentaddrs: '',
    parentannulincome: '',
    nomineename: '',
    nomineerelation: '',
    reaapplno: 0,
    reapmrtno: 0,
    reapcatrank: 0,
    studygap: '',
    secyearpass: '',
    secboardname: '',
    secmaxmarks: 0,
    secobtmarks: 0,
    secpercentage: 0,
    secsubjects: '',
    srsecyearpassing: '',
    srsecboardname: '',
    srsecsubjects: '',
    srsecmaxmarks: 0,
    srsecobtmarks: 0,
    srsecpercentage: 0,
    srphymaxmarks: 0,
    srphyobtmarks: 0,
    srmathmaxmarks: 0,
    srmathobtmarks: 0,
    srthrdsubopt: '',
    srthrdsubmaxmarks: 0,
    srthrdsubobtmarks: 0,
    studdipoption: '',
    entrythrough: '',

    //optional

    studlastname: '',
    studvoterid: '',
    studbloodgroup: '',
    fatheremailid: ' ',
    guardianname: ' ',
    gaurdianrelation: ' ',
    locgaurdianname: ' ',
    locgaurdianaddrs: ' ',
    gapperiod: '',
    gapreason: '',
    nameofdipoth: '',
    dipyearpassing: '',
    dipboardname: '',
    dipmaxmarks: 0,
    dipobtmarks: 0,
    dippercentage: 0,
    dipsubjects: '',
    jeerollno: '',
    jeegenrank: 0,
    jeecatrank: 0,

    // final submit
    formStatus: null
  });

  const [studvoteridopt, set_studvoteridopt] = useState(false)
  const [studygap, set_studygap] = useState(false)
  const [entrythrough, set_entrythrough] = useState(false)
  const [studdipoption, set_studdipoption] = useState(false)
  const [studaddrsoptn, set_studaddrsoptn] = useState(false)

  //download btn
  const [download_btn, set_download_btn] = useState(true)
  const [btn, set_btn] = useState(false)
  const [formControl, set_formControl] = useState(false)

  const [authChecker, setAuthChecker] = useState(false)

  if (authChecker == false) {
    var newObj = {}
    onAuthStateChanged(auth, (user) => {

      console.log(user)
      if (user.emailVerified == false) {
        window.location.href = '/Admission_Home';
      }
      else {
        for (const key in formData) {
          if (key === 'studemail') {
            newObj[key] = auth.currentUser.email
          }
          else if (key === 'id') {
            newObj[key] = auth.currentUser.uid
            // console.log(auth.currentUser.uid)
          }
          else {
            newObj[key] = formData[key]
          }
        }
        setFormData(newObj)
        getData()
      }
    })
    setAuthChecker(true)
  }

  const inputEvent = (event) => {
    const value = event.target.value
    const name = event.target.name

    var newObj = {}

    formData[name] = value

    if (name === 'studvoteridopt' && value === "No") {
      formData.studvoterid = "None"
      set_studvoteridopt(true)
    }
    if (name === 'studvoteridopt' && value === "Yes") {
      set_studvoteridopt(false)
    }
    if (name === "studygap" && value === "No") {
      formData.gapperiod = "None"
      formData.gapreason = "None"
      set_studygap(true)
    }
    if (name === "studygap" && value === "Yes") {
      formData.gapperiod = "None"
      formData.gapreason = "None"
      set_studygap(false)
    }
    if (Number(formData.secobtmarks) != 0 || Number(formData.secmaxmarks) != 0) {
      formData.secpercentage = Math.round(Number(formData.secobtmarks) / Number(formData.secmaxmarks) * 100)

      if (formData.secpercentage >= 100) {
        formData.secpercentage = 100
      }
    }

    if (Number(formData.srsecobtmarks) != 0 || Number(formData.srsecmaxmarks) != 0) {
      formData.srsecpercentage = Math.round(Number(formData.srsecobtmarks) / Number(formData.srsecmaxmarks) * 100)

      if (formData.srsecpercentage >= 100) {
        formData.srsecpercentage = 100
      }
    }

    if (Number(formData.dipobtmarks) != 0 || Number(formData.dipmaxmarks) != 0) {
      formData.dippercentage = Math.round(Number(formData.dipobtmarks) / Number(formData.dipmaxmarks) * 100)

      if (formData.dippercentage >= 100) {
        formData.dippercentage = 100
      }
    }

    if (name === 'entrythrough' && value === 'JEE-Mains') {
      formData.jeecatrank = 0
      formData.jeegenrank = 0
      formData.jeerollno = ''
      set_entrythrough(false)
    }
    if (name === 'entrythrough' && value === '12th') {
      formData.jeecatrank = 0
      formData.jeegenrank = 0
      formData.jeerollno = 'None'
      set_entrythrough(true)
    }

    if (name === 'studdipoption' && value === 'No') {
      formData.dipboardname = 'None'
      formData.dipmaxmarks = 0
      formData.dipobtmarks = 0
      formData.dipsubjects = "None"
      formData.dipyearpassing = ""
      formData.nameofdipoth = "None"
      set_studdipoption(true)
    }
    if (name === 'studdipoption' && value === 'Yes') {
      set_studdipoption(false)
    }

    if (name === 'studaddrsoptn' && value === 'Yes') {
      formData.studprntajaddrs = 'Same'
      set_studaddrsoptn(true)
    }
    if (name === 'studaddrsoptn' && value === 'No') {
      formData.studprntajaddrs = ''
      set_studaddrsoptn(false)
    }

    for (const key in formData) {
      if (key === name) {
        newObj[key] = value
      }
      else {
        newObj[key] = formData[key]
      }
    }
    setFormData(newObj)

  }

  const saveForm = async () => {
    formData.formStatus = 'Save'
    try {
      await setDoc(doc(database, "Student", auth.currentUser.uid), formData)
      alert('your form is Saved')
    } catch (error) {
      try {
        await updateDoc(doc(database, "Student", auth.currentUser.uid), formData)
        alert('your form is Saved')
      }
      catch (e) {
        alert(e.message)
        alert('not able to save Database Issue')
      }
    }
  }

  const getData = async () => {
    const result = await getDoc(doc(database, "Student", auth.currentUser.uid))
    var newObj = formData

    if (result.data()) {
      if (result.data().formStatus === 'Save') {
        for (const key in newObj) {
          newObj[key] = result.data()[key]
          if (key === 'studImage') {
            setUserImage(result.data().studImage)
          }
        }

        // console.log(newObj)
        setFormData(newObj)

        if (result.data().studvoteridopt === "No") {
          formData.studvoterid = "None"
          set_studvoteridopt(true)
        }
        if (result.data().studvoteridopt === "Yes") {
          set_studvoteridopt(false)
        }
        if (result.data().studygap === "No") {
          formData.gapperiod = "None"
          formData.gapreason = "None"
          set_studygap(true)
        }
        if (result.data().studygap === "Yes") {
          formData.gapperiod = "None"
          formData.gapreason = "None"
          set_studygap(false)
        }

        if (result.data().entrythrough === 'JEE-Mains') {
          formData.jeecatrank = 0
          formData.jeegenrank = 0
          formData.jeerollno = ''
          set_entrythrough(false)
        }
        if (result.data().entrythrough === '12th') {
          formData.jeecatrank = 0
          formData.jeegenrank = 0
          formData.jeerollno = 'None'
          set_entrythrough(true)
        }

        if (result.data().studdipoption === 'No') {
          formData.dipboardname = 'None'
          formData.dipmaxmarks = 0
          formData.dipobtmarks = 0
          formData.dipsubjects = "None"
          formData.dipyearpassing = ""
          formData.nameofdipoth = "None"
          set_studdipoption(true)
        }
        if (result.data().studdipoption === 'Yes') {
          set_studdipoption(false)
        }

        if (result.data().studaddrsoptn === 'Yes') {
          formData.studprntajaddrs = 'Same'
          set_studaddrsoptn(true)
        }
        if (result.data().studaddrsoptn === 'No') {
          formData.studprntajaddrs = ''
          set_studaddrsoptn(false)
        }
      }
      else if (result.data().formStatus === 'Final Submit') {

        set_formControl(true)
        set_download_btn(false)
        set_btn(true)

        for (const key in newObj) {
          newObj[key] = result.data()[key]
        }

        // console.log(newObj)
        setFormData(newObj)

        if (result.data().studvoteridopt === "No") {
          formData.studvoterid = "None"
          set_studvoteridopt(true)
        }
        if (result.data().studvoteridopt === "Yes") {
          set_studvoteridopt(false)
        }
        if (result.data().studygap === "No") {
          formData.gapperiod = "None"
          formData.gapreason = "None"
          set_studygap(true)
        }
        if (result.data().studygap === "Yes") {
          formData.gapperiod = "None"
          formData.gapreason = "None"
          set_studygap(false)
        }

        if (result.data().entrythrough === 'JEE-Mains') {
          formData.jeecatrank = 0
          formData.jeegenrank = 0
          formData.jeerollno = ''
          set_entrythrough(false)
        }
        if (result.data().entrythrough === '12th') {
          formData.jeecatrank = 0
          formData.jeegenrank = 0
          formData.jeerollno = 'None'
          set_entrythrough(true)
        }

        if (result.data().studdipoption === 'No') {
          formData.dipboardname = 'None'
          formData.dipmaxmarks = 0
          formData.dipobtmarks = 0
          formData.dipsubjects = "None"
          formData.dipyearpassing = ""
          formData.nameofdipoth = "None"
          set_studdipoption(true)
        }
        if (result.data().studdipoption === 'Yes') {
          set_studdipoption(false)
        }

        if (result.data().studaddrsoptn === 'Yes') {
          formData.studprntajaddrs = 'Same'
          set_studaddrsoptn(true)
        }
        if (result.data().studaddrsoptn === 'No') {
          formData.studprntajaddrs = ''
          set_studaddrsoptn(false)
        }
      }
      else {

      }
    }
  }

  const finalSubmit = async (event) => {
    event.preventDefault();

    var formSave_Control = 0;

    for (const key in formData) {
      if (formData[key] == '' && formSave_Control <= 55) {

        alert(`Please Enter Your ${key}`)
        break;
      }
      formSave_Control = formSave_Control + 1;
    }
    if (formSave_Control >= 57) {
      // saveForm()
      formData.formStatus = 'Final Submit'
      getData()
      try {
        await setDoc(doc(database, "Student", auth.currentUser.uid), formData)
        alert('your form is Saved')
      } catch (error) {
        try {
          await updateDoc(doc(database, "Student", auth.currentUser.uid), formData)
          alert('your form is Saved')
        }
        catch (e) {
          alert(e.message)
          alert('not able to save Database Issue')
        }
      }
      // alert('Save Form')
    }

  }

  const [key, set_key] = useState(['d-block', 'd-none', 'd-none'])

  var [student, set_student] = useState([
    {
      id: 0,
      content: 'Student',
      state: 'btn btn-primary',
      keyChng: ['d-block', 'd-none', 'd-none']
    },
    {
      id: 1,
      content: 'Family Details',
      state: 'btn btn-outline-primary',
      keyChng: ['d-none', 'd-block', 'd-none']
    },
    {
      id: 2,
      content: 'Marks',
      state: 'btn btn-outline-primary',
      keyChng: ['d-none', 'd-none', 'd-block']
    }
  ])

  const stateChng = async (value) => {
    switch (value) {
      case 0:
        set_student([
          {
            id: 0,
            content: 'Student',
            state: 'btn btn-primary',
            keyChng: ['d-block', 'd-none', 'd-none']
          },
          {
            id: 1,
            content: 'Family Details',
            state: 'btn btn-outline-primary',
            keyChng: ['d-none', 'd-block', 'd-none']
          },
          {
            id: 2,
            content: 'Marks',
            state: 'btn btn-outline-primary',
            keyChng: ['d-none', 'd-none', 'd-block']
          }
        ])
        break;
      case 1:
        set_student([
          {
            id: 0,
            content: 'Student',
            state: 'btn btn-outline-primary',
            keyChng: ['d-block', 'd-none', 'd-none']
          },
          {
            id: 1,
            content: 'Family Details',
            state: 'btn btn-primary',
            keyChng: ['d-none', 'd-block', 'd-none']
          },
          {
            id: 2,
            content: 'Marks',
            state: 'btn btn-outline-primary',
            keyChng: ['d-none', 'd-none', 'd-block']
          }
        ])
        break;
      case 2:
        set_student([
          {
            id: 0,
            content: 'Student',
            state: 'btn btn-outline-primary',
            keyChng: ['d-block', 'd-none', 'd-none']
          },
          {
            id: 1,
            content: 'Family Details',
            state: 'btn btn-outline-primary',
            keyChng: ['d-none', 'd-block', 'd-none']
          },
          {
            id: 2,
            content: 'Marks',
            state: 'btn btn-primary',
            keyChng: ['d-none', 'd-none', 'd-block']
          }
        ])
        break;
    }
  }

  const uploadCoverImage = (item) => {

    var newObj = formData

    const imgRef = ref(
      storage,
      `Students/${Math.floor(100000 + Math.random() * 900000) + item.name}`
    );
    uploadBytes(imgRef, item).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // console.log(url)
        for (const key in formData) {
          if (key === 'studImage') {
            alert(`Your Student Image is Uploaded`)
            newObj.studImage = url
            break;
          }
        }
        // console.log(newObj)
        setFormData(newObj)
        setUserImage(url)
      });
    });

  };

  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossOrigin="anonymous"></link>
      <div className="bg-primary">
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

        <form method='POST' onSubmit={finalSubmit}>
          <div className="btn-group cont-contain mt-5 px-2" role="group" aria-label="Basic example">
            {
              student.map(item => (
                <button key={item.id} type="button" className={item.state} onClick={() => {
                  set_key(item.keyChng)
                  stateChng(item.id)
                }}>{item.content}</button>
              ))
            }
          </div>
          <div className='py-5 mx-3'>
            <div className="container-sm cont-contain px-5 py-5 rounded">
              {/* <FormFields /> */}

              <div>

                <div className={key[0]}>
                  <div className="wrapper rounded bg-white">

                    <div className="h3" style={{ textAlign: 'center' }}>Engineering College Ajmer <br />B.Tech Admission form<br /> (Session: 2022-23)</div>

                    <div className="form">

                      <div className="row my-5">
                        <div className="col-md-6 mt-md-0 mt-3">
                          <label className="my-2">First &amp; Middle Name <span className="text-danger">*</span></label>
                          <input required="" type="text" pattern="[a-zA-Z. ]+" className="form-control upper" onChange={inputEvent} name="studfname" value={formData.studfname} disabled={formControl} />
                        </div>
                        <div className="col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Last Name</label>
                          <input id="studlastname" type="text" className="form-control upper" pattern="[a-zA-Z. ]+" onChange={inputEvent} name="studlastname" value={formData.studlastname} disabled={formControl} />


                        </div>
                      </div>

                      <div className="row my-5">
                        <label className="my-2">Student Image<span className="text-danger">*</span></label>
                        <div className='my-3 text-center'>
                          {
                            userImage ? (<img src={userImage} className="img-thumbnail" alt="User Image" width="150px" height='150px' />) : (<div></div>)
                          }
                        </div>
                        <div className="input-group mb-3">
                          <input type="file" className="form-control" name='studImage' disabled={formControl} onChange={(e) => {
                            uploadCoverImage(
                              e.target.files[0]
                            );
                          }} />
                          <label className="input-group-text">Upload</label>
                        </div>
                      </div>


                      <div className="row my-5">
                        <div className="col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Date of Birth <span className="text-danger">*</span></label>
                          <input required="" type="date" onChange={inputEvent} name="studdob" className="form-control" value={formData.studdob} disabled={formControl} />
                        </div>

                        <div className="col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Gender <span className="text-danger">*</span></label>
                          <select onChange={inputEvent} name="studgender" className="form-control" required="" value={formData.studgender} disabled={formControl}>
                            <option defaultValue="" hidden="">Choose Option</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                          </select>
                        </div>
                      </div>
                      <div className="row my-5">
                        <div className="col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Student Email <span className="text-danger">*</span></label>
                          <input required="" type="email" className="form-control" onChange={inputEvent} name="studemail" disabled={true} value={formData.studemail} />
                        </div>
                        <div className="col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Student Mobile Number <span className="text-danger">*</span></label>
                          <input required="" type="tel" className="form-control" minLength="10" maxLength="10" onChange={inputEvent} name="studcontactno" pattern="[0-9]{10}" value={formData.studcontactno} disabled={formControl} />
                        </div>
                      </div>

                      <div className="row my-5">
                        <div className="col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Religion <span className="text-danger">*</span></label>
                          <input required="" pattern="[a-zA-Z. ]+" type="text" className="form-control" onChange={inputEvent} name="studreligion" value={formData.studreligion} disabled={formControl} />
                        </div>

                        <div className="col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Student Programme Name <span className="text-danger">*</span></label>
                          <select required="" onChange={inputEvent} name="studcoursename" className="form-control" disabled={formControl} value={formData.studcoursename}>
                            <option defaultValue="" hidden="">Choose Option</option>
                            <option value="B.Tech">B.Tech</option>
                            {/* <option value="MBA">MBA</option>
          <option value="MCA">MCA</option>
          <option value="M.Tech">M.Tech</option>
          <option value="Ph.D.">Ph.D.</option> */}
                          </select>
                        </div>
                      </div>

                      <div className="row my-5">
                        <div className="col-md-12 mt-md-0 mt-3">
                          <label className="my-2">Student Branch Name <span className="text-danger">*</span></label>
                          <select required="" onChange={inputEvent} name="studbranchname" className="form-control" disabled={formControl} value={formData.studbranchname}>
                            <option defaultValue="" hidden="">Choose Option</option>
                            <option value="Computer Engineering">Computer Engineering</option>
                            <option value="Computer Science and Engineering ( Cyber Security )">Computer Science and Engineering ( Cyber Security )</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                            <option value="Electronics Instumention and Control">Electronics Instumention and Control</option>
                            <option value="Electrical Enginnering">Electrical Enginnering</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                          </select>
                        </div>
                      </div>

                      <div className="row my-5">
                        <div className="col-md-12 mt-md-0 mt-3">
                          <label className="my-2">Student Nationality <span className="text-danger">*</span></label>
                          <select required="" onChange={inputEvent} name="studnationality" className="form-control" disabled={formControl} value={formData.studnationality}>
                            <option defaultValue="" hidden="">Choose Option</option>
                            <option value="Indian">Indian</option>
                          </select>
                        </div>
                      </div>

                      <div className="row my-5">
                        <div className="col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Student Domicile <span className="text-danger">*</span></label>
                          <select required="" onChange={inputEvent} name="studdomicile" className="form-control" disabled={formControl} value={formData.studdomicile}>
                            <option defaultValue="" hidden="">Choose Option</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                            <option value="Daman and Diu">Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Orissa">Orissa</option>
                            <option value="Pondicherry">Pondicherry</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttaranchal">Uttaranchal</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="West Bengal">West Bengal</option>
                          </select>

                        </div>
                        <div className=" col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Student Maritial Status <span className="text-danger">*</span></label>
                          <select required="" onChange={inputEvent} name="studmaritial" className="form-control" disabled={formControl} value={formData.studmaritial}>
                            <option defaultValue="" hidden="">Choose Option</option>
                            <option value="Married">Married</option>
                            <option value="Unmarried">Unmarried</option>
                          </select>
                        </div>
                      </div>

                      <div className="row my-5">
                        <div className=" col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Is Physical Handicapped? <span className="text-danger">*</span></label>
                          <select required="" onChange={inputEvent} name="studhandicapped" disabled={formControl} value={formData.studhandicapped} className="form-control">
                            <option defaultValue="" hidden="">Choose Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div className="col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Student Aadhar No / Aadhar Acknowledgement Reciept ( if applicable) <span className="text-danger">*</span></label>
                          <input required="" type="text" className="form-control" onChange={inputEvent} name="studaadhar" disabled={formControl} value={formData.studaadhar} />
                        </div>
                      </div>

                      <div className="row my-5">
                        <div className=" col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Having Voter Id ? <span className="text-danger">*</span></label>
                          <select required="" onChange={inputEvent} name="studvoteridopt" className="form-control" disabled={formControl} value={formData.studvoteridopt}>
                            <option defaultValue="" hidden="">Choose Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div className="col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Student Voter Id Details</label>
                          <input required="" type="text" className="form-control" onChange={inputEvent} name="studvoterid" value={formData.studvoterid} disabled={studvoteridopt} />
                        </div>
                      </div>

                      <div className="row my-5">
                        <div className="col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Student Permanent Address <span className="text-danger">*</span></label>
                          <input required="" type="text" className="form-control" onChange={inputEvent} name="studpermaddr" value={formData.studpermaddr} disabled={formControl} />
                        </div>
                        <div className=" col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Student Area of Residence <span className="text-danger">*</span></label>
                          <select required="" onChange={inputEvent} name="studlocation" className="form-control" disabled={formControl} value={formData.studlocation} >
                            <option defaultValue="" hidden="">Choose Option</option>
                            <option value="Rural">Rural</option>
                            <option value="Urban">Urban</option>
                          </select>
                        </div>
                      </div>


                      <div className="row my-5">
                        <div className=" col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Is Student Present Address in Ajmer is Same as Permanent Address <span className="text-danger">*</span></label>
                          <select required="" onChange={inputEvent} name="studaddrsoptn" value={formData.studaddrsoptn} className="form-control" disabled={formControl}>
                            <option defaultValue="" hidden="">Choose Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>

                        <div className="col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Student Present Address in Ajmer</label>
                          <input required="" type="text" className="form-control" onChange={inputEvent} name="studprntajaddrs" value={formData.studprntajaddrs} disabled={studaddrsoptn} />
                        </div>
                      </div>


                      <div className="row my-5">
                        <div className=" col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Student Blood Group</label>
                          <select onChange={inputEvent} name="studbloodgroup" value={formData.studbloodgroup} className="form-control" disabled={formControl}>
                            <option defaultValue="Dont Know" hidden="">Choose Option</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="Dont Know">Do not Know</option>

                          </select>
                        </div>
                        <div className=" col-md-6 mt-md-0 mt-3">
                          <label className="my-2">Student Category <span className="text-danger">*</span></label>
                          <select required="" onChange={inputEvent} name="studcategory" className="form-control" value={formData.studcategory} disabled={formControl}>
                            <option defaultValue="" hidden="">Choose Option</option>

                            <option value="Gen">Gen</option>
                            <option value="Gen-F">Gen(Female)</option>
                            <option value="EWS">EWS</option>
                            <option value="EWS-F">EWS(Female)</option>
                            <option value="OBC-NCL">OBC-NCL</option>
                            <option value="OBC-F-NCL">OBC-NCL(Female)</option>
                            <option value="MBC">MBC</option>
                            <option value="MBC-F">MBC(Female)</option>
                            <option value="SC">SC</option>
                            <option value="SC-F">SC(Female)</option>
                            <option value="ST">ST</option>
                            <option value="ST-F">ST(Female)</option>
                            <option value="ST-TSP">ST-TSP</option>
                            <option value="ST-TSP-F">ST-TSP(Female)</option>



                          </select>
                        </div>
                        <div className="row my-5">
                          <div className=" col-md-6 mt-md-0 mt-3">
                            <label className="my-2">Student Sub-Category <span className="text-danger">*</span></label>
                            <select required="" onChange={inputEvent} name="studsubcategory" value={formData.studsubcategory} className="form-control" disabled={formControl}>
                              <option defaultValue="" hidden="">Choose Option</option>
                              <option value="TFWS">TFWS</option>
                              <option value="Ex">Ex</option>
                              <option value="Ex-Female">Ex-Female</option>
                              <option value="KM">KM</option>
                              <option value="PWD">PWD</option>
                              <option value="PWD-F">PWD-F</option>
                              <option value="PMSS">PMSS</option>
                              <option value="None">None</option>

                            </select>
                          </div>
                          <div className=" col-md-6 mt-md-0 mt-3">
                            <label className="my-2">Hostel Required?(<strong>Female Only</strong>) <span className="text-danger">*</span> </label>
                            <select required="" onChange={inputEvent} name="studhostelreq" value={formData.studhostelreq} className="form-control" disabled={formControl}>
                              <option defaultValue="" hidden="">Choose Option</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>

                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mx-0 justify-content-between">
                    <button type="button" className="btn btn-warning col-md-6 pb-2 btn-width" disabled>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                      </svg>
                    </button>
                    <input type="button" className="btn btn-success m-1" style={{ width: 'fit-content' }} value='Save' onClick={() => { saveForm() }} disabled={btn} />
                    <button type="button" className="btn btn-primary col-md-6 pb-2 btn-width" onClick={() => {
                      set_key(['d-none', 'd-block', 'd-none'])
                      stateChng(1)
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className={key[1]}>
                  <div className="h3" style={{ textAlign: 'center' }}>Engineering College Ajmer <br />B.Tech Admission form<br /> (Session: 2022-23)</div>
                  <div className="row my-5">
                    <div className=" col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Is Transport Required <span className="text-danger">*</span></label>
                      <select required="" onChange={inputEvent} name="studtranptchoice" value={formData.studtranptchoice} className="form-control" disabled={formControl}>
                        <option defaultValue="" hidden="">Choose Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>

                      </select>
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Name of the Railway Station Nearest to Home Town for Rail/Bus Concesssion <span className="text-danger">*</span></label>
                      <input required="" type="text" className="form-control" onChange={inputEvent} name="studrailwaystn" value={formData.studrailwaystn} disabled={formControl} />
                    </div>
                  </div>
                  <div className="row my-5">

                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Father's Name <span className="text-danger">*</span></label>
                      <input required="" pattern="[a-zA-Z. ]+" type="text" className="form-control" onChange={inputEvent} name="fathername" value={formData.fathername} disabled={formControl} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Father's Occupation <span className="text-danger">*</span></label>
                      <input required="" type="text" className="form-control" onChange={inputEvent} name="fatheroccupation" value={formData.fatheroccupation} disabled={formControl} />
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Father's Email Id</label>
                      <input type="email" className="form-control" onChange={inputEvent} name="fatheremailid" value={formData.fatheremailid} disabled={formControl} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Mother's Name <span className="text-danger">*</span></label>
                      <input required="" pattern="[a-zA-Z. ]+" type="text" className="form-control" onChange={inputEvent} name="mothersname" value={formData.mothersname} disabled={formControl} />
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Parent's Mobile No. <span className="text-danger">*</span></label>
                      <input required="" type="tel" className="form-control" minLength="10" maxLength="10" onChange={inputEvent} name="parentscontactno" pattern="[0-9]{10}" value={formData.parentscontactno} disabled={formControl} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Parent's Address For Communication <span className="text-danger">*</span></label>
                      <input required="" type="text" className="form-control" onChange={inputEvent} name="parentaddrs" value={formData.parentaddrs} disabled={formControl} />
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Family Income from All Sources(Annual) <span className="text-danger">*</span></label>
                      <input required="" type="number" step="any" min="0" className="form-control" onChange={inputEvent} name="parentannulincome" value={formData.parentannulincome} disabled={formControl} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Guardian Name (If Parent's Not Alive)</label>
                      <input pattern="[a-zA-Z. ]+" type="text" className="form-control" onChange={inputEvent} name="guardianname" value={formData.guardianname} disabled={formControl} />
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Realtionship with Guardian</label>
                      <input pattern="[a-zA-Z. ]+" type="text" className="form-control" onChange={inputEvent} name="gaurdianrelation" value={formData.gaurdianrelation} disabled={formControl} />
                    </div>

                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Local Gaurdian Name in Ajmer</label>
                      <input pattern="[a-zA-Z. ]+" type="text" className="form-control" onChange={inputEvent} name="locgaurdianname" value={formData.locgaurdianname} disabled={formControl} />
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Local Gaurdian Address in Ajmer with Mobile No</label>
                      <input type="text" className="form-control" onChange={inputEvent} name="locgaurdianaddrs" value={formData.locgaurdianaddrs} disabled={formControl} />
                    </div>

                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Name of Nominee (for Insurance Purpose) <span className="text-danger">*</span></label>
                      <input required="" pattern="[a-zA-Z. ]+" type="text" className="form-control" onChange={inputEvent} name="nomineename" value={formData.nomineename} disabled={formControl} />
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-12 mt-md-0 mt-3">
                      <label className="my-2">Relation with Nominee <span className="text-danger">*</span></label>
                      <input required="" pattern="[a-zA-Z. ]+" type="text" className="form-control" onChange={inputEvent} name="nomineerelation" value={formData.nomineerelation} disabled={formControl} />
                    </div>
                  </div>

                  <div className="row mx-0 justify-content-between">
                    <button type="button" className="btn btn-warning col-md-6 pb-2 btn-width" onClick={() => {
                      set_key(['d-block', 'd-none', 'd-none'])
                      stateChng(0)
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                      </svg>
                    </button>
                    <input type="button" className="btn btn-success m-1" style={{ width: 'fit-content' }} value='Save' onClick={() => { saveForm() }} disabled={btn} />
                    <button type="button" className="btn btn-primary col-md-6 pb-2 btn-width" onClick={() => {
                      set_key(['d-none', 'd-none', 'd-block'])
                      stateChng(2)
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className={key[2]}>
                  <div className="h3" style={{ textAlign: 'center' }}>Engineering College Ajmer <br />B.Tech Admission form<br /> (Session: 2022-23)</div>
                  <div className="row my-5">
                    <div className="col-md-12 mt-md-0 mt-3">
                      <label className="my-2">REAP-2022 Application Number <span className="text-danger">*</span></label>
                      <input required="" type="number" className="form-control" onChange={inputEvent} name="reaapplno" value={formData.reaapplno} disabled={formControl} />
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Reap 2022 Gen Rank <span className="text-danger">*</span></label>
                      <input required="" type="number" step="any" min="1" className="form-control" onChange={inputEvent} name="reapmrtno" value={formData.reapmrtno} disabled={formControl} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Reap 2022 Category Rank</label>
                      <input type="number" step="any" min="1" className="form-control" onChange={inputEvent} name="reapcatrank" value={formData.reapcatrank} disabled={formControl} />
                    </div>
                  </div>

                  <div className="col-md-12 mt-md-0 mt-3">
                    <label className="my-2">Any Gap in Studies? <span className="text-danger">*</span></label>
                    <select required="" onChange={inputEvent} name="studygap" className="form-control" value={formData.studygap} disabled={formControl}>
                      <option defaultValue="" hidden="">Choose Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Gap Period</label>
                      <input required="" type="text" className="form-control" onChange={inputEvent} name="gapperiod" value={formData.gapperiod} disabled={studygap} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Reason of Gap</label>
                      <input required="" type="text" className="form-control" onChange={inputEvent} name="gapreason" value={formData.gapreason} disabled={studygap} />
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Secondary Passing Year ( YYYY ) <span className="text-danger">*</span></label>
                      <input required="" type="date" minLength="4" className="form-control" maxLength="4" onChange={inputEvent} name="secyearpass" value={formData.secyearpass} disabled={formControl} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Secondary Board Name <span className="text-danger">*</span></label>
                      <input required="" type="text" className="form-control" id="secboardname" onChange={inputEvent} name="secboardname" value={formData.secboardname} disabled={formControl} />
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Secondary Maximum Marks <span className="text-danger">*</span> </label>
                      <input required="" type="number" step="any" min="0" className="form-control" onChange={inputEvent} name="secmaxmarks" value={formData.secmaxmarks} disabled={formControl} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Secondary Marks Obtained <span className="text-danger">*</span></label>
                      <input required="" type="number" step="any" min="0" className="form-control" onChange={inputEvent} name="secobtmarks" value={formData.secobtmarks} disabled={formControl} />
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Secondary Percentage <span className="text-danger">*</span></label>
                      <input readOnly="" required="" type="number" step="any" min="0" max="100" className="form-control" name="secpercentage" value={formData.secpercentage} disabled={true} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Secondary Subjects <span className="text-danger">*</span></label>
                      <input required="" type="text" className="form-control" onChange={inputEvent} name="secsubjects" value={formData.secsubjects} disabled={formControl} />
                    </div>
                  </div>

                  <div className="row my-5">

                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Sr. Secondary Passing Year ( YYYY ) <span className="text-danger">*</span></label>
                      {/* <!--Add drop down here--> */}
                      <input required="" type="date" minLength="4" maxLength="4" className="form-control" onChange={inputEvent} name="srsecyearpassing" value={formData.srsecyearpassing} disabled={formControl} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Sr. Secondary Board Name <span className="text-danger">*</span></label>
                      <input required="" type="text" className="form-control" onChange={inputEvent} name="srsecboardname" value={formData.srsecboardname} disabled={formControl} />
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Sr. Secondary Subjects <span className="text-danger">*</span></label>
                      <input required="" type="text" className="form-control" onChange={inputEvent} name="srsecsubjects" value={formData.srsecsubjects} disabled={formControl} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Sr. Secondary Maximum Marks <span className="text-danger">*</span> </label>
                      <input required="" type="number" step="any" min="0" className="form-control" onChange={inputEvent} name="srsecmaxmarks" value={formData.srsecmaxmarks} disabled={formControl} />
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Sr. Secondary Marks Obtained <span className="text-danger">*</span></label>
                      <input required="" type="number" step="any" min="0" className="form-control" onChange={inputEvent} name="srsecobtmarks" value={formData.srsecobtmarks} disabled={formControl} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Sr. Secondary Percentage <span className="text-danger">*</span></label>
                      {/* <!--calculation required here do later--> */}
                      <input required="" type="number" step="any" className="form-control" disabled={true} onChange={inputEvent} name="srsecpercentage" value={formData.srsecpercentage} />
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Sr. Secondary Maximum Marks in Physics <span className="text-danger">*</span></label>
                      <input required="" type="number" step="any" min="0" className="form-control" onChange={inputEvent} name="srphymaxmarks" value={formData.srphymaxmarks} disabled={formControl} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Sr. Secondary Obtained Marks in Physics <span className="text-danger">*</span></label>
                      <input required="" type="number" step="any" min="0" className="form-control" onChange={inputEvent} name="srphyobtmarks" value={formData.srphyobtmarks} disabled={formControl} />
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Sr. Secondary Maximum Marks in Math <span className="text-danger">*</span></label>
                      {/* <!--here chemistry variabel srchemaxmarks is used to enter marks for math*--> */}
                      <input required="" type="number" step="any" min="0" className="form-control" onChange={inputEvent} name="srmathmaxmarks" value={formData.srmathmaxmarks} disabled={formControl} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Sr. Secondary Obtained Marks in Math <span className="text-danger">*</span></label>
                      <input required="" type="number" step="any" min="0" className="form-control" onChange={inputEvent} name="srmathobtmarks" value={formData.srmathobtmarks} disabled={formControl} />
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-12 mt-md-0 mt-3">
                      <label className="my-2">Sr. Secondary Third Subject Name <span className="text-danger">*</span></label>
                      <input required="" type="text" className="form-control" onChange={inputEvent} name="srthrdsubopt" value={formData.srthrdsubopt} disabled={formControl} />
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Sr. Secondary Maximum Marks in Third Subject (  ) <span className="text-danger">*</span></label>
                      <input required="" type="number" step="any" min="0" className="form-control" onChange={inputEvent} name="srthrdsubmaxmarks" value={formData.srthrdsubmaxmarks} disabled={formControl} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Sr. Secondary Obtained Marks in Third Subject (  ) <span className="text-danger">*</span></label>
                      <input required="" type="number" step="any" min="0" className="form-control" onChange={inputEvent} name="srthrdsubobtmarks" value={formData.srthrdsubobtmarks} disabled={formControl} />
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className=" col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Having Diploma / Other <span className="text-danger">*</span></label>
                      <select required="" onChange={inputEvent} name="studdipoption" className="form-control" value={formData.studdipoption} disabled={formControl}>
                        <option defaultValue="" hidden="">Choose Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>

                      </select>
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Name of Diploma (If Any) / Equivalent to Diploma ( If Any )</label>
                      <input required="" type="text" className="form-control" onChange={inputEvent} name="nameofdipoth" value={formData.nameofdipoth} disabled={studdipoption} />
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">( Diploma / Other ) Passing Year ( YYYY )</label>
                      <input required="" type="date" className="form-control" minLength="4" maxLength="4" onChange={inputEvent} name="dipyearpassing" value={formData.dipyearpassing} disabled={studdipoption} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">( Diploma / Other ) Board Name</label>
                      <input required="" type="text" className="form-control" onChange={inputEvent} name="dipboardname" value={formData.dipboardname} disabled={studdipoption} />
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Diploma Maximum Marks </label>
                      <input required="required" type="number" step="any" min="0" className="form-control" onChange={inputEvent} name="dipmaxmarks" value={formData.dipmaxmarks} disabled={studdipoption} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Diploma Marks Obtained</label>
                      <input required="required" type="number" step="any" min="0" className="form-control" onChange={inputEvent} name="dipobtmarks" value={formData.dipobtmarks} disabled={studdipoption} />
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">( Diploma / Other ) Percentage</label>
                      <input required="" type="number" step="any" className="form-control" readOnly="" name="dippercentage" value={formData.dippercentage} disabled={true} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">( Diploma / Other ) Subjects</label>
                      <input required="" type="text" className="form-control" onChange={inputEvent} name="dipsubjects" value={formData.dipsubjects} disabled={studdipoption} />
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className=" col-md-6 mt-md-0 mt-3">
                      <label className="my-2">Entry Through JEE-Mains / 12Th <span className="text-danger">*</span></label>
                      <select required="" onChange={inputEvent} name="entrythrough" className="form-control" value={formData.entrythrough} disabled={formControl}>
                        <option defaultValue="" hidden="">Choose Option</option>
                        <option value="JEE-Mains">JEE-Mains</option>
                        <option value="12th">12th</option>
                      </select>
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">JEE Mains 2022 Roll No (If Applicable)</label>
                      <input required="" type="text" className="form-control" onChange={inputEvent} name="jeerollno" value={formData.jeerollno} disabled={entrythrough} />
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">JEE Mains 2022 Genral Rank(If Applicable)</label>
                      <input required="" type="number" min="1" className="form-control" onChange={inputEvent} name="jeegenrank" value={formData.jeegenrank} disabled={entrythrough} />
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3">
                      <label className="my-2">JEE Mains 2022 Category Rank(If Applicable)</label>
                      <input type="number" min="1" className="form-control" onChange={inputEvent} name="jeecatrank" value={formData.jeecatrank} disabled={entrythrough} />
                    </div>
                  </div>

                  <div className="row mx-0 justify-content-between align-items-center">
                    <button type="button" className="btn btn-warning col-md-6 pb-2 btn-width  m-1" onClick={() => {
                      set_key(['d-none', 'd-block', 'd-none'])
                      stateChng(1)
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                      </svg>
                    </button>
                    <button type="button" className="btn btn-warning col-md-6 pb-2 btn-width m-1" disabled={btn}>
                      <Link to="/previewform" style={{ textDecoration: 'none', color: 'black' }}>Preview</Link>
                    </button>

                    <input type="Submit" className="btn btn-success m-1" style={{ width: 'fit-content' }} value='Submit' onClick={finalSubmit} disabled={btn} />

                    <button type="button" className="btn btn-primary col-md-6 pb-2 btn-width m-1" disabled={download_btn}>
                      <Link to="/previewform" style={{ textDecoration: 'none', color: 'white' }}>Download</Link>
                    </button>
                    <button type="button" className="btn btn-primary col-md-6 pb-2 btn-width  m-1" disabled>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                      </svg>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossOrigin="anonymous"></script>
    </div>
  )
}
