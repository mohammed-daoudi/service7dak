'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertTriangle } from 'lucide-react'

interface ReportModalProps {
  trigger: React.ReactNode
  reportedUserName: string
  onSubmit: (reason: string, details: string) => void
}

const REPORT_REASONS = [
  'Inappropriate behavior',
  'Spam or harassment',
  'Fraudulent activity',
  'Poor service quality',
  'Unprofessional conduct',
  'Safety concerns',
  'Other'
] as const

export function ReportModal({ trigger, reportedUserName, onSubmit }: ReportModalProps) {
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = () => {
    if (!reason) {
      alert('Please select a reason for reporting')
      return
    }

    if (!details.trim()) {
      alert('Please provide additional details')
      return
    }

    onSubmit(reason, details)
    setIsOpen(false)
    setReason('')
    setDetails('')
  }

  const handleClose = () => {
    setIsOpen(false)
    setReason('')
    setDetails('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Report User
          </DialogTitle>
          <DialogDescription>
            Report {reportedUserName} for inappropriate behavior or policy violations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> False reports may result in action against your account.
              Please only report genuine violations of our community guidelines.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Reason for Report</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {REPORT_REASONS.map((reportReason) => (
                  <SelectItem key={reportReason} value={reportReason}>
                    {reportReason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Additional Details</Label>
            <Textarea
              id="details"
              placeholder="Provide specific details about the incident, including dates, messages, or behaviors that violated our guidelines..."
              rows={5}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </div>

          <div className="text-xs text-muted-foreground">
            Your report will be reviewed by our moderation team. We may contact you for additional information.
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSubmit} variant="destructive" className="flex-1">
              Submit Report
            </Button>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
