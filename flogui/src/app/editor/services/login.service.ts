import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private fb: FormBuilder) { }

  buildForm(): FormGroup {
    return this.fb.group({
      name:new FormControl(
        {
          value: '',
          disable: false
        },
        {
          validators: [

          ],
          updateOn: 'change'
        }
      ),
      password:new FormControl(
        {
          value: '',
          disable: false
        },
        {
          validators: [

          ],
          updateOn: 'change'
        }
      )
    })

  }
}
