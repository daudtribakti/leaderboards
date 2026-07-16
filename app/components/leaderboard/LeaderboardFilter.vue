<script setup lang="ts">
import { Search, X, ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import type { CompanyFilter, GenderFilter, SortBy } from '~/types/leaderboard'

const genderFilter = defineModel<GenderFilter>('gender', { required: true })
const companyFilter = defineModel<CompanyFilter>('company', { required: true })
const searchQuery = defineModel<string>('search', { required: true })
const sortBy = defineModel<SortBy>('sort', { required: true })

const localSearch = ref(searchQuery.value)
const searchOpen = ref(false)
const { width } = useWindowSize()

// Auto-expand search on desktop
watch(width, (w) => {
  if (w >= 768) searchOpen.value = true
}, { immediate: true })

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
    class="sticky top-[68px] z-30 mx-auto w-full max-w-7xl px-4 sm:top-[76px] sm:px-6 lg:px-8"
  >
    <h2 id="filter-heading" class="sr-only">
      Filter and sort leaderboard
    </h2>

    <div class="glass-panel border-white/15 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:p-5">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-4">
        <!-- Gender -->
        <div class="min-w-0 flex-1">
          <label class="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/45 sm:text-xs">
            Gender
          </label>
          <div
            class="flex rounded-2xl border border-white/10 bg-white/[0.04] p-1"
            role="group"
            aria-label="Gender filter"
          >
            <button
              v-for="option in genderOptions"
              :key="option.value"
              type="button"
              class="flex-1 cursor-pointer rounded-xl px-2.5 py-2 text-sm font-semibold transition-all duration-200 sm:px-3 sm:py-2.5"
              :class="genderFilter === option.value
                ? 'bg-[var(--kalbe-red)] text-white shadow-neon-red'
                : 'text-white/55 hover:bg-white/5 hover:text-white'"
              :aria-pressed="genderFilter === option.value"
              @click="genderFilter = option.value"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <!-- Company -->
        <div class="min-w-0 flex-1">
          <label class="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/45 sm:text-xs">
            Company
          </label>
          <div
            class="flex rounded-2xl border border-white/10 bg-white/[0.04] p-1"
            role="group"
            aria-label="Company filter"
          >
            <button
              v-for="option in companyOptions"
              :key="option.value"
              type="button"
              class="flex-1 cursor-pointer rounded-xl px-2 py-2 text-sm font-semibold transition-all duration-200 sm:px-3 sm:py-2.5"
              :class="companyFilter === option.value
                ? 'bg-neon-purple/90 text-white shadow-neon-purple'
                : 'text-white/55 hover:bg-white/5 hover:text-white'"
              :aria-pressed="companyFilter === option.value"
              :title="option.label"
              @click="companyFilter = option.value"
            >
              <span class="xl:hidden">{{ option.short }}</span>
              <span class="hidden xl:inline">{{ option.label === 'All' ? 'All Companies' : option.short }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile toggle for search -->
      <button
        type="button"
        class="mt-3 flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white/60 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white md:hidden"
        :aria-expanded="searchOpen"
        @click="searchOpen = !searchOpen"
      >
        <span class="inline-flex items-center gap-2 font-medium">
          <Search class="h-4 w-4" aria-hidden="true" />
          Search &amp; Sort
        </span>
        <ChevronDown
          class="h-4 w-4 transition-transform duration-200"
          :class="searchOpen ? 'rotate-180' : ''"
          aria-hidden="true"
        />
      </button>

      <div
        v-show="searchOpen"
        class="mt-3 grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px]"
      >
        <div>
          <label for="employee-search" class="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/45 sm:text-xs">
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

        <div>
          <label for="sort-by" class="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/45 sm:text-xs">
            Sort by
          </label>
          <div class="relative">
            <ArrowUpDown class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
            <select
              id="sort-by"
              v-model="sortBy"
              class="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-8 text-sm text-white transition-colors duration-200 focus:border-[var(--gold)]/50"
            >
              <option
                v-for="option in sortOptions"
                :key="option.value"
                :value="option.value"
                class="bg-[#1a1a2e] text-white"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
