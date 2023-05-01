import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {createOpportunity} from "../models/create-opportunity.model";
import {Observable, of} from "rxjs";
import {Opportunity} from "../models/opportunity.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CreateOpportunityService {
  private readonly baseUrl: string = `${environment.backendUrl}`;

  constructor(private http: HttpClient) { }

  createOpportunity(createOpportunityData: Opportunity): Observable<createOpportunity>{
    return this.http.post<createOpportunity>(`${this.baseUrl}`, createOpportunityData);
  }
}
