import { Link } from 'react-router-dom'

import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import { BoardPreview } from '../cmps/board-preview.jsx'


export function BoardsList({ board, onRemoveBoard, onToggleBoardStar }) {
    const starColor = board.isStarred ? 'gold' : '#95a0b3'
    const imgUrl = board.style.imgUrl || ''
    const backgroundColor = board.style.backgroundColor || '#29CCE5'
    return (
        <Link className='board-link clean-link' to={`/board/${board._id}`}
            key={board._id}
            style={{ backgroundImage: `url(${imgUrl})`, backgroundColor: backgroundColor }} >
            <li>
                <BoardPreview board={board} />
                {board.isStarred ?
                    <StarIcon
                        onClick={(ev) => { onToggleBoardStar(ev, board) }}
                        className="star" style={{ color: 'gold', }} />
                    :
                    <StarBorderOutlinedIcon
                        onClick={(ev) => { onToggleBoardStar(ev, board) }}
                        className="star" style={{ color: starColor }} />
                }
                {
                    <div style={{ color: '#fff' }} className="remove-btn" onClick={(ev) => onRemoveBoard(ev, board)}>x</div>
                }
            </li>
        </Link>
    )
}
