import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Opportunity} from "../models/opportunity.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {
  private readonly baseUrl: string = `${environment.backendUrl}/opportunities`;
  constructor(private http: HttpClient) {
  }

  getOpportunities(): Observable<Opportunity[]> {
    const token = localStorage.getItem("authToken")
    const headerDict = {
      'Authorization': "Bearer " + token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get<Opportunity[]>(`${this.baseUrl}/`, requestOptions);
  }

  getOpportunity(opportunityId: number): Observable<Opportunity> {
    const token = localStorage.getItem("authToken")
    const headerDict = {
      'Authorization': "Bearer " + token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get<Opportunity>(`${this.baseUrl}/${opportunityId}`, requestOptions);
  }

  createOpportunity(opportunity: Opportunity): Observable<Opportunity> {
    const token = localStorage.getItem("authToken")
    const headerDict = {
      'Authorization': "Bearer " + token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post<Opportunity>(`${this.baseUrl}`, opportunity, requestOptions);
  }

  applyOpportunity(additionalInfo: string): Observable<Opportunity> {
    const token = localStorage.getItem("authToken")
    const headerDict = {
      'Authorization': "Bearer " + token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post<Opportunity>(`${this.baseUrl}`, {additionalInfo: additionalInfo}, requestOptions);
  }
}

