import React from 'react'

export class TaskCover extends React.Component {



    render() {
        const colors = [
            '#7BC86C',
            '#F5DD29',
            '#FFAF3F',
            '#EF7564',
            '#CD8DE5',
            '#5BA4CF',
            '#29CCE5',
            '#6DECA9',
            '#FF8ED4',
            '#172B4D',
        ]
        return (
            <div className='task-cover'>
                <button onClick={() => this.props.onSetModal('')}>X</button>
                <div className="color-input">

                    {colors.map(color => {
                        return <div
                            onClick={() => this.props.onHandleChange('backgroundColor', color)}
                            style={{ backgroundColor: color }}
                            key={color}
                            className="color-value"
                        >
                        </div>
                    })}
                </div>
            </div>
        )
    }
}