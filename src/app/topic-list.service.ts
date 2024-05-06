import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicListService {

  constructor() { }

  private topicNamesSource = new BehaviorSubject<{ title: string, topics: string[] }>({ title: '', topics: [] });
  topicNames$ = this.topicNamesSource.asObservable();

  updateTopicNames(title: string, topics: string[]) {
    this.topicNamesSource.next({ title, topics });
  }
}
