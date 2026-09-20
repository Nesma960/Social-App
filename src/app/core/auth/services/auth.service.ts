import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ChangPasswordDataResponse } from '../../models/chang-password-data.interface';
import { SuggestionsResponse } from '../../models/followsuggestions.interface';
import { ProfileResponse } from '../../models/my-profile-data.interface';
import { UploadProfilePhotoResponse } from '../../models/upload-profile-photo.interface';
import { UserDataResponse } from '../../models/user-data.interface';
import { MyPostsResponse } from '../../models/user-profile-data.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router)



  signUp(data: object): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(`${environment.base_url}/users/signup`, data);
  }

  signIn(data: object): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(`${environment.base_url}/users/signin`, data);
  }

  signOut(): void {
    localStorage.removeItem("socialToken");
    localStorage.removeItem("userData");

    this.router.navigate(['/login'])

  }

  getMyProfile(): Observable<ProfileResponse> {
    return this.httpClient.get<ProfileResponse>(`${environment.base_url}/users/profile-data`)
  }

  getUserPosts(userId: string): Observable<MyPostsResponse> {
    return this.httpClient.get<MyPostsResponse>(`${environment.base_url}/users/${userId}/posts`)
  }

  getFollowSuggestions(): Observable<SuggestionsResponse> {
    return this.httpClient.get<SuggestionsResponse>(`${environment.base_url}/users/suggestions?limit=10`)
  }

  uploadProfilePhoto(data: object): Observable<UploadProfilePhotoResponse> {
    return this.httpClient.put<UploadProfilePhotoResponse>(`${environment.base_url}/users/upload-photo`, data)
  }

  changePassword(data: {
    password: string;
    newPassword: string;
  }): Observable<ChangPasswordDataResponse> {
    return this.httpClient.patch<ChangPasswordDataResponse>(`${environment.base_url}/users/change-password`, data)
  }
}
