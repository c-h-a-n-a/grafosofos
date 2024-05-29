import { Component, EventEmitter, HostListener, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { TopicListService } from '../topic-list.service';
import { NgClass, NgFor, NgIf, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-left-nav-bar-hover',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './left-nav-bar-hover.component.html',
  styleUrl: './left-nav-bar-hover.component.css'
})
export class LeftNavBarHoverComponent implements OnInit{

  //@Output() sectionSelected: EventEmitter<string> = new EventEmitter<string>();


/*
  selectSection(section: string) {
    this.sectionSelected.emit(section);
  }
*/

@Output() topicSelected: EventEmitter<string> = new EventEmitter<string>();
@Output() sidebarClose = new EventEmitter<boolean>();

selectTopic(topic: string) {
  this.topicSelected.emit(topic);
}

lessonTitle!: string;
topicNames!: string[];

constructor(private topicService: TopicListService) {}

ngOnInit() {
  this.topicService.topicNames$.subscribe(topicNames => {
    this.lessonTitle = topicNames.title;
    this.topicNames = topicNames.topics;
  });
}

closeSidebar() {
  this.sidebarClose.emit(false); // Emit the close event with false value
  console.log('this method is called and it will send a value');
}

}
