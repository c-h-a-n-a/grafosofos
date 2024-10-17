import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LetterGrid, WordPacker } from './wordpacker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wordhunt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wordhunt.component.html',
  styleUrl: './wordhunt.component.css'
})
export class WordhuntComponent implements OnInit {
  letterGrid: LetterGrid;
  words: string[];
  skippedWords: string[];
  wordsInGrid: string[]; // Words that are placed in the grid
  foundWords: Set<string>; // To track found words
  selectedLetters: boolean[][]; // Explicitly defined as boolean array
  selectedCoords: [number, number][]; // Track selected letter coordinates
  WordPacker: any;
  currentSelectedLetters: { row: number, col: number }[] = []; // Track selected letters in sequence
  selectedWordDirection: { rowDir: number, colDir: number } | null = null; // Direction of word selection

  constructor() {
    this.words = ['headline', 'editing', 'journal', 'radio', 'journalism', 'content', 'grammar'];
    this.skippedWords = [];
    this.wordsInGrid = []; // Initialize wordsInGrid array
    this.letterGrid = [];
    this.foundWords = new Set(); // Initialize the set
    this.selectedLetters = []; // Initialize the selected letters array
    this.selectedCoords = []; // Track the coordinates of selected letters
  }

  ngOnInit() {
    this.initializeGame();
  }

  // Initializes the word grid and resets all states
  initializeGame() {
    const width = 10; // Set your desired width
    const height = 10; // Set your desired height
    const wordPacker = WordPacker.createWordPacker(this.words, width, height);
    this.letterGrid = wordPacker.getLetterGrid();
    this.skippedWords = wordPacker.getSkippedWords();

    // Filter out the skipped words to get words actually in the grid
    this.wordsInGrid = this.words.filter(word => !this.skippedWords.includes(word));

    // Initialize selected letters array
    this.selectedLetters = Array.from({ length: height }, () => Array(width).fill(false));

    // Clear found words
    this.foundWords.clear();

    // Clear selected coordinates
    this.selectedCoords = [];
    this.currentSelectedLetters = []; // Reset the current selected letters
    this.selectedWordDirection = null; // Reset the selected word direction
  }

  selectLetter(row: number, col: number) {
    if (this.selectedLetters[row][col]) {
      // If already selected, unselect it
      this.selectedLetters[row][col] = false;
      this.selectedCoords = this.selectedCoords.filter(
        ([r, c]) => !(r === row && c === col)
      );
      this.currentSelectedLetters = this.currentSelectedLetters.filter(
        coords => !(coords.row === row && coords.col === col)
      );
      this.resetSelection(); // Clear the selection if the letter is unselected
    } else {
      // New selection
      this.selectedLetters[row][col] = true;
      this.selectedCoords.push([row, col]);
      this.currentSelectedLetters.push({ row, col });

      if (this.currentSelectedLetters.length > 1) {
        const lastSelected = this.currentSelectedLetters[this.currentSelectedLetters.length - 2];
        
        // Determine direction if not already set
        if (!this.selectedWordDirection) {
          this.selectedWordDirection = {
            rowDir: row - lastSelected.row,
            colDir: col - lastSelected.col
          };
        }

        // Validate the direction
        if (!this.isValidDirection(row, col, lastSelected)) {
          this.resetSelection(); // Reset if direction is invalid
          return; // Exit early
        }
      }

      // Check if a word can be formed
      this.checkSelectedLetters();
    }
  }

  isValidDirection(row: number, col: number, lastSelected: { row: number, col: number }): boolean {
    const rowDiff = row - lastSelected.row;
    const colDiff = col - lastSelected.col;

    // Ensure the new letter is in the same direction
    return rowDiff === this.selectedWordDirection?.rowDir && colDiff === this.selectedWordDirection?.colDir;
  }

  checkSelectedLetters() {
    const selectedWord = this.getSelectedWord();

    // Check if the word is found in the wordsInGrid list
    if (this.wordsInGrid.includes(selectedWord)) {
      this.foundWords.add(selectedWord); // Add the word to the found set

      // Clear the selected letters after finding a word
      this.clearSelectedLetters();

      // Check if all words have been found
      if (this.foundWords.size === this.wordsInGrid.length) {
        // Trigger grid regeneration if all words are found
        setTimeout(() => {
          alert('Congratulations! You found all the words. Regenerating new grid...');
          this.initializeGame(); // Reset and regenerate the game
        }, 1000);
      }
    }
  }

  getSelectedWord(): string {
    let word = '';
    this.selectedCoords.forEach(([row, col]) => {
      word += this.letterGrid[row][col]; // Build word from selected letters
    });
    return word.toLowerCase(); // Return the formed word
  }

  // Method to reset selected letters
  clearSelectedLetters() {
    this.selectedLetters = this.selectedLetters.map(row => row.map(() => false));
    this.selectedCoords = [];
    this.currentSelectedLetters = []; // Clear current selected letters
    this.selectedWordDirection = null; // Reset the selected word direction
  }

  // Manual reset method for selection
  resetSelection() {
    this.clearSelectedLetters();
  }

  isWordFound(word: string): boolean {
    return this.foundWords.has(word);
  }

}