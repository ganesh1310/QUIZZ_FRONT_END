import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { FeedbackComponent } from '../Components/Feedback-Component/feedback-component/feedback-component';

export const canDeactivateGuard: CanDeactivateFn<FeedbackComponent> = (component,currentRoute,currentState,nextState) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
