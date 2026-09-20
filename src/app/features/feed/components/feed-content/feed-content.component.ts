import { UserData, UserInfo } from './../../../../core/models/user-data.interface';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/posts-data.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PostcommentsComponent } from "./components/postcomments/postcomments.component";
import { RouterLink } from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-feed-content',
  imports: [ReactiveFormsModule, PostcommentsComponent, RouterLink, DatePipe],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit {
  private readonly postsService = inject(PostsService);

  openedPostId: string | null = null;
  userId: string = '';
  editPostId!: string;
  // 1) select file
  selectedFile!: File;
  imgUrl: string | ArrayBuffer | null | undefined;
  // 2) content Control 
  contentControl = new FormControl('');
  // 3) privacy Control
  privacyControl = new FormControl("public")

  UserData: UserInfo = {} as UserInfo;

  postsList: Post[] = [];
  ngOnInit(): void {
    this.getAllPosts();
    this.getUserData();
  }

  getAllPosts(): void {
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        this.postsList = res.data.posts
      }
    })
  }

  dropdownToggle(postId: string): void {
    this.openedPostId = this.openedPostId === postId ? null : postId;
  }
  dropdownClose(): void {
    this.openedPostId = null;
  }
  @HostListener('document:click', ["$event"])
  closeDropDown(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-trigger') && !target.closest('.dropdown-menu')) {
      this.openedPostId = null;
    }
  }

  getUserData(): void {
    if (localStorage.getItem("userData")) {
      this.UserData = JSON.parse(localStorage.getItem("userData")!)
      this.userId = JSON.parse(localStorage.getItem("userData")!)?._id;
    }
  }

  changeFile(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
    this.previewImage();
  }

  previewImage(): void {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedFile);
    fileReader.addEventListener('load', (e) => {
      this.imgUrl = e.target?.result;
    })
  }

  removeFile(): void {
    this.imgUrl = '';
  }

  submitForm(e: SubmitEvent, form: HTMLFormElement): void {
    e.preventDefault();

    // create form data 
    const formData = new FormData();

    if (this.contentControl.value) {
      formData.append('body', this.contentControl.value);
    }
    if (this.privacyControl.value) {
      formData.append('privacy', this.privacyControl.value);
    }
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // call api 
    this.postsService.createPost(formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.getAllPosts();
          form.reset();
          this.imgUrl = '';
        }
      }
    })
  }

  deletePostItem(postId: string): void {
    this.postsService.deletePost(postId).subscribe({
      next: (res) => {
        this.getAllPosts();
      },
      error(err) {
        console.log(err);
      },
    })
  }

  submitForm2(e: SubmitEvent, form: HTMLFormElement): void {
    e.preventDefault();

    // create form data 
    const formData = new FormData();

    if (this.contentControl.value) {
      formData.append('body', this.contentControl.value);
    }
    if (this.privacyControl.value) {
      formData.append('privacy', this.privacyControl.value);
    }

    // call api 
    this.postsService.updatePost(this.editPostId, formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.getAllPosts();
          form.reset();
          this.editPostId = ''
        }
      }
    })
  }

  startEdit(post: Post): void {
    this.editPostId = post._id;
    this.contentControl.setValue(post.body!)
    this.privacyControl.setValue(post.privacy);

  }


}
