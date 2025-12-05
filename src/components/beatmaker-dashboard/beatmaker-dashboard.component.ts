
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-beatmaker-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './beatmaker-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeatmakerDashboardComponent {
  private apiService = inject(ApiService);
  dashboardData = signal<any>(null);
  activePeriod = signal('30 dias');

  navItems = signal([
    { icon: 'dashboard', label: 'Dashboard', path: '/beatmaker/dashboard', active: true },
    { icon: 'music_note', label: 'Beats', path: '/beatmaker/beats', active: false },
    { icon: 'wallet', label: 'Wallet', path: '#', active: false },
    { icon: 'person', label: 'Profile', path: '/profile', active: false }
  ]);
  
  constructor() {
    this.apiService.getBeatmakerDashboard().subscribe(data => {
      this.dashboardData.set(data);
    });
  }

  setPeriod(period: string) {
    this.activePeriod.set(period);
  }

  setActiveNav(label: string) {
    this.navItems.update(items => items.map(item => ({...item, active: item.label === label})));
  }
}
