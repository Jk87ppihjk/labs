
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
    accountSettings = [
        { name: 'Notificações', icon: 'notifications' },
        { name: 'Privacidade', icon: 'shield' },
    ];
    generalSettings = [
        { name: 'Idioma', icon: 'language', value: 'Português' },
    ];
    legalSettings = [
        { name: 'Termos de Serviço', icon: 'gavel' },
        { name: 'Política de Privacidade', icon: 'description' },
    ];
}
