import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicule } from '../model/vehicule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
    private apiUrl = 'http://localhost:3000/vehicules';


  constructor(private http: HttpClient) {}
  getvehicles(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.apiUrl);
  }

  addvehicule(vehicule:Vehicule ): Observable<Vehicule> {
    return this.http.post<Vehicule>(this.apiUrl, vehicule);
  }
}
