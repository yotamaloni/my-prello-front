
import React from 'react'

import { connect } from 'react-redux'

import { updateBoard } from '../store/board.action.js'

import DoneIcon from '@mui/icons-material/Done';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

class _LabelsModal extends React.Component {
    inputRef = React.createRef();


    state = {
        // labels: this.props.task?.labels || [],
        isModalOpen: false,
        editLabel: null,
        txt: ''
    }

    onSetLabel = (chosenLabel) => {
        let labels = this.props.task.labels || []
        const labelsIdx = labels.findIndex(label => label.id === chosenLabel.id)
        if (labelsIdx === -1) {
            labels.push(chosenLabel)
        } else {
            labels.splice(labelsIdx, 1)
        }
        const { task, board } = this.props
        task.labels = labels
        this.props.updateBoard({ ...board })
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
            ...prevState, [field]: value
        }));
    };

    onSaveLabelTxt = (ev) => {
        ev.preventDefault()
        const { txt, editLabel } = this.state
        if (!editLabel) return
        editLabel.txt = txt
        const { board, task } = this.props
        const { labels } = board
        const updatedLabels = labels.map((label) => label.id === editLabel.id ? editLabel : label)
        board.labels = updatedLabels
        this.props.updateBoard({ ...board })
        this.setState({ txt: '', editLabel: null })
    }

    onSetEditLabel = (chosenLabel) => {
        const editLabel = chosenLabel
        this.setState({ editLabel })
        this.inputRef.current.focus();
    }
    render() {
        const { txt } = this.state
        const { board, task } = this.props
        const boardLabels = board.labels
        const taskLabels = task.labels || []
        const taskLabelsIds = taskLabels.map((label => label.id))
        return (
            <div className='task-modal'>
                <div className='header-container'>
                    <div className='hidden'>
                        <ClearOutlinedIcon />
                    </div>
                    <div className='title'>
                        Labels
                    </div>
                    <div className='cancel'>
                        <ClearOutlinedIcon onClick={(ev) => {
                            ev.stopPropagation();
                            this.props.closeModal()
                        }} />
                    </div>

                </div>
                <ul className='labels-color-list clean-list'>
                    {boardLabels.map((boardLabel) => {
                        return <li onClick={() => {
                            this.onSetLabel(boardLabel)
                        }} key={boardLabel.id} >

                            <div className='label-container' style={{ backgroundColor: boardLabel.color }}>
                                <div className='label-txt'>  {boardLabel.txt}</div>
                                <div className='vi'> {taskLabelsIds.includes(boardLabel.id) ? <DoneIcon /> : ''}</div>

                            </div>

                            <div className='edit'>
                                <ModeEditOutlineOutlinedIcon onClick={(ev) => {
                                    ev.preventDefault()
                                    ev.stopPropagation()
                                    this.onSetEditLabel(boardLabel)
                                }} />
                            </div>

                        </li>
                    })}
                    <li className='edit-all'>
                        <div className='edit-input-container'>
                            <form onSubmit={(ev) => {
                                ev.preventDefault()
                                this.onSaveLabelTxt(ev)
                            }}>
                                <input className='edit-input'
                                    ref={this.inputRef}
                                    placeholder='Edit...'
                                    type='text'
                                    onChange={this.handleChange}
                                    name='txt'
                                    value={txt} />
                                <div className='config-activity'>

                                </div>
                            </form>
                        </div>
                    </li>
                </ul>


                <button onClick={(ev) => {
                    ev.stopPropagation();
                    this.props.closeModal()
                }}
                    className='close-modal-btn'></button>
            </div >
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


export const LabelsModal = connect(mapStateToProps, mapDispatchToProps)(_LabelsModal) 
