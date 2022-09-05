import { IRegion } from "../../types/regions";

export const selectorsLocation = {
    district: (districts: Array<IRegion>, id: number) => districts.find(district => district.id == id)
}