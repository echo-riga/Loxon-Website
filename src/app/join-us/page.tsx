import { getJobs } from '@/lib/api'

export const metadata = {
  title: 'Join Our Team | Loxon Philippines Inc.',
  description: 'Explore career opportunities at Loxon Philippines. Join a leading engineering and construction company.',
}

export default async function JoinUsPage() {
  const jobs = await getJobs()

  return (
    <>
      {/* Hero with Cover Image */}
      <div className="relative h-[60vh] min-h-[450px] w-full overflow-hidden">
        <img
src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80"
alt="Join our engineering team"
          className="w-full h-full object-cover"
        />
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
          <div className="max-w-4xl mx-auto">
            {jobs.map((job: any, idx: number) => (
              <div
                key={job.id}
                className="bg-gray-50 rounded-lg p-8 mb-8 hover:shadow-md transition duration-300 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-sky-700">{job.title}</h2>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-6">
                  {job.description}
                </div>
                <a
                  href={`mailto:careers@loxon.ph?subject=Application for ${encodeURIComponent(job.title)}`}
                  className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded transition"
                >
                  APPLY NOW
                </a>
              </div>
            ))}
            {jobs.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-xl">No open positions at this time. Check back soon!</p>
              </div>
            )}
            <div className="text-center mt-12 text-gray-600">
              <p>Or send your resume to <a href="mailto:careers@loxon.ph" className="text-sky-600 hover:underline">careers@loxon.ph</a></p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}