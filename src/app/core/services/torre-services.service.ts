import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TorreServicesService {

  constructor(
    private http: HttpClient
  ) { }

  getProfile(username: string): Promise<any> {
    const url = 'https://torre.bio/api/bios';
    return this.http.get(`${url}/${username}`).toPromise();
  }

  getOpportunity(id: string): Promise<any> {
    const url = 'https://torre.co/api/opportunities';
    return this.http.get(`${url}/${id}`).toPromise();
  }

  getPeople(): Promise<any> {
    const url = 'https://search.torre.co/people'
    return this.http.post(`${url}/_search`, {}).toPromise();
  }

  getOpportunities(): Promise<any> {
    const url = 'https://search.torre.co/opportunities'
    return this.http.post(`${url}/_search`, {}).toPromise();
  }
}
