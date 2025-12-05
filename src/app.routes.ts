
import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthComponent } from './components/auth/auth.component';
import { BeatmakerDashboardComponent } from './components/beatmaker-dashboard/beatmaker-dashboard.component';
import { BuyerExploreComponent } from './components/buyer-explore/buyer-explore.component';
import { EditBeatComponent } from './components/edit-beat/edit-beat.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MyBeatsComponent } from './components/my-beats/my-beats.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'auth/:role', component: AuthComponent },
  { path: 'explore', component: BuyerExploreComponent },
  { path: 'beatmaker/dashboard', component: BeatmakerDashboardComponent },
  { path: 'beatmaker/beats', component: MyBeatsComponent },
  { path: 'beatmaker/beats/edit/:id', component: EditBeatComponent },
  { path: 'beatmaker/beats/new', component: EditBeatComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: 'welcome' } // Wildcard route
];
