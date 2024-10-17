import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { crosswordData } from './crossword-data';

interface Word {
  text: string;
  x: number;
  y: number;
  direction: 'horizontal' | 'vertical';
}

// Define the Clue type
interface Clue {
  index: number;
  text: string;
}


@Component({
  selector: 'app-crossword-puzzle',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './crossword-puzzle.component.html',
  styleUrl: './crossword-puzzle.component.css'
})
export class CrosswordPuzzleComponent implements OnInit {
  ngOnInit(): void {

  }
  // Initialize the grid with null values
  grid: (string | null)[][] = Array(10).fill(null).map(() => Array(10).fill(null));

  // Define words with their respective placements and starting positions
  wordsAcross = [
    { word: 'VOCABULARY', row: 1, col: 0, clue: 'The body of words used in a particular language.', startIndex: 1 },
    { word: 'INTERVIEW', row: 9, col: 0, clue: 'A meeting of people face to face, especially for consultation.', startIndex: 2 },
    { word: 'CAPTION', row: 0, col: 1, clue: 'A brief explanation appended to an article, illustration, cartoon, or poster.', startIndex: 3 },
    { word: 'COLON', row: 8, col: 0, clue: 'A punctuation mark used to precede a list of items, a quotation, or an expansion or explanation.', startIndex: 4 },
    { word: 'COLUMN', row: 3, col: 1, clue: 'An upright pillar or a vertical division of a page or text.', startIndex: 5 }
  ];

  wordsDown = [
    { word: 'CONCLUSION', row: 0, col: 1, clue: 'The end or finish of an event or process.', startIndex: 1 },
    { word: 'MEDIA', row: 3, col: 5, clue: 'The main means of mass communication.', startIndex: 2 },
    { word: 'NEWS', row: 3, col: 6, clue: 'Newly received or noteworthy information, especially about recent events.', startIndex: 3 },
    { word: 'REPORTS', row: 1, col: 8, clue: 'Give a spoken or written account of something that one has observed, heard, done, or investigated.', startIndex: 4 },
    { word: 'BYLINE', row: 0, col: 9, clue: 'A line in a newspaper naming the writer of an article.', startIndex: 5 }
  ];

  acrossClues: { index: number; text: string }[] = [];
  downClues: { index: number; text: string }[] = [];
  answers: (string | null)[][] = Array(10).fill(null).map(() => Array(10).fill(null));

  constructor() {
    this.fillGrid();
    this.setClues();
  }

  fillGrid() {
    // Fill across words
    this.wordsAcross.forEach(({ word, row, col }) => {
      for (let i = 0; i < word.length; i++) {
        this.grid[row][col + i] = word[i]; // Fill with actual letters for across words
      }
    });

    // Fill down words
    this.wordsDown.forEach(({ word, row, col }) => {
      for (let i = 0; i < word.length; i++) {
        // Only fill if it's not already filled by an across word
        if (!this.grid[row + i][col]) {
          this.grid[row + i][col] = ''; // Initialize empty if not filled by across
        }
      }
    });
  }

  setClues() {
    // Assign clues with index numbers
    this.acrossClues = this.wordsAcross.map((wordObj, index) => ({
      index: wordObj.startIndex,
      text: wordObj.clue
    }));
    this.downClues = this.wordsDown.map((wordObj, index) => ({
      index: wordObj.startIndex,
      text: wordObj.clue
    }));
  }

  updateCell(event: Event, row: number, col: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.toUpperCase(); // Convert input to uppercase

    // Only update the grid cell if the input is valid (1 character)
    if (value.length <= 1) {
      this.answers[row][col] = value; // Update answers with the input value
    }
  }

  isCellInput(row: number, col: number): boolean {
    // Check if the cell is supposed to be an input box
    const isAcross = this.wordsAcross.some(word => word.row === row && col >= word.col && col < word.col + word.word.length);
    const isDown = this.wordsDown.some(word => word.col === col && row >= word.row && row < word.row + word.word.length);
    return isAcross || isDown;
  }

  checkAnswers() {
    let correctWordCount = 0;
    let totalCorrectWord = 10;

    // Check across answers
    this.wordsAcross.forEach(({ word, row, col }) => {
      let isCorrect = true; // Assume the word is correct until proven otherwise
      for (let i = 0; i < word.length; i++) {
        if (this.answers[row][col + i] !== word[i]) {
          isCorrect = false; // If any letter is incorrect, mark the word as incorrect
          break;
        }
      }
      if (isCorrect) {
        correctWordCount++; // Increment for each correct word
      }
    });

    // Check down answers
    this.wordsDown.forEach(({ word, row, col }) => {
      let isCorrect = true; // Assume the word is correct until proven otherwise
      for (let i = 0; i < word.length; i++) {
        if (this.answers[row + i][col] !== word[i]) {
          isCorrect = false; // If any letter is incorrect, mark the word as incorrect
          break;
        }
      }
      if (isCorrect) {
        correctWordCount++; // Increment for each correct word
      }
    });

    if (correctWordCount === totalCorrectWord) {
      alert("Congratulations! You got all the answers correct!");
      this.resetCrossword(); // Reset the crossword if all answers are correct
    } else {
      alert(`You have ${correctWordCount} correct answers!`);
    }

  }

  // Method to reset the crossword puzzle
  resetCrossword() {
    // Reset the answers grid to null
    this.answers = Array(10).fill(null).map(() => Array(10).fill(null));

    // Optionally reset the grid if needed (depends on your design)
    // this.grid = Array(10).fill(null).map(() => Array(10).fill(null));

    // You can also call fillGrid() and setClues() if you want to reset the words and clues
    this.fillGrid();
    this.setClues();
  }

  getNumber(row: number, col: number): number | null {
    // Check if the current cell is the start of an across word
    const acrossWord = this.wordsAcross.find(word => word.row === row && word.col === col);
    // Check if the current cell is the start of a down word
    const downWord = this.wordsDown.find(word => word.row === row && word.col === col);

    if (acrossWord) {
      return acrossWord.startIndex; // Return the index for the across word
    } else if (downWord) {
      return downWord.startIndex; // Return the index for the down word
    }
    return null; // Return null if it's not a starting cell
  }


}

