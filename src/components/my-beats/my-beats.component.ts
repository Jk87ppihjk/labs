
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-my-beats',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-beats.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBeatsComponent {
    private apiService = inject(ApiService);
    beats = signal<any[]>([]);
    activeFilter = signal('Todos');
    filters = ['Todos', 'Mais vendidos', 'Ativos', 'Inativos'];

    constructor() {
        this.apiService.getMyBeats().subscribe(data => {
            this.beats.set(data);
        });
    }

    setFilter(filter: string) {
        this.activeFilter.set(filter);
    }
}
