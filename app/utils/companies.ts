import {
  COMPANY_ROUTES,
  COMPANY_SHORT_LABELS,
  type AllowedCompany,
  type CompanySlug,
} from '~/constants/leaderboard'

export function isValidCompanySlug(slug: string): slug is CompanySlug {
  return Object.prototype.hasOwnProperty.call(COMPANY_ROUTES, slug)
}

export function resolveCompanyFromSlug(slug: CompanySlug): AllowedCompany {
  return COMPANY_ROUTES[slug]
}

export function companyShortLabel(slug: CompanySlug): string {
  return COMPANY_SHORT_LABELS[COMPANY_ROUTES[slug]]
}
