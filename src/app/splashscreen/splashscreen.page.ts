import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {

  constructor(
    private firebaseauth: AngularFireAuth,
    public router: Router,
  ) {
    setTimeout(() => {
      this.router.navigate(['home'])
    }, 2000);
    //   this.checkLogin()
  }

  checkLogin() {
    const authsub = this.firebaseauth.authState.subscribe(user => {
      if (user) {
        if (user.uid) {
          setTimeout(() => {
            this.router.navigate(['panel-home'])
          }, 2000);
        }
        else {
          setTimeout(() => {
            this.router.navigate(['home'])
          }, 2000);
        }
      }
      else {
        setTimeout(() => {
          this.router.navigate(['home'])
        }, 2000);
      }
    })
  }
  ngOnInit() {
  }

}
