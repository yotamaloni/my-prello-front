import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { BoardPreview } from '../cmps/board-preview.jsx'


export function _BoardsList(props) {

    const { board, onRemoveBoard, onToggleBoardStar, user, index } = props
    const starColor = board.isStarred ? 'gold' : '#95a0b3'
    const imgUrl = board.style.imgUrl || '#0079BF'
    const backgroundColor = board.style.backgroundColor
    return (
        <Link className='board-link clean-link' to={`/board/${board._id}`}
            key={board._id}
            style={{ backgroundImage: `url(${imgUrl})`, backgroundColor: backgroundColor }}
        >
            <li>
                <BoardPreview board={board} />
                {board.isStarred ?
                    <StarIcon
                        onClick={(ev) => { onToggleBoardStar(ev, board._id) }}
                        className="star" style={{ color: 'gold', }} />
                    :
                    <StarBorderOutlinedIcon
                        onClick={(ev) => { onToggleBoardStar(ev, board._id) }}
                        className="star" style={{ color: starColor }} />
                }
                {user?.isAdmin &&
                    <div style={{ color: '#fff' }}
                        className="remove-board-btn"
                        onClick={(ev) => onRemoveBoard(ev, board)}><DeleteOutlinedIcon /></div>
                }
            </li>

        </Link >
    )
}


function mapStateToProps({ userModule }) {
    return {
        user: userModule.user,
    }
}

const mapDispatchToProps = {
};

export const BoardsList = connect(mapStateToProps, mapDispatchToProps)(_BoardsList)
