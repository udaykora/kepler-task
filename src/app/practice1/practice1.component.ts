import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-practice1',
  imports: [],
  templateUrl: './practice1.component.html',
  styleUrl: './practice1.component.css'
})
export class Practice1Component {
  @Output() close = new EventEmitter<void>();

  // Emits event to parent to close this component
  closeChild() {
    this.close.emit();
  }

}
