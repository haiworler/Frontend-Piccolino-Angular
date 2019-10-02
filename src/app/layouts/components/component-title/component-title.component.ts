import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-title',
  templateUrl: './component-title.component.html',
  styleUrls: ['./component-title.component.scss']
})
export class ComponentTitleComponent {

  @Input() title: string;
  @Input() description: string;
  @Input() icon: string;

}


