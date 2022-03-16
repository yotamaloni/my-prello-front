import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import AddIcon from '@mui/icons-material/Add';

import { loadBoard, updateBoard, setBoardInReducer, setModal } from '../store/board.action.js'
import { socketService } from '../services/socket.service.js'

import { AppHeader } from '../cmps/app-header.jsx'
import { BoardSubHeader } from '../cmps/board-sub-header.jsx'
import { BoardSideMenu } from '../cmps/board-side-menu.jsx'
import { TaskDetails } from '../cmps/task-cmps/task-details.jsx'
import { AddList } from '../cmps/add-list.jsx'
import { BoardGroupList } from '../cmps/board-group-list.jsx'
import { CircularIndeterminate } from '../cmps/loader.jsx'


class _BoardDetails extends React.Component {
    state = {
        isMenuOpen: '',
        isAddListOpen: '',
        isFilterModalOpen: '',
        isSideMenuOpen: false,
    }

    timeoutId = null

    componentDidMount() {
        const { boardId } = this.props.match.params;
        this.props.loadBoard(boardId)
        socketService.emit('board-watch', boardId)
        socketService.on('board-update', (board) => {
            setTimeout(() => {
                clearTimeout(this.timeoutId)
                this.timeoutId = this.props.setBoardInReducer(board)
            }, 500);
        })
    }
    s
    componentWillUnmount() {
        socketService.off('board-update')
        clearTimeout(this.timeoutId)
        const { modal } = this.props
        if (modal) this.props.setModal(null)
        this.props.loadBoard(null)
    }

    onToggleMenuModal = () => {
        const isMenuOpen = this.state.isMenuOpen ? '' : 'open'
        this.setState({ isMenuOpen })
    }

    onToggleFilterModal = () => {
        const isFilterModalOpen = this.state.isFilterModalOpen ? '' : 'open'
        this.setState({ isFilterModalOpen })
    }

    onToggleSideMenu = () => {
        const { isSideMenuOpen } = this.state
        this.setState({ isSideMenuOpen: !isSideMenuOpen })
    }

    onToggleAddList = () => {
        const isAddListOpen = this.state.isAddListOpen ? '' : 'open'
        this.setState({ isAddListOpen })
    }

    onToggleBoardStar = () => {
        const { board } = this.props
        const isStarred = board.isStarred ? false : true
        board.isStarred = isStarred
        this.props.updateBoard({ ...board })
    }

    render() {
        const { isAddListOpen, isSideMenuOpen } = this.state
        const { board, updateBoard } = this.props
        if (!board || !board.title) return <div className='loader-page'><CircularIndeterminate /></div>
        const imgUrl = board.style.imgUrl || ''
        const backgroundColor = board.style.backgroundColor || '#29CCE5'

        return (
            <section className="board-details"
                style={{
                    backgroundImage: `url(${imgUrl})`,
                    backgroundColor: backgroundColor
                }} >
                <AppHeader isBoardDetails={true} />
                <BoardSubHeader board={board}
                    toggleMenuModal={this.onToggleMenuModal}
                    toggleFilterModal={this.onToggleFilterModal}
                    onToggleBoardStar={this.onToggleBoardStar}
                    onToggleSideMenu={this.onToggleSideMenu}
                />
                <div className='overflow-container'>
                    <div className='group-container flex default-gap'>

                        <BoardGroupList />

                        {!isAddListOpen ?
                            <div className='list-composer'>
                                <button className='add-list-btn  list-composer' onClick={this.onToggleAddList}>
                                    <span>
                                        <AddIcon fontSize="small"></AddIcon>
                                    </span>
                                    <span>
                                        Add another list
                                    </span>
                                </button>
                            </div>
                            :
                            <div className='list-composer'>
                                <AddList board={board} onToggleAddList={this.onToggleAddList} />
                            </div>
                        }
                    </div>
                    <BoardSideMenu isSideMenuOpen={isSideMenuOpen} board={board} updateBoard={updateBoard} onToggleSideMenu={this.onToggleSideMenu} />

                    <Route path={`/board/:boardId/:groupId/:taskId`} component={TaskDetails} />

                </div>
            </section>
        )
    }
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
        modal: boardModule.modal
    }
}

const mapDispatchToProps = {
    loadBoard,
    updateBoard,
    setBoardInReducer,
    setModal
};


export const BoardDetails = connect(mapStateToProps, mapDispatchToProps)(_BoardDetails)

