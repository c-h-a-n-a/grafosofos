import { Component } from '@angular/core';
import { TopicListService } from '../topic-list.service';
import { QuizQuestion } from '../quiz.model';
import { LessonQuizComponent } from '../lesson-quiz/lesson-quiz.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-lesson2',
  standalone: true,
  imports: [LessonQuizComponent, ScrollToTopComponent],
  templateUrl: './lesson2.component.html',
  styleUrl: './lesson2.component.css'
})
export class Lesson2Component {

  constructor(private topicService: TopicListService) {
    const lessonTitle = 'Lesson Title for Lesson 2';
    const topics = ['Topic E', 'Topic F', 'Topic G']; 
    this.topicService.updateTopicNames(lessonTitle, topics);
  }

  quizQuestions: QuizQuestion[] = [
    { 
      text: 'How many are the member of the Girl Group BINI?',
      options: ['8', '13', '4', '9'],
      correctAnswer: 0
    },
    { 
      text: '____ Pares Overload',
      options: ['London', 'Diwata', 'Litex', 'Anghel'],
      correctAnswer: 1
    },
    // Add more questions as needed
  ];

}
