import axios, { AxiosError } from "axios";
import {
  CostInterface,
  LaborInterface,
  ListPriceInterface,
  LotInterface,
  PriceGrainInterface,
  ProductionInterface,
  RotationInterface,
  SupplyInterface,
} from "../components/interfaces/interface";
import { alertRemoveError } from "../components/alerts/sweet";

// LOTES
export const postLot = async (lot: LotInterface) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LOT}${process.env.NEXT_PUBLIC_LOT_POST}`,
      lot
    );
    return result;
  } catch (error) {
    console.error("Error al cargar el Lote:", error);
  }
};

export const editLot = async (id: number, lot: LotInterface) => {
  try {
    const result = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LOT}${process.env.NEXT_PUBLIC_LOT_EDIT}/${id}`,
      lot
    );
    return result;
  } catch (error) {
    console.error("Error al editar el Lote:", error);
  }
};

export const getAllLots = async () => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LOT}${process.env.NEXT_PUBLIC_LOT_GETALL}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener los Lotes:", error);
  }
};

export const getOneLot = async (idLot: number) => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LOT}${process.env.NEXT_PUBLIC_LOT_GETONE}/${idLot}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener un Lote:", error);
  }
};

export const deleteLot = async (id: number) => {
  try {
    const result = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LOT}${process.env.NEXT_PUBLIC_LOT_DELETE}/${id}`
    );

    return result;
  } catch (error: any) {
    if (
      error instanceof AxiosError &&
      error.response?.data.message ===
        "Recurso no encontrado debido a una violación de clave foránea"
    ) {
      // Manejar errores de Axios
      alertRemoveError("El recurso no se puede eliminar por datos vinculados");
    } else {
      // Manejar otros tipos de errores
      throw new Error(error);
    }
  }
};

// INSUMOS
export const postSupply = async (Supply: SupplyInterface) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_SUPPLY}${process.env.NEXT_PUBLIC_SUPPLY_POST}`,
      Supply
    );
    return result;
  } catch (error) {
    console.error("Error al cargar el Insumo:", error);
  }
};

export const editSupply = async (id: number, Supply: SupplyInterface) => {
  try {
    const result = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_SUPPLY}${process.env.NEXT_PUBLIC_SUPPLY_EDIT}/${id}`,
      Supply
    );
    return result;
  } catch (error) {
    console.error("Error al editar el Insumo:", error);
  }
};

export const getAllSupplies = async () => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_SUPPLY}${process.env.NEXT_PUBLIC_SUPPLY_GETALL}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener los Insumos:", error);
  }
};

export const getOneSupply = async (idSupply: number) => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_SUPPLY}${process.env.NEXT_PUBLIC_SUPPLY_GETONE}/${idSupply}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener un Insumo:", error);
  }
};

export const deleteSupply = async (id: number) => {
  try {
    const result = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_SUPPLY}${process.env.NEXT_PUBLIC_SUPPLY_DELETE}/${id}`
    );
    return result;
  } catch (error: any) {
    if (
      error instanceof AxiosError &&
      error.response?.data.message ===
        "Recurso no encontrado debido a una violación de clave foránea"
    ) {
      // Manejar errores de Axios
      alertRemoveError("El recurso no se puede eliminar por datos vinculados");
    } else {
      // Manejar otros tipos de errores
      throw new Error(error);
    }
  }
};

// UNIDADES
export const getAllUnits = async () => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_SUPPLY}${process.env.NEXT_PUBLIC_UNIT_GETALL}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener las monedas:", error);
  }
};

// MONEDA

export const getAllMoney = async () => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_SUPPLY}${process.env.NEXT_PUBLIC_MONEY_GETALL}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener las Unidades:", error);
  }
};

// ROTACIONES
export const postRotation = async (object: RotationInterface) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_ROTATION}${process.env.NEXT_PUBLIC_ROTATION_POST}`,
      object
    );
    return result;
  } catch (error) {
    console.error("Error al cargar la Rotacion:", error);
  }
};

export const editRotation = async (id: number, object: RotationInterface) => {
  try {
    const result = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_ROTATION}${process.env.NEXT_PUBLIC_ROTATION_EDIT}/${id}`,
      object
    );
    return result;
  } catch (error) {
    console.error("Error al editar la Rotacion:", error);
  }
};

export const getAllRotations = async () => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_ROTATION}${process.env.NEXT_PUBLIC_ROTATION_GETALL}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener las Rotaciones:", error);
  }
};

