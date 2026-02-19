export default {
    name: 'airdropSubmission',
    title: 'Airdrop Submissions',
    type: 'document',
    fields: [
        {
            name: 'submissionId',
            title: 'Submission ID',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'address',
            title: 'Wallet Address',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'taskId',
            title: 'Task ID',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'taskTitle',
            title: 'Task Name',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'proofLink',
            title: 'Proof Link',
            type: 'url',
            readOnly: true,
        },
        {
            name: 'screenshotUrl',
            title: 'Screenshot',
            type: 'url',
            readOnly: true,
        },
        {
            name: 'submittedAt',
            title: 'Submitted At',
            type: 'datetime',
            readOnly: true,
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: '⏳ Pending Review', value: 'pending' },
                    { title: '✅ Approved', value: 'approved' },
                    { title: '❌ Rejected', value: 'rejected' },
                ],
                layout: 'radio',
            },
            initialValue: 'pending',
        },
        {
            name: 'reviewNote',
            title: 'Review Note (shown to user if rejected)',
            type: 'text',
            rows: 3,
        },
    ],
    preview: {
        select: {
            title: 'taskTitle',
            subtitle: 'address',
            status: 'status',
        },
        prepare({ title, subtitle, status }: { title: string; subtitle: string; status: string }) {
            const icon = status === 'approved' ? '✅' : status === 'rejected' ? '❌' : '⏳'
            return {
                title: `${icon} ${title || 'Unknown Task'}`,
                subtitle: subtitle ? `${subtitle.slice(0, 6)}...${subtitle.slice(-4)}` : 'No address',
            }
        },
    },
}
