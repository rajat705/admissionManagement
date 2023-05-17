import { useEffect, useRef, useState } from 'react';
import './App.css';

import { auth, database } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function App() {

  const [formData, setFormData] = useState({
    FirstNMiddleName: '',
    LastName: ' ',

    DOB: '',
    Gender: '',
    Email: '',
    MobileNumber: '',
    Religion: '',

    ProgrammeName: '',
    BranchhName: '',
    Nationality: '',

    Domicile: '',
    MaritialStatus: '',
    PhysicalHandicapped: '',
    AadharNumber: '',
    Aadhar_Acknowledgement: '',

    VoterId: '',
    VoterIdDetails: ' ',

    PermanentAddress: '',
    Stn_PermanentAreaOfResidence: '',

    PresentAddressChoice: ' ',
    PresentAreaOfResidence_Ajmer: ' ',
    Present_AreaOfResidence: '',

    BloodGroup: ' ',
    StnCategory: '',

    SubCategory: '',
    Hostel: '',

    Transport: '',
    HomeTown: '',

    FatherName: '',
    FatherOccupattion: '',
    FatherEmailId: ' ',

    MotherName: '',

    ParentMobileNumber: '',
    ParentAddress: '',
    FamilyIncome: '',
    GuardianName: ' ',
    RealtionshipGuardian: ' ',
    LocalGuardian: ' ',
    LocalGuardianAddress: ' ',

    NomineeName: '',
    NomineeRelationName: '',

    REAPApplicationNumber: '',
    REAPRank: '',
    REAPCategoryRank: ' ',
    AnyGapinStudies: '',

    GapPeriod: ' ',
    ReasonofGap: ' ',

    SecondaryPassingYear: '',
    SecondaryBoardName: '',
    SecondaryMaximumMarks: 0,
    SecondaryMarksObtained: 0,
    SecondaryPercentage: 0,
    SecondarySubjects: '',

    Sr_PassingYear: '',
    Sr_BoardName: '',
    Sr_Subjects: '',
    Sr_MaximumMarks: 0,
    Sr_Percentage: 0,
    Sr_ObtainMarks: 0,

    Sr_MaximumMarksPhysics: 0,
    Sr_MarksObtainedPhysics: 0,

    Sr_MaximumMarksMath: 0,
    Sr_MarksObtainedMath: 0,

    Sr_ThirdSubjectName: '',
    Sr_MaximumMarksThirdSubject: 0,
    Sr_MarksObtainedThirdSubject: 0,

    Diploma_or_Other: '',
    Name_Diploma: ' ',
    Diploma_Passing_Year: ' ',
    BoardName: ' ',
    Diploma_MaximumMarks: 0,
    Diploma_MarksObtained: 0,
    Diploma_Percentage: 0,
    Diploma_Subjects: ' ',

    Entry_through_JEE_Mains: '',
    JEE_Mains_Roll: 0,
    JEE_Mains_GenralRank: 0,
    JEE_Mains_CategoryRank: 0,

  })


  const [disabledVar, setDisabledVar] = useState(false)
  const [voterIDdisabled, setVoterIDDisabled] = useState(false)
  const [ajmerPresentAdr, setAjmerPresentAdr] = useState(false)
  const [Gap_Studies, set_Gap_Studies] = useState(false)
  const [jee_Disable, setJee_Disable] = useState(false)

  const [authChecker, setAuthChecker] = useState(false)
  if (authChecker == false) {
    onAuthStateChanged(auth, (user) => {
      if (user.emailVerified == false) {
        window.location.href = '/Admission_Home';
      }
      else {
        for (const key in formData) {
          if (key === 'Email') {
            newObj[key] = auth.currentUser.email
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

  var newObj = {}

  const inputEvent = (event) => {
    const value = event.target.value
    const name = event.target.name

    var newObj = {}

    formData[name] = value

    if (formData.Diploma_or_Other === 'No') {
      setDisabledVar(true)
      formData.Diploma_MaximumMarks = 0
      formData.Diploma_MarksObtained = 0
      formData.Diploma_Percentage = 0
      formData.Diploma_Subjects = ''
      formData.Diploma_Passing_Year = ''
      formData.BoardName = ''
      formData.Name_Diploma = ''

    } else {
      setDisabledVar(false)
    }
    if (formData.VoterId === 'No') {
      setVoterIDDisabled(true)
    } else {
      setVoterIDDisabled(false)
    }
    if (formData.Present_AreaOfResidence === 'No') {
      setAjmerPresentAdr(true)
    } else {
      setAjmerPresentAdr(false)
    }
    if (formData.AnyGapinStudies === 'No') {
      set_Gap_Studies(true)
    } else {
      set_Gap_Studies(false)
    }
    if (formData.Entry_through_JEE_Mains === '12th') {
      setJee_Disable(true)
      formData.JEE_Mains_CategoryRank = 0
      formData.JEE_Mains_GenralRank = 0
      formData.JEE_Mains_Roll = 0
    } else {
      setJee_Disable(false)
    }

    if (Number(formData.Sr_MarksObtainedMath) != 0 || Number(formData.Sr_MaximumMarks) != 0) {
      formData.Sr_Percentage = Math.round(Number(formData.Sr_ObtainMarks) / Number(formData.Sr_MaximumMarks) * 100)

      if (formData.Sr_Percentage > Number(formData.Sr_MaximumMarks)) {
        formData.Sr_Percentage = Number(formData.Sr_MaximumMarks)
      }
    }

    if (Number(formData.SecondaryMarksObtained) != 0 || Number(formData.SecondaryMaximumMarks) != 0) {
      formData.SecondaryPercentage = Math.round(Number(formData.SecondaryMarksObtained) / Number(formData.SecondaryMaximumMarks) * 100)

      if (formData.SecondaryPercentage > Number(formData.SecondaryMaximumMarks)) {
        formData.SecondaryPercentage = Number(formData.SecondaryMaximumMarks)
      }
    }

    if (Number(formData.Diploma_MarksObtained) != 0 || Number(formData.Diploma_MaximumMarks) != 0) {
      formData.Diploma_Percentage = Math.round(Number(formData.Diploma_MarksObtained) / Number(formData.Diploma_MaximumMarks) * 100)

      if (formData.SecondaryPercentage >  Number(formData.Diploma_MaximumMarks)) {
        formData.Diploma_Percentage =  Number(formData.Diploma_MaximumMarks)
      }
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

  const InValidLog = (value) => {
    console.log(value)
  }

  const saveForm = async () => {
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
    console.log(result.data());

    if (result.data().Email != null) {
      setFormData({
        FirstNMiddleName: result.data().FirstNMiddleName,
        LastName: result.data().LastName,

        DOB: result.data().DOB,
        Gender: result.data().Gender,
        Email: result.data().Email,
        MobileNumber: result.data().MobileNumber,
        Religion: result.data().Religion,

        ProgrammeName: result.data().ProgrammeName,
        BranchhName: result.data().BranchhName,
        Nationality: result.data().Nationality,

        Domicile: result.data().Domicile,
        MaritialStatus: result.data().MaritialStatus,
        PhysicalHandicapped: result.data().PhysicalHandicapped,
        AadharNumber: result.data().AadharNumber,
        Aadhar_Acknowledgement: result.data().Aadhar_Acknowledgement,

        VoterId: result.data().VoterId,
        VoterIdDetails: result.data().VoterIdDetails,

        PermanentAddress: result.data().PermanentAddress,
        PermanentAreaOfResidence: result.data().PermanentAreaOfResidence,
        Stn_PermanentAreaOfResidence: result.data().Stn_PermanentAreaOfResidence,

        PresentAddressChoice: result.data().PresentAddressChoice,
        PresentAreaOfResidence_Ajmer: result.data().PresentAreaOfResidence_Ajmer,
        Present_AreaOfResidence: result.data().Present_AreaOfResidence,

        BloodGroup: result.data().BloodGroup,
        StnCategory: result.data().StnCategory,

        SubCategory: result.data().SubCategory,
        Hostel: result.data().Hostel,

        Transport: result.data().Transport,
        HomeTown: result.data().HomeTown,

        FatherName: result.data().FatherName,
        FatherOccupattion: result.data().FatherOccupattion,
        FatherEmailId: result.data().FatherEmailId,

        MotherName: result.data().MotherName,

        ParentMobileNumber: result.data().ParentMobileNumber,
        ParentAddress: result.data().ParentAddress,
        FamilyIncome: result.data().FamilyIncome,
        GuardianName: result.data().GuardianName,
        RealtionshipGuardian: result.data().RealtionshipGuardian,
        LocalGuardian: result.data().LocalGuardian,
        LocalGuardianAddress: result.data().LocalGuardianAddress,

        NomineeName: result.data().NomineeName,
        NomineeRelationName: result.data().NomineeRelationName,

        REAPApplicationNumber: result.data().REAPApplicationNumber,
        REAPRank: result.data().REAPRank,
        REAPCategoryRank: result.data().REAPCategoryRank,
        AnyGapinStudies: result.data().AnyGapinStudies,

        GapPeriod: result.data().GapPeriod,
        ReasonofGap: result.data().ReasonofGap,

        SecondaryPassingYear: result.data().SecondaryPassingYear,
        SecondaryBoardName: result.data().SecondaryBoardName,
        SecondaryMaximumMarks: result.data().SecondaryMaximumMarks,
        SecondaryMarksObtained: result.data().SecondaryMarksObtained,
        SecondaryPercentage: result.data().SecondaryPercentage,
        SecondarySubjects: result.data().SecondarySubjects,

        Sr_PassingYear: result.data().Sr_PassingYear,
        Sr_BoardName: result.data().Sr_BoardName,
        Sr_Subjects: result.data().Sr_Subjects,
        Sr_MaximumMarks: result.data().Sr_MaximumMarks,
        Sr_Percentage: result.data().Sr_Percentage,
        Sr_ObtainMarks: result.data().Sr_ObtainMarks,

        Sr_MaximumMarksPhysics: result.data().Sr_MaximumMarksPhysics,
        Sr_MarksObtainedPhysics: result.data().Sr_MarksObtainedPhysics,

        Sr_MaximumMarksMath: result.data().Sr_MaximumMarksMath,
        Sr_MarksObtainedMath: result.data().Sr_MarksObtainedMath,

        Sr_ThirdSubjectName: '',
        Sr_MaximumMarksThirdSubject: result.data().Sr_MaximumMarksThirdSubject,
        Sr_MarksObtainedThirdSubject: result.data().Sr_MarksObtainedThirdSubject,

        Diploma_or_Other: result.data().Diploma_or_Other,
        Name_Diploma: result.data().Name_Diploma,
        Diploma_Passing_Year: result.data().Diploma_Passing_Year,
        BoardName: result.data().BoardName,
        Diploma_MaximumMarks: result.data().Diploma_MaximumMarks,
        Diploma_MarksObtained: result.data().Diploma_MarksObtained,
        Diploma_Percentage: result.data().Diploma_Percentage,
        Diploma_Subjects: result.data().Diploma_Subjects,

        Entry_through_JEE_Mains: result.data().Entry_through_JEE_Mains,
        JEE_Mains_Roll: result.data().JEE_Mains_Roll,
        JEE_Mains_GenralRank: result.data().JEE_Mains_GenralRank,
        JEE_Mains_CategoryRank: result.data().JEE_Mains_CategoryRank,

      })
    }
  }



  const finalSubmit = async (event) => {
    event.preventDefault();

    var formSave_Control = 0;

    for (const key in formData) {
      if (formData[key] == '') {

        alert(`Please Enter Your ${key}`)
        break;
      }
        formSave_Control = formSave_Control + 1;
    }

    if (formSave_Control === 77) {
      saveForm()
      alert('Save Form')
    }

  }

  return (
    <div className='bg-danger'>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossOrigin="anonymous"></link>
      <header className='p-0'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-sm">
            <a className="navbar-brand" href="#">
              <img src="https://www.ecajmer.ac.in/proctorwebsite/admission2022/images/download.jpg" alt="Logo" width="75" height="75" className="d-inline-block align-text-top" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item mx-2">
                  <a className="nav-link" href="/Admission_Home">Admission_Home</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="https://firebasestorage.googleapis.com/v0/b/ecajmer-fc4e9.appspot.com/o/General%20Instructions.pdf?alt=media&token=2c095c4e-47a2-417c-8ef6-cfd22ae51647">General_Instructions</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link active" aria-current="page" href="/admissionForm">Admission_Form</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Contact Us</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#" onClick={() => {
                    signOut(auth).then((val) => {
                      window.location.href = '/';
                    })
                  }}>Logout</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Notices</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className='container-xxl'>
        <form className="wrapper rounded p-auto py-5 mt-5 bg-white overflow-y-visible" onSubmit={finalSubmit} method='POST'>
          <div className="h3 text-center fw-semibold lh-base">Engineering College Ajmer<br />B.Tech Admission form<br />(Session: 2022-23)</div>

          <div className="form container-lg">

            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>First &amp; Middle Name<span className="text-danger ml-2">*</span></label>
                <input required="" oninvalid="setCustomValidity('Please enter on alphabets only. ')" type="text" pattern="[a-zA-Z. ]+" onChange={inputEvent} className="form-control upper" name='FirstNMiddleName' value={formData.FirstNMiddleName} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Last Name</label>
                <input type="text" className="form-control upper" pattern="[a-zA-Z. ]+" value={formData.LastName} onChange={inputEvent} name='LastName' />
              </div>
            </div>

            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Date of Birth<span className="text-danger ml-2">*</span></label>
                <input type="date" required="" name="DOB" className="form-control" value={formData.DOB} onChange={inputEvent} />
              </div>

              <div className="col-md-6   mt-3">
                <label className='mb-2'>Gender<span className="text-danger ml-2">*</span></label>
                <select required="" name="Gender" className="form-control" value={formData.Gender} onChange={inputEvent}>
                  <option defaultValue="" hidden="">Choose Option</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>
            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Student Email<span className="text-danger ml-2">*</span></label>
                <input required="" type="email" className="form-control" name="Email" disabled='diable' value={formData.Email} onChange={inputEvent} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Student Mobile Number<span className="text-danger ml-2">*</span></label>
                <input type="tel" required="" className="form-control" minLength="10" maxLength="10" name="MobileNumber" pattern="[0-9]{10}" value={formData.MobileNumber} onChange={inputEvent} />
              </div>
            </div>

            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Religion<span className="text-danger ml-2">*</span></label>
                <input required="" pattern="[a-zA-Z. ]+" type="text" className="form-control" name='Religion' value={formData.Religion} onChange={inputEvent} />
              </div>

              <div className="col-md-6   mt-3">
                <label className='mb-2'>Student Programme Name <span className="text-danger ml-2">*</span></label>
                <select required="" id="studcoursename" className="form-control" name='ProgrammeName' value={formData.ProgrammeName} onChange={inputEvent} >
                  <option defaultValue="" hidden="">Choose Option</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="MBA">MBA</option>
                  <option value="MCA">MCA</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="Ph.D.">Ph.D.</option>
                </select>
              </div>
            </div>

            <div className="row py-5 border-bottom">
              <div className="col-md-12   mt-3">
                <label className='mb-2'>Student Branch Name<span className="text-danger ml-2">*</span></label>
                <select required="" className="form-control" name='BranchhName' value={formData.BranchhName} onChange={inputEvent}>
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

            <div className="row py-5 border-bottom">
              <div className="col-md-12   mt-3">
                <label className='mb-2'>Student Nationality<span className="text-danger ml-2">*</span></label>
                <select required="" className="form-control" name='Nationality' value={formData.Nationality} onChange={inputEvent}>
                  <option defaultValue="" hidden="">Choose Option</option>
                  <option value="Indian">Indian</option>
                </select>
              </div>
            </div>

            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Student Domicile<span className="text-danger ml-2">*</span></label>
                <select required="" className="form-control" name='Domicile' value={formData.Domicile} onChange={inputEvent}>
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
              <div className=" col-md-6   mt-3">
                <label className='mb-2'>Student Maritial Status<span className="text-danger ml-2">*</span></label>
                <select required="" className="form-control" name='MaritialStatus' value={formData.MaritialStatus} onChange={inputEvent}>
                  <option defaultValue="" hidden="">Choose Option</option>
                  <option value="Married">Married</option>
                  <option value="Unmarried">Unmarried</option>
                </select>
              </div>
            </div>

            <div className="row py-5 border-bottom">
              <div className=" col-md-6   mt-3">
                <label className='mb-2'>Is Physical Handicapped?<span className="text-danger ml-2">*</span></label>
                <select required="" className="form-control" name="PhysicalHandicapped" value={formData.PhysicalHandicapped} onChange={inputEvent}>
                  <option defaultValue="" hidden="">Choose Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="col-md-6   mt-3">
                <label className='mb-2'>Student Aadhar No.<span className="text-danger ml-2">*</span></label>
                <input type="text" className="form-control" pattern="[0-9]{12}" minLength="12" maxLength="12" name="AadharNumber" value={formData.AadharNumber} onChange={inputEvent} />
              </div>
              <div className="col-md-6 mt-5">
                <label className='mb-2'>Student Aadhar No / Aadhar Acknowledgement Reciept ( if applicable)<span className="text-danger ml-2">*</span></label>
                <input required="" type="text" className="form-control" name="Aadhar_Acknowledgement" value={formData.Aadhar_Acknowledgement} onChange={inputEvent} />
              </div>
            </div>

            <div className="row py-5 border-bottom">
              <div className=" col-md-6   mt-3">
                <label className='mb-2'>Having Voter Id ?<span className="text-danger ml-2">*</span></label>
                <select required="" className="form-control" name="VoterId" value={formData.VoterId} onChange={inputEvent}>
                  <option defaultValue="" hidden="">Choose Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Student Voter Id Details</label>
                <input type="text" className="form-control" name="VoterIdDetails" value={formData.VoterIdDetails} onChange={inputEvent} disabled={voterIDdisabled} />
              </div>
            </div>

            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Student Permanent Address<span className="text-danger ml-2">*</span></label>
                <input required="" type="text" className="form-control" name="Stn_PermanentAreaOfResidence" value={formData.Stn_PermanentAreaOfResidence} onChange={inputEvent} />
              </div>
              <div className=" col-md-6   mt-3">
                <label className='mb-2'>Student Area of Residence<span className="text-danger ml-2">*</span></label>
                <select required="" className="form-control" name='PermanentAddress' value={formData.PermanentAddress} onChange={inputEvent}>
                  <option defaultValue="" hidden="">Choose Option</option>
                  <option value="Rural">Rural</option>
                  <option value="Urban">Urban</option>
                </select>
              </div>
            </div> .

            <div className="row py-5 border-bottom">
              <div className=" col-md-6   mt-3">
                <label className='mb-2'>Is Student Present Address in Ajmer is Same as Permanent Address<span className="text-danger ml-2">*</span></label>
                <select required="" name="Present_AreaOfResidence" value={formData.Present_AreaOfResidence} onChange={inputEvent} className="form-control">
                  <option defaultValue="" hidden="">Choose Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="col-md-6   mt-3">
                <label className='mb-2'>Student Present Address in Ajmer</label>
                <input type="text" className="form-control" name="PresentAreaOfResidence_Ajmer" value={formData.PresentAreaOfResidence_Ajmer} onChange={inputEvent} disabled={ajmerPresentAdr} />
              </div>
            </div>

            <div className="row py-5 border-bottom">
              <div className=" col-md-6   mt-3">
                <label className='mb-2'>Student Blood Group</label>
                <select className="form-control" name='BloodGroup' value={formData.BloodGroup} onChange={inputEvent}>'
                  <option defaultValue=" " hidden="">Choose Option</option>

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
              <div className=" col-md-6   mt-3">
                <label className='mb-2'>Student Category<span className="text-danger ml-2">*</span></label>
                <select required="" name='StnCategory' value={formData.StnCategory} onChange={inputEvent} className="form-control">
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
            </div>
            <div className="row py-5 border-bottom">
              <div className=" col-md-6   mt-3">
                <label className='mb-2'>Student Sub-Category<span className="text-danger ml-2">*</span></label>
                <select required="" name='SubCategory' value={formData.SubCategory} onChange={inputEvent} className="form-control">
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
              <div className=" col-md-6   mt-3">
                <label className='mb-2'>Hostel ?(<strong>Female Only</strong>)<span className="text-danger ml-2">*</span> </label>
                <select name='Hostel' value={formData.Hostel} onChange={inputEvent} className="form-control">
                  <option defaultValue="" hidden="">Choose Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>

                </select>
              </div>
            </div>
            <div className="row py-5 border-bottom">
              <div className=" col-md-6   mt-3">
                <label className='mb-2'>Is Transport <span className="text-danger ml-2">*</span></label>
                <select required="" name='Transport' value={formData.Transport} onChange={inputEvent} className="form-control">
                  <option defaultValue="" hidden="">Choose Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>

                </select>
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Name of the Railway Station Nearest to Home Town for Rail/Bus Concesssion<span className="text-danger ml-2">*</span></label>
                <input required="" type="text" className="form-control" name='HomeTown' value={formData.HomeTown} onChange={inputEvent} />
              </div>
            </div>
            <div className="row py-5 border-bottom">

              <div className="col-md-6   mt-3">
                <label className='mb-2'>Father's Name<span className="text-danger ml-2">*</span></label>
                <input required="" pattern="[a-zA-Z. ]+" onInvalid={() => InValidLog("setCustomValidity('Please enter on alphabets only. ')")} type="text" className="form-control" name='FatherName' value={formData.FatherName} onChange={inputEvent} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Father's Occupation<span className="text-danger ml-2">*</span></label>
                <input required="" type="text" className="form-control" name='FatherOccupattion' value={formData.FatherOccupattion} onChange={inputEvent} />
              </div>
            </div>
            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Father's Email Id</label>
                <input type="email" className="form-control" name='FatherEmailId' value={formData.FatherEmailId} onChange={inputEvent} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Mother's Name<span className="text-danger ml-2">*</span></label>
                <input required="" pattern="[a-zA-Z. ]+" onInvalid={() => InValidLog("setCustomValidity('Please enter on alphabets only. ')")} type="text" className="form-control" name='MotherName' value={formData.MotherName} onChange={inputEvent} />
              </div>
            </div>
            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Parent's Mobile No.<span className="text-danger ml-2">*</span></label>
                <input required="" type="tel" onInvalid={() => InValidLog("setCustomValidity('Invalid Phone Number!')")} className="form-control" minLength="10" maxLength="10" name='ParentMobileNumber' value={formData.ParentMobileNumber} onChange={inputEvent} pattern="[0-9]{10}" />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Parent's Address For Communication<span className="text-danger ml-2">*</span></label>
                <input required="" type="text" className="form-control" name='ParentAddress' value={formData.ParentAddress} onChange={inputEvent} />
              </div>
            </div>

            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Family Income from All Sources(Annual)<span className="text-danger ml-2">*</span></label>
                <input required="" type="number" step="any" min="0" className="form-control" name='FamilyIncome' value={formData.FamilyIncome} onChange={inputEvent} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Guardian Name (If Parent's Not Alive)</label>
                <input pattern="[a-zA-Z. ]+" onInvalid={() => InValidLog("setCustomValidity('Please enter on alphabets only. ')")} type="text" className="form-control" name='GuardianName' value={formData.GuardianName} onChange={inputEvent} />
              </div>
            </div>
            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Realtionship with Guardian</label>
                <input pattern="[a-zA-Z. ]+" onInvalid={() => InValidLog("setCustomValidity('Please enter on alphabets only. ')")} type="text" className="form-control" name='RealtionshipGuardian' value={formData.RealtionshipGuardian} onChange={inputEvent} />
              </div>

              <div className="col-md-6   mt-3">
                <label className='mb-2'>Local Gaurdian Name in Ajmer</label>
                <input pattern="[a-zA-Z. ]+" onInvalid={() => InValidLog("setCustomValidity('Please enter on alphabets only. ')")} type="text" className="form-control" name='LocalGuardian' value={formData.LocalGuardian} onChange={inputEvent} />
              </div>
            </div>
            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Local Gaurdian Address in Ajmer with Mobile No</label>
                <input type="text" className="form-control" name='LocalGuardianAddress' value={formData.LocalGuardianAddress} onChange={inputEvent} />
              </div>

              <div className="col-md-6   mt-3">
                <label className='mb-2'>Name of Nominee (for Insurance Purpose)<span className="text-danger ml-2">*</span></label>
                <input pattern="[a-zA-Z. ]+" onInvalid={() => InValidLog("setCustomValidity('Please enter on alphabets only. ')")} type="text" required="" className="form-control" name='NomineeName' value={formData.NomineeName} onChange={inputEvent} />
              </div>
            </div>
            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Relation with Nominee<span className="text-danger ml-2">*</span></label>
                <input required="" pattern="[a-zA-Z. ]+" onInvalid={() => InValidLog("setCustomValidity('Please enter on alphabets only. ')")} type="text" className="form-control" name='NomineeRelationName' value={formData.NomineeRelationName} onChange={inputEvent} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>REAP-2022 Application Number<span className="text-danger ml-2">*</span></label>
                <input required="" type="text" className="form-control" name='REAPApplicationNumber' value={formData.REAPApplicationNumber} onChange={inputEvent} />
              </div>
            </div>
            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Reap 2022 Gen Rank<span className="text-danger ml-2">*</span></label>
                <input required="" type="number" step="any" min="1" className="form-control" name='REAPRank' value={formData.REAPRank} onChange={inputEvent} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Reap 2022 Category Rank</label>
                <input type="number" step="any" min="1" className="form-control" name='REAPCategoryRank' value={formData.REAPCategoryRank} onChange={inputEvent} />
              </div>
            </div>

            <div className=" col-md-6 mt-md-3 mt-3">
              <label className='mb-2'>Any Gap in Studies?<span className="text-danger ml-2">*</span></label>
              <select required="" name='AnyGapinStudies' value={formData.AnyGapinStudies} onChange={inputEvent} className="form-control">
                <option defaultValue="" hidden="">Choose Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Gap Period</label>
                <input type="text" className="form-control" name='GapPeriod' value={formData.GapPeriod} onChange={inputEvent} disabled={Gap_Studies} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Reason of Gap</label>
                <input type="text" className="form-control" name='ReasonofGap' value={formData.ReasonofGap} onChange={inputEvent} disabled={Gap_Studies} />
              </div>
            </div>

            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Secondary Passing Year ( YYYY )<span className="text-danger ml-2">*</span></label>
                <input required="" type="text" minLength="4" className="form-control" maxLength="4" name='SecondaryPassingYear' value={formData.SecondaryPassingYear} onChange={inputEvent} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Secondary Board Name<span className="text-danger ml-2">*</span></label>
                <input required="" type="text" className="form-control" name='SecondaryBoardName' value={formData.SecondaryBoardName} onChange={inputEvent} />
              </div>
            </div>
            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Secondary Maximum Marks<span className="text-danger ml-2">*</span></label>
                <input required type="number" step="any" min="0" className="form-control" name='SecondaryMaximumMarks' value={formData.SecondaryMaximumMarks} onChange={inputEvent} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Secondary Marks Obtained<span className="text-danger ml-2">*</span></label>
                <input required="" type="number" step="any" min="0" className="form-control" name='SecondaryMarksObtained' value={formData.SecondaryMarksObtained} onChange={inputEvent} />
              </div>
            </div>

            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Secondary Percentage<span className="text-danger ml-2">*</span></label>
                <input required=""  type="number" step="any" min="0" max="100" className="form-control" name='SecondaryPercentage' value={formData.SecondaryPercentage} onChange={inputEvent} disabled={true} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Secondary Subjects<span className="text-danger ml-2">*</span></label>
                <input required="" type="text" className="form-control" name='SecondarySubjects' value={formData.SecondarySubjects} onChange={inputEvent} />
              </div>
            </div>

            <div className="row py-5 border-bottom">

              <div className="col-md-6   mt-3">
                <label className='mb-2'>Sr. Secondary Passing Year ( YYYY )<span className="text-danger ml-2">*</span></label>
                <input required="" type="text" minLength="4" maxLength="4" className="form-control" name='Sr_PassingYear' value={formData.Sr_PassingYear} onChange={inputEvent} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Sr. Secondary Board Name<span className="text-danger ml-2">*</span></label>
                <input type="text" className="form-control" name='Sr_BoardName' value={formData.Sr_BoardName} onChange={inputEvent} />
              </div>
            </div>
            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Sr. Secondary Subjects<span className="text-danger ml-2">*</span></label>
                <input required="" type="text" className="form-control" name='Sr_Subjects' value={formData.Sr_Subjects} onChange={inputEvent} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Sr. Secondary Maximum Marks<span className="text-danger ml-2">*</span></label>
                <input required type="number" step="any" min="0" className="form-control" name='Sr_MaximumMarks' value={formData.Sr_MaximumMarks} onChange={inputEvent} />
              </div>
            </div>
            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Sr. Secondary Marks Obtained<span className="text-danger ml-2">*</span></label>
                <input required="" type="number" step="any" min="0" className="form-control" name='Sr_ObtainMarks' value={formData.Sr_ObtainMarks} onChange={inputEvent} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Sr. Secondary Percentage<span className="text-danger ml-2">*</span></label>
                <input required="" type="number" step="any" className="form-control" name='Sr_Percentage' value={formData.Sr_Percentage} onChange={inputEvent} disabled={true} />
              </div>
            </div>
            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Sr. Secondary Maximum Marks in Physics<span className="text-danger ml-2">*</span></label>
                <input required="" type="number" step="any" min="0" className="form-control" name='Sr_MaximumMarksPhysics' value={formData.Sr_MaximumMarksPhysics} onChange={inputEvent} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Sr. Secondary Obtained Marks in Physics<span className="text-danger ml-2">*</span></label>
                <input required="" type="number" step="any" min="0" className="form-control" name='Sr_MarksObtainedPhysics' value={formData.Sr_MarksObtainedPhysics} onChange={inputEvent} />
              </div>
            </div>
            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Sr. Secondary Maximum Marks in Math<span className="text-danger ml-2">*</span></label>
                <input required="" type="number" step="any" min="0" className="form-control" name='Sr_MaximumMarksMath' value={formData.Sr_MaximumMarksMath} onChange={inputEvent} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Sr. Secondary Obtained Marks in Math<span className="text-danger ml-2">*</span></label>
                <input required="" type="number" step="any" min="0" className="form-control" name='Sr_MarksObtainedMath' value={formData.Sr_MarksObtainedMath} onChange={inputEvent} />
              </div>
            </div>

            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Sr. Secondary Third Subject Name<span className="text-danger ml-2">*</span></label>
                <input required="" type="text" className="form-control" name='Sr_ThirdSubjectName' value={formData.Sr_ThirdSubjectName} onChange={inputEvent} />
              </div>
            </div>

            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Sr. Secondary Maximum Marks in Third Subject (  )<span className="text-danger ml-2">*</span></label>
                <input required="" type="number" step="any" min="0" className="form-control" name='Sr_MaximumMarksThirdSubject' value={formData.Sr_MaximumMarksThirdSubject} onChange={inputEvent} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Sr. Secondary Obtained Marks in Third Subject (  )<span className="text-danger ml-2">*</span></label>
                <input required="" type="number" step="any" min="0" className="form-control" name='Sr_MarksObtainedThirdSubject' value={formData.Sr_MarksObtainedThirdSubject} onChange={inputEvent} />
              </div>
            </div>
            <div className="row py-5 border-bottom">
              <div className=" col-md-6   mt-3">
                <label className='mb-2'>Having Diploma / Other<span className="text-danger ml-2">*</span></label>
                <select required="" name='Diploma_or_Other' value={formData.Diploma_or_Other} onChange={inputEvent} className="form-control">
                  <option defaultValue="" hidden="">Choose Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>

                </select>
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Name of Diploma (If Any) / Equivalent to Diploma ( If Any )</label>
                <input type="text" className="form-control" name='Name_Diploma' value={formData.Name_Diploma} onChange={inputEvent} disabled={disabledVar} />
              </div>
            </div>

            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>( Diploma / Other ) Passing Year ( YYYY )</label>
                <input type="text" className="form-control" minLength="4" maxLength="4" name='Diploma_Passing_Year' value={formData.Diploma_Passing_Year} onChange={inputEvent} disabled={disabledVar} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>( Diploma / Other ) Board Name</label>
                <input type="text" className="form-control" name='BoardName' value={formData.BoardName} onChange={inputEvent} disabled={disabledVar} />
              </div>
            </div>

            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Diploma Maximum Marks </label>
                <input type="number" step="any" min="0" className="form-control" name='Diploma_MaximumMarks' value={formData.Diploma_MaximumMarks} onChange={inputEvent} disabled={disabledVar} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>Diploma Marks Obtained</label>
                <input type="number" step="any" min="0" className="form-control" name='Diploma_MarksObtained' value={formData.Diploma_MarksObtained} onChange={inputEvent} disabled={disabledVar} />
              </div>
            </div>


            <div className="row py-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>( Diploma / Other ) Percentage</label>
                <input type="number" step="any" className="form-control"  name='Diploma_Percentage' value={formData.Diploma_Percentage} onChange={inputEvent} disabled={true} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>( Diploma / Other ) Subjects</label>
                <input type="text" className="form-control" name='Diploma_Subjects' value={formData.Diploma_Subjects} onChange={inputEvent} disabled={disabledVar} />
              </div>
            </div>
            <div className="row py-5 border-bottom">
              <div className=" col-md-6   mt-3">
                <label className='mb-2'>Entry Through JEE-Mains / 12Th<span className="text-danger ml-2">*</span></label>
                <select required="" className="form-control" name='Entry_through_JEE_Mains' value={formData.Entry_through_JEE_Mains} onChange={inputEvent} >
                  <option defaultValue="" hidden="">Choose Option</option>
                  <option value="JEE-Mains">JEE-Mains</option>
                  <option value="12th">12th</option>
                </select>
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>JEE Mains 2022 Roll No (If Applicable)</label>
                <input type="text" className="form-control" name='JEE_Mains_Roll' value={formData.JEE_Mains_Roll} onChange={inputEvent} disabled={jee_Disable} />
              </div>
            </div>
            <div className="row pb-5 border-bottom">
              <div className="col-md-6   mt-3">
                <label className='mb-2'>JEE Mains 2022 Genral Rank(If Applicable)</label>
                <input type="number" min="1" className="form-control" name='JEE_Mains_GenralRank' value={formData.JEE_Mains_GenralRank} onChange={inputEvent} disabled={jee_Disable} />
              </div>
              <div className="col-md-6   mt-3">
                <label className='mb-2'>JEE Mains 2022 Category Rank(If Applicable)</label>
                <input type="number" min="1" className="form-control" name='JEE_Mains_CategoryRank' value={formData.JEE_Mains_CategoryRank} onChange={inputEvent} disabled={jee_Disable} />
              </div>
            </div>

            <div className="d-flex flex-wrap py-5 justify-content-center">
              <button type="button" className="btn btn-primary m-1 flex-fill" onClick={() => {
                saveForm()

              }}>Save</button>
              <input type="button" className="btn btn-primary m-1 flex-fill" value='Preview' onClick={() => window.location.href = '/previewform'} />
              <input type="Button" className="btn btn-success m-1 flex-fill" value='Final Submit' onClick={()=>finalSubmit()} />
              <input type="button" className="btn btn-primary m-1 flex-fill" value='Download' disabled="disabled" />
            </div>
          </div>
        </form>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossOrigin="anonymous"></script>
    </div>
  );
}

export default App;