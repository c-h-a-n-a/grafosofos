import { Component, Input } from '@angular/core';
import { TopicListService } from '../topic-list.service';
import { QuizQuestion } from '../quiz.model';
import { LessonQuizComponent } from '../lesson-quiz/lesson-quiz.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizDataServiceService } from '../quiz-data-service.service';

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

  constructor(private router: Router, private route: ActivatedRoute, private topicService: TopicListService, private quizDataService: QuizDataServiceService) {
    const lessonTitle = 'Types of Campus Journalism (Part 2)';
    const topics = ['Editorial Writing', '•	Types of Editorial Writing', 
    '•	Parts of Editorial', '•	Steps to Write Editorial Writing', '•	Structure of Editorial Writing', 
    'Editorial Cartoon', '•	Elements of Editorial Cartoons', '•	Steps in Making Editorial Cartoons',
    '•	Tips in Editorial Cartoon', 'Radio Broadcasting', '•	Tools for Broadcasting', '•	Tips on Writing Scripts for your Listeners', '•	Basic Steps in Radio Script Writing',
    'Photojournalism', '•	Five Main Functions of Photos/Illustrations', '•	Characteristic of a Good Photojournalist',
    '•	Qualities of a Good Photo', '•	What is a Caption?']; 
    this.topicService.updateTopicNames(lessonTitle, topics);
  }

  ngOnInit(): void {
    this.currentLessonId = this.lessonId;
    console.log('in lesson3 ngOnInit, the currentLessonId is: ', this.currentLessonId);
    // Ensure lessonId is retrieved correctly
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') as string;
    
    
  }

  quizQuestions: QuizQuestion[] = [
    { 
      text: '1.	It is considered as the ‘soul of the paper.’',
      options: ['Editorial cartooning', 'Photojournalism', 'Editorial writing', 'Feature writing'],
      correctAnswer: 2
    },
    { 
      text: '2.	It helps the readers understand how the editors of a newspaper cover a sensitive or controversial issue.',
      options: ['Editorial of Entertainment', 'Editorial of Explanation', 'Editorial of Criticism', 'Editorial of Persuasion'],
      correctAnswer: 1
    },
    { 
      text: '3.	This is the third and last paragraph, it contains two parts which is the realistic solutions and a concluding punch. The last paragraph should contain an impactful end and it should reflect the thesis statement. ',
      options: ['Introduction', 'Body', 'Ending', 'Conclusion'],
      correctAnswer: 3
    },
    { 
      text: '4.	It is a written material, which indicates verbal and non-verbal action that has to go into the program. It tells us what to do and say and when or how.',
      options: ['Love Letter', 'Letter of Inquiry', 'Radio Script', 'Documentary Script '],
      correctAnswer: 2
    },
    { 
      text: '5.	This is the documentation of events or people through photographs that tell a story.',
      options: ['Photography', 'Photojournalism', 'Album', 'Slideshow'],
      correctAnswer: 1
    },
    { 
      text: '6.	It has _______ when it tells a story at a glance, when it shows life happening, moment of truth and significance, meaning it has news value.',
      options: ['Editorial Value', 'True Value', 'Core Value', 'Technical Value'],
      correctAnswer: 0
    },
    { 
      text: '7.	Some universities or colleges campus operates a radio station to provide news, information, and entertainment to the school community. ',
      options: ['Broadcasting', 'Station Plug', 'Effective Speaker', 'Radio Broadcasting'],
      correctAnswer: 3
    },
    { 
      text: '8.	It is a simple graphic presentation of opinion that points out the problem.',
      options: ['Illustration', 'Graphic', 'Caricature', 'Editorial Cartoon'],
      correctAnswer: 3
    },
    { 
      text: '9.	Contrary to criticizing, this types of editorial aims to immediately see the solution in an issue not the problem itself.',
      options: ['Editorial of Entertainment', 'Editorial of Explanation', 'Editorial of Criticism', 'Editorial of Persuasion'],
      correctAnswer: 3
    },
    { 
      text: '10.	It has no limit in the number of paragraphs a writer may include but, there should be at least three.',
      options: ['Introduction', 'Body', 'Ending', 'Conclusion'],
      correctAnswer: 1
    },
    // Add more questions as needed
  ];
  
  goToQuiz() {
    this.quizDataService.setQuestions(this.quizQuestions);
    this.router.navigate(['/lessons', this.lessonId, 'quiz'], { state: { questions: this.quizQuestions } });
    console.log('goToQuiz is clicked, the questions are : ', this.quizQuestions);
  }
}