export const getOneRotation = async (idRotation: number) => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_ROTATION}${process.env.NEXT_PUBLIC_ROTATION_GETONE}/${idRotation}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener la Rotacion:", error);
  }
};

export const deleteRotation = async (id: number) => {
  try {
    const result = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_ROTATION}${process.env.NEXT_PUBLIC_ROTATION_DELETE}/${id}`
    );
    return result;
  } catch (error: any) {
    if (
      error instanceof AxiosError &&
      error.response?.data.message ===
        "Recurso no encontrado debido a una violación de clave foránea"
    ) {
      // Manejar errores de Axios
      alertRemoveError("El recurso no se puede eliminar por datos vinculados");
    } else {
      // Manejar otros tipos de errores
      throw new Error(error);
    }
  }
};

// LABORES
export const postLabor = async (object: LaborInterface) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LABOR}${process.env.NEXT_PUBLIC_LABOR_POST}`,
      object
    );
    return result;
  } catch (error) {
    console.error("Error al cargar el Labor:", error);
  }
};

export const editLabor = async (id: number, object: LaborInterface) => {
  try {
    const result = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LABOR}${process.env.NEXT_PUBLIC_LABOR_EDIT}/${id}`,
      object
    );
    return result;
  } catch (error) {
    console.error("Error al editar el Labor:", error);
  }
};

export const getAllLabors = async () => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LABOR}${process.env.NEXT_PUBLIC_LABOR_GETALL}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener los Labores:", error);
  }
};

export const getOneLabor = async (idLabor: number) => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LABOR}${process.env.NEXT_PUBLIC_LABOR_GETONE}/${idLabor}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener el Labor:", error);
  }
};

export const deleteLabor = async (id: number) => {
  try {
    const result = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LABOR}${process.env.NEXT_PUBLIC_LABOR_DELETE}/${id}`
    );
    return result;
  } catch (error: any) {
    if (
      error instanceof AxiosError &&
      error.response?.data.message ===
        "Recurso no encontrado debido a una violación de clave foránea"
    ) {
      // Manejar errores de Axios
      alertRemoveError("El recurso no se puede eliminar por datos vinculados");
    } else {
      // Manejar otros tipos de errores
      throw new Error(error);
    }
  }
};

// LISTA DE PRECIOS
export const postListPrice = async (object: ListPriceInterface) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LIST_PRICE}${process.env.NEXT_PUBLIC_LIST_PRICE_POST}`,
      object
    );
    return result;
  } catch (error) {
    console.error("Error al cargar la lista de precios:", error);
  }
};

export const editListPrice = async (id: number, object: ListPriceInterface) => {
  try {
    const result = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LIST_PRICE}${process.env.NEXT_PUBLIC_LIST_PRICE_EDIT}/${id}`,
      object
    );
    return result;
  } catch (error) {
    console.error("Error al editar la lista de precios:", error);
  }
};

export const getAllListPrice = async () => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LIST_PRICE}${process.env.NEXT_PUBLIC_LIST_PRICE_GETALL}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener la lista de precios:", error);
  }
};

export const getOneListPrice = async (idLabor: number) => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LIST_PRICE}${process.env.NEXT_PUBLIC_LIST_PRICE_GETONE}/${idLabor}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener la un precio de la lista:", error);
  }
};

export const deleteListPrice = async (id: number) => {
  try {
    const result = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LIST_PRICE}${process.env.NEXT_PUBLIC_LIST_PRICE_DELETE}/${id}`
    );
    return result;
  } catch (error: any) {
    if (
      error instanceof AxiosError &&
      error.response?.data.message ===
        "Recurso no encontrado debido a una violación de clave foránea"
    ) {
      // Manejar errores de Axios
      alertRemoveError("El recurso no se puede eliminar por datos vinculados");
    } else {
      // Manejar otros tipos de errores
      console.error("Error al eliminar insumo de la lista:", error);
    }
  }
};

// COSTO
export const postCost = async (object: CostInterface) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_COST}${process.env.NEXT_PUBLIC_COST_POST}`,
      object
    );
    return result;
  } catch (error) {
    console.error("Error al cargar el costo:", error);
  }
};

