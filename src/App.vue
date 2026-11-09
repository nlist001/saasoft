<script setup lang="ts">
import { useAccountStore } from '@/stores/account'
import AccountItem from './components/AccountItem.vue'
import Button from 'primevue/button'
import { AccountTableHeader } from '@/models/account.model'

const { accountList, addNewAccount } = useAccountStore()
const accountTableHeader = new AccountTableHeader()
</script>

<template>
  <h1>Тестовое задание для Vue Frontend Developer</h1>
  <Button
    label="Учетные записи"
    @click="addNewAccount"
    icon="pi pi-plus"
    class="mb-5"
    iconPos="right"
  />
  <div class="flex gap-1 flex-nowrap pr-5 mb-2">
    <div v-for="(item, key) in accountTableHeader" :key="key" class="w-full pl-1">{{ item }}</div>
  </div>
  <AccountItem v-for="item in accountList" :key="item.id" :item="item"></AccountItem>
</template>
