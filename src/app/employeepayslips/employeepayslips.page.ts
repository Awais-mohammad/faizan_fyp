import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, HostListener, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController, Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-employeepayslips',
  templateUrl: './employeepayslips.page.html',
  styleUrls: ['./employeepayslips.page.scss'],
})
export class EmployeepayslipsPage implements OnInit {

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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
    console.log(this.width);
  }


  alertHeader: string;
  alertmsg: string;
  payrun: string;
  payperiod: string;
  empname: string;
  empemail: string;
  empID: string;
  empstatus: string;
  hourlyrate: string;
  income: string;

  generatepayslip() {
    if (!this.alertHeader) {
      this.alertHeader = 'OOPPPSS'
      this.alertmsg = 'Field cannot be left blank'
      this.presentAlert()
    }
    else if (!this.alertmsg) {
      this.alertHeader = 'OOPPPSS'
      this.alertmsg = 'Field cannot be left blank'
      this.presentAlert()
    }
    else if (!this.payrun) {
      this.alertHeader = 'OOPPPSS'
      this.alertmsg = 'Field cannot be left blank'
      this.presentAlert()
    }
    else if (!this.payperiod) {
      this.alertHeader = 'OOPPPSS'
      this.alertmsg = 'Field cannot be left blank'
      this.presentAlert()
    }
    else if (!this.empname) {
      this.alertHeader = 'OOPPPSS'
      this.alertmsg = 'Field cannot be left blank'
      this.presentAlert()
    }
    else if (!this.empID) {
      this.alertHeader = 'OOPPPSS'
      this.alertmsg = 'Field cannot be left blank'
      this.presentAlert()
    }
    else if (!this.empemail) {
      this.alertHeader = 'OOPPPSS'
      this.alertmsg = 'Field cannot be left blank'
      this.presentAlert()
    }
    else if (!this.hourlyrate) {
      this.alertHeader = 'OOPPPSS'
      this.alertmsg = 'Field cannot be left blank'
      this.presentAlert()
    }
    else if (!this.income) {
      this.alertHeader = 'OOPPPSS'
      this.alertmsg = 'Field cannot be left blank'
      this.presentAlert()
    }
    else {
      const income = this.income;
      const hourlyrate = this.hourlyrate;
      const empemail = this.empemail;
      const empname = this.empname
      const empID = this.empID;
      const status = this.empstatus
      const payperiod = this.payperiod;
      const payrun = this.payrun
      const generatedat = Date.now()
      const docID = firebase.firestore().collection('payrolls').doc().id;
      this.firestore.collection('payrolls').doc(docID).set({
        income,
        hourlyrate,
        empemail,
        empname,
        empID,
        status,
        payperiod,
        payrun,
        generatedat,
        docID
      }).then(() => {
        this.alertHeader = 'SUCCESS'
        this.alertmsg = 'PAYROLL GENERATED'
        this.presentAlert()
      }).catch(err => {
        this.alertHeader = 'ERROR'
        this.alertmsg = err.message
        this.presentAlert()
      })

    }
  }

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
  
  managefines() {
    this.router.navigate(['bookpurchase'])
  }
  logout() {
    this.firebaseauth.auth.signOut().then(() => {
      this.router.navigate(['home'])
    })
  }
  ngOnInit() {
  }

}
