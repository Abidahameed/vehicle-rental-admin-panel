import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { VehicleService } from '../../Services/vehicle.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { VehicleDeleteComponent } from '../vehicle-delete/vehicle-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { VehicleDetailsComponent } from '../vehicle-details/vehicle-details.component';
@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule,MatCardModule],
    
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent {
  constructor(private vehicleservice: VehicleService, private router:Router,public dialog: MatDialog){}
  vehicles: any[] = [];
  item: any;
  displayedColumns: string[] = ['image', 'name',  'available',  'actions'];
  ngOnInit(){
    this.vehicleservice.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data; // Assign the fetched data to the component variable
        console.log("Vehicles fetched:", this.vehicles); 
      },
      error: (err) => {
        console.error("Error fetching vehicles:", err);
      }
    });
  }
  viewVehicle(selectedItem: any): void {
    this.dialog.open(VehicleDetailsComponent, {
      width: '500px',
      data: selectedItem
    });
  }
  navigatetoAdd(){
    this.router.navigate(['/vehicle-add'])
  }
  editVehicle(vehicle: any) {
    if (!vehicle) {
      console.error('Vehicle is undefined, cannot edit');
      return;
    }
    this.router.navigate(['/vehicle-add'], { state: { item: vehicle } });
  }
  
  deletedialog(vehicle: any) {
    if (!vehicle) {
      console.error('Vehicle is undefined, cannot open delete dialog');
      return;
    }
  
    const dialogRef = this.dialog.open(VehicleDeleteComponent, {
      width: '30%',
      data: vehicle
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Remove the deleted vehicle from the list
        this.vehicles = this.vehicles.filter(v => v.id !== vehicle.id);
      }
    });
  }
  
}
