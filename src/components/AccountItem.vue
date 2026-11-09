<script setup lang="ts">
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import { reactive, ref } from 'vue'
import { Account, type IAccount } from '@/models/account.model'
import Toast from 'primevue/toast'
import Message from 'primevue/message'
import Button from 'primevue/button'
import { Form } from '@primevue/forms'
import { useToast } from 'primevue/usetoast'
import { accountType, AccountTypeEnum } from '@/models/constants.model'
import { useAccountStore } from '@/stores/account'
import { errorsValidation } from '@/utils/errors'
import { required } from '@vuelidate/validators'
import { Password } from 'primevue'

const toast = useToast()
const accountTypeRef = ref(accountType)
const { delAccount, updateAccount } = useAccountStore()

const { item } = defineProps<{ item: IAccount }>()
const initialValues = reactive(item)

const resolver = ({ values }) => {
  const updatedAccountData = structuredClone({ ...item, ...values })

  const errors = errorsValidation(values, {
    login: ['required', 'maxLength:100', 'minLength:3'],
    password: ['required', 'maxLength:100', 'minLength:3']
  })
  console.log('errors', errors)
  console.log('values', values)

  if (values.accountType == AccountTypeEnum.LDAP) {
    errors['password'] && delete errors.password
    delete updatedAccountData.password
  }

  if (!Object.keys(errors).length) {
    updateAccount(new Account(updatedAccountData))
  }
  return {
    values, // (Optional) Used to pass current form values to submit event.
    errors,
  }
}

const onFormSubmit = ({ valid, values }) => {
  if (valid) {
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000,
    })
    //userStore.singin(values)
  }
}
</script>
<template>
  <Toast />
  <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex gap-3 flex-col mb-1 w-full">
    <div class="flex gap-1 flex-nowrap w-full">
      <InputText name="label" type="text" placeholder="Значение" fluid
        v-tooltip.top="{ value: $form?.label?.error?.message }" />
      <Select name="accountType" :options="accountTypeRef" :default-value="initialValues.accountType"
        placeholder="Выбери" class="w-50rem" fluid v-tooltip.top="{ value: $form?.accountTypeRef?.error?.message }" />
      <div class="flex gap-1 flex-nowrap flex-grow-1" style="min-width: 35%">
        <InputText name="login" type="text" placeholder="Логин" fluid
          v-tooltip.top="{ value: $form?.login?.error?.message }" />

        <InputText v-if="$form.accountType?.value == AccountTypeEnum.Локальная" name="password" type="password"
          placeholder="Пароль" fluid v-tooltip.top="{ value: $form?.password?.error?.message }" />
      </div>
      <Button type="button" @click="delAccount(item)" icon="pi pi-trash" aria-label="Удалить" class="w-10rem" />
    </div>


  </Form>
</template>
