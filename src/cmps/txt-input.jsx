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
    console.log("🟡 ~ ev", ev)
        ev.preventDefault()
        this.props.onUpdateTxtInput(this.state.txt)
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
                    <div className='config-activity'>
                        <button onClick={(ev) => {
                            this.onUpdateTxtInput(ev)
                        }} className='add-btn'>Save</button>
                    </div>
                }
            </form >
        )
    }
}



