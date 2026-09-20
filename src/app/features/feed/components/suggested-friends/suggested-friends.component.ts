import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { SuggestionsData } from '../../../../core/models/followsuggestions.interface';

@Component({
  selector: 'app-suggested-friends',
  imports: [],
  templateUrl: './suggested-friends.component.html',
  styleUrl: './suggested-friends.component.css',
})
export class SuggestedFriendsComponent implements OnInit {
  private readonly authService = inject(AuthService);

  followSuggestions: WritableSignal<SuggestionsData> = signal<SuggestionsData>({} as SuggestionsData)

  ngOnInit(): void {
    this.getFollowSuggestionsData()
  }

  getFollowSuggestionsData(): void {
    this.authService.getFollowSuggestions().subscribe({
      next: (res) => {
        this.followSuggestions.set(res.data)

      }
    })
  }


}
