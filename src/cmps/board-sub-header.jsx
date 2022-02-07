import React from 'react'

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';

import { MembersList } from '../cmps/members-list.jsx'
import { DynamicModal } from '../cmps/modal/dynamic-modal.jsx'

export class BoardSubHeader extends React.Component {

    state = {
        modal: null
    }

    onOpenModal = (type) => {
        this.setState({ modal: type })
    }

    closeModal = () => {
        this.setState({ modal: null })
    }

    render() {

        const { toggleFilterModal, board, onToggleBoardStar } = this.props
        const { modal } = this.state
        const starColor = board.isStarred ? 'gold' : '#FFF'
        const MODAL_WIDTH = 304 + 'px'

        return (
            <section className='board-sub-header'>
                <div className='flex left-menu'>
                    <div className="sub-nav-btn">Board</div>
                    <p className=' sub-nav-btn board-title'>{board.title}</p>

                    {board.isStarred ?
                        <StarRateIcon className="sub-nav-btn star"
                            onClick={onToggleBoardStar}
                            style={{ color: 'gold' }} />
                        :
                        <StarBorderOutlinedIcon className="sub-nav-btn star"
                            onClick={onToggleBoardStar}
                            style={{ color: starColor }} />
                    }

                    <MembersList />
                    <div className='invite-btn clickable' onClick={() => this.onOpenModal('invite')}>
                        <GroupAddOutlinedIcon /><span>Invite</span>
                        {modal === 'invite' && <React.Fragment>
                            < DynamicModal
                                width={MODAL_WIDTH}
                                modal={'invite'}
                                closeModal={this.closeModal}
                            />
                        </React.Fragment>}
                    </div>

                </div>
                <div className='flex right-menu'>
                    <div className='flex default-gap sub-nav-btn' onClick={() => { toggleFilterModal() }}>
                        <FilterListOutlinedIcon />
                        <div className='txt-in-btn'>Filter</div>
                    </div>
                    <div className='flex default-gap sub-nav-btn'>
                        <MoreHorizOutlinedIcon />
                        <div className='txt-in-btn'>Show menu</div>
                    </div>
                </div>
            </section>
        )
    }
}
