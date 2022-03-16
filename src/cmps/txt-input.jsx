import React from 'react'

export class TxtInput extends React.Component {
    state = {
        txt: null
    }

    onHandleChange = ({ target }) => {
        const value = target.value
        this.setState((prevState) => ({ txt: value }))
    }

    onSubmitForm = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        this.props.onUpdateTxtInput(this.state.txt)
        this.setState({ txt: '' })
    }

    render() {
        const { styleClass, isSaveBtn, isBlurSubmit } = this.props
        const placeholder = this.props.placeholder || ''
        let txt
        if (this.props.txt && this.state.txt === null) txt = this.props.txt
        else if (!this.props.txt && this.state.txt === null) txt = ''
        else txt = this.state.txt

        return (
            <form onSubmit={(ev) => this.onSubmitForm(ev)} className={`txt-form ${styleClass}`}>
                <input
                    className='txt-input'
                    placeholder={placeholder}
                    type="text"
                    name="txt"
                    value={txt}
                    onBlur={(ev) => {
                        if ((isBlurSubmit) === false) return
                        this.onSubmitForm(ev)
                    }
                    }
                    onChange={this.onHandleChange} />

                {isSaveBtn &&
                    <div className='save-btn'>
                        <button onClick={(ev) => {
                            this.onSubmitForm(ev)
                        }} className='add-btn'>Save</button>
                    </div>
                }
            </form >
        )
    }
}



