import { Component, DoCheck, ViewChild, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginsignComponent } from '../loginsign/loginsign.component';
import { FormsModule } from '@angular/forms';
import { SidebarService } from '../loginservice/loginservice';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TextFieldModule } from '@angular/cdk/text-field';
import { getAuth, verifyPasswordResetCode } from '@firebase/auth';

import isEqual from 'lodash.isequal';
import { isEmpty } from 'rxjs';
import {
  ElementRef,
  AfterViewInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-resume',
  imports: [
    SidebarComponent,
    LoginsignComponent,
    CommonModule,
    FormsModule,
    RouterLink,
    RouterOutlet,
    TextFieldModule,
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent implements AfterViewInit, DoCheck {
  resumeData1: any = {};
  issame: any = true;
  saveload: any = false;
  tick: any = false;
  link: any = '';
  showlinks: any = false;
  clickingfornewlink: any = true;
  buttons: any = true;
  loginstatus: any = true;
  id: any = undefined;
  rightbuttons: any = true;
  previewopen: any = true;
  useremail: any = '';
  count = 0;
  fullname: any = '';
  email: any = '';
  presentloc: any = '';
  mobileno: any = '';
  aboutyourself: any = '';
  interestshobbies: any = '';
  logincomp: any = false;
  work: string = 'grey';
  achievements1: string = 'grey';
  keyskills: string = 'grey';
  links1: string = 'grey';
  eac: string = 'grey';
  achievements: string = 'grey';
  links: string = 'grey';
  education: string = 'grey';
  previewdata: any = [];
  mail: any = '';
  oobcode: any = undefined;

  ks: string = 'grey';
  lf: any = 'grey';
  ih: any = 'grey';
  li = [1, 2, 3, 4];
  ec = [1, 2];
  lfa = [1, 2];
  find = true;
  keySkills = [1, 2, 3];
  Find: any = false;
  staticvalueks = ['EX:JavaScript'];
  achievementsfield: any = '';
  emailsignin: string | null = null;
  apiKeysignin: string | null = null;
  modesignin: string | null = null;
  selectedNumbers: any[] = [
    {
      range: 0,
      skillname: '',
    },
    {
      range: 0,
      skillname: '',
    },
    {
      range: 0,
      skillname: '',
    },
  ];

  static: any = [
    ['Ex:Github', 'Ex: https://github.com/octocat'],
    ['Ex:Stackoverflow', 'Ex: https://stackoverflow.com/users/4/joel-spolsky'],
    ['Ex:Linked in', 'Ex: https://www.linkedin.com/in/reidhoffman'],
  ];

  staticlanguage: any = ['EX:English', 'EX:Hindi'];

  linksarray: any = [undefined];

  wxarray: any = [0, 1];

  dataArray: any[] = [
    {
      from: '',
      to: '',
      company: '',
      location: '',
      designation: '',
      something: '',
    },
    {
      from: '',
      to: '',
      company: '',
      location: '',
      designation: '',
      something: '',
    },
  ];

  lfarray: any[] = [
    { linkname: '', link: '' },
    { linkname: '', link: '' },
    { linkname: '', link: '' },
    { linkname: '', link: '' },
  ];

  eacarray: any[] = [
    { graduationyear: '', school: '', Degree: '', Grade: '' },
    { graduationyear: '', school: '', Degree: '', Grade: '' },
  ];

  languagefluencyarr: any[] = [
    {
      language: '',
      speak: '',
      read: '',
      write: '',
    },
    {
      language: '',
      speak: '',
      read: '',
      write: '',
    },
  ];

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    window.onload = () => {
      this.hello();
    };
  }

  ngDoCheck(): void {
    const senddata = {
      aboutyourself: this.aboutyourself,
      achievements: this.achievementsfield,
      education: this.eacarray,
      email: this.email,
      fullname: this.fullname,
      interests: this.interestshobbies,
      languageFluency: this.languagefluencyarr,
      mobileno: this.mobileno,
      presentloc: this.presentloc,
      selectedNumbers: this.selectedNumbers,
      skills: this.dataArray,
      workExperience: this.lfarray,
    };

    if (Object.entries(this.resumeData1).length !== 0) {
      this.issame = isEqual(senddata, this.resumeData1);
    }
  }

  ngAfterViewInit(): void {
    this.buttons = false;
    this.id = this.route.snapshot.paramMap.get('id');

    this.route.queryParamMap.subscribe((params) => {
      this.emailsignin = params.get('email');
      this.apiKeysignin = params.get('apiKey');
      this.modesignin = params.get('mode');

      console.log('Email:', this.emailsignin);
      console.log('API Key:', this.apiKeysignin);
      console.log('Mode:', this.modesignin);
    });

    if (
      this.id &&
      !this.emailsignin &&
      !this.apiKeysignin &&
      !this.modesignin
    ) {
      this.sidebarService.email$.subscribe((data) => {
        if (data == null) this.buttons = false;
        else {
          this.rightbuttons = true;
          this.loginstatus = true;
        }
      });
    }
    this.sidebarService.resumedata$.subscribe((data) => {
      if (data && data.resumedetails) {
        this.previewopen = true;
        this.setResumeData(data.resumedetails);
      }
    });

    this.sidebarService.email$.subscribe((data) => {
      this.mail = data;
      if (data == null) {
        this.loginstatus = false;
      }
    });
  }

  hello() {
    if (
      this.buttons == false &&
      this.id &&
      !this.emailsignin &&
      !this.apiKeysignin &&
      !this.modesignin
    ) {
      this.sidebarService.getdatabyid(this.id).then(() => {
        this.previewdatasend();
        this.rightbuttons = false;
        this.previewopen = false;
        return;
      });
    }

    if (this.modesignin == 'signIn') {
      this.rightbuttons = true;
      this.previewopen = true;
      console.log(this.previewopen);
      // Step 1: Get the outer URLSearchParams
      const outerParams = new URLSearchParams(window.location.search);

      // Step 2: Get and decode the `continueUrl`
      const continueUrl = outerParams.get('continueUrl');
      const decodedContinueUrl = decodeURIComponent(continueUrl || '');

      // Step 3: Get the inner email parameter
      const innerParams = new URLSearchParams(decodedContinueUrl.split('?')[1]);
      const email = innerParams.get('email');

      console.log('Extracted email:', email);
      this.emailsignin = email;

      if (this.emailsignin) {
        this.sidebarService.signinproc(this.emailsignin);
      }

      //
    }

    if (this.modesignin == 'resetPassword') {
      this.rightbuttons = true;
      this.previewopen = true;
      this.oobcode = this.route.snapshot.queryParamMap.get('oobCode');
      console.log('Reset code:', this.oobcode);

      const auth = getAuth();
      if (this.oobcode) {
        verifyPasswordResetCode(auth, this.oobcode)
          .then((email) => {
            if (email) {
              this.sidebarService.resetpassword(email);
            }
          })
          .catch((error) => {
            console.error('Invalid or expired oobCode:', error.message);
          });
      }
    }
  }

  setResumeData(data: any) {
    const objlength = Object.keys(data).length;
    this.previewopen = true;
    if (objlength <= 0) {
      console.log(objlength);
      console.log(data.resumedetails);
      this.resumeData1.aboutyourself = this.aboutyourself;
      this.resumeData1.achievements = this.achievementsfield;
      this.resumeData1.education = JSON.parse(JSON.stringify(this.eacarray));
      this.resumeData1.email = this.email;
      this.resumeData1.fullname = this.fullname;
      this.resumeData1.interests = this.interestshobbies;
      this.resumeData1.languageFluency = JSON.parse(
        JSON.stringify(this.languagefluencyarr)
      );
      this.resumeData1.mobileno = this.mobileno;
      this.resumeData1.presentloc = this.presentloc;
      this.resumeData1.selectedNumbers = JSON.parse(
        JSON.stringify(this.selectedNumbers)
      );
      this.resumeData1.skills = JSON.parse(JSON.stringify(this.dataArray));
      this.resumeData1.workExperience = JSON.parse(
        JSON.stringify(this.lfarray)
      );

      return;
    }

    this.resumeData1 = JSON.parse(JSON.stringify(data));

    if (this.resumeData1) {
      this.fullname = this.resumeData1.fullname;
      this.selectedNumbers = JSON.parse(
        JSON.stringify(this.resumeData1.selectedNumbers)
      );

      this.dataArray = JSON.parse(JSON.stringify(this.resumeData1.skills));
      this.email = this.resumeData1.email;
      this.mobileno = this.resumeData1.mobileno;
      this.presentloc = this.resumeData1.presentloc;
      this.aboutyourself = this.resumeData1.aboutyourself;
      this.achievementsfield = this.resumeData1.achievements;
      this.eacarray = JSON.parse(JSON.stringify(this.resumeData1.education));
      this.lfarray = JSON.parse(
        JSON.stringify(this.resumeData1.workExperience)
      );
      this.languagefluencyarr = JSON.parse(
        JSON.stringify(this.resumeData1.languageFluency)
      );
      this.interestshobbies = this.resumeData1.interests;
    }
  }

  changelink() {
    console.log('hoooo');
    this.sidebarService.resumedata$.subscribe((data) => {
      this.sidebarService.deleteresume();

      this.sidebarService.addResume(data).then((docRef) => {
        console.log(docRef.id);
        this.router.navigate(['/mycv', docRef.id]).then(() => {
          this.link = window.location.href;
          this.clickingfornewlink = true;
          this.showlinks = false;
          this.sidebarService.changeuserid(this.mail, docRef.id);
        });
      });
    });
  }

  copylink() {
    this.link = window.location.href;
    navigator.clipboard.writeText(this.link);
    this.showlinks = false;
  }

  maybe(): void {
    console.log(this.loginstatus);

    if (!this.loginstatus) {
      this.sidebarService.sendData(true);
      return;
    }

    const senddata = {
      fullname: this.fullname,
      email: this.email,
      mobileno: this.mobileno,
      presentloc: this.presentloc,
      aboutyourself: this.aboutyourself,
      skills: this.dataArray,
      selectedNumbers: this.selectedNumbers,
      achievements: this.achievementsfield,
      education: this.eacarray,
      workExperience: this.lfarray,
      languageFluency: this.languagefluencyarr,
      interests: this.interestshobbies,
    };

    this.resumeData1 = JSON.parse(JSON.stringify(senddata));
    if (!this.issame) {
      this.saveload = true;
      this.sidebarService
        .updateResumeDetailsById(senddata)
        .then(() => {
          this.saveload = false;
        })
        .then(() => {
          this.tick = true;
          setTimeout(() => {
            this.tick = false;
          }, 2000);
        });
    }
  }

  sharelink() {
    if (!this.loginstatus) {
      this.sidebarService.sendData(true);
      return;
    }

    const id: any = this.route.snapshot.paramMap.get('id');
    this.showlinks = true;
    this.link = window.location.href;
  }

  linksfun() {
    let check = this.lfarray.every(
      (item) => item.linkname.trim() !== '' && item.link.trim() !== ''
    );

    if (check) {
      this.lfarray.push({ linkname: '', link: '' });
    }
  }

  updateit() {
    const check = Object.values(this.dataArray[0]).some((value) =>
      Boolean(value)
    );
    const check1 = Object.values(
      this.dataArray[this.dataArray.length - 1]
    ).some((value) => Boolean(value));

    if (check && check1) {
      this.dataArray.push({
        from: '',
        to: '',
        company: '',
        location: '',
        designation: '',
        something: '',
      });
    }
  }

  eacf() {
    let check = this.eacarray.every(
      (item) =>
        (item.graduationyear || '').trim() !== '' &&
        (item.school || '').trim() !== '' &&
        (item.Degree || '').trim() !== '' &&
        (item.Grade || '').trim() !== ''
    );

    console.log(check);
    console.log(this.eacarray);

    if (check)
      this.eacarray.push({
        graduationyear: '',
        school: '',
        Degree: '',
        Grade: '',
      });
    console.log('works');
  }

  lffun() {
    let check = this.languagefluencyarr.every(
      (item) => (item.language || '').trim() !== ''
    );
    this.languagefluencyarr.forEach((item) => {
      item.selected = !!(item.speak || item.read || item.write);
    });

    let check2 = this.languagefluencyarr.every((item) => item.selected == true);

    if (check && check2) {
      this.languagefluencyarr.push({
        language: '',
        speak: '',
        read: '',
        write: '',
      });
    }
  }

  selectNumber(rowIndex: any = -1, no: any = -1) {
    if (
      this.selectedNumbers[rowIndex] &&
      this.selectedNumbers[rowIndex]['range'] == 1 &&
      no == 1
    ) {
      this.selectedNumbers[rowIndex]['range'] = 0;
    } else if (this.selectedNumbers[rowIndex]) {
      this.selectedNumbers[rowIndex]['range'] = no;
    }

    const check = this.selectedNumbers.every((obj) =>
      Object.values(obj).every(
        (value) => value !== null && value !== undefined && value !== ''
      )
    );

    if (check) this.selectedNumbers.push({ range: 0, skillname: '' });
  }

  workexp(args: any) {
    console.log(args);
    switch (args) {
      case 1:
        this.work = 'black';
        break;
      case 2:
        this.achievements1 = 'black';
        break;
      case 3:
        console.log('workd');
        this.links1 = 'black';
        break;
      case 4:
        console.log('eferg');
        this.eac = 'black';
        break;
      case 5:
        this.lf = 'black';
        break;
      case 6:
        this.ih = 'black';
        break;
      case 7:
        this.ks = 'black';
    }
  }

  previewdatasend() {
    this.previewopen = this.previewopen == false ? true : false;

    const filteredArray = this.dataArray.filter((obj) =>
      Object.values(obj).some(
        (value) => value !== null && value !== undefined && value !== ''
      )
    );

    const filteredArrayks = this.selectedNumbers.filter((obj) =>
      Object.values(obj).every(
        (value) =>
          value !== null && value !== undefined && value !== '' && value !== 0
      )
    );

    const filteredArraylinks = this.lfarray.filter((obj) =>
      Object.values(obj).every(
        (value) =>
          value !== null && value !== undefined && value !== '' && value !== 0
      )
    );

    const filteredArrayeac = this.eacarray.filter((obj) =>
      Object.values(obj).every(
        (value) =>
          value !== null && value !== undefined && value !== '' && value !== 0
      )
    );

    const filteredarraylanguage = this.languagefluencyarr.filter(
      (item) => item.language.trim() !== '' && item.selected === true
    );

    this.previewdata = [
      this.fullname,
      this.email,
      this.mobileno,
      this.presentloc,
      this.aboutyourself,
      filteredArray,
      filteredArrayks,
      this.achievementsfield,
      filteredArraylinks,
      filteredArrayeac,
      filteredarraylanguage,

      this.interestshobbies,
    ];
  }
}
