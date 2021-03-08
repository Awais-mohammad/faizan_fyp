import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-feeinvoice',
  templateUrl: './feeinvoice.page.html',
  styleUrls: ['./feeinvoice.page.scss'],
})
export class FeeinvoicePage implements OnInit {

  constructor(
    private firestore: AngularFirestore,
  ) { }
  studentname: string;
  studentadress: string;
  invoiceID: number;
  fee: string;
  duedate: string;

  generateslip() {
    if (!this.studentname) {
      alert('invalid field')
    }
    else if (!this.studentadress) {
      alert('invalid field')
    }
    else if (!this.invoiceID) {
      alert('invalid field')
    }
    else if (!this.fee) {
      alert('invalid field')
    }
    else if (!this.duedate) {
      alert('invalid field')
    }
    else if (!this.invoiceID) {
      alert('invalid field')
    }
    else {
      const studentname = this.studentname;
      const studentadress = this.studentadress
      const invoiceID = this.invoiceID
      const feeamount = this.fee
      const duedate = this.duedate
      const docID = firebase.firestore().collection('fees').doc().id;

      this.firestore.collection('fees').doc(docID).set({
        studentname,
        studentadress,
        invoiceID,
        feeamount,
        duedate,
        docID
      }).then(() => {
        alert('slip generated')
      }).catch(err => {
        alert(err.message)
      })
    }
  }

  ngOnInit() {
  }

}
