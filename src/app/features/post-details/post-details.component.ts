import { Component, HostListener, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { PostsService } from '../../core/services/posts.service';
import { Post, PostMutationData } from '../../core/models/post-mutation-data.interface';
import { DatePipe } from '@angular/common';
import { PostcommentsComponent } from "../feed/components/feed-content/components/postcomments/postcomments.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  imports: [RouterLink, DatePipe, PostcommentsComponent, ReactiveFormsModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {

  private readonly postsService = inject(PostsService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)

  postDetailsList: WritableSignal<PostMutationData> = signal<PostMutationData>({} as PostMutationData)
  openedPostId: string | null = null;
  userId: string = '';
  contentControl = new FormControl('');
  editPostId!: string;



  ngOnInit(): void {
    this.getpostId();
    this.getUserData();
  }

  getUserData(): void {
    if (localStorage.getItem("userData")) {
      this.userId = JSON.parse(localStorage.getItem("userData")!)?._id;
    }
  }

  getpostId(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const postId = params.get('id')
      if (postId) {
        this.getSinglePostData(postId)
      }
    })
  }

  getSinglePostData(postId: string): void {
    this.postsService.singlePost(postId).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.postDetailsList.set(res.data)
        }
      }
    })
  }

  deletePostItem(postId: string): void {
    this.postsService.deletePost(postId).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/feed'])
        }
      },

      error(err) {
        console.log(err);
      },
    })
  }

  dropdownToggle(postId: string): void {
    this.openedPostId = this.openedPostId === postId ? null : postId;
  }

  dropdownClose(): void {
    this.openedPostId = null;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-trigger')) {
      this.openedPostId = null;
    }
  }

  startEdit(post: Post): void {
    this.editPostId = post._id;
    this.contentControl.setValue(post.body!)
  }

}
