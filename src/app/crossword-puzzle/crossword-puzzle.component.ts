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
    { word: "EDITING", row: 0, col: 5, direction: "H", clue: "Process of reviewing written material.", number: 1 },
    { word: "JOURNAL", row: 4, col: 15, direction: "V", clue: "A periodical publication.", number: 2 },
    { word: "COLUMN", row: 6, col: 13, direction: "V", clue: "A recurring article.", number: 3 },
    { word: "SOURCES", row: 4, col: 4, direction: "H", clue: "People or documents.", number: 4 },
    { word: "TRUTH", row: 2, col: 7, direction: "H", clue: "Being in accordance with fact.", number: 5 },
    { word: "MEDIA", row: 7, col: 6, direction: "H", clue: "Means of mass communication.", number: 6 },
    { word: "REPORTS", row: 3, col: 18, direction: "V", clue: "Documents presenting information in a structured format.", number: 7 },
    { word: "HEADLINE", row: 3, col: 0, direction: "H", clue: "A title of a news article, often designed to grab attention.", number: 8 },
    { word: "INTERVIEW", row: 0, col: 7, direction: "V", clue: "A conversation where questions are asked to obtain information.", number: 9 },
    { word: "CONCLUSION", row: 6, col: 10, direction: "H", clue: "The final part of a piece of writing, summarizing the main points.", number: 10 },
    { word: "CAPTION", row: 6, col: 10, direction: "V", clue: "A brief explanation or description accompanying an illustration.", number: 11 },
    { word: "VOCABULARY", row: 0, col: 2, direction: "V", clue: "The set of words known and used by a person or group.", number: 12 },
  ];
  
  grid: { letter: string, number?: number }[][] = [];
  isChecking = false; // Track if checking answers
  correctAnswers: boolean[] = []; // Track if each answer is correct

  ngOnInit(): void {
    this.initializeGrid();
    this.placeWords();
  }

  // Initialize a 20x20 grid with empty cells
  initializeGrid() {
    this.grid = Array.from({ length: 20 }, () =>
      Array.from({ length: 20 }, () => ({ letter: '', number: undefined }))
    );
  }

  // Place words on the grid, ensuring that intersections are properly handled
  placeWords() {
    this.crossword.forEach(({ word, row, col, direction, number }) => {
      for (let i = 0; i < word.length; i++) {
        let currentRow = row;
        let currentCol = col;

        // Determine the cell based on direction
        if (direction === 'H') {
          currentCol += i; // For horizontal words, increment the column
        } else if (direction === 'V') {
          currentRow += i; // For vertical words, increment the row
        }

        const currentLetter = word[i];
        const cell = this.grid[currentRow][currentCol];

        // Place the letter if the cell is empty or the letter matches
        this.grid[currentRow][currentCol] = { letter: currentLetter, number: i === 0 ? number : cell.number };
      }
    });
  }

  // Check answers function
  checkAnswers() {
    this.isChecking = true; // Enable checking mode
    this.correctAnswers = this.crossword.map((word, index) => {
      const userInput = this.grid[word.row].slice(word.col, word.col + word.word.length).map(c => c.letter).join('');
      return userInput === word.word; // Check if user's input matches the word
    });
  }
}

