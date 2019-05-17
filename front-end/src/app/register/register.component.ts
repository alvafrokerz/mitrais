import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RegisterService } from '../services/register.service';
import {Router} from "@angular/router"
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('popover', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, public regService: RegisterService,private router: Router) { }
  registerForm: FormGroup;
  submitted = false;
  showLogin = false;
  isIndo = false;
  public modelPhone = '';
  public isSuccess = false;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: this.formBuilder.group({
        month: [''],
        date: [''],
        year: ['']
      }),
      gender: [],
      email: ['', [Validators.required, Validators.email]]
      
    });
  }

  get f() { return this.registerForm.controls; }
  counter(i: number) {
    return new Array(i);
}
  onSubmit() {
    // this.registerForm.value.phoneNumber = inputPhone;
    this.submitted = true;
    var regExp = /^(^\+62\s?|^08)(\d{3,4}-?){2}\d{3,4}$/g;
    var phone = this.registerForm.value.phoneNumber.match(regExp);
    if (phone) {
      this.isIndo = true;
    } else {
      this.isIndo = false;
    }
    if (this.registerForm.invalid==true) {
      return;
    }
    console.log(this.registerForm.invalid);
    let phoneNumber = this.registerForm.value.phoneNumber;
    let firstName = this.registerForm.value.firstName;
    let lastName = this.registerForm.value.lastName;

    let month = this.registerForm.value.dob.month;
    let date = this.registerForm.value.dob.date;
    let year = this.registerForm.value.dob.year;
    let dob = year+"-"+month+"-"+date;
    let gender = this.registerForm.value.gender;
    let email = this.registerForm.value.email;
    var self = this;
    let response=this.regService.register(phoneNumber, firstName, lastName, dob, gender, email).subscribe(
      (res:any) => {
        console.log("==============");
        console.log(res);
      console.log(res.Status.code);
      console.log("==============");
      if(res.Status.code==200){
      var Personal = self.registerForm .get('phoneNumber') ;
      Personal.disable();
       Personal = self.registerForm .get('firstName') ;
       Personal.disable();
       Personal = self.registerForm .get('lastName') ;
       Personal.disable();
       Personal = self.registerForm .get('gender') ;
       Personal.disable();
       Personal = self.registerForm .get('email') ;
       Personal.disable();
       Personal = self.registerForm .get('dob') ;
       Personal.disable();
       self.showLogin = true;
      }else{
        alert(res.Status.code+" "+res.Status.Message)
      }
    }, error => {

    });
    
  }
  
  ValidatePhoneNumber(){
  }
  goToLogin(){
    console.log("navigate");
    this.router.navigate(['/login'])
  }
}
