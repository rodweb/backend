import { Budget } from "./";

export interface IBudgetRepository {
  add: (account: Account) => Promise<void>;
  load: (id: string) => Promise<Budget>;
}
