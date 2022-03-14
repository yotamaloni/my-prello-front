import React, { useState } from 'react';

import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { ModalHeader } from '../cmps/modal/modal-header.jsx'
import { ItemHeaderCover } from './item-header-cover.jsx'
import { BoardActivitiesList } from '../cmps/board-activity-list.jsx'
import { CreateBoardModal } from './modal/crate-board-modal.jsx'


export function BoardSideMenu(props) {
    const { isSideMenuOpen, onToggleSideMenu, board, updateBoard } = props
    const [section, setSection] = useState('menu');
    const modal = {
        type: section
    }

    const changeSection = (type) => {
        setSection(type)
    }
    const sideBarClass = isSideMenuOpen ? 'board-side-menu open' : 'board-side-menu'
    const bgCover = board.style.backgroundColor
    const imgCover = board.style.imgUrl
    return <section className={sideBarClass}>
        <ModalHeader modal={modal} closeModal={onToggleSideMenu} />

        {section === 'menu' &&
            < ul className='main-container clean-list'>
                <li className="switch-section-btn no-background" onClick={() => { changeSection('change-board-details') }}>
                    <h4> Change board details</h4>
                    <ItemHeaderCover bgCover={bgCover} imgCover={imgCover} boardCoverClass={'board-cover-class'} className="icon" />
                </li>
                <li ><BoardActivitiesList /></li>
            </ul>
        }

        {section === 'change-board-details' &&
            <div>
                <CreateBoardModal isCreateBoard={false} board={board} updateBoard={updateBoard} />
                <ArrowBackIosNewOutlinedIcon onClick={() => { changeSection('menu') }} className="go-back-btn" />
            </div>
        }
    </section >
}



