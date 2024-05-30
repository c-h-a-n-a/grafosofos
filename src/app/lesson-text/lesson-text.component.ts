import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-lesson-text',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lesson-text.component.html',
  styleUrl: './lesson-text.component.css'
})
export class LessonTextComponent {

  quizData: any;
  lessonId!: string;
  //lessonId = 'lesson-1';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Using type assertion
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') as string;
    console.log(this.lessonId);

    // Or using a default value
    // this.lessonId = this.route.snapshot.paramMap.get('lessonId') ?? '';
    
  }

  backToLesson() {
    this.router.navigate(['/lessons', this.lessonId]);
  }


}
