// quiz-question.model.ts

export interface QuizQuestion {
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Question {
  id: number;
  lesson: string;
  questionText: string;
  correctAnswer: string;
  type: string;
  optionsList: string[];

}
