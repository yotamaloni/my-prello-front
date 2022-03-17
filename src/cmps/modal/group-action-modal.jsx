import React from 'react'

import { connect } from 'react-redux'

import { updateBoard } from '../../store/board.action.js'

import { ModalHeader } from './modal-header.jsx'

class _GroupAction extends React.Component {

    onRemoveGroup = () => {
        const { group, board, closeModal } = this.props
        const groups = board.groups.filter(currGroup => currGroup.id !== group.id)
        board.groups = groups
        this.props.updateBoard({ ...board })
        closeModal()
    }

    onRemoveAllCards = () => {
        const { group, board, closeModal } = this.props
        const idx = board.groups.findIndex((currGroup => currGroup.id === group.id))
        board.groups[idx].tasks = []
        this.props.updateBoard({ ...board })
        closeModal()
    }

    render() {
        const { closeModal } = this.props
        return (
            <section className='modal group-action-modal'>
                <ModalHeader modal={{ type: 'List actions' }} closeModal={closeModal} />
                <div className="actions">
                    <div>
                        <button onClick={this.onRemoveAllCards} className="no-background action">Archive all cards in this list...</button>
                    </div>
                    <div>
                        <button onClick={this.onRemoveGroup} className="no-background action">Archive this list...</button>
                    </div>
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


export const GroupAction = connect(mapStateToProps, mapDispatchToProps)(_GroupAction) 
