import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessageService } from '../../../services/flash-message.service';

@Component({
  selector: 'app-forgot-email-verify',
  templateUrl: './forgot-email-verify.component.html',
  styleUrls: ['./forgot-email-verify.component.scss']
})
export class ForgotEmailVerifyComponent implements OnInit {

  public phoneForm: FormGroup;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private flashMessage: FlashMessageService,
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
      this.flashMessage.show('Ваш новый пароль успешно отправлен', 'success');
      this.router.navigate(['/', 'forgot-email', 'code'], {
        queryParams: {
          phone: phoneNumber
        }
      });
    });
  }

}
