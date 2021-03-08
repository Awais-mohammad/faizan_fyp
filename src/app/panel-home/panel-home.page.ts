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

  checkanduploadpayroll() {
    if (!this.description) {
      this.alertHeader = 'INVALID FIELD'
      this.alertmsg = 'Description cannot be let empty'
      this.presentAlert()
    }
    else if (!this.amount) {
      this.alertHeader = 'INVALID FIELD'
      this.alertmsg = 'Amount Fcannot be let empty'
      this.presentAlert()
    }

    else {
      const UploadedBy = this.userData.Df.sn.proto.mapValue.fields.Name.stringValue;
      const UploadedAt = Date.now()
      const Amount = this.amount;
      const Description = this.description;
      const UploaderID = this.userID;
      const docID = this.generatedocID('payrols')
      this.firestore.collection('payrols').doc(docID).set({
        UploadedBy,
        UploadedAt,
        Amount,
        Description,
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
    this.firestore.collection('accountants').doc(this.userID).get().subscribe(data => {
      console.log(data);
      this.userData = data;
    })
  }

  payroll: any;
  getPayrolls() {
    this.firestore.collection('payrols').valueChanges().subscribe(paydaata => {
      console.log(paydaata);
      if (paydaata.length < 1) {
        console.log('no nono');
      }
      else {

        this.payroll = paydaata;

      }
    })
  }
  logout() {
    this.firebaseauth.auth.signOut().then(() => {
      this.router.navigate(['home'])
    })
  }

  generateslip() {
    this.router.navigate(['feeinvoice'])
  }
  gotobills(){
    this.router.navigate(['billsmanagement'])
  }

  managefines() {
    this.router.navigate(['bookpurchase'])
  }
  sallerypage() {
    this.router.navigate(['salleries'])
  }
  ngOnInit() {
    const authsub = this.firebaseauth.authState.subscribe(user => {
      this.userID = user.uid;
      this.getcurrentuserData()
    })
    this.getPayrolls()
  }

}
