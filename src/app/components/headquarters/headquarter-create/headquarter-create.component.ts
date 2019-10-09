import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-headquarter-create',
  templateUrl: './headquarter-create.component.html',
  styles: []
})
export class HeadquarterCreateComponent implements OnInit {
  public reactiveForm: FormGroup;
  public isLinear: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}



