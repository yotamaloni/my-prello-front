import React from 'react'

export class BoardPreview extends React.Component {

    render() {
        const { board } = this.props
        return (
            <section className="board-preview" >
                <h4>{board.title}</h4>
            </section>
        )
    }
}
