import { FeeinvoicePage } from './../feeinvoice/feeinvoice.page';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, HostListener, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController, Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-panel-home',
  templateUrl: './panel-home.page.html',
  styleUrls: ['./panel-home.page.scss'],
})
export class PanelHomePage implements OnInit {

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private firestore: AngularFirestore,
    private firebaseauth: AngularFireAuth,
    public alertController: AlertController,
    private router: Router,
  ) {
    this.platform.ready().then(() => {
      this.width = platform.width()
    })
  }
  width: number;
  description: string;
  amount: number;
  userID: string;
  userData: any;
  currentDiv: string = 'home';

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
    console.log(this.width);
  }


  alertHeader: string;
  alertmsg: string;

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.alertHeader,
      message: this.alertmsg,
      mode: 'ios',
      buttons: [
        {
          text: 'CLOSE',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    })

    await alert.present();
  }

  gotopayslips() {
    this.router.navigate(['employeepayslips'])
  }

  generatedocID(collname: string) {
    const id = firebase.firestore().collection(collname).doc().id;
    return id;
  }

  month: string;
  payrollamount: number;
  date: any = new Date();

  checkanduploadpayroll() {
    if (!this.month) {
      alert('empty field month')
    }
    else if (!this.payrollamount) {
      alert('empty field payrollamount')
    }
    else if (!this.userData.Df.sn.proto.mapValue.fields.name.stringValue) {
      alert('empty field issuedBy')
    }
    else if (!this.userData.Df.sn.proto.mapValue.fields.email.stringValue) {
      alert('empty field issuerEmail')
    }
    else if (!this.date) {
      alert('empty field date')
    }
    else {
      const UploadedBy = this.userData.Df.sn.proto.mapValue.fields.name.stringValue;
      const UploadedAt = this.date;
      const Amount = this.payrollamount;
      const UploaderID = this.userID;
      const email = this.userData.Df.sn.proto.mapValue.fields.email.stringValue;
      const docID = this.generatedocID('emppayrols')
      const month = this.month;
      this.firestore.collection('emppayrols').doc(docID).set({
        UploadedBy,
        email,
        UploadedAt,
        Amount,
        month,
        UploaderID,
        docID,
      }).then(() => {
        this.alertHeader = 'SUCCESS'
        this.alertmsg = 'Payroll added successfully'
        this.presentAlert()
        this.amount = null
        this.description = ''

      }).catch(err => {

        this.alertHeader = 'ERROR'
        this.alertmsg = err.message
        this.presentAlert()
      })
    }
  }

  getcurrentuserData() {
    console.log(this.userID);

    this.firestore.collection('accountants').doc(this.userID).get().subscribe(data => {
      console.log(data);
      this.userData = data;
    })
  }

  removePayroll(id: string) {
    this.firestore.collection('emppayrols').doc(id).delete().then(() => {
      alert('payroll removed')
    }).catch(err => {
      alert(JSON.stringify(err.message))
    })
  }

  payroll: any;
  getPayrolls() {
    this.firestore.collection('emppayrols').valueChanges().subscribe(paydaata => {
      console.log(paydaata);
      if (paydaata.length < 1) {
        console.log('no nono');
      }
      else {

        this.payroll = paydaata;
        console.log('payroll', this.payroll);

      }
    })
  }
  logout() {
    this.firebaseauth.auth.signOut().then(() => {
      this.router.navigate(['home'])
    })
  }

  goToPage(name: string) {
    this.router.navigate([name])
  }

  gotoDiv(divName: string) {
    this.currentDiv = divName
  }

  studentname: string;
  fineamount: number;
  regno: string;
  created: string = this.date;

  addfine() {
    if (!this.studentname) {
      alert('add a name')
    }
    else if (!this.fineamount) {
      alert('add an amount')
    }
    else if (!this.regno) {
      alert('add student reg no')
    }
    else {
      const studentName = this.studentname
      const fineAmount = this.fineamount
      const regNo = this.regno
      const status = 'unpayed'
      const created = this.created
      const docID = firebase.firestore().collection('fines').doc().id;

      this.firestore.collection('fines').doc(docID).set({
        studentName,
        fineAmount,
        regNo,
        created,
        docID,
        status,
      }).then(() => {
        alert('fine alotted')
      }).catch(err => {
        alert(JSON.stringify(err.message))
      })
    }
  }

  unpayedfines: any;

  getfines() {
    this.firestore.collection('fines', q => q.where('status', '==', 'unpayed')).valueChanges().subscribe(res => {
      if (res.length < 1) {

      }
      else {
        this.unpayedfines = res;
      }
    })
  }
  payedfines: any;

  getpayedfines() {
    this.firestore.collection('fines', q => q.where('status', '==', 'payed')).valueChanges().subscribe(res => {
      if (res.length < 1) {

      }
      else {
        this.payedfines = res;
      }
    })
  }

  removefine(id: string) {
    this.firestore.collection('fines').doc(id).delete().then(() => {
      alert('Fine removed')
    }).catch(err => {
      alert(err.message)
    })
  }

  payFine(id: string) {
    const status = 'payed'
    this.firestore.collection('fines').doc(id).update({
      status
    }).then(() => {
      alert('FINE PAYED')
    }).catch(Err => {
      alert(JSON.stringify(Err.message))
    })
  }

  teachers: any;

  getteachers() {
    this.firestore.collection('teachers').valueChanges().subscribe(res => {
      this.teachers = res
    })
  }
  purpose: string;

  addexpenditure() {
    if (!this.month) {
      alert('empty field month')
    }
    else if (!this.payrollamount) {
      alert('empty field payrollamount')
    }
    else if (!this.userData.Df.sn.proto.mapValue.fields.name.stringValue) {
      alert('empty field issuedBy')
    }
    else if (!this.userData.Df.sn.proto.mapValue.fields.email.stringValue) {
      alert('empty field issuerEmail')
    }
    else if (!this.date) {
      alert('empty field date')
    }
    else if (!this.purpose) {
      alert('empty field purpose')
    }
    else {
      const UploadedBy = this.userData.Df.sn.proto.mapValue.fields.name.stringValue;
      const UploadedAt = this.date;
      const Amount = this.payrollamount;
      const UploaderID = this.userID;
      const email = this.userData.Df.sn.proto.mapValue.fields.email.stringValue;
      const docID = this.generatedocID('expends')
      const month = this.month;
      const purpose = this.purpose
      this.firestore.collection('expends').doc(docID).set({
        UploadedBy,
        email,
        UploadedAt,
        Amount,
        month,
        purpose,
        UploaderID,
        docID,
      }).then(() => {
        this.alertHeader = 'SUCCESS'
        this.alertmsg = 'EXPENDITURE added successfully'
        this.presentAlert()
        this.amount = null
        this.description = ''

      }).catch(err => {

        this.alertHeader = 'ERROR'
        this.alertmsg = err.message
        this.presentAlert()
      })
    }
  }

  expends: any;

  getexpends() {
    this.firestore.collection('expends').valueChanges().subscribe(res => {
      this.expends = res;
    })
  }

  studentFees: any;
  feearay: any[] = []

  getStudents() {
    this.feearay = []
    this.firestore.collection('students').valueChanges().subscribe((res: any) => {

      for (var i = 0; i < res.length; i++) {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        this.currmonth = month;


        this.firestore.collection('students').doc(res[i].uid).collection('fees').doc(this.currmonth).valueChanges().subscribe(data => {
          if (data) {

            this.studentFees = data;

            this.feearay.push(this.studentFees)
            console.log(this.feearay);

          }
          else {

            this.addfee()

          }
        })
      }

    })


  }
  currDay: any = new Date().getDate()
  addfee() {

    this.firestore.collection('students').valueChanges().subscribe((res: any) => {

      for (var i = 0; i < res.length; i++) {

        const amount = res[i].fee;
        const dueDate = new Date().getDay();
        const dueMonth = new Date().getMonth();
        const status = 'unpayed'
        const studentName = res[i].name
        const regNo = res[i].reg
        const uid = res[i].uid
        const month = this.currmonth

        this.firestore.collection('students').doc(res[i].uid).collection('fees').doc(this.currmonth).set({
          amount, dueDate, status, month, dueMonth, uid, regNo, studentName,
        }).then(() => {

        })
      }
    })
  }

  currmonth: any;

  payFee(stdName: string, docID: string, month: string) {
    const status = 'payed'
    this.firestore.collection('students').doc(docID).collection('fees').doc(month).update({
      status
    }).then(() => {
      alert(stdName + 'fee payed successfully')
    }).catch(Err => {
      alert(JSON.stringify(Err.message))
    })
  }

  ngOnInit() {
    const authsub = this.firebaseauth.authState.subscribe(user => {
      if (user) {
        if (user.uid) {
          this.userID = user.uid;
          this.getcurrentuserData()
        }
        else {
          this.goToPage('home')
        }
      }
      else {

        this.goToPage('home')
      }
    })
    this.getPayrolls()
    this.getfines()
    this.getpayedfines()
    this.getteachers()
    this.getStudents()
    this.getexpends()


  }

}
