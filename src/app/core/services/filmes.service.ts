import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { filme } from '../models/filme.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  private url = 'http://localhost:3000/filmes'
  private teste = 'http://localhost:3000/filme'

  constructor(private http: HttpClient) { }

  public getAll(): Observable<filme[]> {
    return this.http.get<filme[]>(this.url)
  }

  public add(request: filme): Observable<filme>{
    return this.http.post<filme>(this.url, request)
  }

  public update(request: filme, id:number): Observable<filme>{
    return this.http.put<filme>(`${this.url}/${id}`, request);
  }

  public delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  public getById(id: number): Observable<filme>{
    return this.http.get<filme>(`${this.url}/${id}`);
  }
}
