import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { closeMsg } from '../store/user.action.js';


class _UserMsg extends React.Component {

    timeoutId;

    componentDidUpdate() {
        if (this.timeoutId) clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(() => {
            this.onCloseMsg()
        }, 100000)
    }


    onCloseMsg = () => {
        this.props.closeMsg()
    }

    render() {
        const { msg } = this.props
        if (!msg) return <React.Fragment></React.Fragment>

        const msgClass = msg.type || ''
        return (
            <section className={'user-msg ' + msgClass}>
                {msg.txt}
                <div className='btn-container'>
                    <button
                        onClick={() => {
                            this.onCloseMsg()
                        }}
                    >
                        x
                    </button>
                </div>
            </section>
        )
    }
}



function mapStateToProps({ userModule }) {
    return {
        msg: userModule.msg,

    }
}
const mapDispatchToProps = {
    closeMsg
};

export const UserMsg = connect(mapStateToProps, mapDispatchToProps)(_UserMsg)









