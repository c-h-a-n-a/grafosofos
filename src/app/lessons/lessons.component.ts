import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { QuizQuestion } from '../quiz.model';
import { QuizDataServiceService } from '../quiz-data-service.service';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit{

  //@Output() contentLessonSelected = new EventEmitter<string>();
/*
  selectContent(content: string) {
    this.contentLessonSelected.emit(content);console.log('event emitter is working, this is the content:',content);
  }
  */

  lessonId: string | undefined;

  quizQuestions: QuizQuestion[] = [
    { 
      text: '1. It is the practice of journalism found in educational settings.',
      options: ['Campus Journalism', 'Magazines', 'Reporting', 'Blogs'],
      correctAnswer: 0
    },
    { 
      text: '2. What century did the radio, television, and the internet emerged?',
      options: ['19th century', '20th century', '18th century', '16th century'],
      correctAnswer: 1
    },
    { 
      text: '3. What year did the history of college journalism in the Philippines began with the publication of El Liliputiense by the UST?',
      options: ['1980', '1819', '1890', '1987'],
      correctAnswer: 2
    },
    { 
      text: '4. It is the frequently produced by student-run publications, magazines, blogs, and radio.',
      options: ['News', 'Blogs', 'Radio', 'Reports'],
      correctAnswer: 3
    },
    { 
      text: '5. What year is the history of journalism in the Philippine Islands?',
      options: ['1890', '1964', '1896', '1933'],
      correctAnswer: 3
    },
    { 
      text: '6. What year is John Lent in the Philippine Mass Communication?',
      options: ['1962', '1890', '1964', '1933'],
      correctAnswer: 2
    },
    { 
      text: '7. Campus Journalism provides student a voice to discuss important issues and events.',
      options: ['False', 'True'],
      correctAnswer: 1
    },
    { 
      text: '8. Campus Journalism helps student become more aware and engaged citizens by teaching them about current issues.',
      options: ['False', 'True'],
      correctAnswer: 0
    },
    { 
      text: '9. Schools should support campus journalism program to develop students and uphold principles of free expression and civic participation.',
      options: ['False', 'True'],
      correctAnswer: 1
    },
    { 
      text: '10. Student journalism cannot be included into a variety of courses and taught alongside disciplines like physics and history. ',
      options: ['False', 'True'],
      correctAnswer: 1
    },
    // Add more questions as needed
  ];

  constructor(private router: Router, private quizDataService: QuizDataServiceService) { }

  ngOnInit(): void {
  }

  selectContent(content: string) {
    console.log('selected lesson is: ', content);
    this.router.navigate(['lessons', content.toLowerCase().replace(' ', '-')]); // Navigate with selected lesson parameter
  }

  goToQuiz1() {
    this.lessonId = 'lesson-1';
    this.quizDataService.setQuestions(this.quizQuestions);
    this.router.navigate(['/lessons', this.lessonId, 'quiz'], { state: { questions: this.quizQuestions } });
    console.log('goToQuiz is clicked, the questions are : ', this.quizQuestions);
  }

}
