import React from 'react'
import { connect } from 'react-redux'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

import { setModal } from '../../store/board.action.js';

import { updateBoard } from '../../store/board.action.js'
import { AttachmentList } from './attachment-list';


function _TaskAttachment(props) {

    function onRemoveAttachment(attachmentId) {
        const { task, board } = props
        const attachmentIdx = task.attachments.findIndex((currAttachment => currAttachment.id === attachmentId))
        task.attachments.splice(attachmentIdx, 1)
        props.updateBoard({ ...board })
    }
    function onSetModal() {
        props.setModal({ type: 'attachment' })
    }

    const { task } = props
    const { attachments } = task
    return (
        <section className='task-attachment'>
            <div className='attachment-title'>Attachments
                <AttachFileOutlinedIcon className='description-icon' />
            </div>
            <AttachmentList onRemoveAttachment={onRemoveAttachment} attachments={attachments} />
            <div onClick={onSetModal} className="add-attachment-btn">
                Add an attachment
            </div>
        </section>
    )
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board
    }
}
const mapDispatchToProps = {
    updateBoard,
    setModal
};

export const TaskAttachment = connect(mapStateToProps, mapDispatchToProps)(_TaskAttachment)
