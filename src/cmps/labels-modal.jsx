
import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';



import { connect } from 'react-redux'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';



import { updateBoard } from '../store/board.action.js'



class _LabelsModal extends React.Component {
    inputRef = React.createRef();


    state = {
        labels: this.props.task?.labels || [],
        isModalOpen: false,
        editLabel: null,
        txt: ''
    }

    onSetLabel = (chosenLabel) => {
        let { labels } = this.state
        const labelsIdx = labels.findIndex(label => label.id === chosenLabel.id)
        if (labelsIdx === -1) {
            labels.push(chosenLabel)
        } else {
            labels.splice(labelsIdx, 1)
        }
        this.setState({ labels: [...labels] })
        const { task, groupId, board } = this.props
        task.labels = [...labels]
        const group = board.groups.find(currGroup => currGroup.id === groupId)
        const taskIdx = group.tasks.findIndex(currTask => currTask.id === task.id)
        group.tasks[taskIdx] = task
        this.props.updateBoard({ ...board })
        this.props.setTaskDetails(task)
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
        const { txt, editLabel, labels } = this.state
        if (!editLabel) return
        editLabel.txt = txt
        const updatedLabels = labels.map((label) => label.id === editLabel.id ? editLabel : label)
        this.setState({ labels: [...updatedLabels] })
        const { task, groupId, board } = this.props
        task.labels = [...updatedLabels]
        const group = board.groups.find(currGroup => currGroup.id === groupId)
        const taskIdx = group.tasks.findIndex(currTask => currTask.id === task.id)
        group.tasks[taskIdx] = task
        const labelInBoardIdx = board.labels.findIndex(currLabel => currLabel.id === editLabel.id)
        board.labels[labelInBoardIdx].txt = txt
        this.props.updateBoard({ ...board })
        this.props.setTaskDetails(task)
        this.setState({ txt: '', editLabel: null })
    }

    // updateTaskAndBoard = (updatedLabels) => {
    //     this.setState({ labels: [...updatedLabels] })
    //     const { task, groupId, board } = this.props
    //     task.labels = [...updatedLabels]
    //     const group = board.groups.find(currGroup => currGroup.id === groupId)
    //     const taskIdx = group.tasks.findIndex(currTask => currTask.id === task.id)
    //     group.tasks[taskIdx] = task
    //     this.props.updateBoard({ ...board })
    //     this.props.setTaskDetails(task)
    // }

    onSetEditLabel = (chosenLabel) => {
        const editLabel = chosenLabel
        this.setState({ editLabel })
        this.inputRef.current.focus();
    }
    render() {
        const { txt } = this.state
        const { board } = this.props
        const boardLabels = board.labels
        const { labels } = this.state
        const taskLabelsIds = labels.map((label => label.id))
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
                                    {/* <button onClick={(ev) => {
                                        ev.preventDefault()
                                        this.onSaveLabelTxt(ev)
                                    }} className='save-label-btn'>Save</button> */}
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
