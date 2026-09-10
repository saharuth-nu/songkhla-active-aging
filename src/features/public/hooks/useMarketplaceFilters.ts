"use client"

import { useRouter } from "next/navigation"
import type { ChangeEvent, FormEvent } from "react"
export function useMarketplaceFilters(basePath: string) {
  const router = useRouter()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const params = new URLSearchParams()
    for (const name of ["q", "area", "minPrice", "maxPrice", "sort", "view"]) {
      const value = String(data.get(name) ?? "").trim()
      if (value) params.set(name, value)
    }
    const types = data.getAll("type").map(String).filter(Boolean)
    if (types.length) params.set("type", types.join(","))
    router.push(`${basePath}${params.size ? `?${params}` : ""}`)
  }

  function sort(event: ChangeEvent<HTMLSelectElement>) {
    const url = new URL(window.location.href)
    if (event.target.value === "recommended") url.searchParams.delete("sort")
    else url.searchParams.set("sort", event.target.value)
    router.push(`${url.pathname}${url.search}`)
  }

  function selectAll(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.checked) return
    const form = event.target.form
    form?.querySelectorAll<HTMLInputElement>('input[name="type"]').forEach((input) => {
      input.checked = false
    })
  }

  function selectType(event: ChangeEvent<HTMLInputElement>) {
    const all = event.target.form?.querySelector<HTMLInputElement>("[data-catalog-all-types]")
    if (all && event.target.checked) all.checked = false
  }

  return { selectAll, selectType, sort, submit }
}
