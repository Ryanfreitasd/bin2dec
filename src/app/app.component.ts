import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'bin2dec';
  decimalValue = signal(0);

  binaryValue = new FormControl('', [
    Validators.maxLength(8),
    this.customBinaryValidator,
  ]);

  convert() {
    if (this.binaryValue.value !== null && this.binaryValue.value !== '') {
      this.decimalValue.set(parseInt(this.binaryValue.value, 2));
    }
  }

  customBinaryValidator(control: AbstractControl) {
    const binaryValue = control.value;
    const regex = /^[01]+$/;

    if (!regex.test(binaryValue) && control.dirty) {
      return { binaryError: true };
    }

    return null;
  }
}
