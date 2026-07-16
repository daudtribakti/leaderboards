export const ALLOWED_COMPANIES = [
  'PT Agroveta Husada Dharma',
  'Corporate Function',
] as const

export type AllowedCompany = (typeof ALLOWED_COMPANIES)[number]

export const COMPANY_ROUTES = {
  agroveta: 'PT Agroveta Husada Dharma',
  corporate: 'Corporate Function',
} as const

export type CompanySlug = keyof typeof COMPANY_ROUTES

export const COMPANY_SLUGS = Object.keys(COMPANY_ROUTES) as CompanySlug[]

export const API_URLS = {
  male: 'https://event.cause.id/kalbedonorkalori/leaderboard-top-male.php',
  female: 'https://event.cause.id/kalbedonorkalori/leaderboard-top-female.php',
} as const

export const REFRESH_INTERVAL_MS = 60_000

/** Minimum time splash stays visible so progress/enter animations are visible */
export const MIN_SPLASH_MS = 3_000

export const COMPANY_SHORT_LABELS: Record<AllowedCompany, string> = {
  'PT Agroveta Husada Dharma': 'Agroveta',
  'Corporate Function': 'Corporate',
}

/** Label for calories calculated from heart rate data (API `total_points`). */
export const HEART_RATE_CALORIES_LABEL = 'Kalori HR'

/** Leaderboard developer display name override */
export const DEVELOPER_EMPLOYEE_NAME = 'Daud Tri Bakti Purba'
