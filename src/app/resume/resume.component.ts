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
export class ResumeComponent implements OnInit, DoCheck {
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

  async ngOnInit() {
    // this.buttons = false;
    // this.id = this.route.snapshot.paramMap.get('id');
    // if (this.id) {
    //   console.log(this.buttons);
    //   this.sidebarService.email$.subscribe((data) => {
    //     if (data == null) this.buttons = false;
    //   });
    //   if (this.buttons == false) {
    //     await this.sidebarService.getdatabyid(this.id).then(() => {
    //       this.previewdatasend();
    //     });
    //   }
    // }
    // this.sidebarService.resumedata$.subscribe((data) => {
    //   if (data && data.resumedetails) {
    //     this.setResumeData(data.resumedetails);
    //     console.log(data.resumedetails);
    //   }
    // });
    // this.sidebarService.email$.subscribe((data) => {
    //   if (data == null) this.loginstatus = false;
    // });
  }

  ngAfterViewInit(): void {
    this.buttons = false;
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      console.log(this.buttons);
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
        console.log(data.resumedetails);
      }
    });

    this.sidebarService.email$.subscribe((data) => {
      if (data == null) this.loginstatus = false;
    });
  }

  hello() {
    if (this.buttons == false && this.id) {
      this.sidebarService.getdatabyid(this.id).then(() => {
        this.previewdatasend();
        this.rightbuttons = false;
        this.previewopen = false;
      });
    } else {
      console.log('might be');
      this.rightbuttons = true;
      this.previewopen = true;
    }
  }

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    window.onload = () => {
      this.hello();
    };
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
    console.log(data);
    console.log('dont know yaaaaaar');
    console.log(this.resumeData1);
    if (this.resumeData1) {
      console.log(data);

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
      skills: this.dataArray, // array
      selectedNumbers: this.selectedNumbers, // array
      achievements: this.achievementsfield, // array or string[]
      education: this.eacarray, // array of objects
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
    console.log(this.loginstatus);

    if (!this.loginstatus) {
      this.sidebarService.sendData(true);
      return;
    }

    const id: any = this.route.snapshot.paramMap.get('id');
    this.showlinks = true;
    this.link = window.location.href;
    console.log(this.link);
  }

  previewopen: any = null;
  useremail: any = '';
  count = 0;
  fullname: any = '';
  email: any = '';
  presentloc: any = '';
  mobileno: any = '';
  aboutyourself: any = '';
  interestshobbies: any = '';

  onLoginOpenChanged(newValue: boolean) {
    console.log('Login status updated from child:', newValue);
    this.logincomp = newValue;
  }

  onLogincloseChanged(newValue: boolean) {
    console.log('Login status updated from child:', newValue);
    this.logincomp = newValue;
  }

  removeemailfun(arg: any) {
    console.log('log wol');
    this.useremail = '';
  }

  sendemail(newValue: any) {
    console.log(newValue.entermail);
    this.useremail = String(newValue.entermail);
    this.logincomp = newValue.loginclose ? false : true;
  }

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

  linksfun() {
    let check = this.lfarray.every(
      (item) => item.linkname.trim() !== '' && item.link.trim() !== ''
    );

    if (check) {
      this.lfarray.push({ linkname: '', link: '' });
    }
  }

  wxarray: any = [0, 1];
  workexpheight: any = ['140px', '140px'];
  achievementsheight: any = '140px';
  hobbiesheight: any = '140px';
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
  textareaHeight: string = 'auto';

  adjustHeight(event: Event, i: any, status: any) {
    if (status == 'edit') {
      const element = event.target as HTMLElement;
      const newHeight = element.scrollHeight + 'px';
      element.style.height = newHeight;
      console.log(newHeight);
      this.workexpheight[i] = newHeight;
    } else {
      const element = event.target as HTMLElement;
      element.style.height = '140px';
      const newHeight = element.scrollHeight + 'px';
      element.style.height = newHeight;
      this.workexpheight[i] = newHeight;
    }
  }

  adjustHeightach(event: Event) {
    const element = event.target as HTMLElement;
    element.style.height = '140px';
    const newHeight = element.scrollHeight + 'px';
    element.style.height = newHeight;
    this.achievementsheight = newHeight;
    console.log(this.achievementsheight);
  }

  adjustHeighthobbies(event: Event) {
    const element = event.target as HTMLElement;
    element.style.height = '140px';
    const newHeight = element.scrollHeight + 'px';
    element.style.height = newHeight;
    this.hobbiesheight = newHeight;
    console.log(this.achievementsheight);
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
      this.workexpheight.push('140px');
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

    console.log(check2);
    console.log(this.languagefluencyarr);

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
    console.log('working');
    if (
      this.selectedNumbers[rowIndex] &&
      this.selectedNumbers[rowIndex]['range'] == 1 &&
      no == 1
    ) {
      this.selectedNumbers[rowIndex]['range'] = 0;
    } else if (this.selectedNumbers[rowIndex]) {
      this.selectedNumbers[rowIndex]['range'] = no;
    }

    console.log(this.selectedNumbers);
    const check = this.selectedNumbers.every((obj) =>
      Object.values(obj).every(
        (value) => value !== null && value !== undefined && value !== ''
      )
    );
    console.log(check);
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

  dynamicHeight: any = null;

  previewdatasend() {
    this.previewopen = this.previewopen == false ? true : false;

    const filteredArray = this.dataArray.filter((obj) =>
      Object.values(obj).some(
        (value) => value !== null && value !== undefined && value !== ''
      )
    );
    console.log(this.selectedNumbers);
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

    console.log(this.languagefluencyarr);

    console.log(filteredArrayks);

    console.log(filteredArray);

    console.log(this.previewopen);
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

      // this.sidebarService.sendpreviewdata(this.previewarray);
    ]; // this.router.navigate(['/preview']);
  }
}
