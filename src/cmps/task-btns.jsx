
import React from 'react'
import { StaticDatePicker } from './task-dates.jsx'

import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';


import { LabelsModal } from './labels-modal.jsx'
import { ChecklistModal } from './checklist-modal.jsx'
import { DatePickerModal } from './date-picker-modal.jsx'
import { CoverModal } from './cover-modal.jsx'
import { DeleteModal } from './delete-modal.jsx'
import { MembersModal } from './members-modal.jsx'


export class TaskBtns extends React.Component {
    state = {
        modal: null,
        isArchiveOpen: false
    }

    onOpenModal = (type) => {
        this.setState({ modal: type })
    }
    closeModal = () => {
        this.setState({ modal: null })
    }
    onToggleDeleteModal = () => {
        const { isArchiveOpen } = this.state
        this.setState({ isArchiveOpen: !isArchiveOpen })
    }

    render() {
        const { bgCover, imgCover, task, groupId, updateTaskInCmp, board, updateBoard } = this.props
        const { modal, isArchiveOpen } = this.state
        return (
            <div className='flex column align-end task-btns-container'>
                <h3 className='config-title'>Add to card</h3>
                <div className='task-btn' onClick={() => this.onOpenModal('members')}>
                    <PersonOutlineOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >Members</div>
                    {modal === 'members' && <React.Fragment>
                        < MembersModal updateTaskInCmp={updateTaskInCmp} groupId={groupId} task={task}
                            closeModal={this.closeModal}
                            setTaskMembers={this.props.setTaskMembers}
                            boardId={this.props.boardId} />
                    </React.Fragment>}
                </div>

                <div className='task-btn' onClick={() => this.onOpenModal('labels')}>
                    <LabelOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >Labels</div>
                    {modal === 'labels' && <React.Fragment>
                        <LabelsModal groupId={groupId} task={task}
                            closeModal={this.closeModal}
                            setTaskDetails={this.props.setTaskDetails}
                            boardId={this.props.boardId} />
                    </React.Fragment>}
                </div>

                <div className='task-btn' onClick={() => this.onOpenModal()}>
                    <CheckBoxOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >CheckList</div>
                    {modal === 'checklist' && <React.Fragment>
                        <ChecklistModal groupId={groupId} task={task} closeModal={this.onCloseModal} />
                    </React.Fragment>}
                </div>

                {/* <div className='task-btn' onClick={() => this.onSetModal('datesModal')}> */}
                {/* <QueryBuilderOutlinedIcon /> */}
                {/* {modal === 'datesModal' &&
                        <div className={'date-picker'}>
                            <StaticDatePicker onSetModal={this.onSetModal} saveTask={this.saveTask} groupId={groupId} task={task} />
                        </div>} */}
                <div className='task-btn' onClick={() => this.onOpenModal('date')} >
                    <QueryBuilderOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >Dates</div>
                    {modal === 'date' && <React.Fragment> <DatePickerModal groupId={groupId} task={task}
                        closeModal={this.closeModal}
                        setTaskDetails={this.props.setTaskDetails}
                        boardId={this.props.boardId}
                    /></React.Fragment>}
                </div>

                <div className='task-btn'>
                    <AttachFileOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >Attachment</div>
                </div>

                <div className='task-btn' onClick={() => this.onOpenModal('cover')}>
                    <PhotoSizeSelectActualOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >Cover</div>
                    {modal === 'cover' && <React.Fragment> <CoverModal groupId={groupId} task={task}
                        closeModal={this.closeModal}
                        setTaskDetails={this.props.setTaskDetails}
                        boardId={this.props.boardId}
                    /></React.Fragment>}
                </div>
                <h3 className='config-title'>Actions</h3>

                <div className='task-btn' onClick={this.onToggleDeleteModal}>
                    <Inventory2OutlinedIcon sx={{ fontSize: '18px' }} />
                    <div>Archive</div>
                </div>


                {isArchiveOpen && <React.Fragment>
                    <div className='task-btn delete' onClick={() => this.onOpenModal('delete')}>
                        <HorizontalRuleOutlinedIcon sx={{ fontSize: '18px' }} />
                        <div >Delete</div>
                        {modal === 'delete' && <React.Fragment> <DeleteModal groupId={groupId} task={task}
                            closeModal={this.closeModal}
                            setTaskDetails={this.props.setTaskDetails}
                            boardId={this.props.boardId}
                        /></React.Fragment>}
                    </div>
                </React.Fragment>}


            </div >
        )
    }
}

{/* <button className='task-btn' onClick={() => this.onSetModal('coverModal')}>Cover</button>
              {modal === 'coverModal' &&
                <div className={'date-picker'}>
                  <TaskCover onSetModal={this.onSetModal} onHandleChange={this.onHandleChange} />
                </div>}

              <button className='task-btn' onClick={(ev) => {
                // ev.preventDefault()
                ev.stopPropagation()
                this.props.removeTask(groupId, taskId)
                this.props.history.push(`/board/${boardId}`)
              }} >Archive</button> */}

{/* </div> */ }