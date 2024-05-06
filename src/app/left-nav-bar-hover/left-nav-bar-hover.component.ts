import { Component, EventEmitter, Output } from '@angular/core';
import { TopicListService } from '../topic-list.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-left-nav-bar-hover',
  standalone: true,
  imports: [NgFor],
  templateUrl: './left-nav-bar-hover.component.html',
  styleUrl: './left-nav-bar-hover.component.css'
})
export class LeftNavBarHoverComponent {

  //@Output() sectionSelected: EventEmitter<string> = new EventEmitter<string>();


/*
  selectSection(section: string) {
    this.sectionSelected.emit(section);
  }
*/

@Output() topicSelected: EventEmitter<string> = new EventEmitter<string>();

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

}
