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

type Score = -1 | 0 | 1;

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

  static async updateProgress(id: number, req: Score) {
    return await axios.put(`/flashcard/${id}/progress`, req);
  }
}
