import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export function ModalHeader({ modal, closeModal }) {
    return <section className='modal-header'>

        <div className='hidden'>
            <ClearOutlinedIcon />
        </div>
        <div className='title'>
            {modal.type}
        </div>
        <div className='cancel'>
            <ClearOutlinedIcon onClick={(ev) => {
                ev.stopPropagation();
                closeModal()
            }} />
        </div>

    </section>
}