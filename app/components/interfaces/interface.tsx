export interface LotInterface {
    idLot?: number,
    businessName?: string;
    establishment?: string;
    lot?: string;
    surface?: number;
    latitude?: number;
    length?: number;
    condition?: string;
    createdAt?: string
    updatedAt?: string
}

export interface SupplyInterface {
    idSupply?: number,
    category?: string,
    subCategory?: string,
    family?: string,
    commercialBrand?: string,
    idUnit?: number;
    createdAt?: string
    updatedAt?: string
}


export interface CostInterface {
    date: string,
    idSupply: number,
    idMoney: number,
    price: number,
    quantity: number,
    createdAt?: string
    updatedAt?: string
}

export interface LaborInterface {
    date: string,
    commercialBrand: string | undefined,
    dose: number,
    idUnit: number,
    idRotation: number,
    idLot: number
    createdAt?: string
    updatedAt?: string
}


export interface RotationInterface {
    idRotation?: number,
    campaign?: string,
    epoch?: string,
    crop?: string,
    state?: string,
    idLot?: number
    createdAt?: string
    updatedAt?: string
}

export interface UnitSupplyInterface {
    idUnit: number,
    description: string
}



export interface ListPriceInterface {
    idListPrice?: number,
    commercialBrand?: string,
    campaign?: string,
    idMoney?:number,
    price?: number,
    idUnit?: number;
    createdAt?: string
    updatedAt?: string
}

export interface MoneyInterface {
    idMoney?: number,
    description?: string,
}


export interface PriceGrainInterface {
    idPriceGrain?: number,
    campaign?: string,
    crop?: string,
    price?: number
    createdAt?: string
    updatedAt?: string
}