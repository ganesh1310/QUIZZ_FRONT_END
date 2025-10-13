import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedServices } from '../../../Services/shared-services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-questions-by-category-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-questions-by-category-component.html',
  styleUrl: './view-questions-by-category-component.scss',
})
export class ViewQuestionsByCategoryComponent {
  category: string = '';
  questions: any[] = [];
  loading = false;
  errorMsg = '';
  constructor(
    private sharedService: SharedServices,
    private cdr : ChangeDetectorRef
  ) {}

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
