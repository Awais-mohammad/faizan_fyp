import { AlertController, Platform } from '@ionic/angular';
import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private platform: Platform,
    private firebaseauth: AngularFireAuth,
    public alertController: AlertController,
    private Router: Router,
  ) {
    this.platform.ready().then(() => {
      this.width = platform.width()
    })
  }
  width: number;
  loginpage: boolean = false;
  loginFor: string;
  email: string;
  password: string;
  inputtyp: string = 'password';
  showhidepass: boolean = false;


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

  openLoginpage(loginFor: string) {
    this.loginpage = !this.loginpage
    this.loginFor = loginFor.toUpperCase()
  }

  loginvalidator() {
    if (!this.email) {
      this.alertHeader = 'Invalid Field'
      this.alertmsg = 'E-mail cannot be left blank'
      this.presentAlert()

    }
    else if (!this.password) {

      this.alertHeader = 'Invalid Field'
      this.alertmsg = 'Password cannot be left blank'
      this.presentAlert()
    }
    else {
      if (this.loginFor == 'ADMIN') {
        this.login()
      } else if (this.loginFor = 'HOD'){
        this.Router.navigate(['admin']);
      }
      else {
        this.Router.navigate(['testpage'])
      }
    }

  }

  login() {
    this.email = this.email.toLowerCase()
    this.firebaseauth.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
      this.Router.navigate(['panel-home'])
    }).catch(er => {
      alert(er.message)
    })
  }

  passwordtoggler() {
    this.showhidepass = !this.showhidepass
    if (!this.showhidepass) {
      this.inputtyp = 'password'
    }
    else {
      this.inputtyp = 'text'
    }
  }

  ngOnInit() {

  }
}
