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
  const [applicationJob, setApplicationJob] = useState<{ id: number; title: string } | null>(null)
  const displayedJob = jobs.find((job) => job.id === selectedJobId) ?? null

  return (
    <>
      {jobs.length > 0 && (
        <div className="font-sans">
          <Reveal animation="fade-up" className="mb-8">
            <fieldset>
              <legend className="mb-3 block text-base font-semibold text-gray-700">
                Select an open position
              </legend>
              <p className="mb-5 text-gray-600">Choose a role below to view the details and apply.</p>
              <div className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                  {jobs.map((job, index) => (
                    <Reveal
                      as="label"
                      key={job.id}
                      animation="fade-right"
                      delay={(index % 5) * 100}
                      className={`flex cursor-pointer items-center gap-4 px-5 py-4 text-left font-sans text-base transition-colors hover:bg-sky-50 hover:text-sky-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-500 ${
                        job.id === selectedJobId ? 'bg-sky-50 font-semibold text-sky-700' : 'font-normal text-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="job-position"
                        value={job.id}
                        checked={job.id === selectedJobId}
                        onChange={() => setSelectedJobId(job.id)}
                        className="h-5 w-5 shrink-0 accent-sky-600"
                      />
                      <span>{job.title}</span>
                    </Reveal>
                  ))}
              </div>
            </fieldset>
          </Reveal>

          {displayedJob && (
            <Reveal
              key={displayedJob.id}
              animation="fade-up"
              threshold={0}
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
