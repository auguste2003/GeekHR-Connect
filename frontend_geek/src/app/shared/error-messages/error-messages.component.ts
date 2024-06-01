import { Component, Input } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';

@Component({
  selector: '[geek-error-messages]',  // on doit appeller le selecor comme une directive  
  templateUrl: './error-messages.component.html',
  styleUrl: './error-messages.component.scss'
})
export class ErrorMessagesComponent {
  @Input({required: true}) // Valeur d'entrée du composant 
  public control!: string;

  constructor(
    private controlContainer: ControlContainer,
    public validatorService: ValidatorService,
  ) {}

  get form(): FormGroup{
    return this.controlContainer.control as FormGroup;
  }

  get formControl(): AbstractControl {
    return this.form.get(this.control) as AbstractControl;
  }

  get isNotValid(): boolean{ // Si on touche le formulaire ou que la valeur a changé 
    return this.formControl.invalid && (this.formControl.touched || this.formControl.dirty);
  }
}
