import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  authMode = signal<'register' | 'login'>('register');
  userRole = signal<'buyer' | 'beatmaker'>('buyer');
  
  fullName = signal('');
  email = signal('');
  password = signal('');
  
  loading = signal(false);
  errorMessage = signal('');

  constructor() {
    this.userRole.set(this.route.snapshot.params['role'] || 'buyer');
  }

  toggleMode(mode: 'register' | 'login') {
    this.authMode.set(mode);
    this.errorMessage.set('');
  }

  submitForm() {
    this.loading.set(true);
    this.errorMessage.set('');

    const credentials = { 
      email: this.email(), 
      password: this.password() 
    };

    if (this.authMode() === 'register') {
      const registerData = { 
        ...credentials,
        fullName: this.fullName(),
        role: this.userRole()
      };
      this.authService.register(registerData)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: () => this.toggleMode('login'),
          error: (err) => this.errorMessage.set(err.error.message || 'Registration failed')
        });
    } else {
      this.authService.login(credentials)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          error: (err) => this.errorMessage.set(err.error.message || 'Login failed')
        });
    }
  }
}