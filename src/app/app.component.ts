import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsers = ['Edd', 'Edd1'];

  constructor( private formBuilder: FormBuilder){}

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNamesCheck.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
    
    this.signupForm.valueChanges.subscribe(
      (value) => console.log(value)
    );

    // Overwrite the default values with the exact entire object
    // this.signupForm.setValue({
    // });

    // Overwrite the default values with the partial parts of the object
    // this.signupForm.patchValues({
      
    // });
  }
  
  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset({
      'gender':'male'
    });
  }

  onAddHobbies(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // custom validation requires to be applied on a FormControl and should return an object 
  // with a key (can be a string) and a boolean value of the validation
  // if the  control.value is part of the array and return -1 if it is not part (which in js is true). 
  // Otherwise, we return a null object which means that the control validates the form element
  forbiddenNamesCheck(control: FormControl): {[s: string]: boolean}{
    if(this.forbiddenUsers.indexOf(control.value) !== -1){
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(()=>{
        if(control.value === 'test@test.com'){
          resolve({'emailForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
