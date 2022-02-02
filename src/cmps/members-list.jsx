import React from 'react'
import { connect } from 'react-redux'
import { } from '../store/board.action.js'

import { MemberIcon } from '../cmps/member-icon.jsx'

class _MembersList extends React.Component {
    state = {
    }
    render() {
        const { board } = this.props
        const { members } = board
        return (
            <ul className="members-list clean-list" style={{ background: 'none' }}>
                {members.map((member) => {
                    return <MemberIcon key={member._id} member={member} size={28} />
                })}
            </ ul>
        )
    }
}




function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board
    }
}

const mapDispatchToProps = {

};


export const MembersList = connect(mapStateToProps, mapDispatchToProps)(_MembersList)


