import { DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { CommentReply } from '../../models/comment-replies.interface';
import { PostCommentsService } from '../../services/post-comments.service';
import { Comment } from './../../models/comments-data.interface';


@Component({
  selector: 'app-commentreplies',
  imports: [DatePipe, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './commentreplies.component.html',
  styleUrl: './commentreplies.component.css',
})
export class CommentrepliesComponent implements OnInit {
  private readonly postCommentsService = inject(PostCommentsService);
  // private readonly fb = inject(FormBuilder)

  @Input() commentId!: string;
  @Input() postId!: string;

  commentReplies: WritableSignal<CommentReply[]> = signal<CommentReply[]>([])
  // 1) select file
  selectedFile: File | null = null;
  imgUrl: string | ArrayBuffer | null | undefined = '';
  // 2) content Control 
  contentControl = new FormControl('');
  commentsList: Comment[] = [];


  ngOnInit(): void {
    this.commentRepliesData()
  }

  commentRepliesData(): void {

    this.postCommentsService.getCommentReplies(this.postId, this.commentId).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.commentReplies.set(res.data.replies);
        }
      }
    })
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
    fileReader.readAsDataURL(this.selectedFile!);
    fileReader.addEventListener('load', (e) => {
      this.imgUrl = e.target?.result;
    })
  }

  removeFile(): void {
    this.imgUrl = '';
    this.selectedFile = null!;
  }

  submitReply(e: SubmitEvent, form: HTMLFormElement) {
    e.preventDefault()

    // create form data 
    const formData = new FormData();
    if (this.contentControl.value) {
      formData.append('content', this.contentControl.value)
    }

    if (this.selectedFile) {
      formData.append('image', this.selectedFile)
    }

    // call api 
    this.postCommentsService.createReply(this.postId, this.commentId, formData).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res);
          this.contentControl.reset()
          this.removeFile();
          this.commentRepliesData();
        }
      }
    })
  }

}

