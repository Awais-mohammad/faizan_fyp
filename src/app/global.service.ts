import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import  swal from 'sweetalert2'
import { AlertController } from '@ionic/angular';
 
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from '@ionic/angular';
import { environment } from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loading:any;
  baseURL:string;
  constructor(
    private firestore: AngularFirestore,
    private firebaseauth: AngularFireAuth,
    public alertController: AlertController,
    private router: Router,
    public loadingController: LoadingController
  ) {this.baseURL = environment.baseURL}


  async checkAuth(){
   await this.firebaseauth.authState.subscribe(user => {
      if (user) {
        if (user.uid) {
          let tmp: any = `students`;
          let route: string = `students-panel`;
          if(localStorage.getItem('teacher') === '1'){
            tmp = `teachers`
            route = `teacher-panel`
          }else if(localStorage.getItem('accountant') === '1'){
            tmp = `accountants`
            route = `panel-home`
          }else if(localStorage.getItem('admin') === '1'){
            tmp = `admins`
            route = `admin`
          }
    

          this.firestore.collection(tmp).doc(user.uid).valueChanges().subscribe(res => {
            this.loading.dismiss()
            if (res === undefined) {
              this.logOut()
              swal.fire({
                icon: 'error',
                title: 'Oops...',
                backdrop: false,
                text: 'No account found!',
                footer: ''
              })
              this.router.navigate(['home'])
               
            }
            else {
              this.router.navigate([route])
             
            }
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
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await this.loading.present();

   
  }
  logOut() {
    localStorage.clear()
    this.firebaseauth.auth.signOut().then(() => {
      this.router.navigate(['home'])
    }).catch(err => {
      alert(JSON.stringify(err))
    })
  }
}
