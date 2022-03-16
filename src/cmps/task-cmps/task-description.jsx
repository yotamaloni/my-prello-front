
import React from 'react'

import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';

import { connect } from 'react-redux'
import { updateBoard } from '../../store/board.action.js'

import { TxtAreaInput } from '../txt-area-input.jsx'

class _TaskDescription extends React.Component {

    state = {
        isDescriptionOpen: null,
    }

    onCloseModal = () => {
        this.setState({ isDescriptionOpen: false })
    }

    onOpenModal = () => {
        this.setState({ isDescriptionOpen: true })
    }

    onUpdateTxtInput = (txt) => {
        if (!txt) return
        const { board, task } = this.props
        task.description = txt
        this.props.updateBoard({ ...board })
    }

    render() {
        const { task } = this.props
        let { description } = task
        const { isDescriptionOpen } = this.state
        if (description === null && this.state.task.description) description = this.state.task.description
        return (
            <section className='task-description'>
                <div>
                    <div className='description-title'>Description
                        <SegmentOutlinedIcon className='description-icon' />
                    </div>
                    {isDescriptionOpen ?
                        <TxtAreaInput
                            styleClass='add-desc-form'
                            placeholder='Add more detailed description...'
                            closeModal={this.onCloseModal}
                            onUpdateTxtInput={this.onUpdateTxtInput}
                            txt={description} />
                        :
                        <div className='clickable' onClick={() => {
                            this.onOpenModal()
                        }
                        }>
                            {description ? description : 'Add more detailed description...'}
                        </div>

                    }
                </div>
            </section>
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


export const TaskDescription = connect(mapStateToProps, mapDispatchToProps)(_TaskDescription)

