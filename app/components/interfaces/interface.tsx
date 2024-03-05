export interface LotInterface {
    idLot?: number,
    businessName?: string;
    establishment?: string;
    lot?: string;
    surface?: number;
    latitude?: number;
    length?: number;
    condition?: string;
}


export interface CostInterface {
    money: string,
    price: number,
    cant: number,
    idSupply: number
}

export interface LaborInterface {
    date: Date,
    comercialMark: string,
    dose: number,
    unit: string,
    idRotation: number,
    idLot: number
}


export interface RotationInterface {
    campaign: string,
    epoch: string,
    crop: string,
    state: number,
    idLot: number
}

export interface SupplyInterface {
    category: string,
    subCategory: string,
    family: string,
    commercialBrand: string,
    unit: string
}