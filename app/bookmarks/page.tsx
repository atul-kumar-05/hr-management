"use client"

import { EmployeeCard } from "@/components/employee-card"
import { useBookmarks } from "@/hooks/use-bookmarks"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bookmark, Users } from "lucide-react"

export default function BookmarksPage() {
  const { bookmarkedEmployees } = useBookmarks()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
          <p className="text-muted-foreground mt-2">Manage your bookmarked employees and quick actions</p>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Bookmark className="h-5 w-5" />
          <span>{bookmarkedEmployees.length} bookmarked</span>
        </div>
      </div>

      {bookmarkedEmployees.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Bookmarked Employees</h3>
            <p className="text-muted-foreground text-center mb-4">
              You haven't bookmarked any employees yet. Bookmark employees from the dashboard to see them here.
            </p>
            <Button asChild>
              <a href="/">Go to Dashboard</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>

          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Quick Actions</h3>
              <p className="text-sm text-muted-foreground mb-4">Perform bulk actions on your bookmarked employees</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Assign to Project
                </Button>
                <Button variant="outline" size="sm">
                  Schedule Review
                </Button>
                <Button variant="outline" size="sm">
                  Send Message
                </Button>
                <Button variant="outline" size="sm">
                  Export List
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
