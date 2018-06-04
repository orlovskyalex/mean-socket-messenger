import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
})
export class ChatFormComponent implements OnInit {

  @Output() formSubmit = new EventEmitter();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.buildForm();
  }

  submit() {
    this.formSubmit.emit(this.form);
  }

  private buildForm() {
    this.form = this.fb.group({
      message: [null, Validators.required],
    });
  }

}
