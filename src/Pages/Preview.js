import React, { useEffect, useState } from 'react'
import './page.css'


import { auth, database } from '../firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';


export default function Preview() {

    const [authChecker, setAuthChecker] = useState(false)
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

    const getData = async () => {
        const result = await getDoc(doc(database, "Student", auth.currentUser.uid))

        var newObj = formData
        for (const key in newObj) {
            newObj[key] = result.data()[key]

            if (key === 'studImage') {
                setUserImage(result.data().studImage)
            }
        }

        setFormData(newObj)
    }

    if (authChecker == false) {
        onAuthStateChanged(auth, (user) => {
            if (user.emailVerified == false) {
                window.location.href = '/';
            }
            else {
                getData()
            }
        })
        setAuthChecker(true)
    }


    return (
        <div class="print" id="print">
            <div class="divpagebreak"></div>
            <header>
                <div class="flex-container">
                    <div class="photo">
                        <img src="https://ecajmer.ac.in/proctorwebsite/admission2022/images/download.jpg" alt="logo" width="115px" height="115px" />
                    </div>
                    <div class="cname">
                        <h1>Govt. Engineering College, Ajmer</h1>
                        <h2> Admission Form</h2>
                        <h3>Academic Session 2022-2023 (To be filled by student only)</h3>
                    </div>
                </div>
                <div class="clearfix" style={{ display: 'flex', margin: '50px 0px' }}>
                    <div id="logo" style={{ marginRight: '50px' }}>
                        <img src={userImage} alt="User Image" className='userProfileImage' />
                    </div>
                    <div class="project" id="project">
                        <p class="upper"><span>STUDENT'S NAME</span><strong>Akash </strong></p>
                        <p><span>STUDENT'S CONTACTNO</span> <strong>3334444433</strong></p>
                        <p><span>STUDENT'S EMAIL</span><strong>benenek108@appxapi.com</strong></p>
                        <p><span>STUDENT'S BRANCH</span><strong>Civil Engineering</strong></p>

                        <p class="upper"><span>FATHER'S NAME</span><strong>asdddasd</strong></p>
                        <p><span>FATHER'S CONTACTNO</span><strong>xasssaaaa</strong></p>
                        <p><span>FATHER'S EMAIL</span><strong></strong></p>
                        <p><span>ALLOTED CATEGORY for ADMISSION</span><strong></strong></p>
                        <p><span>STUDENT'S NAME(HINDI)</span></p>
                        <p><span>COLLEGE ID</span><strong></strong></p>


                    </div>
                </div>
            </header>
            <main>
                <main>
                    <div class="table1">
                        <table>
                            <thead>
                                <tr>
                                    <th class="service"></th>
                                    <th class="desc"></th>
                                    <th class="service"></th>
                                    <th class="desc"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="service">Student's Form No</td>
                                    <td class="desc">ECA/Online/2022/723</td>
                                    <td class="service">Student Category</td>
                                    <td class="desc">ST-TSP</td>

                                </tr>
                                <tr>
                                    <td class="service">Mother's Name</td>
                                    <td class="desc upper">ddddasxx</td>
                                    <td class="service">Name of Guardian with Relationship (if parents not alive) </td>
                                    <td class="desc upper"> , </td>
                                </tr>
                                <tr>
                                    <td class="service">Father's Occupation</td>
                                    <td class="desc capital">addda</td>
                                    <td class="service">Annual Income of Father/Guardian</td>
                                    <td class="desc">33332223</td>
                                </tr>
                                <tr>
                                    <td class="service">Date of Birth</td>
                                    <td class="desc">02-02-2000</td>
                                    <td class="service">Nationality</td>
                                    <td class="desc">Indian</td>
                                </tr>
                                <tr>
                                    <td class="service">Married/Unmarried</td>
                                    <td class="desc">Unmarried</td>
                                    <td class="service">Gender</td>
                                    <td class="desc">Female</td>
                                </tr>
                                <tr>
                                    <td class="service">Address of Parents for Correspondence</td>
                                    <td class="desc capital"></td>
                                    <td class="service">Name of Railway Station nearest to Home Town for Rail/Bus Concession</td>
                                    <td class="desc capital">4443333332222222222</td>
                                </tr>
                                <tr>
                                    <td class="service">Blood Group</td>
                                    <td class="desc">B+</td>
                                    <td class="service">Student's Domicile State</td>
                                    <td class="desc">Madhya Pradesh</td>
                                </tr>
                                <tr>
                                    <td class="service">Rural/Urban</td>
                                    <td class="desc">Urban</td>
                                    <td class="service">Aadhar No.</td>
                                    <td class="desc">44433333222222</td>
                                </tr>
                                <tr>
                                    <td class="service">Present Address of Student in Ajmer With Pincode</td>
                                    <td class="desc capital"></td>
                                    <td class="service">Address of Local Guardian to be Contacted in Emergency with Pincode and Mobile No.</td>
                                    <td class="desc capital">, </td>
                                </tr>
                                <tr>
                                    <td class="service">Competative Exam (If Any)</td>
                                    <td class="desc">12th</td>
                                    <td class="service">JEE Roll No</td>
                                    <td class="desc"></td>
                                </tr>
                                <tr>
                                    <td class="service">JEE Exam Main 2022 Genral Rank</td>
                                    <td class="desc"></td>
                                    <td class="service">JEE Exam Main 2022 Category Rank(If Applicable)</td>
                                    <td class="desc"></td>
                                </tr>
                                <tr class="page_break divpagebreak">
                                    <td class="service"></td>
                                    <td class="desc"></td>
                                    <td class="service"></td>
                                    <td class="desc">ECA/Online/2022/723</td>
                                </tr>
                                <tr>
                                    <td class="service">Reap 2022 Gen Rank</td>
                                    <td class="desc">2222</td>
                                    <td class="service">Reap 2022 Category Rank</td>
                                    <td class="desc"></td>
                                </tr>
                                <tr>
                                    <td class="service">REAP-2022 Application Number</td>
                                    <td class="desc">44444323</td>
                                    <td class="service">Religion Name</td>
                                    <td class="desc upper">hi</td>
                                </tr>
                                <tr>
                                    <td class="service">Admitted in Counseling(First/Second/Internal Sliding/Direct</td>
                                    <td class="desc"></td>
                                    <td class="service">Diploma/Other Name</td>
                                    <td class="desc upper"></td>
                                </tr>
                                <tr>
                                    <td class="service ">Name of College(if transferred from any other College</td>
                                    <td class="desc capital"></td>
                                    <td class="service">Any Gap in Studies(Y/N)</td>
                                    <td class="desc">No</td>
                                </tr>
                                <tr>
                                    <td class="service">Period of Gap</td>
                                    <td class="desc"></td>
                                    <td class="service">Reason of gap</td>
                                    <td class="desc capital"></td>
                                </tr>
                                <tr>
                                    <td class="service">Need Hostel</td>
                                    <td class="desc">Yes</td>
                                    <td class="service">Transport</td>
                                    <td class="desc">Yes</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <h3>Educational Qualification:-</h3>
                    <div class="qualification">
                        <table id="qualification">
                            <tbody><tr>
                                <th>Examination</th>
                                <th>Year pf Passing</th>
                                <th>Name of the Board/Univ</th>
                                <th>Subject</th>
                                <th>Total Max Marks</th>
                                <th>Total Marks Obtained</th>
                                <th>Percentage</th>
                            </tr>
                                <tr>
                                    <td><strong>Secondry</strong> </td>
                                    <td>32</td>
                                    <td>ddda</td>
                                    <td></td>
                                    <td>100</td>
                                    <td>50</td>
                                    <td>50'%</td>
                                </tr>
                                <tr>
                                    <td><strong>Sr. Secondry</strong></td>
                                    <td>50</td>
                                    <td>asddd</td>
                                    <td>sddda</td>
                                    <td>100</td>
                                    <td>50</td>
                                    <td>50'%</td>
                                </tr>
                                <tr>
                                    <td><strong>Diploma/Other</strong></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0%</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>Details of Marks Class XII</h3><h3>
                            <table id="qualification">
                                <tbody><tr>
                                    <th>Subject</th>
                                    <th>Max Marks</th>
                                    <th>Obtained Marks</th>
                                </tr>
                                    <tr>
                                        <td><strong>Physics</strong></td>
                                        <td>100</td>
                                        <td>50</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Math</strong></td>
                                        <td>100</td>
                                        {/* <!--here chemistry variabel srchemaxmarks is used to enter marks for math*--> */}
                                        <td>50</td>
                                    </tr>
                                    <tr><td><strong>Chemistry / sssaa</strong></td>
                                        <td>100</td>
                                        <td>50</td>
                                    </tr>
                                </tbody>
                            </table>
                        </h3></div>
                    <h3>For Insurance Purpose:-</h3>
                    <div class="qualification">
                        <table id="insurance">
                            <tbody><tr>
                                <th>Name of Nominee</th>
                                <th>Relation</th>
                                <th>Physical Handicapped(y/n)</th>
                            </tr>

                                <tr>
                                    <td>ffffazaaaa</td>
                                    <td>zsda33</td>
                                    <td>No</td>

                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <div class="Declaration">
                        <p>I do solemmly affirm that the statements and informatin, funished by me and also in the enclosures submitted are true. I realize that, if any information flurished there in is found to be false in material particulars. I shall be liable to criminal prsecution as well as to forgo any admission and discharged from the college, if already submitted.</p>
                        <p>
                            I also undertake to pay the college hostel and other dues regularly.
                        </p>
                        <p>I promise to abide by the rules &amp; regulations of the college as well as those of the University concerning examinations attendance, practical training etc. as present in force as well as those that may made/modified from time to time.</p>
                    </div>
                    <p>I also declare that :- <br />
                        (a) I have not been convinced for any criminal offence not have been released on bail in connection with criminal cases <br />
                        (b) No case of criminal offence or moral trupitude is pending against me in any court of law. <br />
                        (c) No complaint of FIR has been lodged against myself by the University /  Principal of consistent College / Affiliated College or by any othe competent authority. <br />
                        (d) I have not resorted to any act of indispline during the previous years. <br />
                    </p>
                    <br />
                    <h4>Name &amp; Signature of the Applicant.............................................................Date.............................Place.......................</h4>
                    <p>Enclosure: Transfer Certificate / Migration Certificate / Mark Sheet of qualifying examination / High School Certificate for proof of age/ Medica Certificate / Allotment Letter / Cast Certificate / Bank Challan Copy / Income Certificate (for TFWS/ EWS)Aadhar Card/ </p>

                    <div class="page_break divpagebreak"></div>
                    <h4 style={{ float: 'right' }}> ECA/Online/2022/723</h4>
                    <div class="office" style={{ padding: '30px' }}>
                        <h2 style={{ margin: '20px 0px' }}>For Proctor Office Use Only</h2>
                        <p>
                            Alloted Category (Gen / F-Gen / SC / F-SC / ST / F-ST / TSP / F-TSP / MBC / F-MBC / OBC / F-OBC / EWS / F-EWS / Ex / Ex-Female) ............<strong></strong>.................&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Branch: <u><strong>Civil Engineering</strong></u>   <br /><br />
                            Alloted Seat..............................................<strong></strong>.............&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Brach Code..............<strong></strong>...................................<br /><br />
                            Round in which seat alloted to student................................<strong></strong>........................................
                        </p>
                    </div>

                    <br />
                    <div class="office" style={{ padding: '30px' }}>
                        <h2 style={{ margin: '20px 0px' }}>For Accounts Office Use Only</h2>
                        <h4>Catogry (For Fee): General / SC / ST / OBC / MBC / PH / Ex.Serv /TSP / KM / EWS / TFWS </h4>
                        <p>
                            Hosteller / Day Scholar                 GAS / SFS                                 Male / Female
                            <br /><br />
                            Course ............................ Year................................ Branch...................................................................... <br /><br />
                            <strong>Fee:&nbsp;</strong>College Fee Rs ................................................Hostel Fee Rs............................................................ <br /><br />
                            University Fee Rs................................................. Exam Fee Rs................................................................... <br /><br />
                            Insurance Charge.............................................. Any Other Fee Rs............................................................  <br /><br />
                            Received RS...................................................................... through DD / Cash / Challan / Online vide <br /><br /> Receipt No..........................................................................Dated.................................................. <br /><br />

                            Note:Difference Amount (if GAS to SFS / College change / any).............................................................. <br /><br /></p><br />
                        <p class="right"><strong>Name &amp; Signature (from Account Section )</strong></p>
                    </div>
                    <br />
                    <br />
                    <h4 class="left">Note: If Branch Change after upward movement / Internal Sliding (Branch Name) ......................................... <br /> </h4>
                    <br />
                    <br />
                    <h4 class="right">Name &amp; Signature of Student</h4>
                    <br />
                    <h4 class="left">Name &amp; Signature of Concern Staff</h4><h4 class="right">Name &amp; Signature of Concern Proctor</h4>
                    <br />
                    <div class="page_break divpagebreak"></div>
                    <h4 style={{ float: 'right' }}> ECA/Online/2022/723</h4><h4><br />
                    </h4><h2 style={{ textAlign: 'justify' }}>Cadidate shall download the admisssion form and affix the recent colored passport size photo on the form. Alongwith the downloaded admission form, candidate shall carry the following original documents and two set of self attested photocopies of orignal documents at the time of reporting at the institute. All original documents and self attested photocopies must be arranged in the following sequence :</h2>
                    <h3 style={{ lineHeight: "175%", margin: '30px 0px' }}>

                        1.	REAP-2022 Allotment Letter and REAP-2022 Application Form. <br />
                        2.	JEE (Mains) -2022/NTA- 2022 Score Card. <br />
                        3.	Secondary Marksheet and Certificate. <br />
                        4.	Senior Secondary Marksheet. <br />
                        5.  Diploma Marksheet(If Any). <br />
                        6.	Migration / Transfer Certificate. <br />
                        7.	Domicile certificate. (if applicable) <br />
                        8.	Income Certificate prescribed by REAP-22 (if applicable ). <br />
                        9.	Certificate of category (SC / ST/ OBC /MBC/ EWS), issued by the competent authority (if applicable).<br />
                        10.	Medical Certificate prescribed by REAP-22.  <br />
                        11.	Aadhar Card copy / Aadhar Acknowledgement Receipt if available. <br />
                        12.	Two passport size photo. <br />
                        13. Certificate for Persons with Disabilities (PwD), (if applicable).<br />
                        14. Certificate for Ex-Service men, (if applicable).<br />
                        15.	Fee according to Branch (as per Fee Structure). <br />
                    </h3>
                    <div class="page_break divpagebreak"></div>
                    <h4 style={{ float: 'right' }}> ECA/Online/2022/723</h4>
                    <header>
                        <div class="flex-container" style={{ lineHeight: '80%' }}>
                            <div class="photo">
                                <img src="https://ecajmer.ac.in/proctorwebsite/admission2022/images/download.jpg" alt="logo" width="115px" height="115px" />
                            </div>
                            <div class="cname" style={{ lineHeight: '200%' }}>
                                <h1> <span style={{ lineHeight: '80%' }}>Engineering College, Ajmer</span></h1>
                                <h2> <span style={{ lineHeight: '80%' }}>(An Institute of Govt. of Rajasthan)</span></h2>
                                <h4><span style={{ lineHeight: '80%' }}>Barliya Choraha National Highway No. 8 , Ajmer - 305025</span></h4>
                                <h4 class="left" style={{ margin: '0%' }}>www.ecajmer.ac.in&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email: principal@ecajmer.ac.in</h4>
                                <h4 class="right" style={{ margin: '2%' }}>Ph.:0145-2671776,2671810</h4>
                            </div>
                        </div>
                    </header>
                    <hr /><br />
                    <div style={{ alignItems: 'center' }}>
                        <div id="identity">
                            <h2>IDENTITY CARD</h2>
                        </div>
                        <br />
                    </div>
                    <div class="flex-container">
                        <div style={{ width: '30%' }}>
                            <div id="logo" style={{ marginRight: '50px' }}>
                                <img src={userImage} alt="User Image" className='userProfileImage' />
                            </div>
                        </div>
                        <div style={{ width: '70%' }}>
                            <h3>Name :&nbsp;<span class="upper">Akash </span></h3>
                            <h3>Branch :&nbsp;<span class="upper">Civil Engineering</span></h3>
                            <h3>Father's Name :&nbsp;<span class="upper">asdddasd</span></h3>
                            <h3>Date of Birth :&nbsp;02-02-2000&emsp;Email :&nbsp;benenek108@appxapi.com&emsp;&emsp;&emsp;&emsp;</h3>
                            <h3>Blood Group:&nbsp;B+&emsp;&emsp;&emsp;&emsp;&nbsp;College No:&nbsp;</h3>
                            <h3>Mobile No. :&nbsp;3334444433&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;</h3>
                            <h3>Permanent Address:&nbsp;sssaass</h3>

                        </div>
                    </div>
                    <br /><br /><h4 class="left">Name &amp; Signature of the Student</h4><h4 class="right">Name &amp; Signature of Incharge Proctor Section</h4>
                </main>
                <hr /><br />
                <div class="page_break divpagebreak"></div>
                <h4 style={{ float: 'right' }}> ECA/Online/2022/723</h4>
                <header>
                    <div class="flex-container" style={{ lineHeight: '80%' }}>
                        <div class="photo">
                            <img src="https://ecajmer.ac.in/proctorwebsite/admission2022/images/download.jpg" alt="logo" width="115px" height="115px" />
                        </div>
                        <div class="cname" style={{ lineHeight: '200%' }}>
                            <h1> <span style={{ lineHeight: '80%' }}>Engineering College, Ajmer</span></h1>
                            <h2> <span style={{ lineHeight: '80%' }}>(An Institute of Govt. of Rajasthan)</span></h2>
                            <h4><span style={{ lineHeight: '80%' }}>Barliya Choraha National Highway No. 8 , Ajmer - 305025</span></h4>
                            <h4 class="left" style={{ margin: '0%' }}>www.ecajmer.ac.in&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email: principal@ecajmer.ac.in</h4>
                            <h4 class="right" style={{ margin: '0%' }}>Ph.:0145-2671776,2671810</h4>
                        </div>
                    </div>  <hr /><br />
                </header>
                <div>

                    <center><h1>Document Receipt</h1></center>

                    <h2 style={{ textAlign: 'justify', lineHeight: '200%' }}>The following original documents have been received from Mr / Ms. <span class="upper">Akash </span>

                        for admission in B.Tech. I Year &amp; I Sem (<span class="upper">Civil Engineering</span>) on............................(Dated) along with Admission Form </h2>


                    <h3 style={{ lineHeight: '175%', margin: '30px 0px' }}>
                        1.	REAP-2022 Allotment Letter and REAP-2022 Application Form. <br />
                        2.	JEE (Mains) -2022/NTA- 2022 Score Card. <br />
                        3.	Secondary Marksheet and Certificate. <br />
                        4.	Senior Secondary Marksheet. <br />
                        5.  Diploma Marksheet(If Any). <br />
                        6.	Migration / Transfer Certificate. <br />
                        7.	Domicile certificate. (if applicable) <br />
                        8.	Income Certificate prescribed by REAP-22 (if applicable ). <br />
                        9.	Certificate of category (SC / ST/ OBC /MBC/ EWS), issued by the competent authority (if applicable).<br />
                        10.	Medical Certificate prescribed by REAP-22.  <br />
                        11.	Aadhar Card copy / Aadhar Acknowledgement Receipt if available. <br />
                        12.	Two passport size photo. <br />
                        13. Certificate for Persons with Disabilities (PwD), (if applicable).<br />
                        14. Certificate for Ex-Service men, (if applicable).<br />
                        15.	Fee according to Branch (as per Fee Structure). <br /><br /><br /><br />
                    </h3><h4 class="left">Name &amp; Siganature of Receiving Staff/LDC</h4>
                    <h4 class="right">Name &amp; Siganature of Officer</h4>


                </div>



            </main></div>
    )
}
