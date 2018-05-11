import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public id: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        console.log(this.id);
  }

}
