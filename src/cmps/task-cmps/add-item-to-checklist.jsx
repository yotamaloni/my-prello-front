import React from 'react'


import CloseIcon from '@mui/icons-material/Close';

export class AddItemToChecklist extends React.Component {
    inputRef = React.createRef();
    state = {
        title: '',
    }
    componentDidMount() {
        this.inputRef.current.focus();
    }

    handleChange = ({ target }) => {
        const value = target.value;
        this.setState((prevState) => ({
            ...prevState, title: value
        }));
    };

    render() {
        const { title } = this.state
        const { onToggleAddItem } = this.props
        console.log("🟡 ~ onToggleAddItem", onToggleAddItem)
        return (
            <section className='add-item-to-checklists' >
                <form className="add-item-form">
                    <div>
                        <input className='add-input'
                            ref={this.inputRef}
                            type='text'
                            onChange={this.handleChange}
                            autoComplete='off'
                            name='title'
                            value={title} />
                    </div>
                    <div className='flex add-item-btn-container'>
                        <button className='add-item-btn add-btn' type="submit" onClick={() => { this.props.onSubmitNewItem(title) }}>Add</button>
                        <button className='no-background' onClick={onToggleAddItem}><CloseIcon /></button>
                    </div>
                </form>
            </section>

        );
    }
}


