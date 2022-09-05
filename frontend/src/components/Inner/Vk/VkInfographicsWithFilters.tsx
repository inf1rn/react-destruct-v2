import React from 'react'
import { Line } from 'react-chartjs-2'
import { IInfographics } from '../../../types/infographics'
import { IVkInfographicsGroupsFilters, IVkInfographicsPostsFilters } from '../../../types/vk'
import { VkInfographicsFilters } from './VkInfographicsFilters'

interface IProps {
    onChangeFiltersCountry?: (country: string | null) => void
    onChangeFiltersRegion?: (region: string | null) => void
    onChangeFiltersSubscribersCountMin?: (subscribersCountMin: number) => void
    onChangeFiltersSubscribersCountMax?: (subscribersCountMax: number) => void
    clearFilters?: () => void
    applyFilters?: () => void
    filters?: IVkInfographicsGroupsFilters | IVkInfographicsGroupsFilters | IVkInfographicsPostsFilters
    infographicsData?: IInfographics 
}

export const VkInfographicsWithFilters: React.FC<IProps> = React.memo((props) => {
    const {
        onChangeFiltersCountry, onChangeFiltersSubscribersCountMin,
        onChangeFiltersRegion, onChangeFiltersSubscribersCountMax,
        filters, applyFilters, clearFilters, infographicsData
    } = props

    return (
        <>
            <div className="chart-block__right js-slide active">
                {filters && applyFilters && clearFilters && <VkInfographicsFilters
                    onChangeCountry={onChangeFiltersCountry}
                    onChangeRegion={onChangeFiltersRegion} onChangeSubscribersCountMax={onChangeFiltersSubscribersCountMax}
                    onChangeSubscribersCountMin={onChangeFiltersSubscribersCountMin}
                    filters={filters} applyFilters={applyFilters} clearFilters={clearFilters} />
                }

            </div>

            <div className="chart-block__left">
                <div className="chart-block__bg">
                    <div className="chart-1 chart-1_large">
                        {infographicsData && <Line data={infographicsData.data} options={infographicsData.options} />}
                    </div>
                </div>
            </div>
        </>

    )
})
