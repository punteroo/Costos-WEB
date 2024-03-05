import axios from "axios";

export const postLot = async (lot: object) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/lot/postLot`,
      lot
    );
    return result;
  } catch (error) {
    console.error("Error al cargar el Lote:", error);
  }
};

export const getAllLots = async () => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/lot/getAllLots`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener los Lotes:", error);
  }
};
export const getOneLot = async (idLot: number) => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/lot/getOneLot/${idLot}`
    );
    return result;
  } catch (error) {
    console.error("Error al obtener un Lote:", error);
  }
};
