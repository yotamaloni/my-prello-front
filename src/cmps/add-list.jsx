import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from 'react-redux'
import { updateBoard } from '../store/board.action.js'

import { utilService } from '../services/util.service.js'


class _AddList extends React.Component {

    state = {
        title: '',
    }

    handleChange = ({ target }) => {
        // const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
            ...prevState, title: value
        }));
    };

    onSubmitNewList = (ev) => {
        ev.preventDefault();
        const { title } = this.state
        const { board } = this.props
        const group = {
            title,
            id: 'g' + utilService.makeId(3),
            tasks: [],
            style: {}
        }
        if (board.groups) board.groups.push(group)
        else (board.groups = [group])
        this.props.updateBoard({ ...board })
        this.setState({
            title: ''
        });
    }


    render() {
        let { title } = this.state
        const { onToggleAddList, onAddGroup } = this.props

        return (
            <section className='add-list-container' >
                <form className="add-list-form">
                    <div>
                        <input className='add-input'
                            type='text'
                            onChange={this.handleChange}
                            autoComplete='off'
                            name='title'
                            value={title} />
                    </div>
                    <div className='flex add-btn-container'>
                        <button className='add-btn' type="submit" onClick={this.onSubmitNewList}>Add list</button>
                        <button className='no-background' onClick={onToggleAddList}><CloseIcon></CloseIcon></button>
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
    updateBoard
};


export const AddList = connect(mapStateToProps, mapDispatchToProps)(_AddList)
