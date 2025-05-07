import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { VehicleService } from '../../Services/vehicle.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-vehicle-delete',
  standalone: true,
  imports: [MatIconModule, MatButtonModule,CommonModule],
  templateUrl: './vehicle-delete.component.html',
  styleUrl: './vehicle-delete.component.css'
})
export class VehicleDeleteComponent {
  item:any;
  constructor(public dialogRef: MatDialogRef<VehicleDeleteComponent>,
     @Inject(MAT_DIALOG_DATA) public incomingData: any,
    private vehicleservice:VehicleService,
    private router:Router,
    private toastr: ToastrService,){}

  closeDialog(){
      this.dialogRef.close();
    }
  

   // Delete a vehicle
   deleteVehicle(): void {
    if (!this.incomingData || !this.incomingData.id) {
      console.error('incomingData is missing or malformed:', this.incomingData);
      return;
    }
  
    this.vehicleservice.deleteVehicle(this.incomingData.id).subscribe({
      next: () => {
        this.toastr.success('Vehicle deleted successfully!');
        this.dialogRef.close(true); 
        this.router.navigate(['vehicle-list']);
      },
      error: (err) => {
        console.error('Error deleting vehicle:', err);
        this.toastr.error('Failed to delete vehicle. Please try again later.');
      }
    });
  }
  
}
