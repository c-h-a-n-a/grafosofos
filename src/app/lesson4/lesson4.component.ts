import { Component, Input } from '@angular/core';
import { TopicListService } from '../topic-list.service';
import { QuizQuestion } from '../quiz.model';
import { LessonQuizComponent } from '../lesson-quiz/lesson-quiz.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lesson4',
  standalone: true,
  imports: [LessonQuizComponent, ScrollToTopComponent, RouterLink],
  templateUrl: './lesson4.component.html',
  styleUrl: './lesson4.component.css'
})
export class Lesson4Component {

  @Input() lessonId: string | undefined;
  currentLessonId: string | undefined;

  constructor(private topicService: TopicListService) {
    const lessonTitle = 'Rules in Writing ';
    const topics = ['Grammar in Journalistic Writing', 'What are the Different Rules of Grammar in News Writing?', 
    '•	Be mindful of tenses to use', '•	Use of nouns. ', '•	Singularity and Plurality', 
    'Errors to Avoid in Writing a Newspaper', 'Vocabulary',
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
      text: 'What is 1 + 1',
      options: ['1', '2', '3', '4'],
      correctAnswer: 1
    },
    // Add more questions as needed
  ];

}
