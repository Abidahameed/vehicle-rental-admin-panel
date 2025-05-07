import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../Services/vehicle.service';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vehicle-add',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './vehicle-add.component.html',
  styleUrl: './vehicle-add.component.css',
})
export class VehicleAddComponent implements OnInit {
  addForm: FormGroup;
  selectedVehicleId: number | null = null;

  constructor(private fb: FormBuilder,
     private vehicleservice: VehicleService
     ,private toastr: ToastrService,
    private router:Router) {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      TopSpeed: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      RatePerHour: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      FuelType: ['', Validators.required],
      
      available: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const vehicle = history.state.item;
    if (vehicle) {
      this.editVehicle(vehicle);
    }
  }
  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  
  onSubmit(): void {
    if (this.addForm.valid) {
      if (this.selectedVehicleId === null) {
        // ADD
        this.vehicleservice.addVehicle(this.addForm.value).subscribe({
          next: () => {
            this.toastr.success('Vehicle added successfully!');
            this.router.navigate(['vehicle-list']); 
          },
          error: (error) => {
            console.error('Error saving vehicle:', error);
            this.toastr.error('Failed to add vehicle.');
          },
        });
      } else {
        // UPDATE
        this.vehicleservice
          .updateVehicle(this.selectedVehicleId, this.addForm.value)
          .subscribe({
            next: () => {
              this.toastr.success('Vehicle updated successfully!');
              this.router.navigate(['vehicle-list']); 
            },
            error: (error) => {
              console.error('Error updating vehicle:', error);
              this.toastr.error('Failed to update vehicle.');
            },
          });
      }
    }
  }
  

  editVehicle(vehicle: any): void {
    this.selectedVehicleId = vehicle.id;
    this.addForm.patchValue(vehicle);
  }

  resetForm(): void {
    this.addForm.reset();
    this.selectedVehicleId = null;
  }
  
}
