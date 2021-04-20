import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { MessageService } from '../message.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerForm: FormGroup;
  submited = false;
  profile: string;
  id = this.route.snapshot.paramMap.get('id');
  filedata: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private messageService: MessageService,
    private route :ActivatedRoute
  ) { }

  get f() { return this.customerForm.controls; }
  get o() { return this.f.options as FormArray; }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      designation: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      profile: new FormControl('', [Validators.required]),
    }, { validators: this.matchPassword });
  }

  matchPassword(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    if (password !== confirmPassword)
      group.get('confirmPassword').setErrors({ confirmedValidator: true });
  }

  readImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      this.filedata = event.target.files[0];
      reader.onload = (event) => {
        this.profile = event.target.result.toString();
      }
    }
  }

  addCustomer() {
    this.submited = true;
    if (this.customerForm.valid) {
      var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      myFormData.append('image', this.filedata);

      myFormData.append('name', this.customerForm.value.name);
      myFormData.append('designation', this.customerForm.value.designation);
      myFormData.append('address', this.customerForm.value.address);
      myFormData.append('phone', this.customerForm.value.phone);
      myFormData.append('email', this.customerForm.value.email);
      myFormData.append('password', this.customerForm.value.password);
      myFormData.append('confirmpassword', this.customerForm.value.confirmpassword);

      this.customerService.saveCustomer(myFormData, headers).subscribe(
        data => {
          this.messageService.add(`Successfully added customer.`);
          this.router.navigate(['/customers']);
        },
        err => {
        }
      );
    } else
      console.log(this.customerForm.value);
  }

}
