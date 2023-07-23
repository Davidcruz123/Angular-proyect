import { Component} from '@angular/core';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  public collapsed = true;
  
  constructor(private dataStorageService:DataStorageService) {

  }
  public saveData():void {
    this.dataStorageService.saveRecipes();
  }
  public fetchData():void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

}
