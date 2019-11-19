import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileMyReviewsComponent } from './profile-my-reviews/profile-my-reviews.component';



@NgModule({
  declarations: [ProfilePostsComponent, ProfileInformationComponent, ProfileSettingsComponent, ProfileMyReviewsComponent],
  imports: [
    CommonModule
  ]
})
export class ProfileModule { }
