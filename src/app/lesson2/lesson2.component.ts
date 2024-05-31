import { Component, Input } from '@angular/core';
import { TopicListService } from '../topic-list.service';
import { QuizQuestion } from '../quiz.model';
import { LessonQuizComponent } from '../lesson-quiz/lesson-quiz.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizDataServiceService } from '../quiz-data-service.service';

@Component({
  selector: 'app-lesson2',
  standalone: true,
  imports: [LessonQuizComponent, ScrollToTopComponent],
  templateUrl: './lesson2.component.html',
  styleUrl: './lesson2.component.css'
})
export class Lesson2Component {

  @Input() lessonId: string | undefined;
  currentLessonId: string | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private topicService: TopicListService, private quizDataService: QuizDataServiceService) {
    const lessonTitle = 'Types of Campus Journalism (Part 1)';
    const topics = ['Different Categories in Campus Journalism', '1.	News Writing', '- ABCs of News Writing', '- News Value: What Makes a Story Newsworthy?', 
    '- The Structure of the News Story', '- Writing the Headline', '- General Rules for News Writing',
     '2.	Feature Writing', '- News Story vs. Feature', '- Structure of Feature Writing', '- Different Types of Feature Writing',
      '- Tips for Writing Feature Article', '3.	Sports Writing', '- Qualities of a Good Sports Writer', '- Basic Rules for Writing Sports Story', '- Dynamic and Punchy Verbs', 
      'Test Yourself',]; 
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
      text: '1.	When was the Philippine Government approved and passed the Republic Act 7079 known as the Campus Journalism Act of 1991?',
      options: ['July 18, 1990', 'July 4, 1946', 'July 5, 1991', 'July 5, 1990'],
      correctAnswer: 2
    },
    { 
      text: '2.	What is a form of journalism that aims to provide readers with factual information following the Inverted Pyramid Structure?',
      options: ['Editorial Writing', 'Feature Writing', 'Headline Writing', 'News Writing'],
      correctAnswer: 3
    },
    { 
      text: '3.	It is the most essential part of the newspaper structure and can be found in the first paragraph of an article.',
      options: ['Lead', 'Byline', 'Headline', 'Caption'],
      correctAnswer: 0
    },
    { 
      text: '4.	It serves as the title of your article and a news story is not complete without it.',
      options: ['Lead', 'Headline', 'Caption', 'Byline'],
      correctAnswer: 1
    },
    { 
      text: '5.	What is the category in campus journalism that focuses on in-depth storytelling, analysis, and exploration of a particular topic?',
      options: ['Sports Writing', 'Copyreading', 'News Writing', 'Feature Writing'],
      correctAnswer: 3
    },
    { 
      text: '6.	It is a type of feature story that develops itself around questions asked to a respondent, who is usually in a place of prominence.',
      options: ['Colour Piece', 'Interview', 'Analysis', 'Profile'],
      correctAnswer: 1
    },
    { 
      text: '7.	It is a specialized form of journalism that covers sports, athletes, or other sports-related issues and events.',
      options: ['Sports Writing', 'Feature Writing', 'News Writing', 'Editorial Writing'],
      correctAnswer: 0
    },
    { 
      text: '8.	A good sports writer must be the following, except:',
      options: ['Must observe accuracy', 'Must know sports', 'Must be unbiased', 'Must make comments without supporting them with facts'],
      correctAnswer: 3
    },
    { 
      text: '9.	What part of the sports story recaps the sports event covered and is usually done through round-by-round reporting?',
      options: ['Quote', 'Decisive Play', 'Play-by-play Account', 'Climax of the Game'],
      correctAnswer: 2
    },
    { 
      text: '10.	 A good sports writer must know coaches and players as intimately as possible; A good sports writer must attend the games or meets as a reporter, not as a spectator or cheerer.',
      options: ['Only the first statement is true', 'Both statements are true', 'Only the first statement is false', 'Both statements are false'],
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
