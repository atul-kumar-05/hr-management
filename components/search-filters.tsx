"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, X } from "lucide-react"
import { useHR } from "@/contexts/hr-context"
import { useSearch } from "@/hooks/use-search"

export function SearchFilters() {
  const { dispatch } = useHR()
  const { searchTerm, selectedDepartments, selectedRatings, departments } = useSearch()

  const handleSearchChange = (value: string) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: value })
  }

  const handleDepartmentToggle = (department: string) => {
    const updated = selectedDepartments.includes(department)
      ? selectedDepartments.filter((d) => d !== department)
      : [...selectedDepartments, department]
    dispatch({ type: "SET_SELECTED_DEPARTMENTS", payload: updated })
  }

  const handleRatingToggle = (rating: number) => {
    const updated = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating]
    dispatch({ type: "SET_SELECTED_RATINGS", payload: updated })
  }

  const clearFilters = () => {
    dispatch({ type: "SET_SEARCH_TERM", payload: "" })
    dispatch({ type: "SET_SELECTED_DEPARTMENTS", payload: [] })
    dispatch({ type: "SET_SELECTED_RATINGS", payload: [] })
  }

  const hasActiveFilters = searchTerm || selectedDepartments.length > 0 || selectedRatings.length > 0

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Departments
                {selectedDepartments.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedDepartments.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Department</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {departments.map((department) => (
                <DropdownMenuCheckboxItem
                  key={department}
                  checked={selectedDepartments.includes(department)}
                  onCheckedChange={() => handleDepartmentToggle(department)}
                >
                  {department}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Rating
                {selectedRatings.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedRatings.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Rating</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[5, 4, 3, 2, 1].map((rating) => (
                <DropdownMenuCheckboxItem
                  key={rating}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={() => handleRatingToggle(rating)}
                >
                  {rating} Star{rating !== 1 ? "s" : ""}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary">
              Search: {searchTerm}
              <Button variant="ghost" size="sm" className="h-auto p-0 ml-2" onClick={() => handleSearchChange("")}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {selectedDepartments.map((dept) => (
            <Badge key={dept} variant="secondary">
              {dept}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-2"
                onClick={() => handleDepartmentToggle(dept)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {selectedRatings.map((rating) => (
            <Badge key={rating} variant="secondary">
              {rating} Star{rating !== 1 ? "s" : ""}
              <Button variant="ghost" size="sm" className="h-auto p-0 ml-2" onClick={() => handleRatingToggle(rating)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
