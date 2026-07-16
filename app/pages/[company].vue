<script setup lang="ts">
import {
  COMPANY_ROUTES,
  COMPANY_SHORT_LABELS,
  type CompanySlug,
} from '~/constants/leaderboard'
import { isValidCompanySlug } from '~/utils/companies'

definePageMeta({
  ssr: false,
  validate(route) {
    return isValidCompanySlug(String(route.params.company ?? ''))
  },
})

const route = useRoute()
const companySlug = computed(() => route.params.company as CompanySlug)

const seoTitle = computed(() => {
  const fullName = COMPANY_ROUTES[companySlug.value]
  return `${COMPANY_SHORT_LABELS[fullName]} — Kalbe Donor Kalori Leaderboard`
})

const seoDescription = computed(() => {
  const fullName = COMPANY_ROUTES[companySlug.value]
  return `Track the best performers from ${fullName}.`
})

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
})
</script>

<template>
  <LeaderboardPage
    :key="companySlug"
    :company-slug="companySlug"
  />
</template>
