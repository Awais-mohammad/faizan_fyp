import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController, iosTransitionAnimation } from '@ionic/angular';


@Component({
  selector: 'app-students-panel',
  templateUrl: './students-panel.page.html',
  styleUrls: ['./students-panel.page.scss'],
})
export class StudentsPanelPage implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public alertController: AlertController,
    private router: Router,
  ) { }

  currentDiv: string = 'home';
  announce: any;

  removeAnnounce(id: string) {

  }
  gotoDiv(div: string) {
    this.currentDiv = div;
  }

  getAnnounces() {
    this.firestore.collection('announcements', q => q.where('cat', '==', 'Students')).valueChanges().subscribe(data => {
      if (data.length < 1) {

      }
      else {
        this.announce = data
        console.log(this.announce);

      }
    })
  }

  getclass(regNo: string) {
    this.firestore.collection('classes').valueChanges().subscribe((cl: any) => {

      if (cl) {
        for (var i = 0; i < cl.length; i++) {


          if (cl[i].students) {
            for (var j = 0; j < cl[i].students.length; j++) {


              if (cl[i].students[j].student == regNo) {

                this.studentclassID = cl[i].uid

                this.getMarks(this.studentclassID)
                this.getAttend(this.studentclassID)
              }
              else {


              }
            }
          }

        }

      }
      else {
        console.log('no classes found');

      }

    })
  }
  marks: any[] = []

  getMarks(classID: string) {


    this.firestore.collection('classes').doc(classID).collection('marks').valueChanges().subscribe((marks: any) => {
      console.log(marks);

      for (var j = 0; j < marks.length; j++) {
        if (marks[j].marks) {
          for (var i = 0; i < marks[j].marks.length; i++) {

            if (marks[j].marks[i].regNo == this.regNo) {
              this.marks.push(marks[j].marks[i])
              console.log(this.marks);

            }

          }
        }
      }

    })
  }
  attend: any;

  getAttend(classID) {
    this.firestore.collection('classes').doc(classID).collection('attendence').valueChanges().subscribe((att: any) => {
      console.log(att);
      this.attend = att

    })
  }

  UID: string;
  regNo: string;
  studentclassID: string;
  studentName: string;
  fee: any;

  checkFee() {
    this.firestore.collection('students').doc(this.UID).collection('fees').valueChanges().subscribe(res => {
      console.log(res);
      this.fee = res;
    })
  }
  list: boolean = false;
  opnelist() {
    this.list = !this.list
  }
  ngOnInit() {
    this.getAnnounces()
    const authSub = this.afAuth.authState.subscribe(user => {
      if (user) {
        if (user.uid) {
          this.UID = user.uid
          console.log('user logged in', this.UID);
          this.firestore.collection('students').doc(this.UID).valueChanges().subscribe((res: any) => {
            this.regNo = res.reg
            this.studentName = res.name
            console.log('reg', this.regNo);
            this.getclass(this.regNo)
            this.checkFee()
          })

        }
        else {
          this.logOut()
          this.router.navigate(['home'])
        }

      }
      else {

        this.router.navigate(['home'])
      }
    })
  }

  logOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['home'])
    })
  }

}
