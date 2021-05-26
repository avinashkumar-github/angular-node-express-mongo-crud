import { Component, OnInit } from '@angular/core';
import { RecordService } from './../../services/record.service';
import { Record } from './../../models/record.model';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css'],
})
export class RecordListComponent implements OnInit {
  records?: Record[];
  currentRecord?: Record;
  currentIndex = -1;
  title = '';

  constructor(private recordService: RecordService) {}

  ngOnInit(): void {
    this.retrieveRecords();
  }

  retrieveRecords(): void {
    this.recordService.getAll().subscribe(
      (data) => {
        this.records = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrieveRecords();
    this.currentRecord = undefined;
    this.currentIndex = -1;
  }

  setActiveRecord(record: Record, index: number): void {
    this.currentRecord = record;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.recordService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchTitle(): void {
    this.recordService.findByTitle(this.title).subscribe(
      (data) => {
        this.records = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
