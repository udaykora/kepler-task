import { Component } from '@angular/core';
import { SidebarService } from '../loginservice/loginservice';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule, CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css',
})
export class ResetpasswordComponent {
  constructor(private sidebarservice: SidebarService, private router: Router) {}

  newpassword: any = '';
  confirmpassword: any = '';
  errormsg: any = '';
  loading: any = false;

  closebtn() {
    this.sidebarservice.resetpassword(undefined).then(() => {
      this.router.navigate(['/mycv']);
    });
  }

  submitpassdetails() {
    this.sidebarservice.resetpasswordmail$.subscribe((data) => {
      this.loading = true;
      if (data) {
        if (this.newpassword.length <= 0 || this.confirmpassword.length <= 0) {
          this.errormsg = 'Passwords Cannot be Empty';
          this.loading = false;
          return;
        }

        if (this.newpassword != this.confirmpassword) {
          this.errormsg = 'Passwords do not Match';
          this.loading = false;
          return;
        }

        if (this.newpassword.length < 6) {
          this.errormsg = 'Password length should be more than 6 characters';
          this.loading = false;
          return;
        }
        this.sidebarservice
          .resetpasswordfun(data, this.newpassword)
          .then(() => {
            this.sidebarservice.resetpassword(undefined);
          })
          .then(() => {
            this.router.navigate(['/mycv']);
          });
      }
    });
  }
}
