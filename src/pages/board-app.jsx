
import React from 'react'
import { connect } from 'react-redux'

import { boardService } from "../services/board.service.js"
import { socketService } from "../services/socket.service.js"

import { updateBoard, loadBoard, setModal } from '../store/board.action.js'

import { AppHeader } from '../cmps/app-header.jsx'
import { BoardsList } from '../cmps/boards-list.jsx'
import { DynamicModal } from '../cmps/modal/dynamic-modal.jsx'
import { CircularIndeterminate } from '../cmps/loader.jsx'


class _BoardApp extends React.Component {

    state = {
        boards: null,
    }

    componentDidMount() {
        this.loadBoards()
        socketService.on('remove-board', (boardId) => {
            let { boards } = this.state
            boards = boards.filter(currBoard => {
                return boardId !== currBoard._id
            }
            )
            this.setState({ boards })
        })
        socketService.on('add-board', (board) => {
            let { boards } = this.state
            boards = [...boards, board]
            this.setState({ boards })
        })
    }

    componentWillUnmount() {
        socketService.off('remove-board')
        socketService.off('add-board')
        const { modal } = this.props
        if (modal) this.props.setModal(null)
    }

    onCreateBoard = async (board) => {
        try {
            await boardService.addBoard(board)
            socketService.emit('add-board')
        } catch (err) {
            console.log('Problem to add board', err);
        }
    }

    loadBoards = async (filterBy = null) => {
        try {
            const boards = await boardService.query(filterBy)
            this.setState({ boards })
        } catch (err) {
            console.log('Cannot get boards ', err);
        }

    }

    onSetModal = (modalType) => {
        this.props.setModal(modalType)
    }

    onToggleBoardStar = (ev, board) => {
        ev.preventDefault()
        const isStarred = board.isStarred ? false : true
        board.isStarred = isStarred
        this.props.updateBoard({ ...board })
    }

    onRemoveBoard = async (ev, board) => {
        ev.preventDefault()
        try {
            await boardService.removeBoard(board._id)
            socketService.emit('remove-board')
        } catch (err) {
            console.log('Cannot remove board ', err);
        }
    }

    render() {
        const { boards } = this.state
        if (!boards) return <div className='loader-page'><CircularIndeterminate /></div>
        const starredBoards = boards.filter((board) => board.isStarred)
        const { modal } = this.props
        return (
            <section className="board-app">
                <AppHeader loadBoards={this.loadBoards} isBoardDetails={false} />
                <h2>WorkSpaces</h2>
                <div className='all-board-container'>
                    <h3>All boards</h3>
                    <ul className='board-list clean-list'>

                        <li className='create-new-board'
                            onClick={() =>
                                this.onSetModal({ type: 'create-board' })}>
                            <p>Create new board</p>
                            {modal?.type &&
                                <React.Fragment>
                                    < DynamicModal
                                        isCreateBoard={true}
                                        modal={'create-board'}
                                        addBoard={this.onCreateBoard}
                                        closeModal={() => this.onSetModal(null)
                                        }
                                    />
                                </React.Fragment>
                            }
                        </li>
                        {boards.reverse().map((board => {
                            return <BoardsList key={board._id} board={board}
                                onToggleBoardStar={this.onToggleBoardStar}
                                onRemoveBoard={this.onRemoveBoard}
                            />
                        }))
                        }
                    </ul>
                </div>

                <div className='starred-board-container'>
                    <h3>Starred boards</h3>
                    <ul className='stared-board-list clean-list'>
                        {starredBoards.reverse().map((board => {
                            return <BoardsList key={board._id} board={board}
                                onToggleBoardStar={this.onToggleBoardStar}
                                onRemoveBoard={this.onRemoveBoard}
                            />
                        }))
                        }
                    </ul>
                </div>
            </section>
        )
    }
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
        modal: boardModule.modal,
        filterBy: boardModule.filterBy,
    }
}

const mapDispatchToProps = {
    updateBoard,
    loadBoard,
    setModal,
};


export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)

