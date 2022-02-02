import React from 'react'

import { connect } from 'react-redux'

import { updateBoard } from '../store/board.action.js'

import CloseIcon from '@mui/icons-material/Close';

import { utilService } from '../services/util.service.js'


export class _AddTask extends React.Component {

    state = {
        title: '',
        isOptionsMenuOpen: '',
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
            ...prevState, [field]: value
        }));
    };



    onSubmitNewTask = (ev) => {
        ev.preventDefault();
        const byMember = { id: utilService.makeId(), username: 'TEST' } //TO DO - UPDATE LOG IN
        const { title } = this.state
        const { group, board } = this.props
        const task = {
            title,
            byMember,
            id: 'c' + utilService.makeId(3),
            createdAt: Date.now(),
            style: {},
        }
        group.tasks.push(task)
        this.props.updateBoard({ ...board })
        this.setState({
            title: ''
        });
        this.props.onToggleAddTask();
    }

    onToggleOptionsMenu = () => {
        const isOptionsMenuOpen = this.state.isOptionsMenuOpen ? '' : 'open'
        this.setState({ isOptionsMenuOpen })
    }


    render() {
        let { title, isOptionsMenuOpen } = this.state

        return (
            <section >
                <form className="add-task-form">
                    <textarea
                        placeholder='Enter a title for this card...'
                        onChange={this.handleChange}
                        autoComplete='off'
                        name='title'
                        value={title} />
                    <div className='flex add-task-btn-container'>
                        <div className='flex'>
                            <button className='add-btn' type="submit" onClick={this.onSubmitNewTask}>Add card</button>
                            <button type='button' className='no-background' onClick={this.props.onToggleAddTask}><CloseIcon></CloseIcon></button>
                        </div>
                    </div>
                </form>

            </section>
        );
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


export const AddTask = connect(mapStateToProps, mapDispatchToProps)(_AddTask)

