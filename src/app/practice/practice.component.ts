import { Component, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Practice1Component } from '../practice1/practice1.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule, Practice1Component, FormsModule],
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'],
})
export class PracticeComponent implements DoCheck {
  keySkills = [1, 2, 3];
  Find: any = false;
  staticvalueks = ['EX:JavaScript'];

  selectedNumbers: any[] = [];

  ngDoCheck() {
    // this.selectedNumbers = Array(this.keyskills.length).fill(0);
    console.log(this.selectedNumbers[0]);
  }

  selectNumber(rowIndex: number, num: number, keyskill: any) {
    if (!this.selectedNumbers[rowIndex]) this.selectedNumbers[rowIndex] = [];
    this.selectedNumbers[rowIndex][0] = num;
    this.selectedNumbers[rowIndex][1] = keyskill;
    console.log(this.selectedNumbers);
    this.Find = true;
    for (let i = 0; i < this.selectedNumbers.length; i++) {
      if (this.selectedNumbers[i] == undefined) {
        this.Find = false;
      }
    }
    if (this.selectedNumbers.length >= this.keySkills.length && this.Find)
      this.keySkills.push(this.keySkills.length + 1);
  }
}
