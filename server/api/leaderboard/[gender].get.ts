import { API_URLS } from '~/constants/leaderboard'
import type { Gender, LeaderboardApiResponse } from '~/types/leaderboard'

export default defineEventHandler(async (event) => {
  const gender = getRouterParam(event, 'gender') as Gender | undefined

  if (gender !== 'male' && gender !== 'female') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid gender. Use male or female.',
    })
  }

  const url = API_URLS[gender]

  setHeader(event, 'Cache-Control', 'no-store')

  try {
    const data = await $fetch<LeaderboardApiResponse>(url, {
      // Upstream payload is large (~1MB); allow slow networks
      timeout: 60_000,
      retry: 1,
      retryDelay: 500,
    })

    if (!data?.data || !Array.isArray(data.data)) {
      throw createError({
        statusCode: 502,
        statusMessage: 'Invalid leaderboard response',
      })
    }

    return data
  }
  catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    throw createError({
      statusCode: 502,
      message: 'Failed to fetch leaderboard',
    })
  }
})
