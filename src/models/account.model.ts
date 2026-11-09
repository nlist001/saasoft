import { BaseModel } from './base.model'
import { AccountTypeEnum } from './constants.model'

export interface IAccount {
  id: string
  label: string
  accountType: AccountTypeEnum
  login: string
  password: string | null
}

export class Account extends BaseModel implements IAccount {
  id = String(Math.round(Math.random() * 100000000))
  label = ''
  accountType = AccountTypeEnum.Локальная
  login = ''
  password = null
  constructor(o?: unknown) {
    super()
    super.checkFields(o)
  }
}

export class AccountTableHeader {
  label = 'Метки'
  accountType = 'Тип записи'
  login = 'Логин'
  password = 'Пароль'
}
