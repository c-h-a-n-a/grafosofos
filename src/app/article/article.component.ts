import { Component, OnInit } from '@angular/core';
import { Article } from '../article.model';
import { ArticleService } from '../article.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {

  articles: Article[] = [];

  currentPage = 0;
  pageSize = 15;
  totalPages = 0;

  constructor(private articleService: ArticleService, private router: Router, private route: ActivatedRoute) {
    // Disable route reuse strategy to ensure full reinitialization
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    //this.loadArticles();
    this.loadArticlesByPage();
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe(
      (data) => {
        this.articles = data;
        console.log(this.articles);
      },
      (error) => {
        console.error('Error fetching articles', error);
        // Additional error handling if needed
      }
    );
  }

  goToCreateArticle() {
    this.router.navigate(['article/create-article']);
  }

  loadArticlesByPage() {
    this.articleService.getArticlesByPage(this.currentPage, this.pageSize)
      .subscribe(data => {
        this.articles = data.content;
        this.totalPages = data.totalPages;
      });
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadArticlesByPage();
    }
  }
  
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadArticlesByPage();
    }
  }
}
