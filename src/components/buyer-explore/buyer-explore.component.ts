
import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-buyer-explore',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './buyer-explore.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyerExploreComponent {
  private apiService = inject(ApiService);
  beats = signal<any[]>([]);

  constructor() {
    this.apiService.getExploreBeats().subscribe(data => {
      this.beats.set(data);
    });
  }

  selectLicense(beat: any, licenseType: string) {
    const updatedBeats = this.beats().map(b => {
      if (b.id === beat.id) {
        const updatedLicenses = b.licenses.map((l:any) => ({ ...l, selected: l.type === licenseType }));
        return { ...b, licenses: updatedLicenses };
      }
      return b;
    });
    this.beats.set(updatedBeats);
  }
}
