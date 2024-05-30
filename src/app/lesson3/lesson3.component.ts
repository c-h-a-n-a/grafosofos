import { Component, Input } from '@angular/core';
import { TopicListService } from '../topic-list.service';
import { QuizQuestion } from '../quiz.model';
import { LessonQuizComponent } from '../lesson-quiz/lesson-quiz.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lesson3',
  standalone: true,
  imports: [LessonQuizComponent, ScrollToTopComponent, RouterLink],
  templateUrl: './lesson3.component.html',
  styleUrl: './lesson3.component.css'
})
export class Lesson3Component {

  @Input() lessonId: string | undefined;
  currentLessonId: string | undefined;

  constructor(private topicService: TopicListService) {
    const lessonTitle = 'Types of Campus Journalism (Part 2)';
    const topics = ['Editorial Writing', '•	Types of Editorial Writing', 
    '•	Parts of Editorial', '•	Steps to Write Editorial Writing', '•	Structure of Editorial Writing', 
    'Editorial Cartoon', '•	Elements of Editorial Cartoons', '•	Steps in Making Editorial Cartoons',
    '•	Tips in Editorial Cartoon', 'Radio Broadcasting', '•	Tools for Broadcasting', '•	Tips on Writing Scripts for your Listeners', '•	Basic Steps in Radio Script Writing',
    'Photojournalism', '•	Five Main Functions of Photos/Illustrations', '•	Characteristic of a Good Photojournalist',
    '•	Qualities of a Good Photo', '•	What is a Caption?',
    'Test Yourself']; 
    this.topicService.updateTopicNames(lessonTitle, topics);
  }

  ngOnInit(): void {
    this.currentLessonId = this.lessonId;
    console.log('in lesson1 ngOnInit, the currentLessonId is: ', this.currentLessonId);
    
    
  }

  quizQuestions: QuizQuestion[] = [
    { 
      text: 'Nakita mo na umiiyak si Danica sa hallway. Nalaman mo na si Danica ay "Broken Hearted". Ano ang iyong gagawin?',
      options: ['Magpapayo kay Danica ng magagandang salita.', 'Tatawanan si Danica.', 'Bibigyan si Danica ng pang kulam.', 'Wala akong paki kay Danica.'],
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
