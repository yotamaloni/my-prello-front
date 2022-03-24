import React from 'react'
import { connect } from 'react-redux'


import { MembersModal } from './members-modal.jsx'
import { LabelsModal } from './labels-modal.jsx'
import { ChecklistModal } from './checklist-modal.jsx'
import { DateModal } from './date-modal.jsx'
import { AttachmentModal } from './attachment-modal.jsx'
import { CoverModal } from './cover-modal.jsx'
import { RemoveModal } from './remove-modal.jsx'
import { InviteToBoardModal } from './invite-to-board-modal.jsx'
import { FilterByModal } from './filter-by-modal.jsx'
import { CreateBoardModal } from './crate-board-modal.jsx'
import { GroupAction } from './group-action-modal.jsx'

function _DynamicModal(props) {
    const { modal, group } = props

    switch (modal.type) {
        case 'members':
            return <MembersModal
                {...props}
            />;
        case 'labels':
            return <LabelsModal
                {...props}
            />;
        case 'checklist':
            return <ChecklistModal
                {...props}
            />;
        case 'date':
            return <DateModal
                {...props}
            />;
        case 'attachment':
            return <AttachmentModal
                {...props}
            />;
        case 'cover':
            return <CoverModal
                {...props}
            />;
        case 'remove':
            return <RemoveModal
                {...props}
            />;
        case 'invite':
            return <InviteToBoardModal
                {...props}
            />;
        case 'filter':
            return <FilterByModal
                {...props}
            />;
        case 'create-board':
            return <CreateBoardModal
                {...props}
            />;
        case 'group' + group?.id:
            return <GroupAction
                {...props}
            />;
        default:
            return <div>NOT FOUND</div>;
    }
}

function mapStateToProps({ boardModule }) {
    return {
        modal: boardModule.modal
    }
}

const mapDispatchToProps = {
};


export const DynamicModal = connect(mapStateToProps, mapDispatchToProps)(_DynamicModal)

