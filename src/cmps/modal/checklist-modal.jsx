import React from 'react'

import { connect } from 'react-redux'

import { utilService } from '../../services/util.service'

import { updateBoard } from '../../store/board.action.js'

import { ModalHeader } from './modal-header.jsx'

class _ChecklistModal extends React.Component {

    state = {
        title: ''
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
            ...prevState, [field]: value
        }));
    };

    onSubmit = (ev) => {
        ev.stopPropagation()
        const checklist = {
            id: utilService.makeId(),
            title: this.state.title,
            items: []
        }
        const { board, task } = this.props
        if (task.checklists) task.checklists.push(checklist)
        else task.checklists = [checklist]
        this.props.closeModal()
        this.props.updateBoard({ ...board }, { ...task })
    };


    render() {
        const { modal, closeModal } = this.props
        const { title } = this.state
        return (
            <section className='modal checklist-modal'>
                <ModalHeader modal={modal} closeModal={closeModal} />
                <h4>Title</h4>
                <div className='checklist-modal-input'>
                    <input className='checklist-modal-input'
                        placeholder='Checklist'
                        type='text'
                        onChange={this.handleChange}
                        autoComplete='off'
                        name='title'
                        value={title} />
                </div>
                <button className='add-btn' onClick={(ev) => this.onSubmit(ev)}>
                    Add
                </button>
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


export const ChecklistModal = connect(mapStateToProps, mapDispatchToProps)(_ChecklistModal)

