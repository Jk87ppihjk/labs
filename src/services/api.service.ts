import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // FIX: Explicitly type http property to resolve type inference issue.
  private http: HttpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/profile`);
  }

  getExploreBeats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/beats/explore`);
  }
  
  getBeatForEdit(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/beats/${id}`);
  }

  getMyBeats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/beats/beatmaker/my-beats`);
  }

  saveBeat(beat: any): Observable<any> {
    if (beat.id) {
      return this.http.put(`${this.apiUrl}/beats/beatmaker/${beat.id}`, beat);
    } else {
      return this.http.post(`${this.apiUrl}/beats/beatmaker/upload`, beat);
    }
  }

  deleteBeat(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/beats/beatmaker/${id}`);
  }
}
