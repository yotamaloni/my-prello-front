import React from 'react'

export class TxtAreaInput extends React.Component {
    state = {
        txt: null
    }

    onHandleChange = ({ target }) => {
        const value = target.value
        this.setState((prevState) => ({ txt: value }))
    }

    onSubmitForm = (ev) => {
        ev.preventDefault()
        this.props.onUpdateTxtInput(this.state.txt)
    }

    render() {
        const { styleClass } = this.props
        const placeholder = this.props.placeholder || ''
        let txt
        if (this.props.txt && this.state.txt === null) txt = this.props.txt
        else if (!this.props.txt && this.state.txt === null) txt = ''
        else txt = this.state.txt

        return (
            <form onSubmit={(ev) => this.onSubmitForm(ev)} className={`txt-area-form ${styleClass}`}>
                <textarea
                    className='txt-input'
                    placeholder={placeholder}
                    type="text"
                    name="txt"
                    value={txt}
                    onBlur={(ev) => this.onSubmitForm(ev)}
                    onChange={this.onHandleChange} />

                <div className='config'>
                    <button onClick={(ev) => this.onSubmitForm(ev)} className='add-btn' type="submit" >Save</button>
                    <button onClick={() => {
                        this.props.closeModal()
                    }} className='add-btn' type="submit" >X</button>
                </div>
            </form>

        )
    }
}



