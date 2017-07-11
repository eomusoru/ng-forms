import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  statusValues = ['Stable', 'Critical', 'Finished'];
  result: {};
  formSubmited: boolean = false;
  statusForm: FormGroup;

  ngOnInit() {
    this.statusForm = new FormGroup({
      'name': new FormControl(null, Validators.required, this.validatorName.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable')
    });
  }
  
  submitForm(){
    this.formSubmited = true;
    this.result = this.statusForm.value;
  }

  validatorName(control:FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'Test'){
          resolve({
            'usernameIsForbidden': true
          })
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }
  
}
