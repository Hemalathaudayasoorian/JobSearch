import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { job } from '../job.model';
import { JobService } from '../job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgFor, CommonModule, NgIf],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {

  jobs: job[] = []
  FavExists: boolean = false;
  constructor(private router: Router, private service: JobService) { }

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const localVar = sessionStorage.getItem('favouriteJob');
    if (localVar) {
      this.FavExists = true;
      this.jobs = JSON.parse(localVar);
    }
    if (this.jobs.length == 0) {
      this.FavExists = false;
    }
  }

}
