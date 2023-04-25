import { Icon } from "@phosphor-icons/react"

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>


export interface IndicatorsType {
  health: number,
  leisure: number,
  education: number, 
  safety: number,
  environment: number,
  mobility: number,
}

export interface ExpenseType {
  name: string
  desc: string
  category: string[]
  value: number
  mensalExpense: number
  supply: IndicatorsType
  icon: Icon
}

export interface ExpenseInRegionType extends ExpenseType {
  quantity: number
}

export interface RevenueType {
  name: string
  value: number
  level: 1 | 2 | 3
  affects: ['population'] | ['companies'] | ['population', 'companies'] | []
}


export interface RegionType {
  id: string,
  name: string,
  type: 'residential' | 'commercial' | 'industrial'
  population: number,
  companies: number,
  indicators: IndicatorsType,
  demands: IndicatorsType,
  expense: ExpenseInRegionType[]
  revenue: RevenueType[]
}

export interface CityType {
  regions: RegionType[]
  balance: number
  round: number
  addRegion: ( typeOfRegion: 'residential' | 'commercial' | 'industrial' ) => void
  editRegion: (region: RegionType) => void
  addBalance: (value: number) => void
  subtractBalance: (value: number) => void
  nextRound: () => void
  restart: () => void
}