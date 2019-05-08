import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

interface IModel {
  id: number;
  year: number;
  make: string;
  model: string;
  hasDetails: number;
}

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  models: IModel[];
  makes: string[] = [];
  years: number[] = [];
  filterMake: string = "";
  filterYear: string = "";
  curPage = 0;
  lastPage: boolean = false;
  resultsPerPage = 10;

  dataSource: MatTableDataSource<IModel> = new MatTableDataSource();
  displayedColumns: string[] = ['year', 'make', 'model'];

  constructor(private http: HttpClient) {
    this.getModels();
    this.getMakes();
    this.getYears();
  }

  ngOnInit() {
  }

  async getModels() {
    const offset = this.curPage * this.resultsPerPage;
    const year = this.filterYear ? this.filterYear : "";
    const make = this.filterMake ? this.filterMake : "";
    await this.http.get<IModel[]>(`https://vehicle-data.azurewebsites.net/api/models?offset=${offset}&fetch=${this.resultsPerPage}&year=${year}&make=${make}`).subscribe(res => {
      this.models = res;
      this.dataSource = new MatTableDataSource(this.models);
    });
    this.http.get<IModel[]>(`https://vehicle-data.azurewebsites.net/api/models?offset=${offset+this.resultsPerPage}&fetch=${this.resultsPerPage}&year=${year}&make=${make}`).subscribe(res => {
      this.lastPage = res.length === 0;
    });
  }

  async getMakes() {
    await this.http.get<string[]>("https://vehicle-data.azurewebsites.net/api/makes").subscribe(res => {
      this.makes = res;
      this.makes.sort();
    });
  }

  async getYears() {
    await this.http.get<number[]>("https://vehicle-data.azurewebsites.net/api/years").subscribe(res => {
      this.years = res;
      this.years.sort();
    });
  }

  applyFilter() {
    this.curPage = 0;
    this.getModels();
  }

  prevPage() {
    if (this.curPage > 0) {
      this.curPage--;
      this.getModels();
    }
  }

  nextPage() {
    this.curPage++;
    this.getModels();
  }

}
