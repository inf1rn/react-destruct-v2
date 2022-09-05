import React from 'react'
import Select from 'react-select'
import { MultiValue } from 'react-select/dist/declarations/src'
import { ISelectOption } from '../../../types/ui'

interface IProps {
    options: Array<ISelectOption>
    currentValue: Array<ISelectOption>
    onChange: (value: string | null) => void
}

export const Multiselect: React.FC<IProps> = React.memo(({ options, currentValue, onChange }) => {
    const onChangeHandler = (e: MultiValue<ISelectOption>) => {
        if (!e.length) {
            console.log(e.length);

            onChange(null)
            return
        }

        onChange(e.map(item => item.value).join(","))
    }

    return (
        <Select
            placeholder="Выберите"
            options={options} isMulti={true}
            onChange={onChangeHandler} value={currentValue}
        />
    )
})
