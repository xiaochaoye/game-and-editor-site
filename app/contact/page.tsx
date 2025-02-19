"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { fetchIssues, createIssue, type Issue } from "@/lib/github"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [messageText, setMessageText] = useState("")
  const [issues, setIssues] = useState<Issue[]>([])
  const [submitStatus, setSubmitStatus] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)

  useEffect(() => {
    loadIssues()
  }, [])

  const loadIssues = async () => {
    try {
      const fetchedIssues = await fetchIssues()
      setIssues(fetchedIssues)
    } catch (error) {
      setFetchError("Failed to load previous feedback. Please try again later.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createIssue(name, email, messageText)
      setSubmitStatus("Feedback sent successfully!")
      setName("")
      setEmail("")
      setMessageText("")
      loadIssues()
    } catch (error) {
      setSubmitStatus("Failed to send feedback. Please try again.")
    }
  }

  return (
    <div className="flex flex-col items-center mb-2">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-black"
        />
        <Input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-black"
        />
        <Textarea
          placeholder="Your Message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="text-black"
        />
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
      {submitStatus && (
        <p className={`mt-4 ${submitStatus.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
          {submitStatus}
        </p>
      )}
      <div className="w-full max-w-2xl mt-8 p-2 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Previous Feedback</h2>
        {fetchError ? (
          <p className="text-red-500">{fetchError}</p>
        ) : (
          <div className="space-y-4 max-h-[140px] overflow-y-auto pr-2">
            {issues.length > 0 ? (
              issues.map((item: Issue) => (
                <Card
                  key={item.title}
                  className="p-4 bg-gray-600 cursor-pointer hover:bg-gray-500 transition-colors"
                  onClick={() => setSelectedIssue(item)}
                >
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-300">{new Date(item.created_at).toLocaleDateString()}</p>
                  <p className="mt-2">{item.body.substring(0, 120)}...</p>
                </Card>
              ))
            ) : (
              <p>No previous feedback available.</p>
            )}
          </div>
        )}
        <Dialog open={selectedIssue !== null} onOpenChange={() => setSelectedIssue(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedIssue?.title}</DialogTitle>
              <DialogDescription>
                {selectedIssue && new Date(selectedIssue.created_at).toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p className="whitespace-pre-wrap">{selectedIssue?.body}</p>
            </div>
            <Button className="mt-4" onClick={() => setSelectedIssue(null)}>
              Close
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

