import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {OpportunityService} from "../services/opportunity.service";
import {formatDate} from "@angular/common";
import {state} from "@angular/animations";

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {

  public id: number = 0
  public title: string = ''
  public description: string = ''
  public coverImage: string = ''
  public requirements: string =''
  public applicants: Array<any>= []
  public organization: string = ''
  public createdAt: string = ''

  public isOrg: boolean = false
  public isOwner: boolean = false

  public appliedAt: string = ''
  public isApplied: boolean = false
  public applicationStatus: string = ""

  private unsubscribe: Subscription[] = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute, public sanitize: DomSanitizer, private opportunityService: OpportunityService) {}

  ngOnInit(): void {
    this.isOrg = localStorage.getItem("isOrg") === "true"

    const currentId: number = parseInt(localStorage.getItem("currentId") as string)

    this.unsubscribe.push(this.activatedRoute.data.subscribe(data => {
      console.log("DATA :: ", data["opportunity"].applications)
      this.id = data["opportunity"].opportunityDto.id
      this.title = data["opportunity"].opportunityDto.title
      this.description = data["opportunity"].opportunityDto.description
      this.requirements = data["opportunity"].opportunityDto.requirements
      this.coverImage = data["opportunity"].opportunityDto.coverImage
      this.applicants = data["opportunity"].applications
      this.organization = data["opportunity"].organization.fullName
      this.createdAt = data["opportunity"].opportunityDto.createdAt

      const myApplication = data["opportunity"].myApplication

      if(myApplication){
        this.isApplied = true
        this.appliedAt = data["opportunity"].myApplication.createdAt
        this.applicationStatus = data["opportunity"].myApplication.status
      }

      const creatorId = data["opportunity"].opportunityDto.organizationId

      if(currentId === creatorId){
        this.isOwner = true
      }
    }));
  }

  public openApply (id: number){
    this.router.navigate(["/opportunity", id, "apply"])
  }

  public openEdit (id: number){
    console.log("APP;YYY")
    this.router.navigate(["/opportunity", id, "edit"])
  }

  protected readonly formatDate = formatDate;
  protected readonly state = state;
}
