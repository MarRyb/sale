import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-email-verify',
  templateUrl: './forgot-email-verify.component.html',
  styleUrls: ['./forgot-email-verify.component.sass']
})
export class ForgotEmailVerifyComponent implements OnInit {

  public phoneForm: FormGroup;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.phoneForm = this.fb.group({
      countryCode: ['38'],
      phoneNumber: ['', Validators.required],
    });
  }

  onSubmit() {
    const phoneNumber = this.phoneForm.get('countryCode').value + this.phoneForm.get('phoneNumber').value;
    const token = this.route.snapshot.queryParamMap.get('token');
    this.authService.sendPasswordAfterEmailVerify(token, phoneNumber).subscribe(() => {
      this.router.navigate(['/', 'forgot-email', 'code'], {
        queryParams: {
          phone: phoneNumber
        }
      });
    });
  }

}
