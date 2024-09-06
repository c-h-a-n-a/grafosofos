import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArticleService } from '../article.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-article',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-article.component.html',
  styleUrl: './view-article.component.css'
})
export class ViewArticleComponent {

  article: any;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    const id = articleId ? Number(articleId) : 0; // Convert to number and provide fallback
    this.articleService.getArticleById(id).subscribe((data: any) => {
      this.article = data;
    });
  }

}
