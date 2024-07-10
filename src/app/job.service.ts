import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { job } from './job.model';
import { detail } from './detailed.model';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private job: job[] = [];
  private favouriteJob: job[] = [];
  private selJob: job[] = [];
  private detailJob: detail | undefined;
  constructor(private http: HttpClient) { }

  getAllJobs() {
    return this.http.get<job[]>('/jobs');
  }

  getDetailedJobs(id: string) {
    const params = { 'id': id };
    return this.http.get<detail[]>(`jobs/${id}`, { params });
  }

  getJobData(): Observable<job[]> {
    return this.getAllJobs().pipe(tap((data) => {
      this.job = data;
    }))
  }

  getjobDetails(id: string) {
    const params = { 'id': id };
    return this.http.get<detail>(`jobs/${id}`, { params });
  }

  getDataDetail(id: string): Observable<detail> {
    return this.getjobDetails(id).pipe(tap((data) => {
      this.detailJob = data;
    }))
  }

  tofavToggle(item: job) {
    const index = this.favouriteJob.findIndex((selected: job) => {
      return selected.id === item.id
    });
    if (index === -1) {
      this.favouriteJob.push(item);
    } else {
      this.favouriteJob.splice(index, 1);
    }
    sessionStorage.setItem('favouriteJob', JSON.stringify(this.favouriteJob))
  }

  jobSelected(item: job) {
    const keyFavo = sessionStorage.getItem('favouriteJob');
    if (keyFavo) {
      this.favouriteJob = JSON.parse(keyFavo);
    }
    return this.favouriteJob.some((element:job) => item.id === element.id)
  }

}
