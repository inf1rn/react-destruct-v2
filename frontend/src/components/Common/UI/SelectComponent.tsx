import React from 'react'
import Select from 'react-select'
import { ISelectOption } from "../../../types/ui"

interface IProps {
  options: Array<ISelectOption>
  onChange: (value: string | null) => void
  currentValue: string | null
  canBeNull?: boolean
  placeholder?: string
}

export const SelectComponent: React.FC<IProps> = React.memo(({ options, onChange, currentValue, canBeNull = false, placeholder = "Выберите" }) => {
  if (canBeNull) {
    options = [{
      label: "Все",
      value: null
    }, ...options]
  }

  const optionValue = options.find(option => option.value === currentValue)

  return (
    <Select
      menuPortalTarget={document.body}
      styles={{
        control: base => ({
          ...base,
          height: "100%",
          width: "100%"
        }),
        menuPortal: base => ({
          ...base,
          zIndex: 1
        })
      }}
      placeholder={placeholder}
      className="select-component" value={optionValue} options={options} onChange={(e) => {
        console.log(e && e.value)
        onChange(e && e.value)
      }
      } />
  )
})
