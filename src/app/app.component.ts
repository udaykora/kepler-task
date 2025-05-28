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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, DoCheck {
  constructor(private sidebarService: SidebarService) {}

  loginopen = false;
  check: any = 'ff';

  ngDoCheck(): void {
   
  }

  ngOnInit() {
    this.sidebarService.sidebarData$.subscribe((data) => {
     
      if (data == true || data == false) {
        this.check = data;
       
        this.loginopen = data;
      }
    });
  }

  handledata(data: any) {
   
    this.loginopen = data == true ? true : false;
  }
}
