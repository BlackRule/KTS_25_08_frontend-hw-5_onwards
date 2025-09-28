import type { Category } from '@/shared/api'
import type { Option } from '@/shared/components/MultiDropdown'

export const categoryToOption = (category: Category): Option => ({
  key: String(category.id),
  value: category.name,
})
