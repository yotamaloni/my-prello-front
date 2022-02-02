import React from 'react'
import { connect } from 'react-redux'
import { updateTask, updateBoard } from '../store/board.action.js'
import DoneIcon from '@mui/icons-material/Done';

import { MemberIcon } from '../cmps/member-icon.jsx'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

class _MembersModal extends React.Component {
    state = {
        membersToShow: [...this.props.board.members],
        txt: '',
        task: { ...this.props.task },
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
            ...prevState, [field]: value
        }));
        this.submit(value)
    };

    submit = (value) => {
        const txt = value
        const membersToShow = this.props.board.members.filter((member) => {
            return (member.fullname.toLowerCase().includes(txt.toLowerCase())
                ||
                member.username.toLowerCase().includes(txt.toLowerCase()))
        })
        this.setState({ membersToShow })
    };


    toggleMemberToTask = (member) => {
        const { groupId, board } = this.props
        let { task } = this.state
        let taskMembers = task.members
        const isMemberInTask = taskMembers?.find(taskMember => taskMember._id === member._id) ? true : false
        if (isMemberInTask) {
            taskMembers = taskMembers.filter(taskMember => taskMember._id !== member._id)
        } else {
            if (taskMembers) taskMembers.push(member)
            else taskMembers = [member]
        }
        const updatedTask = { ...task, members: taskMembers }

        this.setState({ task: updatedTask })
        const group = board.groups.find(currGroup => currGroup.id === groupId)
        const taskIdx = group.tasks.findIndex(currTask => currTask.id === task.id)
        group.tasks[taskIdx] = updatedTask
        this.props.updateBoard({ ...board })
        this.props.updateTaskInCmp(updatedTask)
    }

    render() {
        const { closeModal, board } = this.props
        const { task } = this.state
        const { txt } = this.state
        const membersIds = task?.members?.map((member) => member._id) || []
        const { membersToShow } = this.state
        return (
            < section className='members-modal-container' >
                <div className='header-container'>
                    <div className='hidden'>
                        <ClearOutlinedIcon />
                    </div>
                    <div className='title'>
                        Members
                    </div>
                    <div className='cancel'>
                        <ClearOutlinedIcon onClick={(ev) => {
                            ev.stopPropagation();
                            closeModal()
                        }} />
                    </div>
                    {/* <div>
                        <button onClick={(ev) => {
                            ev.stopPropagation();
                            closeModal()
                        }}
                            className='close-modal-btn'>x</button>
                    </div> */}
                </div>
                <div className='search-members'>
                    <input className='search-members-input'
                        placeholder='Search members'
                        type='text'
                        onChange={this.handleChange}
                        autoComplete='off'
                        name='txt'
                        value={txt} />
                </div>
                <div>
                    <h4>Board members</h4>
                </div>
                <div className='board-members'>
                    <ul className='members-list clean-list'>
                        {membersToShow.map((member) => {
                            return <li onClick={() => {
                                this.toggleMemberToTask(member)
                            }} className='member' key={member._id}>
                                <div className='flex default-gap'>
                                    <MemberIcon member={member} size={32} />
                                    <span>{`${member.fullname}  (${member.username})`}</span>
                                </div>
                                {membersIds.includes(member._id) &&
                                    <div className='vi'><DoneIcon /></div>
                                }
                            </li>
                        })}
                    </ul>
                </div>
            </ section>

        )
    }
}




function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board
    }
}

const mapDispatchToProps = {
    updateTask,
    updateBoard
};


export const MembersModal = connect(mapStateToProps, mapDispatchToProps)(_MembersModal)


