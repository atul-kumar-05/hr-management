"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  phone: string
  address: {
    address: string
    city: string
    state: string
    postalCode: string
  }
  company: {
    department: string
    title: string
  }
  image: string
  rating: number
  isBookmarked: boolean
  projects: string[]
  feedback: Array<{
    id: string
    author: string
    comment: string
    date: string
    rating: number
  }>
  performanceHistory: Array<{
    month: string
    rating: number
    goals: number
    completed: number
  }>
}

interface HRState {
  employees: Employee[]
  bookmarkedEmployees: Employee[]
  loading: boolean
  error: string | null
  searchTerm: string
  selectedDepartments: string[]
  selectedRatings: number[]
}

type HRAction =
  | { type: "SET_EMPLOYEES"; payload: Employee[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "TOGGLE_BOOKMARK"; payload: number }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_SELECTED_DEPARTMENTS"; payload: string[] }
  | { type: "SET_SELECTED_RATINGS"; payload: number[] }
  | { type: "PROMOTE_EMPLOYEE"; payload: number }

const initialState: HRState = {
  employees: [],
  bookmarkedEmployees: [],
  loading: false,
  error: null,
  searchTerm: "",
  selectedDepartments: [],
  selectedRatings: [],
}

function hrReducer(state: HRState, action: HRAction): HRState {
  switch (action.type) {
    case "SET_EMPLOYEES":
      return {
        ...state,
        employees: action.payload,
        bookmarkedEmployees: action.payload.filter((emp) => emp.isBookmarked),
      }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "TOGGLE_BOOKMARK":
      const updatedEmployees = state.employees.map((emp) =>
        emp.id === action.payload ? { ...emp, isBookmarked: !emp.isBookmarked } : emp,
      )
      return {
        ...state,
        employees: updatedEmployees,
        bookmarkedEmployees: updatedEmployees.filter((emp) => emp.isBookmarked),
      }
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload }
    case "SET_SELECTED_DEPARTMENTS":
      return { ...state, selectedDepartments: action.payload }
    case "SET_SELECTED_RATINGS":
      return { ...state, selectedRatings: action.payload }
    case "PROMOTE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.payload ? { ...emp, rating: Math.min(5, emp.rating + 0.5) } : emp,
        ),
      }
    default:
      return state
  }
}

const HRContext = createContext<{
  state: HRState
  dispatch: React.Dispatch<HRAction>
} | null>(null)

export function HRProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(hrReducer, initialState)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      const response = await fetch("https://dummyjson.com/users?limit=20")
      const data = await response.json()

      function generateProjects(): string[] {
        const projects = [
          "UPI Integration",
          "GST Compliance Portal",
          "Aadhaar KYC Automation",
          "Digital India App",
          "Swachh Bharat Dashboard",
          "Smart City Analytics",
          "Ayushman Bharat Tracker",
          "Skill India Training",
          "Make in India Campaign",
        ]
        return projects.slice(0, Math.floor(Math.random() * 4) + 1)
      }

      function generateFeedback() {
        const authors = [
          "Priya Patel",
          "Amit Verma",
          "Sunita Reddy",
          "Rohit Singh",
          "Neha Sharma",
          "Vikram Desai",
          "Anjali Nair",
          "Suresh Kumar"
        ]
        const comments = [
          "Excellent contribution to the Digital India project.",
          "Always punctual and delivers quality work.",
          "Great team player and very supportive.",
          "Demonstrates strong leadership in Smart City initiatives.",
          "Consistently exceeds performance goals.",
          "Brings innovative solutions to complex problems.",
          "Strong technical skills and attention to detail.",
          "Very proactive and takes initiative."
        ]

        return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
          id: `feedback-${i}`,
          author: authors[Math.floor(Math.random() * authors.length)],
          comment: comments[Math.floor(Math.random() * comments.length)],
          date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          rating: Math.floor(Math.random() * 2) + 4,
        }))
      }

      const indianFirstNames = ["Rahul", "Priya", "Amit", "Sunita", "Rohit", "Neha", "Vikram", "Anjali", "Suresh", "Pooja", "Karan", "Deepa", "Arjun", "Meera", "Sanjay", "Kavita", "Rakesh", "Shreya", "Manish", "Divya"]
      const indianLastNames = ["Sharma", "Patel", "Verma", "Reddy", "Singh", "Desai", "Nair", "Kumar", "Gupta", "Joshi", "Chopra", "Bansal", "Yadav", "Mehta", "Jain", "Kapoor", "Agarwal", "Saxena", "Rao", "Menon"]
      const indianCities = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Lucknow"]
      const indianStates = ["Maharashtra", "Delhi", "Karnataka", "Telangana", "Gujarat", "Tamil Nadu", "West Bengal", "Rajasthan", "Uttar Pradesh", "Kerala"]
      const indianStreets = [
        "MG Road", "Brigade Road", "Marine Drive", "Connaught Place", "Banjara Hills", "Park Street", "Anna Salai", "FC Road", "Carter Road", "Lalbagh Road"
      ]
      const indianDepartments = ["Engineering", "HR", "Finance", "Operations", "Sales", "Marketing", "IT", "Support"]
      const indianTitles = ["Software Engineer", "Senior Developer", "HR Manager", "Finance Analyst", "Operations Lead", "Sales Executive", "Marketing Specialist", "IT Administrator", "Support Engineer"]

      const enhancedEmployees: Employee[] = data.users.map((user: any, idx: number) => {
        const firstName = indianFirstNames[idx % indianFirstNames.length]
        const lastName = indianLastNames[idx % indianLastNames.length]
        const city = indianCities[idx % indianCities.length]
        const state = indianStates[idx % indianStates.length]
        const address = `${Math.floor(Math.random()*100+1)}, ${indianStreets[idx % indianStreets.length]}`
        const postalCode = `${Math.floor(100000 + Math.random() * 900000)}`
        const phone = `+91 ${Math.floor(7000000000 + Math.random() * 2999999999)}`
        const department = indianDepartments[idx % indianDepartments.length]
        const title = indianTitles[idx % indianTitles.length]
        return {
          ...user,
          firstName,
          lastName,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.in`,
          phone,
          address: {
            address,
            city,
            state,
            postalCode
          },
          company: {
            department,
            title
          },
          rating: Math.round((Math.random() * 4 + 1) * 10) / 10,
          isBookmarked: Math.random() > 0.7,
          projects: generateProjects(),
          feedback: generateFeedback(),
          performanceHistory: generatePerformanceHistory(),
        }
      })

      dispatch({ type: "SET_EMPLOYEES", payload: enhancedEmployees })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch employees" })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  return <HRContext.Provider value={{ state, dispatch }}>{children}</HRContext.Provider>
}

export function useHR() {
  const context = useContext(HRContext)
  if (!context) {
    throw new Error("useHR must be used within HRProvider")
  }
  return context
}

function generatePerformanceHistory() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  return months.map((month) => ({
    month,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    goals: Math.floor(Math.random() * 5) + 3,
    completed: Math.floor(Math.random() * 5) + 2,
  }))
}
