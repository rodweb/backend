import { Account } from "./";

export interface IAccountFactory {
  create: (accountName: string) => Account;
}
