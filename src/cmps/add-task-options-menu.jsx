import CloseIcon from '@mui/icons-material/Close';

export function OptionsMenu({ onToggleOptionsMenu }) {
    return (
        <div className="options-container">
            <div className='options-header'>
                <div className='options-title'>Options</div>
                <div className='options-title'><button className='close-options-btn' onClick={onToggleOptionsMenu}><CloseIcon fontSize="small" sx={{ color: '#172b4d' }}></CloseIcon></button></div>
            </div>
            <div className="options">
                <div>
                    <button className="no-background" >Members...</button>
                </div>
                <div>
                    <button className="no-background">Lables...</button>
                </div>
                <div>
                    <button className="no-background">Psition...</button>
                </div>
            </div>
        </div>

    );
}
