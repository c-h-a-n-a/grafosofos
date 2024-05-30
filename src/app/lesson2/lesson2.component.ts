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
    const lessonTitle = 'Types of Campus Journalism (Part 1)';
    const topics = ['Different Categories in Campus Journalism', '1.	News Writing', '- ABCs of News Writing', '- News Value: What Makes a Story Newsworthy?', 
    '- The Structure of the News Story', '- Writing the Headline', '- General Rules for News Writing',
     '2.	Feature Writing', '- News Story vs. Feature', '- Structure of Feature Writing', '- Different Types of Feature Writing',
      '- Tips for Writing Feature Article', '3.	Sports Writing', '- Qualities of a Good Sports Writer', '- Basic Rules for Writing Sports Story', '- Dynamic and Punchy Verbs', 
      'Test Yourself',]; 
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
