import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { crosswordData } from './crossword-data';

@Component({
  selector: 'app-crossword-puzzle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crossword-puzzle.component.html',
  styleUrl: './crossword-puzzle.component.css'
})
export class CrosswordPuzzleComponent implements OnInit {
  gridSize: number = 10;
  crosswordGrid: { letter: string, isEditable: boolean }[][] = [];

  ngOnInit(): void {
    this.initializeGrid();
    this.fillWords();
  }

  initializeGrid(): void {
    this.crosswordGrid = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => ({ letter: '', isEditable: false }))
    );
  }

  fillWords(): void {
    const crosswordData = [
      { word: 'hello', direction: 'across', row: 1, col: 2 },
      { word: 'world', direction: 'down', row: 1, col: 4 }
    ];

    crosswordData.forEach(({ word, direction, row, col }) => {
      if (direction === 'across') {
        for (let i = 0; i < word.length; i++) {
          this.crosswordGrid[row][col + i] = { letter: '', isEditable: true };
        }
      } else if (direction === 'down') {
        for (let i = 0; i < word.length; i++) {
          this.crosswordGrid[row + i][col] = { letter: '', isEditable: true };
        }
      }
    });
  }

  // Check if the cell is editable
  isCellEditable(row: number, col: number): boolean {
    return this.crosswordGrid[row][col].isEditable;
  }
}

// the letters didn't appear