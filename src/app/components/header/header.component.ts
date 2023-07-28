import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/shared';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public collapsed = true;
  public isAuthenticated = false;
  
  constructor(private dataStorageService:DataStorageService, private authService:AuthService) {

  }
  ngOnInit(): void {
    this.authService.userSubject.subscribe(user=> {
      this.isAuthenticated = !!user.token;
    })
  }
  public saveData():void {
    this.dataStorageService.saveRecipes();
  }
  public fetchData():void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

}
