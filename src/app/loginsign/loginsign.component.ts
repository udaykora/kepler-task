import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarService } from '../loginservice/loginservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginsign',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loginsign.component.html',
  styleUrls: ['./loginsign.component.css'],
})
export class LoginsignComponent {
  // @Output() logincloseChanged = new EventEmitter<boolean>();
  // @Output() sendemailsidebar = new EventEmitter<any>();

  constructor(private sidebarservice: SidebarService, private router: Router) {}

  @Output() removelogin = new EventEmitter<boolean>();

  animation: boolean = true;
  loadinganim: boolean = false;
  forgotpassword: boolean = false;
  login: boolean = true;
  signup: boolean = false;
  logincolor: string = 'black';
  signupcolor: string = 'grey';
  forgotEmail: string = '';
  id: any = '';

  entermail: string = 'u@gmail.com';
  signemail: string = '';
  enterpassword: string = 'Udaykora';
  message: string = '';
  message1: string = '';
  message2: string = '';
  emailvalid: any = true;

  email: string = 'u@gmail.com';
  password: string = 'u';

  userType: string = 'regular';
  emailPlaceholder: string = 'Email';

  removeloginfun() {
    this.animation = false;
    setTimeout(() => {
      this.removelogin.emit(false);
    }, 200);
  }

  async manipulate() {
    if (this.login) {
      this.loadinganim = true;
      const isValidUser = await this.sidebarservice.loginWithEmailAndPassword(
        this.entermail,
        this.enterpassword
      );

      if (this.entermail === '' || this.enterpassword === '') {
        this.message = 'Email/Password cannot be empty';
        this.loadinganim = false;
        return;
      }
      if (!isValidUser) {
        this.message = 'Wrong email/password';
        this.loadinganim = false;
        return;
      } else {
        this.animation = false;
        this.sidebarservice.id$.subscribe((data: any) => {
          this.id = data;
        });

        setTimeout(() => {
          this.sidebarservice.sendemail(this.entermail);
          this.router.navigate(['/mycv', this.id]);
        }, 300);
      }
    }
    if (this.forgotpassword) {
      console.log(this.forgotEmail);
      if (this.forgotEmail == '') {
        this.message2 = 'Email cannot be empty';
        return;
      }
      const emailtest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailvalid = emailtest.test(this.forgotEmail);
      if (!this.emailvalid) this.message2 = 'Enter Valid Mail';
    } else {
      if (this.signemail == '') {
        this.message1 = 'Email Cannot be Empty';
        return;
      }
      if (this.userType == 'regular') {
        const emailtest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.emailvalid = emailtest.test(this.signemail);
        if (!this.emailvalid) this.message1 = 'Enter Valid Mail';
      } else {
        this.message1 = 'Enter A valid Mail';
      }
    }
  }

  changetologin() {
    this.login = true;
    this.signup = false;
    this.logincolor = 'black';
    this.signupcolor = 'grey';
  }

  changetosignup() {
    this.signup = true;
    this.login = false;
    this.logincolor = 'grey';
    this.signupcolor = 'black';

    this.userType = 'regular';
    this.emailPlaceholder = 'Email';
  }

  updatePlaceholder() {
    if (this.userType === 'regular') {
      this.emailPlaceholder = 'Email';
    } else if (this.userType === 'business') {
      this.emailPlaceholder = 'Business Email';
    }
  }

  // loginpageclose() {
  //   this.logincloseChanged.emit(false);
  // }
}
