import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, HostListener, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController, Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-salleries',
  templateUrl: './salleries.page.html',
  styleUrls: ['./salleries.page.scss'],
})
export class SalleriesPage implements OnInit {

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private firestore: AngularFirestore,
    private firebaseauth: AngularFireAuth,
    public alertController: AlertController,
    private router: Router,
  ) { }

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
  payrolls: any;
  getpayrolls() {
    this.firestore.collection('payrolls').valueChanges().subscribe(data => {
      this.payrolls = data
    })
  }

  approvepay(id) {

    this.firestore.collection('payrolls').doc(id).delete().then(() => {
      this.alertHeader = 'Success'
      this.alertmsg = id + ' pay approved'
      this.presentAlert()
    }).catch(err => {
      this.alertHeader = 'ERROR'
      this.alertmsg = err.message
      this.presentAlert()
    })
  }
  denypay(id) {
    this.firestore.collection('payrolls').doc(id).delete().then(() => {
      this.alertHeader = 'Success'
      this.alertmsg = id + ' pay denied'
      this.presentAlert()
    }).catch(err => {
      this.alertHeader = 'ERROR'
      this.alertmsg = err.message
      this.presentAlert()
    })
  }

  ngOnInit() {
    this.getpayrolls()
  }

}
