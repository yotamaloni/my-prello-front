import React from 'react'

import { connect } from 'react-redux'

import { updateBoard } from '../../store/board.action.js'

import { ModalHeader } from './modal-header.jsx'

class _AttachmentModal extends React.Component {

    render() {
        const { board, task, modal, closeModal } = this.props
        return (
            <section className='modal attachment-modal'>
                <ModalHeader modal={modal} closeModal={closeModal} />
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


export const AttachmentModal = connect(mapStateToProps, mapDispatchToProps)(_AttachmentModal) 
