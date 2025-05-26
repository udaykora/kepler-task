import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginsignComponent } from '../loginsign/loginsign.component';

@Component({
  selector: 'app-postajob',
  imports: [SidebarComponent,CommonModule,LoginsignComponent],
  templateUrl: './postajob.component.html',
  styleUrl: './postajob.component.css'
})
export class PostajobComponent {
  visible :any = false

}
