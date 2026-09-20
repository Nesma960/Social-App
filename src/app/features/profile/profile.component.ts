import { User } from './../../core/models/post-mutation-data.interface';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth.service';
import { ProfileData } from '../../core/models/my-profile-data.interface';
import { MyPost } from '../../core/models/user-profile-data.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [RouterLinkActive, DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly authService = inject(AuthService);

  userId: string = '';
  myPosts: WritableSignal<MyPost[]> = signal<MyPost[]>([]);
  myProfileData: WritableSignal<ProfileData> = signal<ProfileData>({} as ProfileData)

  activeTab: WritableSignal<'MyPosts' | 'Saved'> = signal<'MyPosts' | 'Saved'>('MyPosts')
  // selectedFile!:File;
  ngOnInit(): void {
    this.getMyProfileData()
    this.getUserId()
  }

  getUserId(): void {
    this.userId = JSON.parse(localStorage.getItem('userData')!)._id;
    this.getUserPostsData()
  }

  getUserPostsData(): void {
    this.authService.getUserPosts(this.userId).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.myPosts.set(res.data.posts)
        }
      }
    })
  }

  getMyProfileData(): void {
    this.authService.getMyProfile().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.myProfileData.set(res.data)
        }
      }
    })
  }

  changeProfilePhoto(e: Event): void {
    const input = e.target as HTMLInputElement

    if (!input.files?.length) {
      return;
    }
    const file = input.files[0]
    const formData = new FormData();
    if (file) {
      formData.append('photo', file)
    }

    // call api

    this.authService.uploadProfilePhoto(formData).subscribe({
      next: (res) => {
        this.myProfileData.update(profile => ({
          ...profile,
          user: {
            ...profile.user,
            photo: res.data.photo
          }
        }))

      }
    })

  }
}
