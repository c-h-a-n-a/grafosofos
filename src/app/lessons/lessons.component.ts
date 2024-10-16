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

  quizQuestions1: QuizQuestion[] = [
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

  quizQuestions2: QuizQuestion[] = [
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

  quizQuestions3: QuizQuestion[] = [
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

  quizQuestions4: QuizQuestion[] = [
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

  quizQuestions5: QuizQuestion[] = [
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

  constructor(private router: Router, private quizDataService: QuizDataServiceService) { }

  ngOnInit(): void {
  }

  selectContent(content: string) {
    console.log('selected lesson is: ', content);
    this.router.navigate(['lessons', content.toLowerCase().replace(' ', '-')]); // Navigate with selected lesson parameter
  }

  goToQuiz(lesson: string) {
    this.lessonId = lesson;
    this.router.navigate(['/lessons', this.lessonId, 'quiz']);
    //console.log('goToQuiz is clicked, the questions are : ', this.lessonId);
  }

  goToQuiz2() {
    this.lessonId = 'lesson-1';
    this.quizDataService.setQuestions(this.quizQuestions2);
    this.router.navigate(['/lessons', this.lessonId, 'quiz'], { state: { questions: this.quizQuestions2 } });
    console.log('goToQuiz is clicked, the questions are : ', this.quizQuestions2);
  }

  goToQuiz3() {
    this.lessonId = 'lesson-1';
    this.quizDataService.setQuestions(this.quizQuestions3);
    this.router.navigate(['/lessons', this.lessonId, 'quiz'], { state: { questions: this.quizQuestions3 } });
    console.log('goToQuiz is clicked, the questions are : ', this.quizQuestions3);
  }

  goToQuiz4() {
    this.lessonId = 'lesson-1';
    this.quizDataService.setQuestions(this.quizQuestions4);
    this.router.navigate(['/lessons', this.lessonId, 'quiz'], { state: { questions: this.quizQuestions4 } });
    console.log('goToQuiz is clicked, the questions are : ', this.quizQuestions4);
  }

  goToQuiz5() {
    this.lessonId = 'lesson-1';
    this.quizDataService.setQuestions(this.quizQuestions5);
    this.router.navigate(['/lessons', this.lessonId, 'quiz'], { state: { questions: this.quizQuestions5 } });
    console.log('goToQuiz is clicked, the questions are : ', this.quizQuestions5);
  }

}
