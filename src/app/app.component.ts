import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchService } from './service/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment';
  searchFrom!: FormGroup;
  listUsers: any;

  constructor(private fb: FormBuilder, private searchService: SearchService) {
    this.searchFrom = this.fb.group({
      search: ['']
    })
    this.getUserData()
  }

  ngOnInit() {
    this.setupDebouncing();
  }
  
  setupDebouncing() {
    this.searchFrom.get("search")?.valueChanges
      .pipe(debounceTime(500),
        distinctUntilChanged()
      ).subscribe(value => {
        console.log(value)
        if (value.trim() !== "") {
          this.searchService.searchUsers(value).subscribe(
            (data) => {
              this.listUsers = data.items;
            },
            (error) => {
              console.error('Error fetching search results:', error);
            }
          );
        }
        else{
          if(value=== ''){this.getUserData();}
        }
      });
  }

  getUserData() {
    this.searchService.getUserData().subscribe(
      (result: any) => {
        this.listUsers = result;
      },
      (error: Error) => {
        console.log(error);
      }
    )
  }
}
