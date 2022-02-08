
import React from 'react'

import { connect } from 'react-redux'
import { updateBoard, setModal } from '../../store/board.action.js'

import { DynamicModal } from '../modal/dynamic-modal.jsx'

class _TaskBtns extends React.Component {
    state = {
        modal: null,
        isArchiveOpen: false
    }

    BUTTONS = ['members', 'labels', 'checklist', 'date', 'attachment', 'cover']
    MODAL_WIDTH = 304 + 'px'


    onToggleDeleteModal = () => {
        const { isArchiveOpen } = this.state
        this.setState({ isArchiveOpen: !isArchiveOpen })
    }

    onSetModal = (modalType) => {
        this.props.setModal(modalType)
    }

    render() {
        const { task, modal } = this.props
        const { isArchiveOpen } = this.state
        return (
            <div className='flex column align-end task-btns-container'>

                {/******Add to card***************************/}

                <h3 className='config-title'>Add to card</h3>
                <ul className="add-to-card-list clean-list">
                    {this.BUTTONS.map(btn => {
                        return <li key={btn} className='task-btn' onClick={() =>
                            this.onSetModal({ type: btn, width: this.MODAL_WIDTH })}>
                            <div className={`txt ${btn}`} >{btn}</div>
                            {modal?.type === btn && <React.Fragment>
                                < DynamicModal
                                    task={task}
                                    closeModal={() => this.onSetModal(null)}
                                />
                            </React.Fragment>}
                        </li>
                    })
                    }
                </ul>

                {/******Actions******************************/}

                <h3 className='config-title'>Actions</h3>
                <div className='task-btn' onClick={this.onToggleDeleteModal}>
                    <div className='txt archive' >Archive</div>
                </div>
                {isArchiveOpen && <React.Fragment>
                    <div className='task-btn delete' onClick={() =>
                        this.onSetModal({ type: 'remove', width: this.MODAL_WIDTH })}>
                        <div className='txt remove'>Delete</div>
                        {modal?.type === 'remove' &&
                            <React.Fragment>
                                < DynamicModal
                                    task={task}
                                    closeModal={() => this.onSetModal(null)}
                                />
                            </React.Fragment>}
                    </div>
                </React.Fragment>}

            </div >
        )
    }
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
        modal: boardModule.modal,
    }
}

const mapDispatchToProps = {
    updateBoard,
    setModal
};

export const TaskBtns = connect(mapStateToProps, mapDispatchToProps)(_TaskBtns)