import { Component } from '@angular/core';
import { ManualComponent } from "../manual/manual.component";
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ManualComponent, MenuComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
