import { Component, DoCheck, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume/resume.component';
import { Dpcomponent } from './dp/dp.component';
import { ViewjobComponent } from './viewjob/viewjob.component';
import { LoginsignComponent } from './loginsign/loginsign.component';
import { SearchtipsComponent } from './searchtips/searchtips.component';
import { PracticeComponent } from './practice/practice.component';
import { PostajobComponent } from './postajob/postajob.component';
import { SigninComponent } from './signin/signin.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from './loginservice/loginservice';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    ResumeComponent,
    ViewjobComponent,
    LoginsignComponent,
    SidebarComponent,
    SearchtipsComponent,
    PracticeComponent,
    PostajobComponent,
    SigninComponent,
    ResetpasswordComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, DoCheck {
  constructor(private sidebarService: SidebarService) {}

  loginopen = false;
  check: any = 'ff';
  signinformopen: any = false;
  resetformopen: any = false;

  ngDoCheck(): void {}

  ngOnInit() {
    this.sidebarService.sidebarData$.subscribe((data) => {
      if (data == true || data == false) {
        this.check = data;

        this.loginopen = data;
      }
      this.sidebarService.signinemail$.subscribe((data) => {
        if (data) {
          this.signinformopen = true;
        } else {
          this.signinformopen = false;
        }
      });

      this.sidebarService.resetpasswordmail$.subscribe((data) => {
        if (data) {
          this.resetformopen = true;
        } else {
          this.resetformopen = false;
        }
      });
    });
  }

  handledata(data: any) {
    this.loginopen = data == true ? true : false;
  }
}
