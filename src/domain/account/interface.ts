import { Account } from 'domain/account'

export interface IAccountFactory {
  create: (accountName: string) => Account
}
