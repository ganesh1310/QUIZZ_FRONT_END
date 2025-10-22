
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { SharedServices } from '../../../Services/shared-services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../Services/loader.service';
import { CanDeactivate } from '@angular/router';
import { HighlightSearchPipePipe } from '../../../CustomPipes/highlight-search-pipe-pipe';

@Component({
  selector: 'app-feedback-component',
  templateUrl: './feedback-component.html',
  styleUrls: ['./feedback-component.scss'],
  imports: [CommonModule, FormsModule , HighlightSearchPipePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FeedbackComponent{
  feedbackText = '';
  submitting = false;
  hasChanges = false; // true when user types but hasn't submitted
  feedbackList: any[] = [];
  userRole: string = '';
  searchTerm = '';

  constructor(
    private sharedService: SharedServices , 
    private cdr : ChangeDetectorRef,
    private loaderService: LoaderService
  ) 
    {
      const role = this.sharedService.userRoleSignal();
      this.userRole = (role || '').toUpperCase();
      if(this.userRole === 'ADMIN'){
        this.loadFeedbacks();
      }

    // this.sharedService.userRole$.subscribe(role => {
    //   this.userRole = (role || '').toUpperCase();
    //   if (this.userRole === 'ADMIN') {
    //     this.loadFeedbacks();
    //   }
    // });
  }

  ngOnInit() {
    if (this.userRole === 'ADMIN') {
      this.loadFeedbacks();
    }
  }

  loadFeedbacks() {
    this.loaderService.show();
    this.sharedService.getAllFeedback().subscribe({
      next: (data: any) => {
        setTimeout(() => this.cdr.detectChanges());
        this.feedbackList = Array.isArray(data) ? data : [];
        console.log('Feedback List:', this.feedbackList);
        this.loaderService.hide();
      },
      error: () => {
        this.feedbackList = [];
        this.loaderService.hide();
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

  // Called by the global canDeactivate guard (route guard)
  canDeactivate(): boolean {
    if (this.hasChanges) {
      return confirm('You have unsaved feedback. Do you really want to leave without submitting?');
    }
    return true;
  }

  // mark the form as dirty when user types
  markDirty() {
    this.hasChanges = !!(this.feedbackText && this.feedbackText.toString().trim().length > 0);
  }
}
