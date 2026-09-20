import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { UserInfo } from '../../../../core/models/user-data.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {

  private readonly authService = inject(AuthService)

  isDropDownOpen: boolean = false;
  isMobileMenuOpen: boolean = false;

   UserData:UserInfo = {} as UserInfo ;

ngOnInit(): void {
  this.getUserData();
}

  toggleDropDownMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  toggleDropDown(): void {
    this.isDropDownOpen = !this.isDropDownOpen;
  }

  dropDownClose(): void {
    this.isDropDownOpen = false;
  }

  // close dropdown when clicking outside 
  @HostListener('document: click', ['$event'])
  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.profile-dropdown')) {
      this.isDropDownOpen = false
    }
  }

  logOut(): void {
    this.authService.signOut();
  }


  getUserData(): void {
    if (localStorage.getItem("userData")) {
       this.UserData= JSON.parse(localStorage.getItem("userData")!)
      // this.userId = JSON.parse(localStorage.getItem("userData")!)?._id;
    }
  }

}
