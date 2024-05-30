import { Component, Input } from '@angular/core';
import { TopicListService } from '../topic-list.service';
import { QuizQuestion } from '../quiz.model';
import { LessonQuizComponent } from '../lesson-quiz/lesson-quiz.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizDataServiceService } from '../quiz-data-service.service';

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

  constructor(private router: Router, private route: ActivatedRoute, private topicService: TopicListService, private quizDataService: QuizDataServiceService) {
    const lessonTitle = 'Rules in Writing ';
    const topics = ['Grammar in Journalistic Writing', 'What are the Different Rules of Grammar in News Writing?', 
    '•	Be mindful of tenses to use', '•	Use of nouns. ', '•	Singularity and Plurality', 
    'Errors to Avoid in Writing a Newspaper', 'Vocabulary',
    'Test Yourself']; 
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
      text: '1.	Having this enables writers to convey their message clearly and concisely.',
      options: ['Vocabulary', 'Good grammar', 'Grammar', 'None of the above'],
      correctAnswer: 1
    },
    { 
      text: '2.	It is better not to be mindful of tenses to use.',
      options: ['False', 'True'],
      correctAnswer: 0
    },
    { 
      text: '3.	Identify what tense is used. She is baking cookies and cupcakes.',
      options: ['Past tense', 'Past Progressive', 'Present Perfect Progressive', 'Present Progressive'],
      correctAnswer: 3
    },
    { 
      text: '4.	Identify what tense is used. She had been in love with her ex-boyfriend until she knew the cheating incident.',
      options: ['Present Progressive', 'Present Perfect', 'Past Perfect Progressive', 'Simple future'],
      correctAnswer: 2
    },
    { 
      text: '5.	The following are examples of abstract nouns, EXCEPT:',
      options: ['Taylor Swift', 'honesty', 'liberty', 'anger'],
      correctAnswer: 0
    },
    { 
      text: '6.	The following are examples of collective nouns, EXCEPT:',
      options: ['team', 'government', 'teachers', 'faculty'],
      correctAnswer: 2
    },
    { 
      text: '7.	What is the best way to have wide vocabulary?',
      options: ['Forget reading because it takes time.', 'Do not take down notes because you have good memory.', 'Do not look at how a word is used.', 'Write often.'],
      correctAnswer: 3
    },
    { 
      text: '8.	According to Merriam Webster, this word means “relating to, inherent in, or affecting the constitution of body or mind.”',
      options: ['Constitutional ', 'Governmental ', 'Constitute', 'Constituate'],
      correctAnswer: 0
    },
    { 
      text: '9.	The following are good transitional phrases, EXCEPT:',
      options: ['In addition to this', 'but', 'Hence', 'Furthermore'],
      correctAnswer: 1
    },
    { 
      text: '10.	Select one of the two correct definitions of the word FORTHCOMING.',
      options: ['something that is not expected to appear', 'to come as fourth', 'to appear, produce or to happen soon', 'none of the above'],
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
