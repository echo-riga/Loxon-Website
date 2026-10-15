'use client'

import { useState } from 'react'
import JobApplicationModal from './JobApplicationModal'
import Reveal from './Reveal'

interface Job {
  id: number
  title: string
  description: string | null
}

export default function JobListings({ jobs }: { jobs: Job[] }) {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [applicationJob, setApplicationJob] = useState<{ id: number; title: string } | null>(null)
  const displayedJob = jobs.find((job) => job.id === selectedJobId) ?? null

  return (
    <>
      {jobs.length > 0 && (
        <div className="font-sans">
          <Reveal animation="fade-up" className="mb-8">
            <span id="job-title-label" className="mb-3 block text-base font-semibold text-gray-700">
              Select a job title
            </span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((open) => !open)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left font-sans text-base font-medium text-gray-900 outline-none transition hover:border-sky-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                aria-labelledby="job-title-label job-title-value"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
              >
                <span id="job-title-value" className={displayedJob ? 'text-gray-900' : 'text-gray-500'}>
                  {displayedJob?.title || 'Choose an open position'}
                </span>
                <svg
                  className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div
                  className="mt-2 max-h-72 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white py-2 shadow-xl"
                  role="listbox"
                  aria-labelledby="job-title-label"
                >
                  {jobs.map((job) => (
                    <button
                      key={job.id}
                      type="button"
                      role="option"
                      aria-selected={job.id === selectedJobId}
                      onClick={() => {
                        setSelectedJobId(job.id)
                        setIsDropdownOpen(false)
                      }}
                      className={`block w-full px-4 py-3 text-left font-sans text-base transition hover:bg-sky-50 hover:text-sky-700 ${
                        job.id === selectedJobId ? 'bg-sky-50 font-semibold text-sky-700' : 'font-normal text-gray-700'
                      }`}
                    >
                      {job.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          {displayedJob && (
            <Reveal
              key={displayedJob.id}
              animation="fade-up"
              className="bg-gray-50 rounded-lg p-8 mb-8 hover:shadow-md transition duration-300"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-sky-700">{displayedJob.title}</h2>
              <div className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-6">
                {displayedJob.description || 'No description is available for this position.'}
              </div>
              <button
                type="button"
                onClick={() => setApplicationJob({ id: displayedJob.id, title: displayedJob.title })}
                className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded transition"
              >
                APPLY NOW
              </button>
            </Reveal>
          )}
        </div>
      )}

      {applicationJob && (
        <JobApplicationModal isOpen onClose={() => setApplicationJob(null)} jobTitle={applicationJob.title} jobId={applicationJob.id} />
      )}
    </>
  )
}
