import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { VehicleService } from '../../Services/vehicle.service';
import { Router } from '@angular/router';
import { VehicleDeleteComponent } from '../vehicle-delete/vehicle-delete.component';

import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css'
})

export class VehicleDetailsComponent {
  item: any;

  constructor(
    private vehicleservice: VehicleService,
    private router: Router,
    public dialog: MatDialog, public dialogRef: MatDialogRef<VehicleDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.item = history.state.item;
    console.log('Item:', this.item);
  }

}
