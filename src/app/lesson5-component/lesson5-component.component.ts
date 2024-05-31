import { Component, Input } from '@angular/core';
import { TopicListService } from '../topic-list.service';
import { LessonQuizComponent } from '../lesson-quiz/lesson-quiz.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizDataServiceService } from '../quiz-data-service.service';
import { QuizQuestion } from '../quiz.model';

@Component({
  selector: 'app-lesson5-component',
  standalone: true,
  imports: [LessonQuizComponent, ScrollToTopComponent],
  templateUrl: './lesson5-component.component.html',
  styleUrl: './lesson5-component.component.css'
})
export class Lesson5ComponentComponent {

  @Input() lessonId: string | undefined;
  currentLessonId: string | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private topicService: TopicListService, private quizDataService: QuizDataServiceService) {
    const lessonTitle = 'Rules in Writing ';
    const topics = ['Punctuation in Journalistic Writing', 'I.	Period, comma and colon', '•	Period (.)', '•	Comma (,)', '•	Colon (:)', 
    'II.	Semicolon, Dash, and Hyphen', '•	Semicolon (;)', '•	Dash (--)', '•	Hyphen (-)', 'Test Yourself']; 
    this.topicService.updateTopicNames(lessonTitle, topics);
  }

  ngOnInit(): void {
    this.currentLessonId = this.lessonId;
    console.log('in lesson4 ngOnInit, the currentLessonId is: ', this.currentLessonId);

    // Ensure lessonId is retrieved correctly
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') as string;
    
    
  }

  quizQuestions: QuizQuestion[] = [
    { 
      text: '1.	It is helpful for readers to understand a certain text or article.',
      options: ['Title', 'Body', 'Punctuation', 'Theme'],
      correctAnswer: 2
    },
    { 
      text: '2.	Join two related independent clauses in place of a coordinating conjunction.',
      options: ['Semicolon', 'Dash', 'Period', 'Comma'],
      correctAnswer: 0
    },
    { 
      text: '3.	Separating series of words and clauses of a compound and compound-complex sentence.',
      options: ['Period', 'Comma', 'Dash', 'Semicolon'],
      correctAnswer: 1
    },
    { 
      text: '4.	Above all the punctuation marks, this is the most commonly used.',
      options: ['Comma', 'Colon', 'Dash', 'Period'],
      correctAnswer: 3
    },
    { 
      text: '5.	Place of comma to separate  clauses.',
      options: ['Dash', 'Semicolon', 'Period', 'Hyphen'],
      correctAnswer: 0
    },
    { 
      text: '6.	Separating compound words.',
      options: ['Period', 'Colon', 'Semicolon', 'faculty'],
      correctAnswer: 3
    },
    { 
      text: '7.	This punctuation indicates pause.',
      options: ['Comma', 'Hyphen', 'Dash', 'Period'],
      correctAnswer: 0
    },
    { 
      text: '8.	It is used in enumerating words',
      options: ['Period ', 'Comma ', 'Hyphen', 'Colon'],
      correctAnswer: 3
    },
    { 
      text: '9.	The absence of proper usage of punctuation marks can lead to confusion and misinterpretation.',
      options: ['False', 'True', 'Maybe', 'Always'],
      correctAnswer: 1
    },
    { 
      text: '10.	Punctuation marks are helpful for readers to understand a certain text or article.',
      options: ['Always', 'False', 'True', 'Maybe'],
      correctAnswer: 2
    },
    // Add more questions as needed
  ];

  goToQuiz() {
    this.quizDataService.setQuestions(this.quizQuestions);
    this.router.navigate(['/lessons', this.lessonId, 'quiz'], { state: { questions: this.quizQuestions } });
    console.log('goToQuiz is clicked, the questions are : ', this.quizQuestions);
  }

}
