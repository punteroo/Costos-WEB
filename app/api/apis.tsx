import axios, { AxiosError } from "axios";
import { LotInterface, RotationInterface, SupplyInterface } from "../components/interfaces/interface";
import { alertRemoveError } from "../components/alerts/sweet";


// LOTES
export const postLot = async (lot: LotInterface) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LOT}${process.env.NEXT_PUBLIC_LOT_POST}`,
      lot
    );
    console.log(result)
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
  } catch (error:any) {
    if (error instanceof AxiosError && error.response?.data.message === "Recurso no encontrado debido a una violación de clave foránea") {
      // Manejar errores de Axios
      alertRemoveError('El recurso no se puede eliminar por datos vinculados')
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
  } catch (error:any) {
    if (error instanceof AxiosError && error.response?.data.message === "Recurso no encontrado debido a una violación de clave foránea") {
      // Manejar errores de Axios
      alertRemoveError('El recurso no se puede eliminar por datos vinculados')
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
    console.error("Error al obtener las Unidades:", error);
  }
};


// INSUMOS
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
    console.log(result)
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
  } catch (error:any) {
    if (error instanceof AxiosError && error.response?.data.message === "Recurso no encontrado debido a una violación de clave foránea") {
      // Manejar errores de Axios
      alertRemoveError('El recurso no se puede eliminar por datos vinculados')
    } else {
      // Manejar otros tipos de errores
      throw new Error(error);
    }
  }
};
