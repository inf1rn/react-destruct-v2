import classNames from 'classnames'
import React from 'react'

interface IProps {
    value: string | number | undefined
    error: boolean
    className: string
    onChange: (value: React.ChangeEvent<any>) => void
    type: string
    id: string
    htmlName: string
}

export const ValidationInput: React.FC<IProps> = React.memo(({ value, error, className, onChange, htmlName, ...props }) => {
    return (
        <input value={value} onChange={onChange} name={htmlName} className={classNames(className, {
            error
        })}  {...props} />
    )
})
