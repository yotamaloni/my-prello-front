import React from 'react'
import { useState } from "react";

import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { AttachmentList } from './attachment-list.jsx'


export function TaskAttachmentPreview(props) {

    const [isInputItemOpen, setIsInputItemOpen] = useState(false)
    function onToggleAddItem() {
        setIsInputItemOpen(!isInputItemOpen)
    }

    const { attachment, onRemoveAttachment, onAddItemToAttachment, onToggleItemMark } = props

    return (
        <section className='task-attachment-preview'>
            <div className='header'>
                <div className='attachment-title'>{attachment.name}
                    <AttachFileOutlinedIcon className='attachment-icon' />
                    Attachments
                </div>
            </div>
            <AttachmentList {...props} />
            <div>
                Add an attachment
            </div>
        </section>
    )
}

