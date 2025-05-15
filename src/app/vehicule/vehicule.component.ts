import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../model/vehicule';
import { VehiculeService } from '../services/vehicule.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-vehicule',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './vehicule.component.html',
  styleUrl: './vehicule.component.scss'
})
export class VehiculeComponent implements OnInit {
  vehicules: Vehicule[] = [];
  selectedVehicule: Vehicule | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private vehiculeService: VehiculeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.isLoading = true;
    this.vehiculeService.getvehicles().subscribe({
      next: (data) => {
        this.vehicules = data;
        console.log('Loaded vehicles:', this.vehicules);
        this.isLoading = false;
        this.errorMessage = null;

        this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          console.log('Route ID:', id);
          if (id && !isNaN(Number(id))) {
            const vehicleId = Number(id); // Convert route param to number
            this.loadVehiculeDetails(vehicleId);
          } else {
            this.selectedVehicule = null;
            console.log('No valid ID, resetting to list view');
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de la récupération des véhicules: ' + err.message;
        console.error('Erreur lors de la récupération des véhicules', err);
      },
    });
  }

  loadVehiculeDetails(vehicleId: number): void {
    this.selectedVehicule = this.vehicules.find(v => v.id === vehicleId) || null;
    console.log('Selected vehicle:', this.selectedVehicule);
    if (!this.selectedVehicule) {
      console.error('Véhicule non trouvé avec ID:', vehicleId);
      this.router.navigate(['/vehicule']);
    }
  }

  viewDetails(id: number): void {
    console.log('Navigating to details for ID:', id);
    this.router.navigate(['/vehicule', id]);
  }

  deleteVehicule(id: number): void {
    this.vehicules = this.vehicules.filter(v => v.id !== id);
  }

  goBackToList(): void {
    this.router.navigate(['/vehicule']);
  }
}