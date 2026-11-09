import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Account, type IAccount } from '@/models/account.model'
import { AccountTypeEnum } from '@/models/constants.model'

export const useAccountStore = defineStore(
  'account',
  () => {
    const accountList = ref<IAccount[]>([
      new Account({ label: 'testLabel', login: 'testLogin' }),
      new Account({ label: 'testLabel2', login: 'testLogin2', accountType: AccountTypeEnum.LDAP }),
    ])

    function addNewAccount() {
      accountList.value.push(new Account())
    }
    function delAccount(item: IAccount) {
      const i = accountList.value.findIndex((el) => el.id == item.id)
      accountList.value.splice(i, 1)
    }

    function updateAccount(item: IAccount) {
      const i = accountList.value.findIndex((el) => el.id == item.id)
      console.log('updateAccount', item)
      accountList.value[i] = item
    }

    return { accountList, addNewAccount, delAccount, updateAccount }
  },
  {
    persist: true,
  },
)
