"use client"

import { useHR } from "@/contexts/hr-context"
import { useToast } from "@/hooks/use-toast"

export function useBookmarks() {
  const { state, dispatch } = useHR()
  const { toast } = useToast()

  const toggleBookmark = (employeeId: number) => {
    const employee = state.employees.find((emp) => emp.id === employeeId)
    if (employee) {
      dispatch({ type: "TOGGLE_BOOKMARK", payload: employeeId })
      toast({
        title: employee.isBookmarked ? "Bookmark Removed" : "Bookmark Added",
        description: `${employee.firstName} ${employee.lastName} ${
          employee.isBookmarked ? "removed from" : "added to"
        } bookmarks.`,
      })
    }
  }

  const promoteEmployee = (employeeId: number) => {
    const employee = state.employees.find((emp) => emp.id === employeeId)
    if (employee) {
      dispatch({ type: "PROMOTE_EMPLOYEE", payload: employeeId })
      toast({
        title: "Employee Promoted",
        description: `${employee.firstName} ${employee.lastName} has been promoted!`,
      })
    }
  }

  return {
    bookmarkedEmployees: state.bookmarkedEmployees,
    toggleBookmark,
    promoteEmployee,
  }
}
