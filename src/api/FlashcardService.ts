import { axios } from "./axiosConfig.ts";

export interface FlashcardPage {
  list: Flashcard[];
  pageNo: number;
  pageSize: number;
  totalElement: number;
  totalPages: number;
  isLast: boolean;
}

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  cardSetId: number;
  nextDate: string;
}

interface FlashcardReq {
  front: string;
  back: string;
  cardSetId: number;
}

export type ScoreNums = -1 | 0 | 1;

export interface Score {
  score: ScoreNums;
}

export default class FlashcardService {
  static async createFlashcard(req: FlashcardReq) {
    return await axios.post<Flashcard>("/flashcards", req);
  }

  static async deleteFlashcard(id: number) {
    return await axios.delete<void>(`/flashcards/${id}`);
  }

  static async updateFlashcard(id: number, req: FlashcardReq) {
    return await axios.patch<Flashcard>(`/flashcards/${id}`, req);
  }

  static async updateProgress(id: number, req: number) {
    const score = { score: req } as Score;
    return await axios.put(`/flashcards/${id}/progress`, score);
  }
}
