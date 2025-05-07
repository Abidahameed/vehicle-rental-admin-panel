import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = 'http://localhost:3000/vehicles'; 

  constructor(private http: HttpClient) { }

  getVehicles():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
  addVehicle(vehicleData: any): Observable<any> {
    return this.http.post(this.apiUrl, vehicleData);
  }
  updateVehicle(id: number, updatedVehicle: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedVehicle);
  }
  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
