'use client'

import { useCollection } from '@/lib/use-collection'
import CollectionGate from '@/components/CollectionGate'
import { getJobs } from '@/lib/api'
import Image from 'next/image'
import JobListings from '@/components/JobListings'
import Reveal from '@/components/Reveal'
import type { Job } from '@/types/loxon'

export default function JoinUsContent({ initialJobs }: { initialJobs: Job[] }) {
  const content = useCollection(getJobs, initialJobs)
  const jobs = content.data

  return (
    <>
      {/* Hero with Cover Image */}
      <div className="relative h-[60vh] min-h-[450px] w-full overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80" alt="Join our engineering team" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              Join Our Team
            </h1>
            <p className="text-gray-200 text-xl md:text-2xl leading-relaxed">
              Build your career with Loxon Philippines. We are looking for passionate engineers and construction professionals.
            </p>
          </div>
        </div>
      </div>

      <section className="py-24 md:py-32 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <CollectionGate {...content} variant="rows">
            <div className="max-w-4xl mx-auto">
              <JobListings jobs={jobs} />
              {!content.loading && !content.error && jobs.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-xl">No open positions at this time. Check back soon!</p>
                </div>
              )}
              <Reveal animation="fade-up" className="text-center mt-12 text-gray-600">
                <p>Or send your resume to <a href="mailto:careers@loxon.ph" className="text-sky-600 hover:underline">careers@loxon.ph</a></p>
              </Reveal>
            </div>
          </CollectionGate>
        </div>
      </section>
    </>
  )
}
