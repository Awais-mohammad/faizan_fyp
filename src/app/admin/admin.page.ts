import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth'; import { AlertController, iosTransitionAnimation } from '@ionic/angular';
import { proxyMethods } from '@ionic/angular/directives/proxies-utils';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public alertController: AlertController
  ) { }

  toShow: string = "teachers";
  subOption: string = "";
  name: string;
  phone: string;
  email: string;
  password: string;
  salary: number;
  teachers: any[] = [];
  teacher: string;
  classes: any[] = [];
  reg: number;
  students: any[] = [];
  accountants: any[] = [];

  addClass() {
    if (this.name && this.name != "" && this.name.length > 3) {
      if (this.teacher) {
        const name = this.name;
        const teacher = this.teacher;
        this.firestore.collection('classes').add({
          name, teacher,
        }).then(dat => {
          const uid = dat.id;
          this.firestore.collection('classes').doc(dat.id).update({
            uid,
          }).then(dat2 => {
            alert("Class ADDED!");
            this.subOption = "";
          })
        }).catch(err => {
          alert(err.message);
        })
      }
    }
  }
  
  addAccountant() {
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
                this.firestore.collection('accountants').doc(uid).set({
                  name, uid, phone, email, salary,
                }).then(dat => {
                  alert("Accountant ADDED!");
                  this.subOption = "";
                }).catch(err => {
                  alert(err.message);
                })
              }).catch(err => {
                alert(err.message);
              })
            }
          }
        }
      }
    }
  }

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
                  name, uid, phone, email, salary,
                }).then(dat => {
                  alert("Teacher ADDED!");
                  this.subOption = "";
                }).catch(err => {
                  alert(err.message);
                })
              }).catch(err => {
                alert(err.message);
              })
            }
          }
        }
      }
    }
  }

  addStudent() {
    if (this.name && this.name != "" && this.name.length > 3) {
      if (this.phone && this.phone != "" && this.phone.length > 9) {
        if (this.email && this.email != "" && this.email.length > 7) {
          if (this.password && this.password != "" && this.password.length > 5) {
            if (this.reg) {
              this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(value => {
                const uid = value.user.uid;
                const name = this.name;
                const phone = this.phone;
                const email = this.email;
                const reg = this.reg;
                this.firestore.collection('students').doc(uid).set({
                  name, uid, phone, email, reg,
                }).then(dat => {
                  alert("STUDENT ADDED!");
                  this.subOption = "";
                }).catch(err => {
                  alert(err.message);
                })
              }).catch(err => {
                alert(err.message);
              })
            }
          }
        }
      }
    }
  }

  async sendWarning(uid) {
    const prompt = await this.alertController.create({
      header: "Warning",
      mode: "ios",
      backdropDismiss: true,
      inputs: [
        {
          name: 'message',
          placeholder: 'Enter warning message here',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log(data);
          }
        },
        {
          text: 'Send',
          handler: data => {
            let post = {
              uid: uid,
              msg: data.message,
              from: 'Admin',
            }
            this.firestore.collection('notifications').add(post).then(dat => {
              alert("Warning Sent!");
            })
            console.log(data.message);
          }
        }
      ]
    });
    await prompt.present()
  }

  removeStudent(teacher: any) {
    console.log("..." + teacher);
    this.firestore.collection("students").doc(teacher.uid).delete().then(data => {
      alert("STUDENT Removed");
      this.fetchStudents();
    }).catch(data => {
      alert(data.message);
    });
  }

  removeAccountant(teacher: any) {
    console.log("..." + teacher);
    this.firestore.collection("accountants").doc(teacher.uid).delete().then(data => {
      alert("Accountant Removed");
      this.fetchTeachers();
    }).catch(data => {
      alert(data.message);
    });
  }

  removeTeacher(teacher: any) {
    console.log("..." + teacher);
    this.firestore.collection("teachers").doc(teacher.uid).delete().then(data => {
      alert("Teacher Removed");
      this.fetchTeachers();
    }).catch(data => {
      alert(data.message);
    });
  }


  removeClass(teacher: any) {
    console.log("..." + teacher);
    this.firestore.collection("classes").doc(teacher.uid).delete().then(data => {
      alert("Class Removed");
      this.fetchClasses();
    }).catch(data => {
      alert(data.message);
    });
  }

  fetchStudents() {
    this.students = [];
    console.log(":");
    this.firestore.collection('students').get().forEach(data => {
      data.docs.forEach(element => {
        this.students.push(element.data());
      });
      console.log(this.students);
    })
  }

  fetchAccountants() {
    this.accountants = [];
    console.log(":");
    this.firestore.collection('accountants').get().forEach(data => {
      data.docs.forEach(element => {
        this.accountants.push(element.data());
      });
      console.log(this.accountants);
    })
  }

  fetchTeachers() {
    this.teachers = [];
    console.log(":");
    this.firestore.collection('teachers').get().forEach(data => {
      data.docs.forEach(element => {
        this.teachers.push(element.data());
      });
      console.log(this.teachers);
    })
  }

  fetchClasses() {
    this.classes = [];
    console.log(":");
    this.firestore.collection('classes').get().forEach(data => {
      data.docs.forEach(element => {
        this.classes.push(element.data());
      });
      console.log(this.classes);
    })
  }

  changeShow(option: string) {
    this.toShow = option;
    this.subOption = "";
  }

  changeSub(option: string) {
    this.subOption = option;
  }

  ngOnInit() {
    this.fetchTeachers();
    this.fetchClasses();
    this.fetchStudents();
    this.fetchAccountants();
  }

}
