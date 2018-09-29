import { Account } from "./";

interface IResult<T> {
  ok: boolean;
  error?: string;
  value: T | undefined;
}

class AccountValidator {
  public validate(account: Account): IResult<Account> {
    return { ok: true, value: undefined };
  }
}

export {
  AccountValidator,
};
