import {
  Component,
  DoCheck,
  EventEmitter,
  Output,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../loginservice/loginservice';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterOutlet, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  email: any = undefined;
  useridvalid: any = false;
  userid: any = null;

  ngOnInit(): void {
    this.sidebarService.email$.subscribe((data) => {
      if (data) {
        this.email = data;
        this.sidebarService.sendData(false);
      }
    });
    this.sidebarService.id$.subscribe((data) => {
      if (data != null || data != undefined) this.useridvalid = true;
      this.userid = data;
    });
  }

  constructor(private sidebarService: SidebarService, private router: Router) {}

  loginopen = false;
  islogged = false;
  assign = false;
  postjobstatus: any = false;
  @Output() loginOpenchanged = new EventEmitter<boolean>();
  @Output() removeemail = new EventEmitter<boolean>();

  openlogin() {
    this.sidebarService.sendData(true);
  }

  openpostjob() {
    this.sidebarService.email$.subscribe((data) => {
      if (data != undefined) {
        this.postjobstatus = true;
        this.router.navigate(['/postjob']);
      } else {
        this.sidebarService.sendData(true);
      }
    });
  }

  removeemailfun() {
    this.sidebarService.sendemail(undefined);
    this.email = undefined;

    setTimeout(() => {
      this.sidebarService.email$.subscribe((data) => {
        console.log(data);
      });
    }, 4000);
  }

  @Input() userdata: any;

  ngOnChanges() {
    this.islogged = true;
  }
}
