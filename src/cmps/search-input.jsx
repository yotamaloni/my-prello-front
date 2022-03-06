import React from 'react'


import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


export class SearchInput extends React.Component {

    state = {
        input: ''
    }

    render() {
        return (
            < form className="search-form" >
                <SearchOutlinedIcon />
                <input type="text" placeholder='Search' />
            </form >
        )
    }
}



