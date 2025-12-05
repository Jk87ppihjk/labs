
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-edit-beat',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './edit-beat.component.html',
  styleUrls: ['./edit-beat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBeatComponent {
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  
  beatId = signal<number | null>(null);
  beatForm: FormGroup;
  artworkUrl = signal<string>('');
  
  constructor() {
    this.beatForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      newTag: [''],
      tags: this.fb.array([]),
      description: [''],
      licenses: this.fb.array([])
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.beatId.set(+id);
      this.loadBeatData(+id);
    } else {
      this.initializeEmptyForm();
    }
  }

  get tags(): FormArray {
    return this.beatForm.get('tags') as FormArray;
  }

  get licenses(): FormArray {
    return this.beatForm.get('licenses') as FormArray;
  }

  licenseControls(index: number) {
    return (this.licenses.at(index) as FormGroup).controls;
  }

  isLicenseFileIncluded(licenseIndex: number, fileName: string): boolean {
    const files = this.licenses.at(licenseIndex).get('files')?.value as string[];
    return files.includes(fileName);
  }

  loadBeatData(id: number) {
    this.apiService.getBeatForEdit(id).subscribe(data => {
      this.artworkUrl.set(data.artworkUrl);
      this.beatForm.patchValue({
        title: data.title,
        genre: data.genre,
        description: data.description,
      });

      data.tags.forEach(tag => this.tags.push(this.fb.control(tag)));
      
      this.licenses.clear();
      data.licenses.forEach(license => {
        this.licenses.push(this.fb.group({
          name: [license.name],
          active: [license.active],
          price: [license.price, Validators.required],
          files: this.fb.control(license.files)
        }));
      });
    });
  }

  initializeEmptyForm() {
    this.artworkUrl.set('https://picsum.photos/500/500'); // Placeholder for new beat
    const licenseData = [
      { name: 'Basic', active: true, price: 29.90, files: ['beat_final.mp3'] },
      { name: 'Premium', active: false, price: 79.90, files: ['beat_final.mp3', 'beat_final.wav'] },
      { name: 'Pro', active: false, price: 149.90, files: ['beat_final.mp3', 'beat_final.wav', 'stems.zip'] }
    ];
     licenseData.forEach(license => {
        this.licenses.push(this.fb.group({
          name: [license.name],
          active: [license.active],
          price: [license.price, Validators.required],
          files: this.fb.control(license.files)
        }));
      });
  }

  addTag(event: Event) {
    const input = event.target as HTMLInputElement;
    const tag = input.value.trim();
    if (tag) {
      this.tags.push(this.fb.control(tag));
      this.beatForm.get('newTag')?.setValue('');
    }
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  saveBeat() {
    console.log('Saving beat:', this.beatForm.value);
    this.router.navigate(['/beatmaker/beats']);
  }
  
  deleteBeat() {
    if (confirm('Are you sure you want to delete this beat?')) {
        console.log('Deleting beat:', this.beatId());
        this.router.navigate(['/beatmaker/beats']);
    }
  }
}
