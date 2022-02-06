
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import { boardService } from "../services/board.service.js"
import { socketService } from "../services/socket.service.js"

import { updateBoard, loadBoard } from '../store/board.action.js'

import { AppHeader } from '../cmps/app-header.jsx'
import { BoardPreview } from '../cmps/board-preview.jsx'
import { CreateBoardModal } from '../cmps/crate-board-modal.jsx'
import { filter } from 'lodash';



class _BoardApp extends React.Component {
    state = {
        boards: null,
        isCreateBoardModalOpen: false
    }
    async componentDidMount() {
        this.loadBoards()
        await this.props.loadBoard(null)
        const boards = "allBoards"
        socketService.emit('boards-watch', boards)
        socketService.on('boards-update', () => {
            this.loadBoards()
        })
        // socketService.on('remove-board', (boardId) => {
        //     let { boards } = this.state
        //     boards = boards.filter(currBoard => {
        //         return boardId !== currBoard._id
        //     }
        //     )
        //     this.setState({ boards })
        // })
        // socketService.on('add-board', (board) => {
        //     let { boards } = this.state
        //     boards = [...boards, board]
        //     this.setState({ boards })
        // })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.boards !== this.props.boards) {
            this.loadBoards()
        }
    }

    componentWillUnmount() {
        socketService.off('boards-update')
        // socketService.off('remove-board')
        // socketService.off('add-board')
    }



    onCreateBoard = async (board) => {
        try {
            await boardService.addBoard(board)
            socketService.emit('boards-update')
            // socketService.emit('add-board')
            // this.loadBoards()
        } catch (err) {
            console.log('Problem to add board', err);
        }
    }

    loadBoards = async () => {
        try {
            const boards = await boardService.query()
            this.setState({ boards })
        } catch (err) {
            console.log('Cannot get boards ', err);
        }

    }

    onOpenCreateBoardModal = () => {
        if (this.state.isCreateBoardModalOpen) return
        this.setState({ isCreateBoardModalOpen: true })
    }

    onCloseCreateBoardModal = () => {
        this.setState({ isCreateBoardModalOpen: false })
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
            socketService.emit('boards-update')
        } catch (err) {
            console.log('Cannot remove board ', err);
        }
    }

    render() {
        const { boards, isCreateBoardModalOpen } = this.state
        const loader = require('../img/loader.gif')
        if (!boards) return <div className='loader-page'><img className='loader' src={loader} /></div>
        const starredBoards = boards.filter((board) => board.isStarred)
        return (
            <section className="board-app">
                <AppHeader isBoardDetails={false} />
                <h2>WorkSpaces</h2>
                <div className='all-board-container'>
                    <h3>All boards</h3>
                    <ul className='board-list clean-list'>

                        <li className='create-new-board' onClick={this.onOpenCreateBoardModal}>
                            <p>Create new board</p>
                            {isCreateBoardModalOpen &&
                                <React.Fragment>
                                    <CreateBoardModal addBoard={this.onCreateBoard}
                                        onCloseModal={this.onCloseCreateBoardModal} />
                                </React.Fragment>
                            }
                        </li>
                        {boards.reverse().map((board => {
                            const starColor = board.isStarred ? 'gold' : '#95a0b3'
                            const imgUrl = board.style.imgUrl || ''
                            const backgroundColor = board.style.backgroundColor || '#29CCE5'
                            return <Link className='board-link clean-link' to={`/board/${board._id}`}
                                key={board._id}
                                style={{ backgroundImage: `url(${imgUrl})`, backgroundColor: backgroundColor }} >
                                <li>
                                    <BoardPreview board={board} />
                                    {board.isStarred ?
                                        <StarIcon
                                            onClick={(ev) => { this.onToggleBoardStar(ev, board) }}
                                            className="star" style={{ color: 'gold', }} />
                                        :
                                        <StarBorderOutlinedIcon
                                            onClick={(ev) => { this.onToggleBoardStar(ev, board) }}
                                            className="star" style={{ color: starColor }} />
                                    }
                                    {
                                        <div style={{ color: '#fff' }} className="remove-btn" onClick={(ev) => this.onRemoveBoard(ev, board)}>x</div>
                                    }
                                </li>
                            </Link>
                        }))

                        }
                    </ul>
                </div>

                <div className='stared-board-container'>
                    <h3>Starred boards</h3>
                    <ul className='stared-board-list clean-list'>

                        {starredBoards.reverse().map((board => {
                            const imgUrl = board.style.imgUrl || ''
                            const backgroundColor = board.style.backgroundColor || '#29CCE5'
                            return <Link className='board-link clean-link' to={`/board/${board._id}`}
                                key={board._id}
                                style={{ backgroundImage: `url(${imgUrl})`, backgroundColor: backgroundColor }} >
                                <li>
                                    <BoardPreview board={board} />
                                    <StarIcon
                                        onClick={(ev) => {
                                            ev.preventDefault()
                                            ev.stopPropagation()
                                            this.onToggleBoardStar(board)
                                        }}
                                        className="star" style={{ color: 'gold', }} />
                                </li>
                            </Link>
                        }))

                        }
                    </ul>
                </div>
            </section>
        )
    }
}

function mapStateToProps({ boardModule, userModule }) {
    return {
        board: boardModule.board,
        user: userModule.user,
    }
}

const mapDispatchToProps = {

    updateBoard,
    loadBoard
};


export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)

