import axios from "axios";
import { LotInterface, SupplyInterface } from "../components/interfaces/interface";


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
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LOT}${process.env.NEXT_PUBLIC_LOT_POST}/${id}`,
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
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LOT}${process.env.NEXT_PUBLIC_LOT_POST}/${id}`
    );
    return result;
  } catch (error) {
    console.error("Error al eliminar el Lote:", error);
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
  } catch (error) {
    console.error("Error al eliminar el Insumo:", error);
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
    console.error("Error al obtener las Unidades:", error);
  }
};