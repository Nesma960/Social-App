import { PostMutationDataResponse } from './../models/post-mutation-data.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PostsDataResponse } from '../models/posts-data.interface';


@Injectable({
  providedIn: 'root',
})
export class PostsService {

  private readonly httpClient = inject(HttpClient);


  getAllPosts(): Observable<PostsDataResponse> {
    return this.httpClient.get<PostsDataResponse>(`${environment.base_url}/posts`)
  }

  createPost(data: FormData): Observable<PostMutationDataResponse> {
    return this.httpClient.post<PostMutationDataResponse>(`${environment.base_url}/posts`, data)
  }

  singlePost(postId: string): Observable<PostMutationDataResponse> {
    return this.httpClient.get<PostMutationDataResponse>(`${environment.base_url}/posts/${postId}`)
  }

  updatePost(postId: string, data: FormData): Observable<any> {
    return this.httpClient.put<any>(`${environment.base_url}/posts/${postId}`, data)
  }

  deletePost(postId: string): Observable<PostMutationDataResponse> {
    return this.httpClient.delete<PostMutationDataResponse>(`${environment.base_url}/posts/${postId}`)
  }
}
