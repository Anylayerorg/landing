'use client'

import { useState } from 'react'
import { useClient } from 'sanity'

const BACKEND_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL?.replace('/sanity-webhook', '/batch-approve') ||
    'https://airdropapi-jk4jk36aqq-uc.a.run.app/batch-approve'
const SECRET = process.env.NEXT_PUBLIC_WEBHOOK_SECRET || ''

export function BatchApproveTool() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<{ approved: number; total: number; errors?: string[] } | null>(null)
    const [pendingCount, setPendingCount] = useState<number | null>(null)
    const client = useClient({ apiVersion: '2023-01-01' })

    const fetchPendingCount = async () => {
        const count = await client.fetch<number>(`count(*[_type == "airdropSubmission" && status == "pending"])`)
        setPendingCount(count)
    }

    useState(() => { fetchPendingCount() })

    const handleBatchApprove = async () => {
        if (!confirm(`Are you sure you want to approve all ${pendingCount ?? '?'} pending submissions?`)) return

        setLoading(true)
        setResult(null)
        try {
            const res = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SECRET}`,
                },
                body: JSON.stringify({}),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)

            setResult(data)

            if (data.approved > 0) {
                const pending = await client.fetch<any[]>(
                    `*[_type == "airdropSubmission" && status == "pending"]{ _id }`
                )
                for (const doc of pending) {
                    await client.patch(doc._id).set({ status: 'approved' }).commit()
                }
            }

            await fetchPendingCount()
        } catch (err: any) {
            alert(`Batch approve failed: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ padding: 32, maxWidth: 600 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Batch Approve</h1>
            <p style={{ color: '#888', marginBottom: 24 }}>
                Approve all pending airdrop submissions at once.
            </p>

            <div style={{
                padding: 20,
                border: '1px solid #333',
                borderRadius: 8,
                marginBottom: 24,
                background: '#111',
            }}>
                <div style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>Pending submissions</div>
                <div style={{ fontSize: 36, fontWeight: 700 }}>
                    {pendingCount === null ? '...' : pendingCount}
                </div>
            </div>

            <button
                onClick={handleBatchApprove}
                disabled={loading || pendingCount === 0}
                style={{
                    padding: '12px 24px',
                    fontSize: 14,
                    fontWeight: 700,
                    borderRadius: 6,
                    border: 'none',
                    cursor: loading || pendingCount === 0 ? 'not-allowed' : 'pointer',
                    background: loading ? '#555' : pendingCount === 0 ? '#333' : '#22c55e',
                    color: '#fff',
                    opacity: pendingCount === 0 ? 0.5 : 1,
                }}
            >
                {loading ? 'Approving...' : `Approve All ${pendingCount ?? ''} Pending`}
            </button>

            {result && (
                <div style={{
                    marginTop: 20,
                    padding: 16,
                    borderRadius: 8,
                    background: result.errors?.length ? '#7f1d1d' : '#14532d',
                    border: `1px solid ${result.errors?.length ? '#dc2626' : '#22c55e'}`,
                }}>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>
                        Approved {result.approved} of {result.total} submissions
                    </div>
                    {result.errors?.map((e, i) => (
                        <div key={i} style={{ fontSize: 12, color: '#f87171', marginTop: 4 }}>{e}</div>
                    ))}
                </div>
            )}
        </div>
    )
}
