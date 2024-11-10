import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-video-modal',
  standalone: true,
  imports: [],
  templateUrl: './video-modal.component.html',
  styleUrl: './video-modal.component.css'
})
export class VideoModalComponent {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
