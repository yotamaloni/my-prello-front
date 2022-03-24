export function MemberIcon({ member, size }) {
    return (
        <section className='member-icon'
            style={{
                backgroundColor: member.color,
                height: size + 'px',
                width: size + 'px',
                fontSize: size / 2 + 'px'
            }}>
            {member.initials}
        </section >
    )
}
