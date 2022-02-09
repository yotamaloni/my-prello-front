
import React from 'react'
import { connect } from 'react-redux'

import { updateBoard } from '../../store/board.action.js'

import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';

import { TxtInput } from '../txt-input.jsx'

class _TaskTitle extends React.Component {

    onUpdateTxtInput = (txt) => {
        if (!txt) return
        const { board, task } = this.props
        task.title = txt
        this.props.updateBoard({ ...board })
    }

    render() {
        const { group, txt } = this.props
        return (
            <section>
                <TxtInput styleClass='task-title' txt={txt} onUpdateTxtInput={this.onUpdateTxtInput} />
                <CallToActionOutlinedIcon className='info-icon title' />
                <div className='group-title'>In list <span>{group.title}</span></div>
            </section>
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


export const TaskTitle = connect(mapStateToProps, mapDispatchToProps)(_TaskTitle)



