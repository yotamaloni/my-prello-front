import React from 'react'
import { connect } from 'react-redux'

import CloseIcon from '@mui/icons-material/Close';

import { utilService } from '../services/util.service.js'

import { updateBoard } from '../store/board.action.js'



class _AddList extends React.Component {

    state = {
        title: '',
    }

    handleChange = ({ target }) => {
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
        const { onToggleAddList } = this.props

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
                        <button className='no-background' onClick={onToggleAddList}><CloseIcon /></button>
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
