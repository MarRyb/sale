import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-forgot-email-code',
  templateUrl: './forgot-email-code.component.html',
  styleUrls: ['./forgot-email-code.component.scss']
})
export class ForgotEmailCodeComponent implements OnInit {

  public codeForm: FormGroup;
  public phone;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private registerService: RegisterService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.codeForm = this.fb.group({
      code: ['', Validators.compose([Validators.minLength(4), Validators.required])],
    });
    this.activatedRoute.queryParams.subscribe(params => {
      return this.phone = params['phone'];
    });
  }

  onSubmit() {
    const code = this.codeForm.get('code').value;

    // this.authService.authUser({
    //   userName: this.phone,
    //   pass: code
    // }).subscribe(() => this.router.navigate(['editshape']));
  }

}
