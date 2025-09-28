'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { MultiDropdown, type Option } from '@/shared/components/MultiDropdown'
import { QUERY_PARAMS } from '@/shared/config/config'

export type FilterProps = {
  className?: string
  options: Option[]
}

const Filter = ({ options, className }: FilterProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedKeys = searchParams.getAll(QUERY_PARAMS.selectedCategory)
  const selectedOptions = selectedKeys
    .map((key) => options.find((option) => option.key === key) ?? { key, value: key })

  const handleChange = (next: Option[]) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(QUERY_PARAMS.selectedCategory)
    next.forEach((option) => params.append(QUERY_PARAMS.selectedCategory, option.key))
    params.delete(QUERY_PARAMS.page)
    const queryString = params.toString()
    router.push(queryString ? `${pathname}?${queryString}` : pathname)
  }

  return (
    <MultiDropdown
      className={className}
      onChange={handleChange}
      options={options}
      value={selectedOptions}
      generateValueElement={(vals) => (vals.length ? vals.map((v) => v.value).join(', ') : 'Filter')}
      loading={false}
    />
  )
}

export default Filter
