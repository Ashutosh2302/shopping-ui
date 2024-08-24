import { ChangeEvent } from "react";

interface Props {
    lable: string
    onValueChange: (e: ChangeEvent<HTMLInputElement>) => void
    textType?: string
    mandatory?: boolean
}

const InputBox: React.FC<Props> = ({ lable, onValueChange, textType, mandatory }) => {

    return (
        <>
            <p>{lable}{mandatory && "*"}</p>
            <div>
                <input type={textType || 'text'} onChange={onValueChange} placeholder={lable} />
            </div>
        </>
    )
}

export default InputBox