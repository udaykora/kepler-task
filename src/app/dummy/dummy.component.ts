import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Directive, HostListener, Input } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Route, Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { SidebarService } from '../loginservice/loginservice';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [FormsModule, CommonModule, TextFieldModule,RouterOutlet],
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css'],
})
export class DummyComponent implements OnInit {
  id: any = undefined;

  constructor(
    private sidebarservice: SidebarService,
    private route: ActivatedRoute
  ) {}
  longText = `This is a very long piece of text to demonstrate the automatic
height adjustment of the textarea element using Angular CDK's cdkTextareaAutosize
directive. As the text grows and wraps inside the textarea, you will see
.`;
  ngOnInit(): void {
    this.id = 'kO1FgzJ982QwcY81etQ9';

    console.log(this.id);
    this.sidebarservice.getdatabyid(this.id).then(() => {});
  }
}
