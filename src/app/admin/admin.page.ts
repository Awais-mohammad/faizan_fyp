import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController, iosTransitionAnimation } from '@ionic/angular';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public alertController: AlertController,
    private router: Router,
  ) { }

  toShow: string = "teachers";
  subOption: string = "";
  name: string;
  phone: string;
  email: string;
  password: string;
  salary: number;
  teachers: any[] = [];
  teacher: any;
  classes: any[] = [];
  reg: string;
  students: any[] = [];
  accountants: any[] = [];
  abc: string[] = ['Teachers', 'Students', 'Accountants']
  showForm: boolean = false;

  hideForm() {
    this.showForm = !this.showForm
  }

  addClass() {
    console.log(this.teacher);

    if (this.teacherName) {
      if (this.name && this.name != "" && this.name.length > 3) {
        if (this.teacher) {
          const name = this.name;
          const teacherName = this.teacherName;
          const teacherID = this.teacherID
          this.firestore.collection('classes').add({
            name, teacherName, teacherID
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
  }

  allteachers: any;

  getTeacher() {
    this.firestore.collection('teachers').valueChanges().subscribe((data: any) => {
      this.allteachers = data;
      console.log(this.allteachers);

    })
  }

  teacherName: string;
  teacherID: string;

  choosecat(a) {

    alert(a);
    this.teacherID = a;
    this.firestore.collection('teachers').doc(a).valueChanges().subscribe((res: any) => {
      console.log(res.name);
      this.teacherName = res.name;
      console.log(this.teacherName);

    })
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
  parent: string;

  addStudent() {
    if (this.parent) {
      if (this.name && this.name != "" && this.name.length > 3) {
        if (this.phone && this.phone != "" && this.phone.length > 9) {
          if (this.email && this.email != "" && this.email.length > 7) {
            if (this.password && this.password != "" && this.password.length > 5) {
              if (this.reg) {
                this.firestore.collection('students', q => q.where('parent', '==', this.parent.toLocaleLowerCase())).get().subscribe(res => {
                  if (!res.empty) {

                    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(value => {
                      const uid = value.user.uid;
                      const name = this.name;
                      const phone = this.phone;
                      const email = this.email;
                      const fee = '2500';
                      const reg = this.reg;
                      const parent = this.parent.toLocaleLowerCase()
                      this.firestore.collection('students').doc(uid).set({
                        name, uid, phone, email, reg, fee, parent,
                      }).then(dat => {
                        alert("STUDENT ADDED!sibbling scholarship");
                        this.subOption = "";
                      }).catch(err => {
                        alert(err.message);
                      })
                    }).catch(err => {
                      alert(err.message);
                    })
                  }
                  else {

                    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(value => {
                      const uid = value.user.uid;
                      const name = this.name;
                      const phone = this.phone;
                      const email = this.email;
                      const fee = '5000';
                      const reg = this.reg;
                      const parent = this.parent.toLocaleLowerCase()
                      this.firestore.collection('students').doc(uid).set({
                        name, uid, phone, email, reg, parent, fee
                      }).then(dat => {
                        alert("STUDENT ADDED!No scholarship");
                        this.subOption = "";
                      }).catch(err => {
                        alert(err.message);
                      })
                    }).catch(err => {
                      alert(err.message);
                    })
                  }
                })
              }
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

  addAdmin() {
    if (!this.name || !this.phone || !this.email || !this.password) {
      alert('Fill out All fields')
    }
    else {
      this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(value => {
        const uid = value.user.uid;
        const name = this.name;
        const email = this.email;
        const phone = this.phone;
        this.firestore.collection('admins').doc(uid).set({
          uid, name, email, phone,
        }).then((dat) => {
          alert('ADMIN ADDED')
        }).catch(er => {
          alert(JSON.stringify(er.message))
        })
      }).catch(err => {
        alert(JSON.stringify(err.message))
      })
    }
  }

  logOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['home'])
    }).catch(err => {
      alert(JSON.stringify(err))
    })
  }

  ngOnInit() {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        if (user.uid) {
          this.firestore.collection('admins').doc(user.uid).valueChanges().subscribe(res => {
            if (res == undefined) {
              this.logOut()
              this.router.navigate(['home'])
              alert('Portal is only for admins')
            }
            else {
              this.router.navigate(['admin'])
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
    this.getTeacher()
    this.fetchTeachers();
    this.fetchClasses();
    this.fetchStudents();
    this.fetchAccountants();
  }

}
