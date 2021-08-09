import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, HostListener, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController, Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-billsmanagement',
  templateUrl: './billsmanagement.page.html',
  styleUrls: ['./billsmanagement.page.scss'],
})
export class BillsmanagementPage implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    public alertController: AlertController,
    private router: Router,
  ) { }
  fees: any;

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

  getfees() {
    this.firestore.collection('fees').valueChanges().subscribe(data => {
      this.fees = data
    })
  }
  paynow(id) {
    this.firestore.collection('fees').doc(id).delete().then(() => {
      this.alertHeader = 'Success'
      this.alertmsg = 'Fee payed'
      this.presentAlert()
    }).catch(err => {
      this.alertHeader = 'Success'
      this.alertmsg = err.message
      this.presentAlert()
    })
  }
  ngOnInit() {
    this.getfees()
  }

}
