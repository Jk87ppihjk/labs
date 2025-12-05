import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-beatmaker-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './beatmaker-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeatmakerDashboardComponent {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  activePeriod = signal('30 dias');
  profile = signal<any>(null);
  topBeats = signal<any[]>([]);

  navItems = signal([
    { icon: 'dashboard', label: 'Dashboard', path: '/beatmaker/dashboard', active: true },
    { icon: 'music_note', label: 'Beats', path: '/beatmaker/beats', active: false },
    { icon: 'wallet', label: 'Wallet', path: '#', active: false },
    { icon: 'person', label: 'Profile', path: '/profile', active: false }
  ]);
  
  constructor() {
    this.apiService.getProfile().subscribe(data => this.profile.set(data));
    this.apiService.getMyBeats().subscribe(data => this.topBeats.set(data.slice(0, 3))); // Show top 3 for now
  }

  setPeriod(period: string) {
    this.activePeriod.set(period);
  }

  setActiveNav(label: string) {
    this.navItems.update(items => items.map(item => ({...item, active: item.label === label})));
  }
}