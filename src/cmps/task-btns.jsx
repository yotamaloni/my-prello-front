
import React from 'react'

import { connect } from 'react-redux'
import { updateBoard } from '../store/board.action.js'



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


class _TaskBtns extends React.Component {
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
        const { task, groupId, group } = this.props
        const { modal, isArchiveOpen } = this.state
        return (
            <div className='flex column align-end task-btns-container'>
                <h3 className='config-title'>Add to card</h3>
                <div className='task-btn' onClick={() => this.onOpenModal('members')}>
                    <PersonOutlineOutlinedIcon sx={{ fontSize: '18px' }} />

                    {/******MEMBERS**************************************************************************************/}

                    <div >Members</div>
                    {modal === 'members' && <React.Fragment>
                        < MembersModal
                            task={task}
                            closeModal={this.closeModal}
                        />
                    </React.Fragment>}
                </div>

                {/******Labels**************************************************************************************/}

                <div className='task-btn' onClick={() => this.onOpenModal('labels')}>
                    <LabelOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >Labels</div>
                    {modal === 'labels' && <React.Fragment>
                        <LabelsModal
                            task={task}
                            closeModal={this.closeModal}
                        />
                    </React.Fragment>}
                </div>

                {/******CheckList**************************************************************************************/}

                <div className='task-btn' onClick={() => this.onOpenModal()}>
                    <CheckBoxOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >CheckList</div>
                    {modal === 'checklist' && <React.Fragment>
                        <ChecklistModal
                            task={task}
                            closeModal={this.onCloseModal} />
                    </React.Fragment>}
                </div>

                {/******Dates**************************************************************************************/}



                <div className='task-btn' onClick={() => this.onOpenModal('date')} >
                    <QueryBuilderOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >Dates</div>
                    {modal === 'date' && <React.Fragment> <DatePickerModal
                        task={task}
                        closeModal={this.closeModal}
                    /></React.Fragment>}
                </div>

                {/******Attachment**************************************************************************************/}


                <div className='task-btn'>
                    <AttachFileOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >Attachment</div>
                </div>

                {/******Cover**************************************************************************************/}


                <div className='task-btn' onClick={() => this.onOpenModal('cover')}>
                    <PhotoSizeSelectActualOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >Cover</div>
                    {modal === 'cover' && <React.Fragment> <CoverModal
                        task={task}
                        closeModal={this.closeModal}
                    /></React.Fragment>}
                </div>


                <h3 className='config-title'>Actions</h3>

                {/******Archive**************************************************************************************/}


                <div className='task-btn' onClick={this.onToggleDeleteModal}>
                    <Inventory2OutlinedIcon sx={{ fontSize: '18px' }} />
                    <div>Archive</div>
                </div>


                {isArchiveOpen && <React.Fragment>
                    <div className='task-btn delete' onClick={() => this.onOpenModal('delete')}>
                        <HorizontalRuleOutlinedIcon sx={{ fontSize: '18px' }} />
                        <div >Delete</div>
                        {modal === 'delete' && <React.Fragment> <DeleteModal
                            task={task}
                            group={group}
                            closeModal={this.closeModal}
                        /></React.Fragment>}
                    </div>
                </React.Fragment>}


            </div >
        )
    }
}



function mapStateToProps({ boardModule }) {

    return {
        board: boardModule.board,
    }
}

const mapDispatchToProps = {
    updateBoard,
};


export const TaskBtns = connect(mapStateToProps, mapDispatchToProps)(_TaskBtns)