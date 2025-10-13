
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { SharedServices } from '../../../Services/shared-services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback-component',
  templateUrl: './feedback-component.html',
  styleUrls: ['./feedback-component.scss'],
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true
})
export class FeedbackComponent {
  feedbackText = '';
  submitting = false;
  feedbackList: any[] = [];
  userRole: string = '';

  constructor(private sharedService: SharedServices , private cdr : ChangeDetectorRef) {
    this.sharedService.userRole$.subscribe(role => {
      this.userRole = (role || '').toUpperCase();
      if (this.userRole === 'ADMIN') {
        this.loadFeedbacks();
      }
    });
  }

  ngOnInit() {
    if (this.userRole === 'ADMIN') {
      this.loadFeedbacks();
    }
  }

  loadFeedbacks() {
    this.sharedService.getAllFeedback().subscribe({
      next: (data: any) => {
        setTimeout(() => this.cdr.detectChanges());
        this.feedbackList = Array.isArray(data) ? data : [];
        console.log('Feedback List:', this.feedbackList);
      },
      error: () => {
        this.feedbackList = [];
      }
    });
  }

  onSubmitFeedback(event: Event) {
    event.preventDefault();
    if (!this.feedbackText.trim()) return;
    this.submitting = true;
    const feedback = {
      userName: 'Ganesh Gavhane',
      description: this.feedbackText.trim()
    };
    this.sharedService.submitFeedback(feedback).subscribe({
      next: () => {
        alert('Thank you for your feedback!');
        this.feedbackText = '';
        this.submitting = false;
      },
      error: () => {
        alert('Failed to submit feedback. Please try again.');
        this.submitting = false;
      }
    });
  }
}
