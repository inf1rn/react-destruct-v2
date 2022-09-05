import { debounce, throttle } from 'lodash'
import Nouislider from 'nouislider-react'
import React, { useCallback, useMemo } from 'react'

interface IProps {
    min: number
    max: number
    startValue: number
    endValue: number
    text: string
    onUpdateStartValue: (startValue: number) => void
    onUpdateEndValue: (endValue: number) => void
}

export const FilterRange: React.FC<IProps> = React.memo(({ min, max, startValue, endValue, text, onUpdateEndValue, onUpdateStartValue }) => {
    const debouncedOnChange = useMemo(() => debounce((startValue, endValue) => {
        onUpdateStartValue(Math.floor(startValue))
        onUpdateEndValue(Math.floor(endValue))
    }, 300), [])

    return (
        <div className="main-filters__range range">
            <span className="range__label">{text}</span>
            <div className="range__slider-wrap">
                <Nouislider range={{ min, max }} start={[startValue, endValue]} connect onUpdate={(e) => {
                    const values = e.values()
                    const startValue = +values.next().value as number
                    const endValue = +values.next().value as number

                    debouncedOnChange(startValue, endValue)
                }} />
            </div>
            <div className="range__cols">
                <div className="range__col">
                    <input value={startValue} onChange={(e) => onUpdateStartValue(+e.target.value)} className="range__input js-val-1 js-range-input" type="number" />
                </div>
                <div className="range__col">
                    <input value={endValue} onChange={(e) => onUpdateEndValue(+e.target.value)} className="range__input js-val-2 js-range-input" type="number" />
                </div>
            </div>
        </div>
    )
})
