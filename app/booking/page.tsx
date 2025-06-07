"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import emailjs from '@emailjs/browser'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, CalendarIcon, Clock, Users, Phone, MapPin } from "lucide-react"
import { format } from "date-fns"

// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "service_nohhpqp"
const EMAILJS_TEMPLATE_ID = "template_jra3iiu"
const EMAILJS_PUBLIC_KEY = "CfkRdCp3TCI9dyJGm"

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    timeSlot: "",
    duration: "",
    participants: "",
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const services = [
    { value: "football-turf", label: "Football Turf (70,000/hour)", price: "70,000" },
    { value: "meeting-room", label: "Meeting Point/Event Space", price: "Contact for pricing" },
    { value: "sauna", label: "Sauna Session", price: "Contact for pricing" },
    { value: "restaurant-reservation", label: "Restaurant Table Reservation", price: "Free" },
  ]

  const timeSlots = [
    "06:00 - 07:00",
    "07:00 - 08:00",
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
    "21:00 - 22:00",
  ]

  const durations = ["1 hour", "2 hours", "3 hours", "4 hours", "Half day (4+ hours)", "Full day"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Calculate total amount
      let totalAmount = "Contact for pricing"
      if (formData.service === "football-turf") {
        const amount = calculateTotal()
        totalAmount = `${amount.toLocaleString()} UGX`
      }

      // Create template parameters matching the working template
      const templateParams = {
        // EmailJS system variables
        title: "Booking",
        name: formData.name || '',
        email: formData.email || '',

        // Template content variables
        from_name: formData.name || '',
        service: services.find(s => s.value === formData.service)?.label?.split('(')[0].trim() || '',
        date: selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '',
        time: formData.timeSlot || '',
        duration: formData.duration || '',
        participants: formData.participants || '',
        total: formData.service === "football-turf" ? totalAmount : "Contact for pricing",
        phone: formData.phone || '',
        special_requests: formData.specialRequests || ''
      }

      // Log the template parameters for debugging
      console.log('Template params:', templateParams)

      // Send the email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      console.log('Email sent successfully:', response)
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Failed to send email:', error)
      setError("Failed to submit booking. Please try again or contact us directly.")
      setIsSubmitting(false)
    }
  }

  const calculateTotal = () => {
    if (formData.service === "football-turf" && formData.duration) {
      const hours = Number.parseInt(formData.duration.split(" ")[0]) || 1
      return hours * 70000
    }
    return 0
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="max-w-md mx-4 text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <CardTitle className="text-2xl text-green-600">Booking Submitted!</CardTitle>
            <CardDescription>
              Thank you for your booking request. We'll contact you shortly to confirm your reservation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>Reference:</strong> FF{Date.now().toString().slice(-6)}
                </p>
              </div>
              {error && (
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              <Link href="/">
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500">Return to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Book Your Experience</h1>
              <p className="text-gray-600">Reserve your spot at Fit & Fut Complex</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-green-600" />
                  <span>Booking Details</span>
                </CardTitle>
                <CardDescription>Fill in your details to make a reservation</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="e.g., 076306522"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Service Selection</h3>
                    <div>
                      <Label htmlFor="service">Select Service *</Label>
                      <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Date & Time</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Preferred Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label htmlFor="timeSlot">Time Slot *</Label>
                        <Select
                          value={formData.timeSlot}
                          onValueChange={(value) => handleInputChange("timeSlot", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Additional Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Select
                          value={formData.duration}
                          onValueChange={(value) => handleInputChange("duration", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            {durations.map((duration) => (
                              <SelectItem key={duration} value={duration}>
                                {duration}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="participants">Number of Participants</Label>
                        <Input
                          id="participants"
                          type="number"
                          min="1"
                          value={formData.participants}
                          onChange={(e) => handleInputChange("participants", e.target.value)}
                          placeholder="e.g., 10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        placeholder="Any special requirements or requests..."
                        rows={3}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !formData.name ||
                      !formData.phone ||
                      !formData.service ||
                      !selectedDate ||
                      !formData.timeSlot
                    }
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.service && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-800">
                      {services.find((s) => s.value === formData.service)?.label}
                    </p>
                    {formData.service === "football-turf" && formData.duration && (
                      <p className="text-sm text-green-600 mt-1">Total: {calculateTotal().toLocaleString()} UGX</p>
                    )}
                  </div>
                )}

                {selectedDate && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{format(selectedDate, "PPP")}</span>
                  </div>
                )}

                {formData.timeSlot && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{formData.timeSlot}</span>
                  </div>
                )}

                {formData.participants && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{formData.participants} participants</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span>076 306 5220</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span>070 151 8089</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span>Fit & Fut Complex</span>
                </div>
              </CardContent>
            </Card>

            {/* <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold mb-2">Need Help?</h3>
                <p className="text-sm text-green-100 mb-4">
                  Call us directly for immediate assistance with your booking
                </p>
                <Button variant="outline" className="bg-white text-green-600 border-white hover:bg-green-50">
                  Call Now
                </Button>
              </CardContent> */}
            {/* </Card> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
