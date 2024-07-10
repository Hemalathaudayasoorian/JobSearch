import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { detail } from '../detailed.model';
import { JobService } from '../job.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})

export class DescriptionComponent implements OnInit {

  detail!: detail;
  id: string = "";
  constructor(private route: ActivatedRoute, private service: JobService, private router: Router) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getDetailedJobs(this.id);
    });
  }

  getDetailedJobs(id: string) {
    this.service.getDataDetail(id).subscribe((data: detail) => {
      this.detail = data;
    })
  }

  toJobs() {
    this.router.navigate(['/jobs']);
  }

}
