import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuController } from '@ionic/angular';
import { AlertController, Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-teacher-panel',
  templateUrl: './teacher-panel.page.html',
  styleUrls: ['./teacher-panel.page.scss'],
})
export class TeacherPanelPage implements OnInit {

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private firestore: AngularFirestore,
    private firebaseauth: AngularFireAuth,
    public alertController: AlertController,
    private router: Router,
    public global: GlobalService
  ) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = mm + dd + yyyy;
    console.log(this.today);

  }

  today: string;
  status: string[] = ['P', 'A']
  currentDiv: string = 'home';
  regNo: string;
  tempo: string[] = []


  gotoDiv(arg: string) {
    this.currentDiv = arg;
  }

  addStudentToClass() {
    if (!this.regNo) {
      this.firestore.collection('classes').doc()
    }
  }
  a;
  availableclasses: any;
  class: boolean = false;

  changeval(param: string, regNo: any, index: number) {



    if (this.presentsarray.includes(regNo, index) && param == 'A') {
      this.presentsarray.splice(regNo, index)

    }
    else if (this.absentsarray.includes(regNo, index) && param == 'P') {
      this.absentsarray.splice(regNo, index)

    }
    else {
      if (param == 'P') {
        this.presentsarray.push(regNo)


      }
      else if (param == 'A') {
        this.absentsarray.push(regNo)


      }
      else {

      }

    }
  }



  getClass() {
    this.firestore.collection('classes', querry => querry.where('teacherID', '==', this.currentUID)).valueChanges().subscribe((data: any) => {
      console.log(data);
      this.availableclasses = data;

    })
  }

  temp: any;
  stdName: string;
  subject: string;
  marks: number;
  att: boolean = false;

  manageclass(id: string, other: string) {


    this.firestore.collection('classes').doc(id).valueChanges().subscribe((res: any) => {
      console.log(res);
      this.temp = res;
      if (other == 'attendence') {
        console.log(this.temp.uid);
        this.checkAttendenceExistance(this.temp.uid)
        this.getattendence(this.temp.uid)
        this.class = true
        this.att = true
      }
      else if (other == 'marks') {
        this.att = false;
        this.editmarks = true;
        this.class = true
        this.getMarks(this.temp.uid)
      }
    })

  }
  stdmarks: any[];
  marksarray: any[] = []

  getMarks(classID: string) {
    this.firestore.collection('classes').doc(classID).collection('marks').valueChanges().subscribe(res => {
      console.log('marks', res);
      this.stdmarks = res

      for (var i = 0; i < this.stdmarks.length; i++) {
        for (var j = 0; j < this.stdmarks[i].marks.length; j++) {
          console.log(this.stdmarks[i].marks[j]);
          this.marksarray.push(this.stdmarks[i].marks[j])

        }
      }
    })
  }

  abc: string
  presentsarray: any[] = []
  absentsarray: any[] = []
  peresent: boolean = false;
  abesent: boolean = false;

  getstudentData(id: string) {

  }
  currentUID: string;
  currentTimeStamp = new Date()


  present(id: string) {
    this.presentsarray.push(id)
    console.log(this.presentsarray);

  }
  absent(id: string) {
    this.absentsarray.push(id)
  }
  addstudent() {
    if (this.stdName && this.regNo) {
      this.firestore.collection('students', q => q.where('reg', '==', this.regNo)).valueChanges().subscribe(res => {
        if (res.length < 1) {
          alert('no student exists')

        }
        else {
          alert('student exists')
          const student = this.regNo;
          const name = this.stdName
          this.firestore.collection('classes').doc(this.temp.uid).update({
            students: firebase.firestore.FieldValue.arrayUnion(
              {
                student, name
              }

            )
          }).then(() => {
            alert('student added')
          }).catch(err => {
            alert(JSON.stringify(err.message))
          })
        }
      })
    }
    else {
      alert('name or regno cannot be left black')
    }
  }
  add(id: string) {
    const presentees = this.presentsarray;
    const absentees = this.absentsarray
    const today = new Date().getDate()
    const moth = new Date().getMonth()
    const year = new Date().getFullYear()

    const date = today + '-' + moth + '-' + year
    this.firestore.collection('classes').doc(id).collection('attendence').doc(this.today).set({
      presentees, absentees, date
    }).then(() => {
      alert('attendence added')
    }).catch(Err => {
      alert(JSON.stringify(Err.message))
    })
  }

  attendenceexists: boolean = false;
  attend: any;

  checkAttendenceExistance(classID: string) {
    this.firestore.collection('classes').doc(classID).collection('attendence').doc(this.today).valueChanges().subscribe((res: any) => {
      if (!res) {
        this.attendenceexists = false;
        alert('attendece for today donnot exist')
      }
      else {
        this.attendenceexists = true
        alert('attendece for today exist')

      }
    })
  }
  getAnnounces() {
    this.firestore.collection('announcements', q => q.where('cat', '==', 'Teachers')).valueChanges().subscribe(data => {
      if (data.length < 1) {

      }
      else {
        this.announce = data
        console.log(this.announce);

      }
    })
  }

  logOut() {
    localStorage.clear()
    this.firebaseauth.auth.signOut().then(() => {
      window.location.href = this.global.baseURL
    }).catch(err => {
      alert(JSON.stringify(err))
    })
  }
  getattendence(classID: string) {
    this.firestore.collection('classes').doc(classID).collection('attendence').valueChanges().subscribe((res: any) => {

      this.attend = res
      console.log(this.attend);
      for (var i = 0; i < this.attend.length; i++) {
        for (var j = 0; j < this.attend[i].presentees.length; j++) {
          console.log(this.attend[i].presentees[j]);

        }
      }
    })
  }
  editmarks: boolean = false;

  addmarks() {
    const classID = this.temp.uid
    const student = this.stdName
    const marks = this.marks
    const regNo = this.regNo
    const subject = this.subject
    const today = new Date().getDate()
    const moth = new Date().getMonth()
    const year = new Date().getFullYear()

    const date = today + '-' + moth + '-' + year

    if (!this.stdName || !this.marks || !this.regNo || !this.subject) {
      alert('Fill out all fields')
    }
    else {
      console.log(date);

      const a = this.firestore.collection('classes').doc(classID).collection('marks').doc(date).valueChanges().subscribe((res: any) => {

        console.log(res);

        if (res == undefined) {
          a.unsubscribe()

          this.firestore.collection('classes').doc(classID).collection('marks').doc(date).set({

            date,
            classID,
            marks: firebase.firestore.FieldValue.arrayUnion({
              student,
              marks,
              regNo,
              subject,
            })

          }).then(() => {
            alert(student + ' ' + 'Marks added')
          }).catch(err => {
            alert(JSON.stringify(err.message))
          })
        }
        else if (res.classID) {
          alert(res)
          this.firestore.collection('classes').doc(classID).collection('marks').doc(date).update({

            date,
            classID,
            marks: firebase.firestore.FieldValue.arrayUnion({
              student,
              marks,
              regNo,
              subject,
            })

          }).then(() => {
            alert(student + ' ' + 'Marks added')
          }).catch(err => {
            alert(JSON.stringify(err.message))
          })

        }
      })
    }
  }
  announce: any;
  goback() {
    this.class = !this.class
  }
  list: boolean = false;
  opnelist() {
    this.list = !this.list
  }



  name: string;
  ngOnInit() {
    this.getAnnounces()
    const authSub = this.firebaseauth.authState.subscribe(user => {
      if (user) {
        if (user.uid) {

          this.firestore.collection('teachers').doc(user.uid).valueChanges().subscribe(res => {
            if (res == undefined) {
              this.logOut()
              this.router.navigate(['home'])
              alert('Portal is only for TEACHERS')
            }
            else {
              this.router.navigate(['teacher-panel'])
              this.currentUID = user.uid
              this.getClass()

              this.firestore.collection('teachers').doc(this.currentUID).valueChanges().subscribe((Res: any) => {
                this.name = Res.name
              })
            }
          })

        }
        else {
          this.router.navigate(['home'])
        }
      }
      else {
        this.router.navigate(['home'])
      }
    })

  }

}
