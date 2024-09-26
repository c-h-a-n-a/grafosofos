import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { crosswordData } from './crossword-data';

interface CrosswordWord {
  word: string;
  row: number;
  col: number;
  direction: 'H' | 'V';  // 'H' for Horizontal, 'V' for Vertical
  clue: string;
  number: number;
}

@Component({
  selector: 'app-crossword-puzzle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crossword-puzzle.component.html',
  styleUrl: './crossword-puzzle.component.css'
})
export class CrosswordPuzzleComponent implements OnInit {
  crossword: CrosswordWord[] = [
    { word: "EDITING", row: 0, col: 0, direction: "H", clue: "Process of reviewing written material.", number: 1 },
    { word: "JOURNAL", row: 1, col: 1, direction: "H", clue: "A periodical publication.", number: 2 },
    { word: "COLUMN", row: 3, col: 4, direction: "H", clue: "A recurring article.", number: 3 },
    { word: "SOURCES", row: 4, col: 0, direction: "H", clue: "People or documents.", number: 4 },
    { word: "TRUTH", row: 0, col: 8, direction: "V", clue: "Being in accordance with fact.", number: 5 },
    { word: "MEDIA", row: 3, col: 6, direction: "V", clue: "Means of mass communication.", number: 6 }
  ];

  grid: { letter: string, number?: number }[][] = [];

  ngOnInit(): void {
    this.initializeGrid();
    this.placeWords();
  }

  // Initialize a 10x10 grid with empty cells
  initializeGrid() {
    this.grid = Array.from({ length: 10 }, () => Array(10).fill({ letter: '' }));
  }

  // Place words on the grid, ensuring that intersections are properly handled
  placeWords() {
    this.crossword.forEach(({ word, row, col, direction, number }) => {
      for (let i = 0; i < word.length; i++) {
        let currentRow = row;
        let currentCol = col;

        if (direction === 'H') {
          currentCol += i;
        } else if (direction === 'V') {
          currentRow += i;
        }

        const currentLetter = word[i];
        const cell = this.grid[currentRow][currentCol];

        // Only place the letter if the cell is empty or has the same letter (intersection)
        if (!cell.letter || cell.letter === currentLetter) {
          this.grid[currentRow][currentCol] = { letter: currentLetter, number: i === 0 ? number : cell.number };
        }
      }
    });
  }
}

