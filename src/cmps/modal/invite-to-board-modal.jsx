import React from 'react'

import { connect } from 'react-redux'

import { loadUsers, showMsg } from '../../store/user.action.js'
import { updateBoard } from '../../store/board.action.js'

import DoneIcon from '@mui/icons-material/Done';

import { ModalHeader } from './modal-header.jsx'
import { MemberIcon } from '../member-icon.jsx'

class _InviteToBoardModal extends React.Component {
    inputRef = React.createRef();
    state = {
        membersToShow: null,
        txt: '',
        isShortedList: false,
    }

    componentDidMount() {
        this.loadUsers()
        this.inputRef.current.focus();
    }

    loadUsers = async (filterBy = null) => {
        await this.props.loadUsers(filterBy)
        let { users } = this.props
        let isShortedList = false
        if (users.length > 5) {
            users = users.splice(0, 5)
            isShortedList = true
        }
        this.setState({ membersToShow: users })
        this.setState({ isShortedList })
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
            ...prevState, [field]: value
        }));
        this.loadUsers({ txt: value })
    };

    toggleMemberToTask = (member) => {
        const { board } = this.props
        let boardMembers = board.members
        const boardMemberIdx = boardMembers?.findIndex(boardMember => boardMember._id === member._id)
        if (boardMemberIdx !== -1) {
            boardMembers.splice(boardMemberIdx, 1)
            this.props.showMsg(`${member.fullname} has been removed`)
        } else {
            boardMembers.push(member)
            this.props.showMsg(`${member.fullname} added`)

        }
        const updateBoard = { ...board, members: boardMembers }
        this.props.updateBoard(updateBoard)
    }

    render() {
        const { closeModal, board, modal } = this.props
        const { txt, isShortedList } = this.state
        const membersIds = board.members.map((member) => member._id) || []
        const { membersToShow } = this.state
        return (
            < section className='modal invite-to-board'>

                <ModalHeader modal={modal} closeModal={closeModal} />

                <div className='search-members'>
                    <input className='search-members-input'
                        ref={this.inputRef}
                        placeholder='Search members'
                        type='text'
                        onChange={this.handleChange}
                        autoComplete='off'
                        name='txt'
                        value={txt} />
                </div>

                <h4>Prello users</h4>

                <div className='board-members'>
                    <ul className='members-list clean-list'>
                        {membersToShow?.map((member) => {
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
                        {
                            isShortedList && <li>Partial list</li>
                        }
                    </ul>
                </div>

            </ section >
        )
    }
}

function mapStateToProps({ boardModule, userModule }) {
    return {
        board: boardModule.board,
        users: userModule.users
    }
}

const mapDispatchToProps = {
    updateBoard,
    loadUsers,
    showMsg
};

export const InviteToBoardModal = connect(mapStateToProps, mapDispatchToProps)(_InviteToBoardModal)


