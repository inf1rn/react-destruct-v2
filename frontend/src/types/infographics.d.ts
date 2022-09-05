export interface IInfographicsData {
    date: Date
    hash: {
        [key: string]: number
    }
}

export interface IInfographics {
    data: any
    options: any
}

interface ICommonSocialInfographics {
    data: Array<IInfographicsData>
    social: string
}

export type DynamicInfographicsLabelsType = Array<string>

export interface IDynamicInfographicsData {
    labels: DynamicInfographicsLabelsType
    datasets: DynamicInfographicsDatsetsType
}