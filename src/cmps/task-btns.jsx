
import React from 'react'

import { connect } from 'react-redux'
import { updateBoard, setModal } from '../store/board.action.js'



import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';


import { DynamicModal } from './modal/dynamic-modal.jsx'


class _TaskBtns extends React.Component {
    state = {
        modal: null,
        isArchiveOpen: false
    }

    onToggleDeleteModal = () => {
        const { isArchiveOpen } = this.state
        this.setState({ isArchiveOpen: !isArchiveOpen })
    }

    onSetModal = (modalType) => {
        this.props.setModal(modalType)
    }

    render() {
        const MODAL_WIDTH = 304 + 'px'
        const { task, modal } = this.props
        const { isArchiveOpen } = this.state
        return (
            <div className='flex column align-end task-btns-container'>
                <h3 className='config-title'>Add to card</h3>


                {/******MEMBERS**************************************************************************************/}
                <div className='task-btn' onClick={() =>
                    this.onSetModal({ type: 'members', width: MODAL_WIDTH })}>
                    <PersonOutlineOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >Members</div>
                    {modal?.type === 'members' && <React.Fragment>
                        < DynamicModal
                            task={task}
                            closeModal={() => this.onSetModal(null)}
                        />
                    </React.Fragment>}
                </div>

                {/******Labels**************************************************************************************/}

                <div className='task-btn' onClick={() =>
                    this.onSetModal({ type: 'labels', width: MODAL_WIDTH })}>
                    <LabelOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >Labels</div>
                    {modal?.type === 'labels' && <React.Fragment>
                        < DynamicModal
                            task={task}
                            closeModal={() => this.onSetModal(null)}
                        />
                    </React.Fragment>}
                </div>

                {/******CheckList**************************************************************************************/}

                <div className='task-btn' onClick={() =>
                    this.onSetModal({ type: 'checklist', width: MODAL_WIDTH })}>
                    <CheckBoxOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >CheckList</div>
                    {modal?.type === 'checklist' && <React.Fragment>
                        < DynamicModal
                            task={task}
                            closeModal={() => this.onSetModal(null)}
                        />
                    </React.Fragment>}
                </div>

                {/******Dates**************************************************************************************/}



                <div className='task-btn' onClick={() =>
                    this.onSetModal({ type: 'date', width: MODAL_WIDTH })} >
                    <QueryBuilderOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >Dates</div>
                    {modal?.type === 'date' &&
                        <React.Fragment>
                            < DynamicModal
                                task={task}
                                closeModal={() => this.onSetModal(null)}
                            />
                        </React.Fragment>}
                </div>

                {/******Attachment**************************************************************************************/}
                <div className='task-btn' onClick={() =>
                    this.onSetModal({ type: 'attachment', width: MODAL_WIDTH })}>
                    <AttachFileOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >Attachment</div>
                    {modal?.type === 'attachment' &&
                        <React.Fragment>
                            < DynamicModal
                                task={task}
                                closeModal={() => this.onSetModal(null)}
                            />
                        </React.Fragment>}
                </div>
                {/******Cover**************************************************************************************/}
                <div className='task-btn' onClick={() =>
                    this.onSetModal({ type: 'cover', width: MODAL_WIDTH })}>
                    <PhotoSizeSelectActualOutlinedIcon sx={{ fontSize: '18px' }} />
                    <div >Cover</div>
                    {modal?.type === 'cover' &&
                        <React.Fragment>
                            < DynamicModal
                                task={task}
                                closeModal={() => this.onSetModal(null)}
                            />
                        </React.Fragment>}
                </div>

                <h3 className='config-title'>Actions</h3>

                {/******Archive**************************************************************************************/}
                <div className='task-btn' onClick={this.onToggleDeleteModal}>
                    <Inventory2OutlinedIcon sx={{ fontSize: '18px' }} />
                    <div>Archive</div>
                </div>
                {isArchiveOpen && <React.Fragment>
                    <div className='task-btn delete' onClick={() =>
                        this.onSetModal({ type: 'remove', width: MODAL_WIDTH })}>
                        <HorizontalRuleOutlinedIcon sx={{ fontSize: '18px' }} />
                        <div >Delete</div>
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