import { Component, OnInit } from '@angular/core';
import { RecordService } from './../../services/record.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Record } from './../../models/record.model';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css'],
})
export class AddRecordComponent implements OnInit {
  record: Record = {
    title: '',
    description: '',
    published: false,
  };

  submitted = false;
  constructor(
    private recordService: RecordService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveRecord(): void {
    const data = {
      title: this.record.title,
      description: this.record.description,
    };

    this.recordService.create(data).subscribe(
      (data) => {
        this.submitted = true;
        this.router.navigate(['/records']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newRecord(): void {
    this.submitted = false;
    this.record = {
      title: '',
      description: '',
      published: false,
    };
  }
}
