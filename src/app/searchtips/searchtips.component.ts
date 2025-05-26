import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchtips',
  imports: [FormsModule,CommonModule],
  templateUrl: './searchtips.component.html',
  styleUrl: './searchtips.component.css',
})
export class SearchtipsComponent {
  closet = false;
  animation: boolean = true;
  @Output() tipclosechanged = new EventEmitter<boolean>();

  closethetip() {
    this.animation = false;
    setTimeout(() => {
      this.tipclosechanged.emit(this.closet);
    },200);
  }
}
