import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../../environments/environment';
import { CommentsDataResponse } from './../models/comments-data.interface';
import { CommentRepliesData, CommentRepliesResponse } from '../models/comment-replies.interface';
import { CreateReplyResponse } from '../models/create-reply.interface';
import { EditcommentdataResponse } from '../models/editcommentdata.interface';


@Injectable({
  providedIn: 'root',
})
export class PostCommentsService {
  private readonly httpClient = inject(HttpClient);


  postComment(postId: string): Observable<CommentsDataResponse> {
    return this.httpClient.get<CommentsDataResponse>(`${environment.base_url}/posts/${postId}/comments?page=1&limit=10`)
  }

  createComment(postId: string, data: FormData): Observable<CommentsDataResponse> {
    return this.httpClient.post<CommentsDataResponse>(`${environment.base_url}/posts/${postId}/comments`, data)
  }

  getCommentReplies(postId: string, commentId: string): Observable<CommentRepliesResponse> {
    return this.httpClient.get<CommentRepliesResponse>(`${environment.base_url}/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`)
  }

  createReply(postId: string, commentId: string, data: FormData): Observable<CreateReplyResponse> {
    return this.httpClient.post<CreateReplyResponse>(`${environment.base_url}/posts/${postId}/comments/${commentId}/replies`, data)
  }

  updateComment(postId: string, commentId: string, data: FormData): Observable<EditcommentdataResponse> {
    return this.httpClient.put<EditcommentdataResponse>(`${environment.base_url}/posts/${postId}/comments/${commentId}`, data)
  }
}
