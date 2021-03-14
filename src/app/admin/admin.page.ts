import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) { }

  toShow: string = "teachers";
  subOption: string = "";
  name: string;
  phone: string;
  email: string;
  password: string;
  salary: number;

  addTeacher() {
    if (this.name && this.name != "" && this.name.length > 3) {
      if (this.phone && this.phone != "" && this.phone.length > 9) {
        if (this.email && this.email != "" && this.email.length > 7) {
          if (this.password && this.password != "" && this.password.length > 5) {
            if (this.salary) {
              this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(value => {
                const uid = value.user.uid;
                const name = this.name;
                const phone = this.phone;
                const email = this.email;
                const salary = this.salary;
                this.firestore.collection('teachers').doc(uid).set({
                  name,uid,phone,email,salary,
                }).then(dat=>{
                  alert("Teacher ADDED!");
                  this.subOption = "";
                }).catch(err=>{
                  alert(err.message);
                })
              }).catch(err=>{
                alert(err.message);
              })
            }
          }
        }
      }
    }
  }

  changeShow(option: string) {
    this.toShow = option;
  }

  changeSub(option: string) {
    this.subOption = option;
  }

  ngOnInit() {
  }

}
