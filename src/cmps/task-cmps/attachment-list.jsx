import { AttachmentPreview } from './attachment-preview.jsx'

export function AttachmentList(props) {
    return (
        <ul className='attachment-list clean-list flex column' >
            {props.attachments.map(attachment => {
                return <li key={attachment.id}>
                    <AttachmentPreview {...props} attachment={attachment} />
                </li>
            })}
        </ul>
    )
}


