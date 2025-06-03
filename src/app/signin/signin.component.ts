import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../loginservice/loginservice';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  mail: any = '';
  newpassword: any = '';
  confirmpassword: any = '';
  error: any = '';
  loadingspin: any = false;

  constructor(private sidebarservice: SidebarService, private router: Router) {}

  ngOnInit(): void {
    this.sidebarservice.signinemail$.subscribe((data) => {
      if (data) this.mail = data;
    });
  }

  closebtn() {
    this.sidebarservice.signinproc(undefined).then(() => {
      this.router.navigate(['/mycv']);
    });
  }

  createacc() {
    this.loadingspin = true;

    if (this.newpassword.length <= 0 || this.confirmpassword.length <= 0) {
      this.loadingspin = false;
      this.error = 'Password cannot be Empty';

      return;
    }

    if (this.newpassword.length < 6) {
      this.loadingspin = false;
      this.error = 'Password Must be Minimum 6 Characters';

      return;
    }

    if (this.newpassword != this.confirmpassword) {
      this.loadingspin = false;
      this.error = 'Passwords do not Match';
      return;
    }
    this.sidebarservice.createacc(this.mail, this.newpassword).then(() => {
      this.router.navigate(['/mycv']).then(() => {
        this.sidebarservice.signinproc(undefined);
      });
    });
  }

  
}
