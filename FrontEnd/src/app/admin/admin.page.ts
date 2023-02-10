import { AdminService } from './admin.service';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { tap } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  title = 'ng2-charts-demo';
  titleOfAllGender = 'All time member of Gender';
  // Pie Chart
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public pieChartLabels = [['Male'], ['Female'], ['Other']];
  public pieChartDatasets = [
    {
      data: [] as number[],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // Line Chart
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        data: [],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;

  userStats$ = this.loadUserStats();

  constructor(public adminService: AdminService) {}

  ionViewWillEnter() {
    this.userStats$ = this.loadUserStats();
  }

  loadUserStats() {
    return this.adminService.getUserStats().pipe(
      tap((json) => {
        console.log(json);

        // For gain register member per month
        for (let i = 1; i < 13; i++) {
          let ind = json.members.findIndex(
            (v: any) => new Date(v.member_create_to_month).getMonth() + 1 === i
          );
          this.lineChartData.datasets[0].data.push(
            ind >= 0 ? +json.members[ind].member_count : 0
          );
        }

        // For gain the gender of member
        json.genders.forEach(({ gender, count }) => {
          let index = this.pieChartLabels.findIndex(
            (arr: string[]) => arr[0].toLowerCase() == gender.toLowerCase()
          );
          if (index == -1) {
            console.error("Couldn't find index", {
              gender,
              count,
              labels: this.pieChartLabels,
            });
            return;
          }
          this.pieChartDatasets[0].data[index] = count;
        });
      })
    );
  }
}
