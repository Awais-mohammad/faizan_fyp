import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-bookpurchase',
  templateUrl: './bookpurchase.page.html',
  styleUrls: ['./bookpurchase.page.scss'],
})
export class BookpurchasePage implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    public alertController: AlertController,
    private firebaseauth: AngularFireAuth,
  ) { }
  amount: number;
  description: string;
  studentName: string;


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


  issueFine() {
    if (!this.amount) {
      this.alertHeader = 'OPPPPS'
      this.alertmsg = 'Amount cannot be empty'
      this.presentAlert()
    }
    else if (!this.description) {
      this.alertHeader = 'OPPPPS'
      this.alertmsg = 'Description cannot be empty'
      this.presentAlert()
    }
    else if (!this.studentName) {
      this.alertHeader = 'OPPPPS'
      this.alertmsg = 'Student Name cannot be empty'
      this.presentAlert()
    }
    else {
      const FinePurpose = this.description;
      const FineFor = this.studentName;
      const FineAmount = this.amount;
      const FinedAt = Date.now()
      const status = 'unpayed'
      const docID = firebase.firestore().collection('fines').doc().id;
      this.firestore.collection('fines').doc(docID).set({
        FinePurpose,
        FineFor,
        FineAmount,
        FinedAt,
        docID,
        status,
      }).then(() => {
        this.alertHeader = 'SUCCESS'
        this.alertmsg = 'Fine added'
        this.presentAlert()
      }).catch(err => {
        this.alertHeader = 'ERROR'
        this.alertmsg = err.message
        this.presentAlert()
      })
    }
  }

  fines: any[]
  getfeefines() {
    this.firestore.collection('fines').valueChanges().subscribe(data => {
      if (data.length >= 1) {
        this.fines = data
      }

    })
  }

  ngOnInit() {
    this.getfeefines()
  }

}
