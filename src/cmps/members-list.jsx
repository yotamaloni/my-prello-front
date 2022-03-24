import { divide } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { setFilterBy } from '../store/board.action.js'

import { MemberIcon } from '../cmps/member-icon.jsx'

class _MembersList extends React.Component {
    state = {
        filterByMembers: []
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

    render() {
        const { board, isCheckList, filterBy } = this.props
        const { filterByMembers } = this.state
        const size = this.props.size || 28
        const { members } = board
        const listClass = isCheckList ? 'column-list' : ''
        return (
            <ul className={`members-list clean-list ${listClass}`} style={{ background: 'none' }}>
                {members.map((member) => {
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


