
import React from 'react'
import { connect } from 'react-redux'

import { updateBoard } from '../../store/board.action.js'

import TocOutlinedIcon from '@mui/icons-material/TocOutlined';

import { utilService } from '../../services/util.service'

import { TxtInput } from '../txt-input.jsx'

class _TaskAddActivity extends React.Component {
    state = {
        isActivityOpen: null,
    }
    GUEST = {
        "_id": utilService.makeId(),
        "username": "Guest",
        "password": "123",
        "fullname": "Guest",
        "color": "#00c2e0",
        "initials": "G",
        "isAdmin": false,
    }

    onCloseModal = () => {
        this.setState({ isActivityOpen: false })
    }

    onOpenModal = () => {
        this.setState({ isActivityOpen: true })
    }

    onUpdateTxtInput = (txt) => {
        if (!txt) return
        this.submitActivity(txt)
    }

    submitActivity = (txt) => {
        const { task, board, user } = this.props
        const byMember = user?.username ? user : this.GUEST
        const activity = {
            byMember,
            createdAt: Date.now(),
            txt,
            id: utilService.makeId(3),
            taskId: task.id,
        }
        board.activities.push(activity)
        this.props.updateBoard({ ...board })
        this.setState({ isActivityOpen: false })
    }

    render() {
        const { isActivityOpen } = this.state
        const isSaveBtn = isActivityOpen ? true : false
        return (

            <section className='task-activity-add'>

                <main className='main'>
                    <div className='title'>
                        Activity
                        <TocOutlinedIcon className='activity-icon' />

                    </div>
                    <div onClick={this.onOpenModal}>
                        <TxtInput onClick={this.onOpenModal}
                            styleClass='add-activity'
                            txt={null}
                            onUpdateTxtInput={this.onUpdateTxtInput}
                            placeholder='Write a comment...'
                            onOpenModal={this.onOpenModal}
                            isSaveBtn={isSaveBtn}
                            isBlurSubmit={false}
                        />
                    </div>
                </main>
            </section>

        )
    }
}


function mapStateToProps({ boardModule, userModule }) {
    return {
        board: boardModule.board,
        user: userModule.user
    }
}

const mapDispatchToProps = {
    updateBoard,
};


export const TaskAddActivity = connect(mapStateToProps, mapDispatchToProps)(_TaskAddActivity)



