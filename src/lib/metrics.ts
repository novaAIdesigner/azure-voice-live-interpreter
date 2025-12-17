import type { TokenUsage } from '@azure/ai-voicelive'

export type TurnMetrics = {
  responseId: string
  startedAtMs: number
  firstTextDeltaAtMs?: number
  finishedAtMs?: number
  latencyMs?: number
  firstTokenLatencyMs?: number
  usage?: TokenUsage
  assistantText?: string
}

export type Totals = {
  turns: number
  totalLatencyMs: number
  totalFirstTokenLatencyMs: number
  inputTokens: number
  outputTokens: number
  totalTokens: number
  inputTextTokens: number
  inputAudioTokens: number
  outputTextTokens: number
  outputAudioTokens: number
  cachedTextTokens: number
  cachedAudioTokens: number
  inputAudioSeconds: number
  outputAudioSeconds: number
}

export const EMPTY_TOTALS: Totals = {
  turns: 0,
  totalLatencyMs: 0,
  totalFirstTokenLatencyMs: 0,
  inputTokens: 0,
  outputTokens: 0,
  totalTokens: 0,
  inputTextTokens: 0,
  inputAudioTokens: 0,
  outputTextTokens: 0,
  outputAudioTokens: 0,
  cachedTextTokens: 0,
  cachedAudioTokens: 0,
  inputAudioSeconds: 0,
  outputAudioSeconds: 0,
}

export function addUsage(t: Totals, usage: TokenUsage): Totals {
  return {
    ...t,
    inputTokens: t.inputTokens + usage.inputTokens,
    outputTokens: t.outputTokens + usage.outputTokens,
    totalTokens: t.totalTokens + usage.totalTokens,
    inputTextTokens: t.inputTextTokens + usage.inputTokenDetails.textTokens,
    inputAudioTokens: t.inputAudioTokens + usage.inputTokenDetails.audioTokens,
    cachedTextTokens: t.cachedTextTokens + usage.inputTokenDetails.cachedTokensDetails.textTokens,
    cachedAudioTokens: t.cachedAudioTokens + usage.inputTokenDetails.cachedTokensDetails.audioTokens,
    outputTextTokens: t.outputTextTokens + usage.outputTokenDetails.textTokens,
    outputAudioTokens: t.outputAudioTokens + usage.outputTokenDetails.audioTokens,
  }
}
