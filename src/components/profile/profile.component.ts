
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private apiService = inject(ApiService);
  profile = signal<any>(null);

  constructor() {
    this.apiService.getProfile().subscribe(data => {
      this.profile.set(data);
    });
  }
}
