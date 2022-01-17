import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserBase } from 'src/app/dtos/user';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-userall',
  templateUrl: './userall.component.html',
  styleUrls: ['./userall.component.css'],
})
export class UserallComponent implements OnInit {
  displayedColumns: string[] = [
    'user_id',
    'user_name',
    'user_name_login',
    'user_email',
    'user_is_active',
    'creation_date',
    'user_hashed_password',
  ];

  dataSource!: MatTableDataSource<UserBase>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getAllUser().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  logout(): void {
    try {
      this.tokenService.deleteToken();
      this.router.navigate(['auth']);
    } catch (error) {
      console.error(error);
    }
  }
}
