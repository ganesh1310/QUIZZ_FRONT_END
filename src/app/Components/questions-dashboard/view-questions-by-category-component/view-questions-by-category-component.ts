import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedServices } from '../../../Services/shared-services';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { LoaderService } from '../../../Services/loader.service';

@Component({
  selector: 'app-view-questions-by-category-component',
  standalone: true,
  imports: [CommonModule, FormsModule , ReactiveFormsModule],
  templateUrl: './view-questions-by-category-component.html',
  styleUrl: './view-questions-by-category-component.scss',
})
export class ViewQuestionsByCategoryComponent implements OnInit {
  category: string = '';
  questions: any[] = [];
  loading = false;
  errorMsg = '';
  categoryControl = new FormControl('');

  constructor(
    private sharedService: SharedServices,
    private cdr : ChangeDetectorRef,
    private loaderService : LoaderService
  ) {}

  ngOnInit(){
    //switchMap + debounceTime + distinctUntilChanged example
    this.categoryControl.valueChanges.pipe(
    debounceTime(2000),
    distinctUntilChanged(),
    tap(() => {
    this.loaderService.show(); // 🔥 Show loader BEFORE switchMap triggers the request
    }),
    switchMap(category =>
      this.sharedService.getQuestionsByCategory((category ?? '').trim())
    )
    ).subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.questions = data;
        } else if (data) {
          this.questions = [data];
        } else {
          this.questions = [];
        }
        setTimeout(() => this.cdr.detectChanges());
        console.log(this.questions);
        this.loading = false;
        this.loaderService.hide(); // 🔥 Hide loader AFTER data is received
      },
      error: (err) => {
        this.errorMsg = 'No questions found or error occurred.';
        this.questions = [];
        this.loading = false;
        this.loaderService.hide(); // 🔥 Hide loader in case of error as well
      },
    })
  }

  searchByCategory() {
    this.errorMsg = '';
    this.questions = [];
    if (!this.category.trim()) {
      this.errorMsg = 'Please enter a category.';
      return;
    }
    this.loading = true;
    this.sharedService.getQuestionsByCategory(this.category.trim()).subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.questions = data;
        } else if (data) {
          this.questions = [data];
        } else {
          this.questions = [];
        }
        setTimeout(() => this.cdr.detectChanges());
        console.log(this.questions);
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'No questions found or error occurred.';
        this.questions = [];
        this.loading = false;
      },
    });
  }
}
