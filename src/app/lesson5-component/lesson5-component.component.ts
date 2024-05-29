import { Component } from '@angular/core';
import { TopicListService } from '../topic-list.service';
import { LessonQuizComponent } from '../lesson-quiz/lesson-quiz.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-lesson5-component',
  standalone: true,
  imports: [LessonQuizComponent, ScrollToTopComponent],
  templateUrl: './lesson5-component.component.html',
  styleUrl: './lesson5-component.component.css'
})
export class Lesson5ComponentComponent {

  constructor(private topicService: TopicListService) {
    const lessonTitle = 'Rules in Writing ';
    const topics = ['Punctuation in Journalistic Writing', 'I.	Period, comma and colon', '•	Period (.)', '•	Comma (,)', '•	Colon (:)', 
    'II.	Semicolon, Dash, and Hyphen', '•	Semicolon (;)', '•	Dash (--)', '•	Hyphen (-)',
     'Vocabulary in Journalistic Writing', 'Importance of Wide vocabulary in Journalistic Writing', 'How to attain a wide vocabulary?', 'Quiz']; 
    this.topicService.updateTopicNames(lessonTitle, topics);
  }

}
