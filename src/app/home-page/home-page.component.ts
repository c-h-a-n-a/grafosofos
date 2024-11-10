import { Component } from '@angular/core';
import { VideoModalComponent } from "../video-modal/video-modal.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [VideoModalComponent, NgIf],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  showVideoModal = false;
}
