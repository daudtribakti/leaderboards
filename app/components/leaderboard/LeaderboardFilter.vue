<script setup lang="ts">
import { Search, X, ArrowUpDown } from 'lucide-vue-next'
import type { CompanyFilter, GenderFilter, SortBy } from '~/types/leaderboard'

const genderFilter = defineModel<GenderFilter>('gender', { required: true })
const companyFilter = defineModel<CompanyFilter>('company', { required: true })
const searchQuery = defineModel<string>('search', { required: true })
const sortBy = defineModel<SortBy>('sort', { required: true })

const localSearch = ref(searchQuery.value)
const debounced = useDebounceFn((value: string) => {
  searchQuery.value = value
}, 200)

watch(localSearch, (value) => {
  debounced(value)
})

watch(searchQuery, (value) => {
  if (value !== localSearch.value) localSearch.value = value
})

const genderOptions: { value: GenderFilter, label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

const companyOptions: { value: CompanyFilter, label: string, short: string }[] = [
  { value: 'all', label: 'All', short: 'All' },
  { value: 'PT Agroveta Husada Dharma', label: 'PT Agroveta Husada Dharma', short: 'Agroveta' },
  { value: 'Corporate Function', label: 'Corporate Function', short: 'Corporate' },
]

const sortOptions: { value: SortBy, label: string }[] = [
  { value: 'points', label: 'Highest Calories' },
  { value: 'alpha', label: 'Alphabetical' },
  { value: 'rank', label: 'Current Rank' },
]

function clearSearch() {
  localSearch.value = ''
  searchQuery.value = ''
}
</script>

<template>
  <section
    aria-labelledby="filter-heading"
    class="sticky top-3 z-30 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
  >
    <h2 id="filter-heading" class="sr-only">
      Filter and sort leaderboard
    </h2>

    <div class="glass-panel border-white/15 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:p-5">
      <div class="flex flex-col gap-4">
        <!-- Gender -->
        <div>
          <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/45">
            Gender
          </label>
          <div class="flex flex-wrap gap-2" role="group" aria-label="Gender filter">
            <button
              v-for="option in genderOptions"
              :key="option.value"
              type="button"
              class="cursor-pointer rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200"
              :class="genderFilter === option.value
                ? 'bg-[var(--kalbe-red)] text-white shadow-glow'
                : 'bg-white/5 text-white/65 hover:bg-white/10 hover:text-white'"
              :aria-pressed="genderFilter === option.value"
              @click="genderFilter = option.value"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <!-- Company -->
        <div>
          <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/45">
            Company
          </label>
          <div class="flex flex-wrap gap-2" role="group" aria-label="Company filter">
            <button
              v-for="option in companyOptions"
              :key="option.value"
              type="button"
              class="cursor-pointer rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200"
              :class="companyFilter === option.value
                ? 'bg-accent-blue text-white shadow-[0_0_24px_rgba(59,130,246,0.35)]'
                : 'bg-white/5 text-white/65 hover:bg-white/10 hover:text-white'"
              :aria-pressed="companyFilter === option.value"
              :title="option.label"
              @click="companyFilter = option.value"
            >
              <span class="sm:hidden">{{ option.short }}</span>
              <span class="hidden sm:inline">{{ option.label }}</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
          <!-- Search -->
          <div>
            <label for="employee-search" class="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/45">
              Search employee
            </label>
            <div class="relative">
              <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
              <input
                id="employee-search"
                v-model="localSearch"
                type="search"
                placeholder="Name, employee ID, or sales ID…"
                class="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-white/35 transition-colors duration-200 focus:border-[var(--kalbe-red)]/50 focus:bg-white/[0.08]"
                autocomplete="off"
              >
              <button
                v-if="localSearch"
                type="button"
                class="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Clear search"
                @click="clearSearch"
              >
                <X class="h-4 w-4" />
              </button>
            </div>
          </div>

          <!-- Sort -->
          <div>
            <label for="sort-by" class="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/45">
              Sort by
            </label>
            <div class="relative">
              <ArrowUpDown class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
              <select
                id="sort-by"
                v-model="sortBy"
                class="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-8 text-sm text-white transition-colors duration-200 focus:border-[var(--gold)]/50 md:min-w-[220px]"
              >
                <option
                  v-for="option in sortOptions"
                  :key="option.value"
                  :value="option.value"
                  class="bg-[#121722] text-white"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
