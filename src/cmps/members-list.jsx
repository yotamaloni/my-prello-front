import { divide } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

import { setFilterBy } from '../store/board.action.js'

import { MemberIcon } from '../cmps/member-icon.jsx'

class _MembersList extends React.Component {
    state = {
        filterByMembers: [],
        isMembersFullyOpen: false,
    }
    componentDidMount() {
        const filterByMembers = this.props.filterBy?.members || []
        this.setState({ filterByMembers })
    }

    handleChange = ({ target }) => {
        const { id } = target
        const { filterByMembers } = this.state
        const labelIdx = filterByMembers.findIndex(memberId => memberId === id)
        if (labelIdx === -1) filterByMembers.push(id)
        else filterByMembers.splice(labelIdx, 1)
        const { filterBy } = this.props
        filterBy.members = filterByMembers
        this.setState({ filterByMembers: [...filterByMembers] })
        this.props.setFilterBy({ ...filterBy })
    }
    onOpenShowMore = () => {
        this.setState({ isMembersFullyOpen: true })
    }

    render() {
        const { board, isCheckList } = this.props
        const { filterByMembers, isMembersFullyOpen } = this.state
        const size = this.props.size || 28
        const { members } = board
        const membersToDisplay = !isMembersFullyOpen && isCheckList ? members.slice(0, 3) : members
        const listClass = isCheckList ? 'column-list' : ''
        return (
            <ul className={`members-list clean-list ${listClass}`} style={{ background: 'none' }}>
                {membersToDisplay.map((member) => {
                    return <li className="member-container" key={member._id} >
                        {isCheckList &&
                            <input type="checkbox" id={member._id} onChange={this.handleChange} checked={filterByMembers?.includes(member._id)} />
                        }
                        <MemberIcon member={member} size={size} />
                        {isCheckList &&
                            <p>Cards assigned to {member.username}</p>
                        }
                    </li>
                })
                }
                {
                    (!isMembersFullyOpen && isCheckList && members.length > 3) &&
                    <React.Fragment>
                        <li className='members-option-container' onClick={this.onOpenShowMore} >
                            <input type="checkbox" className='not-visible' />
                            <p className='show-more'>Show more members <span className='show-more-icon'><KeyboardArrowDownOutlinedIcon /></span></p>
                        </li>
                    </React.Fragment>
                }
            </ ul >
        )
    }
}
function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
        filterBy: boardModule.filterBy
    }
}

const mapDispatchToProps = {
    setFilterBy
};


export const MembersList = connect(mapStateToProps, mapDispatchToProps)(_MembersList)


