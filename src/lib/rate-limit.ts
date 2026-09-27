import { createHash } from 'node:crypto'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const hasRedis = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
const redis = hasRedis ? Redis.fromEnv() : null
const burst = redis ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(20, '1 m'), prefix: 'loxon-ph:chat:burst', analytics: false }) : null
const hourly = redis ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(200, '1 h'), prefix: 'loxon-ph:chat:hour', analytics: false }) : null

function identifier(request: Request) {
  const ip = request.headers.get('cf-connecting-ip')
    || request.headers.get('x-real-ip')
    || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || 'unknown'
  return createHash('sha256').update(`chat:${ip}`).digest('hex')
}

async function check(activeLimiter: Ratelimit | null, id: string) {
  if (!activeLimiter) return NextResponse.json({ error: 'Rate limiting is not configured.' }, { status: 503 })
  try {
    const result = await activeLimiter.limit(id)
    if (result.success) return null
    const retryAfter = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000))
    return NextResponse.json({ error: 'Too many messages. Please try again later.', retryAfter }, { status: 429, headers: { 'Retry-After': String(retryAfter) } })
  } catch (error) {
    console.error('Chat rate-limit service error:', error)
    return NextResponse.json({ error: 'Unable to verify this request right now.' }, { status: 503 })
  }
}

export async function applyChatRateLimits(request: Request) {
  const id = identifier(request)
  return await check(burst, id) || await check(hourly, id)
}
