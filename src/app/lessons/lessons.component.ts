import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  selectContent(content: string) {
    console.log('selected lesson is: ', content);
    this.router.navigate(['lessons', content.toLowerCase().replace(' ', '-')]); // Navigate with selected lesson parameter
  }

}
