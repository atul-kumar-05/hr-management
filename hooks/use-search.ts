"use client"

import { useMemo } from "react"
import { useHR } from "@/contexts/hr-context"

export function useSearch() {
  const { state } = useHR()
  const { employees, searchTerm, selectedDepartments, selectedRatings } = state

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.company.department.toLowerCase().includes(searchTerm.toLowerCase())

      // Department filter
      const matchesDepartment =
        selectedDepartments.length === 0 || selectedDepartments.includes(employee.company.department)

      // Rating filter
      const matchesRating =
        selectedRatings.length === 0 || selectedRatings.some((rating) => Math.floor(employee.rating) === rating)

      return matchesSearch && matchesDepartment && matchesRating
    })
  }, [employees, searchTerm, selectedDepartments, selectedRatings])

  const departments = useMemo(() => {
    return Array.from(new Set(employees.map((emp) => emp.company.department)))
  }, [employees])

  return {
    filteredEmployees,
    departments,
    searchTerm,
    selectedDepartments,
    selectedRatings,
  }
}
