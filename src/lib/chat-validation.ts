import { NextResponse } from 'next/server'

export type SafeChatMessage = { role: 'user' | 'assistant'; content: string }

class ChatValidationError extends Error {
  constructor(message: string, public readonly status = 400) {
    super(message)
  }
}

export async function readChatMessages(request: Request): Promise<SafeChatMessage[]> {
  const maxBytes = 24 * 1024
  const declaredLength = Number(request.headers.get('content-length') || 0)
  if (declaredLength > maxBytes) throw new ChatValidationError('Chat request is too large.', 413)

  const text = await request.text()
  if (new TextEncoder().encode(text).byteLength > maxBytes) throw new ChatValidationError('Chat request is too large.', 413)

  let body: unknown
  try {
    body = JSON.parse(text)
  } catch {
    throw new ChatValidationError('Chat request must be valid JSON.')
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new ChatValidationError('Invalid chat request.')
  const messages = (body as { messages?: unknown }).messages
  if (!Array.isArray(messages) || messages.length === 0) throw new ChatValidationError('At least one chat message is required.')
  if (messages.length > 12) throw new ChatValidationError('A maximum of 12 chat messages is allowed.')

  let totalLength = 0
  const safeMessages = messages.map<SafeChatMessage>((message, index) => {
    if (!message || typeof message !== 'object' || Array.isArray(message)) throw new ChatValidationError(`Chat message ${index + 1} is invalid.`)
    const { role, content } = message as { role?: unknown; content?: unknown }
    if (role !== 'user' && role !== 'assistant') throw new ChatValidationError('Chat messages may only use user or assistant roles.')
    if (typeof content !== 'string' || !content.trim()) throw new ChatValidationError(`Chat message ${index + 1} is empty.`)
    const cleaned = content.trim()
    if (cleaned.length > 2_000) throw new ChatValidationError('Each chat message must be 2,000 characters or fewer.')
    totalLength += cleaned.length
    return { role, content: cleaned }
  })

  if (totalLength > 8_000) throw new ChatValidationError('The chat conversation is too long.')
  if (safeMessages.at(-1)?.role !== 'user') throw new ChatValidationError('The last chat message must be from the user.')
  return safeMessages
}

export function chatValidationResponse(error: unknown) {
  if (!(error instanceof ChatValidationError)) return null
  return NextResponse.json({ error: error.message }, { status: error.status })
}
