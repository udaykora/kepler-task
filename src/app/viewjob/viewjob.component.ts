import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchtipsComponent } from '../searchtips/searchtips.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SidebarService } from '../loginservice/loginservice';

@Component({
  selector: 'app-viewjob',
  standalone: true,
  imports: [CommonModule, SearchtipsComponent, FormsModule, SidebarComponent],
  templateUrl: './viewjob.component.html',
  styleUrls: ['./viewjob.component.css'],
})
export class ViewjobComponent implements OnInit {
  @ViewChild('location') containerRef!: ElementRef;
  @ViewChild('closeit') containerRefclose!: ElementRef;

  // @HostListener('document:click', ['$event'])
  // clickOutside(event: MouseEvent) {
  //   if (!this.containerRef.nativeElement.contains(event.target)) {
  //     this.showDropdown = false;
  //   }
  // }

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('hiiiiiiiiiiiii');
  }

  selectedCity: string = '';
  selectedjob: string = '';
  selectedcategory: string = '';

  allCities: string[] = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
  ];

  jobs: string[] = ['Fulltime', 'Parttime/Contract', 'Internship', 'Remote'];

  selectedwork: string[] = [];
  filjobcat: string[] = [];
  selectedjobcat: string[] = [];
  jobtype: string[] = [
    'Android',
    'Windows',
    'Macos',
    'Linux/Unix',
    'Frontend Engineeering',
    'Backend Engineering',
    'Co Founder',
    'Full Stack',
    'QA/Testing',
    'Devops',
    'Site Reliability',
    'software architect',
    'Embedded Engineering',
    'Hardware Engineeering',
    'Mechanical Engineering',
    'System Engineering',
    'Data Science',
    'Security',
    'Machine Learning',
    'Artificial Intelligence',
    'Graphics',
    'Game Development',
    'SQL',
    'NoSQL',
    'Customer Service',
    'Growth Hacking',
    'UI/UX',
    'Business Development',
    'Digital Marketing',
    'CopyWriter',
    'Sales',
    'CFO',
    'CEO',
    'CMO',
    'COO',
  ];

  filteredCities: string[] = [];
  filteredjobs: string[] = [];
  showDropdown: boolean = false;
  showdropdown1: boolean = false;
  showdropdown2: boolean = false;
  showTypeToSearch: boolean = false;
  searchtips: boolean = false;

  jobssearch() {
    this.showdropdown1 = true;
  }

  closetip(item: any) {
    if (item == false) this.searchtips = false;
  }

  inputchange1() {
    console.log(this.filteredjobs);
    if (this.selectedjob.length > 0) {
      this.showdropdown1 = false;
    } else {
      this.showdropdown1 = true;
    }

    if (this.selectedjob.trim() === '') {
      this.filteredjobs = [];
    } else {
      const search = this.selectedjob.toLowerCase();
      this.filteredjobs = this.jobs.filter((job) =>
        job.toLowerCase().includes(search)
      );
    }
  }

  inputchange2() {
    if (this.selectedcategory.trim() === '') {
      this.filjobcat = [];
      this.showdropdown2 = true;
    } else {
      const search = this.selectedcategory.toLowerCase();
      this.filjobcat = this.jobtype.filter((job) =>
        job.toLowerCase().includes(search)
      );
      this.showdropdown2 = false;
    }
  }

  onInputClick() {
    this.showDropdown = !this.showDropdown;
    this.showTypeToSearch = true;
    this.filteredCities = [];
    console.log(this.showDropdown);
  }

  onInputChange() {
    if (this.selectedCity.trim() === '') {
      this.showTypeToSearch = true;
      this.filteredCities = [];
    } else {
      this.showTypeToSearch = false;
      const search = this.selectedCity.toLowerCase();
      this.filteredCities = this.allCities.filter((city) =>
        city.toLowerCase().includes(search)
      );
    }
  }

  selectCity(city: string) {
    this.selectedCity = city;
    this.showDropdown = false;
  }

  selectjob(i: string) {
    console.log(i);
    this.selectedwork.push(i);
    this.jobs = this.jobs.filter((name) => name !== i);
    this.filteredjobs = this.filteredjobs.filter((name) => name !== i);
    this.selectedjob = '';
    this.showdropdown1 = true;
    this.filteredjobs = [];
    if (this.jobs.length <= 0) this.showdropdown1 = false;
  }

  selectcat(i: string) {
    if (this.selectedjobcat.length >= 4) return;

    this.selectedjobcat.push(i);
    this.jobtype = this.jobtype.filter((name) => name !== i);
    this.filjobcat = this.filjobcat.filter((name) => name !== i);
    this.selectedcategory = '';
    this.showdropdown2 = true;
    this.filjobcat = [];

    if (this.jobtype.length <= 0) {
      this.showdropdown2 = false;
    }
  }

  remove(item: string) {
    this.showdropdown1 = true;
    this.jobs.push(item);
    this.selectedwork = this.selectedwork.filter((name) => name !== item);
  }

  removecat(item: string) {
    if (!this.jobtype.includes(item)) {
      this.jobtype.push(item);
      this.jobtype.sort();
    }
    this.selectedjobcat = this.selectedjobcat.filter((name) => name !== item);
    this.showdropdown2 = true;
  }

  search() {
    this.showDropdown = true;
  }
}
