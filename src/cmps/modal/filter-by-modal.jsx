import React from 'react'

import { connect } from 'react-redux'

import { updateBoard } from '../../store/board.action.js'

import { MembersList } from '../members-list.jsx'
import { ModalHeader } from './modal-header.jsx'
import { DateOptionFilter } from './date-option-filter.jsx'
import { LabelsOptionFilter } from './labels-option-filter.jsx'


class _FilterByModal extends React.Component {
    render() {
        const { modal, board, closeModal } = this.props

        return (
            <section className='modal filter-by-modal'>
                <ModalHeader modal={modal} closeModal={closeModal} />
                <div className='filter-section members'>
                    <h4>Members</h4>
                    <MembersList isCheckList={true} size={24} />
                </div>
                <div className='filter-section due-date'>
                    <h4>Due date</h4>
                    <DateOptionFilter />
                </div>
                <div className='filter-section labels'>
                    <h4>Labels</h4>
                    <LabelsOptionFilter />
                </div>
            </section >
        )
    }
}

function mapStateToProps({ boardModule }) {

    return {
        board: boardModule.board
    }
}

const mapDispatchToProps = {
    updateBoard,
};


export const FilterByModal = connect(mapStateToProps, mapDispatchToProps)(_FilterByModal) 
