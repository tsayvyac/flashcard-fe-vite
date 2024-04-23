import { axios } from "./axiosConfig.ts";

export interface SetList {
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
  static async getSets(page: number): Promise<SetList> {
    const res = await axios.get<SetList>(`/sets?page=${page}&size=11`);
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
}
