import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/services/issue.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Issue } from './issue.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  issues: Issue[];

  displayedColumns = ['id', 'title', 'responsible', 'severity', 'status', 'actions'];

  constructor(private IssueService  : IssueService, private router: Router) { }

  ngOnInit() {
    this.fetchIssues();
    // this.IssueService.getIssues().subscribe((issues) => {
    //     console.log(issues);
    // },
    // (error: HttpErrorResponse) => {
    //    console.log('error', error.message);
    // });
  }

  fetchIssues() {
    this.IssueService.getIssues().subscribe((data: Issue[]) => {
      console.log("data.... ", data);
        this.issues = data;
        console.log('Data requested.....');
        console.log('issues.... ', this.issues);
    },
    (error: HttpErrorResponse) => {
      console.log("error ", error.message);
    });

    // this.issues = [
    //   { id:1, title: 'a', responsible: 'Hydrogen', description: 'abc', severity: 'H', status: 'y'},
    //   { id:1, title: 'b', responsible: 'Helium', description: 'abcd', severity: 'He', status: 'y'},
    //   { id:1, title: 'c', responsible: 'Lithium', description: 'abcde', severity: 'Li', status: 'y'},
    //   { id:1, title: 'd', responsible: 'Beryllium', description: 'abcded', severity: 'Be', status: 'y'},
    //   { id:1, title: 'e', responsible: 'Boron', description: 'dffddf', severity: 'B', status: 'y'},
    //   { id:1, title: 'f', responsible: 'Carbon', description: 'sdsfsf', severity: 'C', status: 'y'},
    //   { id:1, title: 'g', responsible: 'Nitrogen', description: 'dfdfdf', severity: 'N', status: 'y'},
    //   { id:1, title: 'h', responsible: 'Oxygen', description: 'dffddf', severity: 'O', status: 'y'},
    //   { id:1, title: 'i', responsible: 'Fluorine', description: 'fdfdfd', severity: 'F', status: 'y'},
    //   { id:1, title: 'j', responsible: 'Neon', description: 'sdsdsd', severity: 'Ne', status: 'y'}
    // ]
  }

  editIssue(id) {
     this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id) {
    console.log('id ', id);
    this.IssueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }

}
