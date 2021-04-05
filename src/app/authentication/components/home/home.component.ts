import { Component, OnInit } from '@angular/core';
import { IAccout } from 'src/app/shared/services/account.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MemberService } from '../../services/members.service';
import { IMemberSearch } from '../members/members.interface';
declare const $;
declare const Chart;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [MemberService]
})
export class HomeComponent implements OnInit {

    constructor(
        private member: MemberService,
        private alert: AlertService
    ) {

     }

    items: IAccout[] = [];
    allMember: number;
    frontends: IAccout[] = [];
    backends: IAccout[] = [];

    ngOnInit() {
        this.initialLoadChartJS();
        this.initialLoadMembers();
        // this.initialLoadFrontend();
        // this.initialLoadBackend();
    }

    private initialLoadMembers(opitinos?: IMemberSearch) {
        this.member
            .getMembers(opitinos)
            // .then(items => this.items = items)
            .then(items =>{
                this.items = items
                // this.allMember = items.length
                // console.log(this.allMember);
            })
            .catch(err => this.alert.notify(err.Message));
    }

    // private initialLoadFrontend(opitinos?: IMemberSearch) {
    //     this.member
    //         .getFrontend(opitinos)
    //         .then(frontends => this.frontends = frontends)
    //         .catch(err => this.alert.notify(err.Message));
    // }

    // private initialLoadBackend(opitinos?: IMemberSearch) {
    //     this.member
    //         .getFrontend(opitinos)
    //         .then( backends => this.backends = backends)
    //         .catch(err => this.alert.notify(err.Message));
    // }
    // Run Chart js
    private initialLoadChartJS() {
        var data = {
            labels: ["January", "February", "March", "April", "May"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86]
                }
            ]
        };

        var pdata = [
            {
                // value: this.allMember+80,
                value: 80,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Complete"
            },
            {
                value: 110,
                color: "#F7464A",
                highlight: "#FF5A5E",
                label: "In-Progress"
            }
        ]

        var ctxl = $("#lineChartDemo").get(0).getContext("2d");
        var lineChart = new Chart(ctxl).Line(data);

        var ctxp = $("#pieChartDemo").get(0).getContext("2d");
        var pieChart = new Chart(ctxp).Pie(pdata);
    }

}
