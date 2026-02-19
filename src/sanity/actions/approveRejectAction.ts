import { useCallback, useState } from 'react'
import { DocumentActionComponent, DocumentActionProps, useDocumentOperation, useClient } from 'sanity'

const BACKEND_WEBHOOK_URL = process.env.SANITY_STUDIO_BACKEND_WEBHOOK_URL ||
    'https://us-central1-zksscore.cloudfunctions.net/v2-airdropApi/sanity-webhook'
const WEBHOOK_SECRET = process.env.SANITY_STUDIO_WEBHOOK_SECRET || ''

async function callBackend(action: 'approve' | 'reject', doc: any) {
    const body = {
        action,
        submissionId: doc.submissionId,
        address: doc.address,
        taskId: doc.taskId,
        reviewNote: doc.reviewNote || '',
        secret: WEBHOOK_SECRET,
    }

    const res = await fetch(BACKEND_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        const text = await res.text()
        throw new Error(`Backend error ${res.status}: ${text}`)
    }
    return res.json()
}

export const ApproveAction: DocumentActionComponent = (props: DocumentActionProps) => {
    const { patch, publish } = useDocumentOperation(props.id, props.type)
    const [isLoading, setIsLoading] = useState(false)

    const onHandle = useCallback(async () => {
        setIsLoading(true)
        try {
            const doc = props.draft || props.published
            if (!doc) throw new Error('No document found')

            await callBackend('approve', doc)

            patch.execute([{ set: { status: 'approved' } }])
            publish.execute()
            props.onComplete()
        } catch (err: any) {
            console.error('Approve failed:', err)
            alert(`Approve failed: ${err.message}`)
        } finally {
            setIsLoading(false)
        }
    }, [props, patch, publish])

    if ((props.draft || props.published as any)?.status === 'approved') return null

    return {
        label: isLoading ? 'Approving…' : '✅ Approve',
        tone: 'positive',
        disabled: isLoading,
        onHandle,
    }
}

export const RejectAction: DocumentActionComponent = (props: DocumentActionProps) => {
    const { patch, publish } = useDocumentOperation(props.id, props.type)
    const [isLoading, setIsLoading] = useState(false)

    const onHandle = useCallback(async () => {
        const doc = props.draft || props.published
        if (!doc) return

        const note = window.prompt('Rejection reason (shown to user):', '')
        if (note === null) return // cancelled

        setIsLoading(true)
        try {
            const docWithNote = { ...doc, reviewNote: note }
            await callBackend('reject', docWithNote)

            patch.execute([{ set: { status: 'rejected', reviewNote: note } }])
            publish.execute()
            props.onComplete()
        } catch (err: any) {
            console.error('Reject failed:', err)
            alert(`Reject failed: ${err.message}`)
        } finally {
            setIsLoading(false)
        }
    }, [props, patch, publish])

    if ((props.draft || props.published as any)?.status === 'rejected') return null

    return {
        label: isLoading ? 'Rejecting…' : '❌ Reject',
        tone: 'critical',
        disabled: isLoading,
        onHandle,
    }
}
