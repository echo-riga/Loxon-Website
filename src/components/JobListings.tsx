'use client'

import { useState } from 'react'
import JobApplicationModal from './JobApplicationModal'
import Reveal from './Reveal'

interface Job {
  id: number
  title: string
  description: string
}

export default function JobListings({ jobs }: { jobs: Job[] }) {
  const [selectedJob, setSelectedJob] = useState<{ id: number; title: string } | null>(null)

  return (
    <>
      {jobs.map((job, idx) => (
        <Reveal
          key={job.id}
          animation="fade-up"
          delay={idx * 120}
          className="bg-gray-50 rounded-lg p-8 mb-8 hover:shadow-md transition duration-300"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-sky-700">{job.title}</h2>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-6">
            {job.description}
          </div>
          <button
            onClick={() => setSelectedJob({ id: job.id, title: job.title })}
            className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded transition"
          >
            APPLY NOW
          </button>
        </Reveal>
      ))}
      {selectedJob && (
        <JobApplicationModal
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          jobTitle={selectedJob.title}
          jobId={selectedJob.id}
        />
      )}
    </>
  )
}