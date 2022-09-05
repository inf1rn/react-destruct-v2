import React from 'react'
import { locationAPI } from '../../../api/location'

interface IProps {
    onChange: (e: React.ChangeEvent<any>) => void
    value: string | number
    htmlName: string
}

export const RegionsSelect: React.FC<IProps> = React.memo(({ onChange, value, htmlName, ...props }) => {
    const { data: regions } = locationAPI.useGetAllQuery()

    return (
        <select onChange={onChange} value={value} name={htmlName} {...props} >
            <option value="" hidden>Выберите регион</option>
            {regions?.map(region => <option key={region.id} value={region.id}>{region.regionName}</option>)}
        </select>
    )
})
