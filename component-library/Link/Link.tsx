import Link from 'next/link'
import React from 'react'

interface Props {
    href: string
    text: string
}

const ActionLink: React.FC<Props> = ({ href, text }) => {
    return (
        <Link href={href}>{text}</Link>
    )
}

export default ActionLink