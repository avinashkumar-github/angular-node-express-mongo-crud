import { Component, OnInit } from '@angular/core';
import { RecordService } from './../../services/record.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Record } from './../../models/record.model';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css'],
})
export class RecordDetailComponent implements OnInit {
  currentRecord: Record = {
    title: '',
    description: '',
    published: false,
  };
  // currentRecord?: Record;
  message = '';

  constructor(
    private recordService: RecordService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getRecord(this.route.snapshot.params.id);
  }

  getRecord(id: string): void {
    this.recordService.get(id).subscribe(
      (data) => {
        this.currentRecord = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateTutorial(): void {
    this.recordService
      .update(this.currentRecord._id, this.currentRecord)
      .subscribe(
        (res) => {
          this.message = res.message;
        },
        (error) => {
          console.log(error);
        }
      );
    return;
  }

  deleteTutorial(): void {
    this.recordService.delete(this.currentRecord._id).subscribe(
      (res) => {
        this.message = res.message;
        this.router.navigate(['/records']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentRecord.title,
      description: this.currentRecord.description,
      published: status,
    };
    this.recordService.update(this.currentRecord._id, data).subscribe(
      (data) => {
        this.currentRecord.published = status;
        this.message = data.message;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
