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
}
