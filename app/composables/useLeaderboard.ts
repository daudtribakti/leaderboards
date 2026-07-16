import { REFRESH_INTERVAL_MS } from '~/constants/leaderboard'
import type {
  CompanyFilter,
  GenderFilter,
  LeaderboardApiResponse,
  SortBy,
} from '~/types/leaderboard'
import {
  applyCompanyFilter,
  applyGenderFilter,
  computeStats,
  enrichEntries,
  filterByAllowedCompanies,
  parseRow,
  processLeaderboard,
  recalculateRanks,
  sortEntries,
  applySearch,
} from '~/utils/leaderboard'

export function useLeaderboard() {
  const genderFilter = useState<GenderFilter>('lb-gender', () => 'all')
  const companyFilter = useState<CompanyFilter>('lb-company', () => 'all')
  const searchQuery = useState<string>('lb-search', () => '')
  const sortBy = useState<SortBy>('lb-sort', () => 'points')
  const lastUpdatedAt = useState<Date | null>('lb-updated', () => null)

  const { data, pending, error, refresh, status } = useAsyncData(
    'leaderboard',
    async () => {
      const [male, female] = await Promise.all([
        $fetch<LeaderboardApiResponse>('/api/leaderboard/male', { timeout: 60_000 }),
        $fetch<LeaderboardApiResponse>('/api/leaderboard/female', { timeout: 60_000 }),
      ])

      const maleEntries = (male.data ?? []).map(row => parseRow(row, 'male'))
      const femaleEntries = (female.data ?? []).map(row => parseRow(row, 'female'))
      const all = [...maleEntries, ...femaleEntries]
      const base = filterByAllowedCompanies(all)

      lastUpdatedAt.value = new Date()

      return { base }
    },
    {
      server: false,
      lazy: false,
    },
  )

  // Auto-refresh every 60s (client only)
  onMounted(() => {
    const { pause, resume } = useIntervalFn(() => {
      refresh()
    }, REFRESH_INTERVAL_MS, { immediate: false })

    resume()

    useEventListener(document, 'visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        refresh()
        resume()
      }
      else {
        pause()
      }
    })
  })

  const baseEntries = computed(() => data.value?.base ?? [])

  const hasLoaded = computed(() => data.value !== null && data.value !== undefined)
  const isLoading = computed(() => !hasLoaded.value && !error.value)
  const hasError = computed(() => !!error.value)

  const filteredBeforeSearch = computed(() => {
    let result = [...baseEntries.value]
    result = applyCompanyFilter(result, companyFilter.value)
    result = applyGenderFilter(result, genderFilter.value)
    return recalculateRanks(result)
  })

  const filteredEntries = computed(() => {
    return processLeaderboard(baseEntries.value, {
      gender: genderFilter.value,
      company: companyFilter.value,
      search: searchQuery.value,
      sortBy: sortBy.value,
    })
  })

  const topThree = computed(() => {
    const ranked = filteredBeforeSearch.value
    const searched = applySearch(ranked, searchQuery.value)
    const byPoints = sortEntries(searched, 'points')
    return enrichEntries(byPoints).slice(0, 3)
  })

  const restEntries = computed(() => {
    const topKeys = new Set(topThree.value.map(e => `${e.gender}-${e.employeeId}`))
    return filteredEntries.value.filter(e => !topKeys.has(`${e.gender}-${e.employeeId}`))
  })

  const stats = computed(() =>
    computeStats(baseEntries.value, filteredBeforeSearch.value),
  )

  const isEmpty = computed(
    () => hasLoaded.value && filteredEntries.value.length === 0,
  )

  return {
    genderFilter,
    companyFilter,
    searchQuery,
    sortBy,
    lastUpdatedAt,
    pending,
    error,
    status,
    refresh,
    baseEntries,
    filteredEntries,
    topThree,
    restEntries,
    stats,
    isEmpty,
    hasError,
    hasLoaded,
    isLoading,
  }
}

export type UseLeaderboardReturn = ReturnType<typeof useLeaderboard>
