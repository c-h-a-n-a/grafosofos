import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Article } from './article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl: string = 'https://grafosofos-webapi-production.up.railway.app/api/articles';
  //private apiUrl: string = 'http://localhost:8080/api/articles';

  constructor(private http: HttpClient) {
    
   }

  // Fetch all articles
  /*getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }*/

  // Fetch a single article by ID
  getArticleById(articleId: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${articleId}`);
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl).pipe(
      retry(3), // Retry up to 3 times before failing
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }

  // Method to submit new article data to the backend
  submitArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }
}
