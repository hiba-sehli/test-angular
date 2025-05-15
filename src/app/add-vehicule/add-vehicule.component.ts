import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../model/vehicule';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehiculeService } from '../services/vehicule.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-vehicule',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,HttpClientModule],
  templateUrl: './add-vehicule.component.html',
  styleUrl: './add-vehicule.component.scss'
})

export class AddVehiculeComponent implements OnInit {

    form: FormGroup ;
    constructor(
    private fb: FormBuilder,
    private vehiculeServer:VehiculeService,
    private router: Router){

    this.form = this.fb.group({
      matricule: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]*$/)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      marque: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]*$/)]],
      disponible: [true],
      nbrinteresse: [0, [Validators.min(0)]],
    });
      
    }


  ngOnInit(): void {}
   onSubmit() {
    if (this.form.valid) {
      const newVehicule: Vehicule = this.form.value;
      this.vehiculeServer.addvehicule(newVehicule).subscribe({
        next: () => this.router.navigate(['/vehicule']),
        error: (err) => console.error('Erreur lors de l\'ajout', err),
      });
}}}