export const editCost = async (id: number, object: CostInterface) => {
  try {
    const result = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_COST}${process.env.NEXT_PUBLIC_COST_EDIT}/${id}`,
      object
    );
    return result;
  } catch (error) {
    console.error("Error al editar el costo:", error);
  }
};

export const getAllCosts = async () => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_COST}${process.env.NEXT_PUBLIC_COST_GETALL}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener el costo:", error);
  }
};

export const getOneCost = async (idLabor: number) => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_COST}${process.env.NEXT_PUBLIC_COST_GETONE}/${idLabor}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener el costo:", error);
  }
};

export const deleteCost = async (id: number) => {
  try {
    const result = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_COST}${process.env.NEXT_PUBLIC_COST_DELETE}/${id}`
    );
    return result;
  } catch (error: any) {
    if (
      error instanceof AxiosError &&
      error.response?.data.message ===
        "Recurso no encontrado debido a una violación de clave foránea"
    ) {
      // Manejar errores de Axios
      alertRemoveError("El recurso no se puede eliminar por datos vinculados");
    } else {
      // Manejar otros tipos de errores
      console.error("Error al eliminar el costo:", error);
    }
  }
};

// PRECIO X GRANO
export const postPriceGrain = async (object: PriceGrainInterface) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PRICEGRAIN}${process.env.NEXT_PUBLIC_PRICEGRAIN_POST}`,
      object
    );
    return result;
  } catch (error) {
    console.error("Error al cargar el Precio por grano:", error);
  }
};

export const editPriceGrain = async (
  id: number,
  object: PriceGrainInterface
) => {
  try {
    const result = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PRICEGRAIN}${process.env.NEXT_PUBLIC_PRICEGRAIN_EDIT}/${id}`,
      object
    );
    return result;
  } catch (error) {
    console.error("Error al editar el Precio por grano:", error);
  }
};

export const getAllPriceGrains = async () => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PRICEGRAIN}${process.env.NEXT_PUBLIC_PRICEGRAIN_GETALL}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener el Precio por grano:", error);
  }
};

export const getOnePriceGrain = async (id: number) => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PRICEGRAIN}${process.env.NEXT_PUBLIC_PRICEGRAIN_GETONE}/${id}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener el Precio por grano:", error);
  }
};

export const deletePriceGrain = async (id: number) => {
  try {
    const result = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PRICEGRAIN}${process.env.NEXT_PUBLIC_PRICEGRAIN_DELETE}/${id}`
    );
    return result;
  } catch (error: any) {
    if (
      error instanceof AxiosError &&
      error.response?.data.message ===
        "Recurso no encontrado debido a una violación de clave foránea"
    ) {
      // Manejar errores de Axios
      alertRemoveError("El recurso no se puede eliminar por datos vinculados");
    } else {
      // Manejar otros tipos de errores
      console.error("Error al eliminar el Precio por grano:", error);
    }
  }
};

// PRODUCCIÓN
export const postProduction = async (object: ProductionInterface) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PRODUCTION}${process.env.NEXT_PUBLIC_PRODUCTION_POST}`,
      object
    );
    return result;
  } catch (error) {
    console.error("Error al cargar la Producción por grano:", error);
  }
};

export const editProduction = async (
  id: number,
  object: ProductionInterface
) => {
  try {
    const result = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PRODUCTION}${process.env.NEXT_PUBLIC_PRODUCTION_EDIT}/${id}`,
      object
    );
    return result;
  } catch (error) {
    console.error("Error al editar la Producción por grano:", error);
  }
};

export const getAllProductions = async () => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PRODUCTION}${process.env.NEXT_PUBLIC_PRODUCTION_GETALL}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener la Producción por grano:", error);
  }
};

export const getOneProduction = async (id: number) => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PRODUCTION}${process.env.NEXT_PUBLIC_PRODUCTION_GETONE}/${id}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener la Producción por grano:", error);
  }
};

export const deleteProduction = async (id: number) => {
  try {
    const result = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PRODUCTION}${process.env.NEXT_PUBLIC_PRODUCTION_DELETE}/${id}`
    );
    return result;
  } catch (error: any) {
    if (
      error instanceof AxiosError &&
      error.response?.data.message ===
        "Recurso no encontrado debido a una violación de clave foránea"
    ) {
      // Manejar errores de Axios
      alertRemoveError("El recurso no se puede eliminar por datos vinculados");
    } else {
      // Manejar otros tipos de errores
      console.error("Error al eliminar la Producción por grano:", error);
    }
  }
};
