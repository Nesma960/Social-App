import { DatePipe } from '@angular/common';
import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommentrepliesComponent } from "./components/commentreplies/commentreplies.component";
import { Comment } from './models/comments-data.interface';
import { PostCommentsService } from './services/post-comments.service';

@Component({
  selector: 'app-postcomments',
  imports: [ReactiveFormsModule, DatePipe, CommentrepliesComponent],
  templateUrl: './postcomments.component.html',
  styleUrl: './postcomments.component.css',
})
export class PostcommentsComponent implements OnInit {
  private readonly postCommentsService = inject(PostCommentsService);

  // 1) select file
  selectedFile: File | null = null;
  imgUrl: string | ArrayBuffer | null | undefined = '';
  // 2) content Control 
  contentControl = new FormControl('');

  @Input({ required: true }) postId: string = '';
  commentId!: string;
  isEditMode: boolean = false;
  commentsList: Comment[] = [];
  isDropdownOpen: boolean = false;
  openMenuId: string | null = null;

  ngOnInit(): void {
    this.getAllComments();
  }
  getAllComments(): void {
    this.postCommentsService.postComment(this.postId).subscribe({
      next: (res) => {
        if (res.success) {
          this.commentsList = res.data.comments;
        }
      }
    })
  }

  changeFile(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.previewImage();
    }

  }

  previewImage(): void {
    if (!this.selectedFile) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imgUrl = fileReader.result;
    };

    fileReader.readAsDataURL(this.selectedFile);
  }
  removeFile(): void {
    this.imgUrl = '';
    this.selectedFile = null!;
  }

  submitForm(e: SubmitEvent, form: HTMLFormElement): void {
    e.preventDefault();

    // create form data 
    const formData = new FormData();
    if (this.contentControl.value) {
      formData.append('content', this.contentControl.value)
    }

    if (this.selectedFile) {
      formData.append('image', this.selectedFile)
    }

    // call api 
    this.postCommentsService.createComment(this.postId, formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.getAllComments();
          form.reset();
          this.removeFile();
        }
      }
    });

  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.commentId = '';
    this.contentControl.reset();
  }

  toggleMenu(id: string): void {
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  closeMenu(): void {
    this.openMenuId = null;
  }
  @HostListener('document:click', ['$event'])
  dropdownClose(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.ellipsis')) {
      this.openMenuId = null;
    }
  }

  editComment(comment: Comment): void {
    this.openMenuId = null;
    this.isEditMode = true;
    this.commentId = comment._id;
    this.contentControl.setValue(comment.content!)
  }

  saveEdit(): void {
    const content = this.contentControl.value?.trim();

    if (!content) {
      return;
    }
    if (!this.commentId) {
      return;
    }


    const formData = new FormData();

    if (content) {
      formData.append('content', content)
    }
    this.postCommentsService.updateComment(this.postId, this.commentId, formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.getAllComments()
          this.isEditMode = false;
          this.commentId = '';
          this.contentControl.reset();
          this.removeFile();
        }

      }
    })
  }






}
