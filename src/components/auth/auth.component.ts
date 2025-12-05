
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  authMode = signal<'register' | 'login'>('register');
  userRole = signal<'buyer' | 'beatmaker'>('buyer');
  
  fullName = signal('');
  email = signal('');
  password = signal('');

  constructor(private route: ActivatedRoute, private router: Router) {
    this.userRole.set(this.route.snapshot.params['role'] || 'buyer');
  }

  toggleMode(mode: 'register' | 'login') {
    this.authMode.set(mode);
  }

  submitForm() {
    console.log('Submitting form', {
        role: this.userRole(),
        mode: this.authMode(),
        fullName: this.fullName(),
        email: this.email(),
        password: this.password()
    });
    // Navigate to the correct dashboard after login/register
    if (this.userRole() === 'beatmaker') {
        this.router.navigate(['/beatmaker/dashboard']);
    } else {
        this.router.navigate(['/explore']);
    }
  }
}
