import { axios } from "./axiosConfig.ts";
import { Flashcard, FlashcardPage } from "@/api/FlashcardService.ts";

export interface SetPage {
  list: Set[];
  pageNo: number;
  pageSize: number;
  totalElement: number;
  totalPages: number;
  isLast: boolean;
}

export interface Set {
  id: number;
  name: string;
  countRep: number;
  countAll: number;
}

export default class CardSetService {
  static async getSets(page: number) {
    const res = await axios.get<SetPage>(`/sets?page=${page}&size=11`);
    return res.data;
  }

  static async getSetById(id: number) {
    const res = await axios.get<Set>(`/sets/${id}`);
    return res.data;
  }

  static async getRepSets(page: number) {
    const res = await axios.get<SetPage>(`/sets/rep?page=${page}&size=10`);
    return res.data;
  }

  static async getCardsInSet(id: number, page: number) {
    const res = await axios.get<FlashcardPage>(
      `/sets/${id}/flashcards?page=${page}&size=12`
    );
    return res.data;
  }

  static async getAllCardSets() {
    const res = await axios.get<Set[]>("/sets/all");
    return res.data;
  }

  static async postSet(req: { name: string }) {
    return await axios.post<Set>("/sets", req);
  }

  static async deleteSet(id: number) {
    return await axios.delete<void>(`/sets/${id}`);
  }

  static async renameSet(id: number, req: { name: string }) {
    return await axios.patch<Set>(`/sets/${id}`, req);
  }

  static async getAllCards(id: number, isCram: boolean) {
    const res = isCram
      ? await axios.get<Flashcard[]>(`/sets/${id}/cram`)
      : await axios.get<Flashcard[]>(`/sets/${id}/repetition`);
    return res.data;
  }
}
