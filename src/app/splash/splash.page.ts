import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuController } from '@ionic/angular';
import { AlertController, Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(
    
    private firestore: AngularFirestore,
    private firebaseauth: AngularFireAuth,
    public alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
   this.firebaseauth.authState.subscribe(user => {
      if (user) {
        if (user.uid) {
          let tmp: any = `students`;
          if(localStorage.getItem('teacher') === '1'){
            tmp = `teachers`
          }else if(localStorage.getItem('accountant') === '1'){
            tmp = `accountants`
          }else if(localStorage.getItem('admin') === '1'){
            tmp = `admins`
          }
          

          this.firestore.collection(tmp).doc(user.uid).valueChanges().subscribe(res => {
            console.log(res)
            // if (res == undefined) {
            //   this.logOut()
            //   this.router.navigate(['home'])
            //   alert('Portal is only for TEACHERS')
            // }
            // else {
            //   this.router.navigate(['teacher-panel'])
            //   this.currentUID = user.uid
            //   this.getClass()

            //   this.firestore.collection('teachers').doc(this.currentUID).valueChanges().subscribe((Res: any) => {
            //     this.name = Res.name
            //   })
            // }
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
