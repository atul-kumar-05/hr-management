"use client"

import { useParams } from "next/navigation"
import { useHR } from "@/contexts/hr-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Mail, Phone, MapPin, Bookmark, TrendingUp } from "lucide-react"
import { useBookmarks } from "@/hooks/use-bookmarks"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function EmployeeDetailsPage() {
  const params = useParams()
  const { state } = useHR()
  const { toggleBookmark, promoteEmployee } = useBookmarks()

  const employee = state.employees.find((emp) => emp.id === Number.parseInt(params.id as string))

  if (!employee) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Employee Not Found</h1>
        <p className="text-muted-foreground mt-2">The requested employee could not be found.</p>
        <Link href="/">
          <Button className="mt-4">Back to Dashboard</Button>
        </Link>
      </div>
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (rating >= 3.5) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    if (rating >= 2.5) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="outline">← Back to Dashboard</Button>
        </Link>
      </div>

      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={employee.image || "/placeholder.svg"}
                alt={`${employee.firstName} ${employee.lastName}`}
              />
              <AvatarFallback className="text-2xl">
                {employee.firstName[0]}
                {employee.lastName[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold">
                  {employee.firstName} {employee.lastName}
                </h1>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => toggleBookmark(employee.id)}
                    className={employee.isBookmarked ? "text-yellow-500" : ""}
                  >
                    <Bookmark className={`h-4 w-4 mr-2 ${employee.isBookmarked ? "fill-current" : ""}`} />
                    {employee.isBookmarked ? "Bookmarked" : "Bookmark"}
                  </Button>
                  <Button onClick={() => promoteEmployee(employee.id)}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Promote
                  </Button>
                </div>
              </div>

              <p className="text-xl text-muted-foreground mb-4">{employee.company.title}</p>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {employee.address.city}, {employee.address.state}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="text-sm">
                  {employee.company.department}
                </Badge>
                <Badge className={getRatingColor(employee.rating)}>{employee.rating.toFixed(1)} Rating</Badge>
                <div className="flex items-center space-x-1">{renderStars(employee.rating)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Age</label>
                  <p>{employee.age} years old</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Address</label>
                  <p>{employee.address.address}</p>
                  <p>
                    {employee.address.city}, {employee.address.state} {employee.address.postalCode}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Department</label>
                  <p>{employee.company.department}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employee.performanceHistory.map((record, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{record.month}</span>
                        <Badge variant="outline">{record.rating.toFixed(1)}</Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Goals Completed</span>
                          <span>
                            {record.completed}/{record.goals}
                          </span>
                        </div>
                        <Progress value={(record.completed / record.goals) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {employee.projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {employee.projects.map((project, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-medium">{project}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Status: In Progress</p>
                      <Badge variant="secondary" className="mt-2">
                        Active
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No active projects assigned.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              {employee.feedback.length > 0 ? (
                <div className="space-y-4">
                  {employee.feedback.map((feedback) => (
                    <div key={feedback.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{feedback.author}</p>
                          <p className="text-sm text-muted-foreground">{feedback.date}</p>
                        </div>
                        <div className="flex items-center space-x-1">{renderStars(feedback.rating)}</div>
                      </div>
                      <p className="text-sm">{feedback.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No feedback available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
