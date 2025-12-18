import type { TokenUsage } from '@azure/ai-voicelive'

export type TurnMetrics = {
  responseId: string
  startedAtMs: number
  firstTextDeltaAtMs?: number
  firstAudioDeltaAtMs?: number
  finishedAtMs?: number
  latencyMs?: number
  firstTokenLatencyMs?: number
  usage?: TokenUsage
  assistantText?: string
  speechStartedAtMs?: number // When user speech started
  speechStoppedAtMs?: number // When user speech stopped
  startLatencyMs?: number // Time from speech start to first audio output
  endLatencyMs?: number // Time from speech stopped to first audio output
}

export type Totals = {
  turns: number
  sessionStartMs: number
  
  // Audio time metrics
  inputAudioSeconds: number
  cachedAudioSeconds: number
  outputAudioSeconds: number
  
  // Token metrics
  inputTextTokens: number
  cachedTextTokens: number
  outputTextTokens: number
  inputAudioTokens: number
  cachedAudioTokens: number
  outputAudioTokens: number
  
  // Latency metrics
  startLatencies: number[] // Array of all start latencies for p90 calculation
  endLatencies: number[] // Array of all end latencies for p90 calculation
}

export const EMPTY_TOTALS: Totals = {
  turns: 0,
  sessionStartMs: 0,
  
  inputAudioSeconds: 0,
  cachedAudioSeconds: 0,
  outputAudioSeconds: 0,
  
  inputTextTokens: 0,
  cachedTextTokens: 0,
  outputTextTokens: 0,
  inputAudioTokens: 0,
  cachedAudioTokens: 0,
  outputAudioTokens: 0,
  
  startLatencies: [],
  endLatencies: [],
}

export function addUsage(t: Totals, usage: TokenUsage): Totals {
  return {
    ...t,
    inputTextTokens: t.inputTextTokens + usage.inputTokenDetails.textTokens,
    inputAudioTokens: t.inputAudioTokens + usage.inputTokenDetails.audioTokens,
    cachedTextTokens: t.cachedTextTokens + usage.inputTokenDetails.cachedTokensDetails.textTokens,
    cachedAudioTokens: t.cachedAudioTokens + usage.inputTokenDetails.cachedTokensDetails.audioTokens,
    outputTextTokens: t.outputTextTokens + usage.outputTokenDetails.textTokens,
    outputAudioTokens: t.outputAudioTokens + usage.outputTokenDetails.audioTokens,
  }
}

export function calculatePercentile(values: number[], percentile: number): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const index = Math.ceil((percentile / 100) * sorted.length) - 1
  return sorted[Math.max(0, index)]
}

export function calculateAverage(values: number[]): number {
  if (values.length === 0) return 0
  return values.reduce((sum, v) => sum + v, 0) / values.length
}

// Pricing constants (example rates, adjust based on actual pricing)
const PRICE_PER_1K_INPUT_TEXT_TOKENS = 0.005
const PRICE_PER_1K_CACHED_TEXT_TOKENS = 0.0025
const PRICE_PER_1K_OUTPUT_TEXT_TOKENS = 0.015
const PRICE_PER_SECOND_INPUT_AUDIO = 0.01
const PRICE_PER_SECOND_CACHED_AUDIO = 0.005
const PRICE_PER_SECOND_OUTPUT_AUDIO = 0.02

export function calculateCost(totals: Totals): number {
  const inputTextCost = (totals.inputTextTokens / 1000) * PRICE_PER_1K_INPUT_TEXT_TOKENS
  const cachedTextCost = (totals.cachedTextTokens / 1000) * PRICE_PER_1K_CACHED_TEXT_TOKENS
  const outputTextCost = (totals.outputTextTokens / 1000) * PRICE_PER_1K_OUTPUT_TEXT_TOKENS
  const inputAudioCost = totals.inputAudioSeconds * PRICE_PER_SECOND_INPUT_AUDIO
  const cachedAudioCost = totals.cachedAudioSeconds * PRICE_PER_SECOND_CACHED_AUDIO
  const outputAudioCost = totals.outputAudioSeconds * PRICE_PER_SECOND_OUTPUT_AUDIO
  
  return inputTextCost + cachedTextCost + outputTextCost + inputAudioCost + cachedAudioCost + outputAudioCost
}
