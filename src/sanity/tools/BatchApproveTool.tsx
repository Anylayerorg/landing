'use client'

/**
 * Batch Review Tool
 * Shows 500 pending submissions at a time.
 * You can approve OR reject each batch independently before moving to the next.
 */

import { useState, useCallback, useEffect } from 'react'
import { useClient } from 'sanity'

const BATCH_SIZE = 500

const BACKEND_WEBHOOK_URL =
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_WEBHOOK_URL) ||
    'https://airdropapi-jk4jk36aqq-uc.a.run.app/sanity-webhook'

const WEBHOOK_SECRET =
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_WEBHOOK_SECRET) || ''

interface Submission {
    _id: string
    submissionId: string
    taskId: string
    taskTitle: string
    address: string
    submittedAt: string
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function notifyBackend(submissionId: string, status: 'approved' | 'rejected', reviewNote?: string) {
    try {
        await fetch(BACKEND_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${WEBHOOK_SECRET}`,
            },
            body: JSON.stringify({ submissionId, status, reviewNote }),
        })
    } catch {
        // swallow
    }
}

const taskEmoji: Record<string, string> = {
    make_post: '📝',
    retweet_post: '🔁',
    comment_on_post: '💬',
    add_discord_tag: '🏷️',
}

const CELL: React.CSSProperties = {
    padding: '8px 10px',
    fontSize: 12,
    borderBottom: '1px solid #1e1e1e',
    verticalAlign: 'middle',
    color: '#ccc',
    fontFamily: 'monospace',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}

const HEAD: React.CSSProperties = {
    ...CELL,
    color: '#666',
    fontWeight: 600,
    fontSize: 11,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    borderBottom: '1px solid #333',
}

export function BatchApproveTool() {
    const client = useClient({ apiVersion: '2024-01-01' })

    const [allPending, setAllPending] = useState<Submission[]>([])
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)

    const [batchPage, setBatchPage] = useState(0)   // 0-indexed current batch
    const [log, setLog] = useState<string[]>([])
    const [processedBatches, setProcessedBatches] = useState<Record<number, 'approved' | 'rejected'>>({})

    const addLog = useCallback((msg: string) =>
        setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev])
    , [])

    const fetchPending = useCallback(async () => {
        setLoading(true)
        try {
            const docs = await client.fetch<Submission[]>(
                `*[_type == "airdropSubmission" && status == "pending"] | order(submittedAt asc) {
                    _id, submissionId, taskId, taskTitle, address, submittedAt
                }`
            )
            setAllPending(docs ?? [])
            setBatchPage(0)
            setProcessedBatches({})
        } catch (err: any) {
            addLog(`❌ Failed to load: ${err?.message ?? String(err)}`)
            setAllPending([])
        }
        setLoading(false)
    }, [client, addLog])

    useEffect(() => { fetchPending() }, [])   // eslint-disable-line react-hooks/exhaustive-deps

    // Derived values
    const totalBatches = Math.ceil(allPending.length / BATCH_SIZE)
    const currentBatch = allPending.slice(batchPage * BATCH_SIZE, (batchPage + 1) * BATCH_SIZE)

    const processBatch = useCallback(async (status: 'approved' | 'rejected', reviewNote?: string) => {
        if (currentBatch.length === 0 || processing) return
        setProcessing(true)

        addLog(`⏳ ${status === 'approved' ? 'Approving' : 'Rejecting'} batch ${batchPage + 1}/${totalBatches} (${currentBatch.length} submissions)…`)
        await sleep(50)

        try {
            const tx = client.transaction()
            for (const doc of currentBatch) {
                tx.patch(doc._id, p => p.set({ status, reviewNote: reviewNote ?? '' }))
            }
            await tx.commit()
            addLog(`✅ Batch ${batchPage + 1}: ${currentBatch.length} documents ${status}.`)
        } catch (err: any) {
            addLog(`❌ Batch ${batchPage + 1}: patch failed — ${err?.message ?? String(err)}`)
            setProcessing(false)
            return
        }

        await Promise.all(currentBatch.map(doc => notifyBackend(doc.submissionId, status, reviewNote)))
        addLog(`✅ Batch ${batchPage + 1}: backend notified.`)

        setProcessedBatches(prev => ({ ...prev, [batchPage]: status }))
        setAllPending(prev => prev.filter(d => !currentBatch.find(c => c._id === d._id)))

        // Don't advance batchPage — since we removed those docs, the same page index now shows the next batch
        setProcessing(false)
    }, [client, currentBatch, batchPage, totalBatches, processing, addLog])

    const handleApprove = () => {
        if (!confirm(`Approve these ${currentBatch.length} submissions (batch ${batchPage + 1})?`)) return
        processBatch('approved')
    }

    const handleReject = () => {
        const reason = prompt('Rejection reason (shown to users in this batch):', 'Does not meet requirements')
        if (reason === null) return
        processBatch('rejected', reason)
    }

    return (
        <div style={{ padding: '24px 32px', maxWidth: 900, fontFamily: 'system-ui, sans-serif' }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>⚡ Batch Review</h1>
            <p style={{ color: '#666', marginBottom: 20, fontSize: 13 }}>
                Review <strong style={{ color: '#aaa' }}>{BATCH_SIZE}</strong> submissions at a time — approve or reject each batch independently. Oldest first.
            </p>

            {/* Stats bar */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
                <div style={{ padding: '12px 18px', background: '#111', border: '1px solid #333', borderRadius: 8, minWidth: 130 }}>
                    <div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>Total pending</div>
                    <div style={{ fontSize: 28, fontWeight: 700 }}>{loading ? '…' : allPending.length}</div>
                </div>
                {!loading && allPending.length > 0 && (
                    <>
                        <div style={{ padding: '12px 18px', background: '#111', border: '1px solid #ca8a04', borderRadius: 8, minWidth: 130 }}>
                            <div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>Viewing batch</div>
                            <div style={{ fontSize: 28, fontWeight: 700 }}>{batchPage + 1} <span style={{ fontSize: 16, color: '#666' }}>/ {totalBatches}</span></div>
                        </div>
                        <div style={{ padding: '12px 18px', background: '#111', border: '1px solid #333', borderRadius: 8, minWidth: 130 }}>
                            <div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>In this batch</div>
                            <div style={{ fontSize: 28, fontWeight: 700 }}>{currentBatch.length}</div>
                        </div>
                    </>
                )}
            </div>

            {loading ? (
                <div style={{ color: '#555', fontSize: 14 }}>Loading submissions…</div>
            ) : allPending.length === 0 ? (
                <div style={{ padding: 20, background: '#0d2818', border: '1px solid #16a34a', borderRadius: 8, color: '#4ade80', fontSize: 14 }}>
                    ✅ No pending submissions — all caught up!
                </div>
            ) : (
                <>
                    {/* Batch navigation */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <button
                            onClick={() => setBatchPage(p => Math.max(0, p - 1))}
                            disabled={batchPage === 0 || processing}
                            style={{
                                padding: '6px 14px', fontSize: 13, borderRadius: 6,
                                border: '1px solid #333', cursor: batchPage === 0 ? 'not-allowed' : 'pointer',
                                background: 'transparent', color: batchPage === 0 ? '#444' : '#aaa',
                            }}
                        >
                            ← Prev
                        </button>
                        <span style={{ fontSize: 13, color: '#666' }}>
                            Submissions {batchPage * BATCH_SIZE + 1}–{Math.min((batchPage + 1) * BATCH_SIZE, allPending.length)} of {allPending.length}
                        </span>
                        <button
                            onClick={() => setBatchPage(p => Math.min(totalBatches - 1, p + 1))}
                            disabled={batchPage >= totalBatches - 1 || processing}
                            style={{
                                padding: '6px 14px', fontSize: 13, borderRadius: 6,
                                border: '1px solid #333', cursor: batchPage >= totalBatches - 1 ? 'not-allowed' : 'pointer',
                                background: 'transparent', color: batchPage >= totalBatches - 1 ? '#444' : '#aaa',
                            }}
                        >
                            Next →
                        </button>
                    </div>

                    {/* Submissions table */}
                    <div style={{ border: '1px solid #222', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                        <div style={{ maxHeight: 360, overflowY: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                                <colgroup>
                                    <col style={{ width: '5%' }} />
                                    <col style={{ width: '26%' }} />
                                    <col style={{ width: '32%' }} />
                                    <col style={{ width: '22%' }} />
                                    <col style={{ width: '15%' }} />
                                </colgroup>
                                <thead style={{ position: 'sticky', top: 0, background: '#0d0d0d' }}>
                                    <tr>
                                        <th style={HEAD}>#</th>
                                        <th style={HEAD}>Task</th>
                                        <th style={HEAD}>Wallet</th>
                                        <th style={HEAD}>Submitted</th>
                                        <th style={HEAD}>ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentBatch.map((doc, i) => (
                                        <tr key={doc._id} style={{ background: i % 2 === 0 ? '#0a0a0a' : '#0d0d0d' }}>
                                            <td style={CELL}>{batchPage * BATCH_SIZE + i + 1}</td>
                                            <td style={CELL}>
                                                {taskEmoji[doc.taskId] || '📋'} {doc.taskTitle || doc.taskId}
                                            </td>
                                            <td style={{ ...CELL, fontFamily: 'monospace' }}>
                                                {doc.address
                                                    ? `${doc.address.slice(0, 8)}…${doc.address.slice(-6)}`
                                                    : '—'}
                                            </td>
                                            <td style={CELL}>
                                                {doc.submittedAt
                                                    ? new Date(doc.submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })
                                                    : '—'}
                                            </td>
                                            <td style={{ ...CELL, fontSize: 10, color: '#555' }}>
                                                {doc.submissionId?.slice(0, 8) || '—'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Action buttons */}
                    {!processing && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                            <button
                                onClick={handleApprove}
                                style={{
                                    padding: '14px 20px', fontSize: 14, fontWeight: 700,
                                    borderRadius: 8, border: 'none', cursor: 'pointer',
                                    background: '#16a34a', color: '#fff',
                                }}
                            >
                                ✅ Approve this batch ({currentBatch.length})
                            </button>
                            <button
                                onClick={handleReject}
                                style={{
                                    padding: '14px 20px', fontSize: 14, fontWeight: 700,
                                    borderRadius: 8, border: 'none', cursor: 'pointer',
                                    background: '#dc2626', color: '#fff',
                                }}
                            >
                                ❌ Reject this batch ({currentBatch.length})
                            </button>
                        </div>
                    )}

                    {processing && (
                        <div style={{ padding: 16, background: '#0f172a', border: '1px solid #3b82f6', borderRadius: 8, marginBottom: 16, fontSize: 14, color: '#93c5fd' }}>
                            Processing batch {batchPage + 1}… please wait.
                        </div>
                    )}
                </>
            )}

            {/* Activity log */}
            {log.length > 0 && (
                <div style={{ padding: 14, borderRadius: 8, background: '#0a0a0a', border: '1px solid #1a1a1a', maxHeight: 220, overflowY: 'auto', marginBottom: 12 }}>
                    {log.map((line, i) => (
                        <div key={i} style={{
                            fontSize: 11, fontFamily: 'monospace', padding: '2px 0',
                            color: line.includes('❌') ? '#f87171' : line.includes('✅') || line.includes('🎉') ? '#4ade80' : '#888',
                        }}>
                            {line}
                        </div>
                    ))}
                </div>
            )}

            {!loading && !processing && (
                <button
                    onClick={fetchPending}
                    style={{ padding: '7px 14px', fontSize: 12, borderRadius: 6, border: '1px solid #2a2a2a', cursor: 'pointer', background: 'transparent', color: '#555' }}
                >
                    ↻ Refresh
                </button>
            )}
        </div>
    )
}
