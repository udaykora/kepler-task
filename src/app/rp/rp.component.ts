import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, confirmPasswordReset } from 'firebase/auth';
import { FormControlState, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { verifyPasswordResetCode } from 'firebase/auth';

@Component({
  selector: 'app-rp',
  imports: [FormsModule, CommonModule],
  templateUrl: './rp.component.html',
  styleUrl: './rp.component.css',
})
export class RpComponent {
  oobCode: string | null = null;
  newPassword = '';
  email: any = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.oobCode = this.route.snapshot.queryParamMap.get('oobCode');
    console.log('Reset code:', this.oobCode);

    const auth = getAuth();
    if (this.oobCode) {
      verifyPasswordResetCode(auth, this.oobCode)
        .then((email) => {
          console.log('Email linked to oobCode:', email);
          this.email = email;
        })
        .catch((error) => {
          console.error('Invalid or expired oobCode:', error.message);
        });
    }
  }

  resetPassword(){
    
  }
}
