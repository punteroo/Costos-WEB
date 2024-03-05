import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { LotInterface } from "../interfaces/interface";
import { getOneLot } from "@/app/api/apis";
import axios from "axios";

const MySwal = withReactContent(Swal);

export const addOk = (value: string) => {
  MySwal.fire({
    position: "top",
    icon: "success",
    title: value,
    showConfirmButton: false,
    timer: 1500,
    toast: true,
  });
};

export const editLot = async (idLot: number) => {
  try {
    const response = await getOneLot(idLot);
    const objeto: LotInterface | undefined = response?.data;

    if (objeto) {
      Swal.fire({
        title: "Editar Objeto",
        html: `
        <label for="businessName" >Razón Social</label>
        <input type="text" id="businessName" class="inputEdit" value="${objeto.businessName}">
        <label for="establishment">Establecimiento</label>
        <input type="text" id="establishment" class="inputEdit" value="${objeto.establishment}">
        <label for="lot">Lote</label>
        <input type="text" id="lot" class="inputEdit" value="${objeto.lot}">
        <label for="surface">Superficie</label>
        <input type="text" id="surface" class="inputEdit" value="${objeto.surface}">
        <label for="latitude">Latitud</label>
        <input type="text" id="latitude" class="inputEdit" value="${objeto.latitude}">
        <label for="length">Longitud</label>
        <input type="text" id="length" class="inputEdit" value="${objeto.length}">
        <label for="length">Condicion</label>
        <select id="condition" class="inputEdit" value="${objeto.condition}">
          <option value="Propio">Propio</option>
          <option value="Arrendado">Arrendado</option>
        </select>
        
        `,
        showCancelButton: true,
        confirmButtonText: "Guardar Cambios",
        cancelButtonText: "Cancelar",
        preConfirm: async () => {
          // Obtén los valores de los campos de manera segura
          const businessNameInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#businessName");
          const establishmentInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#establishment");
          const lotInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#lot");
          const surfaceInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#surface");
          const latitudeInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#latitude");
          const lengthInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#length");
          const conditionInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#condition");

          const businessName = businessNameInput?.value;
          const establishment = establishmentInput?.value;
          const lot = lotInput?.value;
          const surface = Number(surfaceInput?.value);
          const latitude = Number(latitudeInput?.value);
          const length = Number(lengthInput?.value);
          const condition = conditionInput?.value;

          const lotObject = {
            businessName,
            establishment,
            lot,
            surface,
            latitude,
            length,
            condition,
          };

          const finalPatchLot = Object.fromEntries(
            Object.entries(lotObject).filter(([key, value]) => value !== "")
          );

          // Puedes hacer algo con lotObject, como enviarlo a la API para actualizar el objeto
          console.log("Nuevo objeto:", finalPatchLot);

          try {
            const result = await axios.patch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/lot/patchLot/${idLot}`,
              finalPatchLot
            );
            return result.data;
          } catch (error) {
            console.error("error al intentar realizar el patch: ", error);
          }
        },
      });
    }
  } catch (error) {
    console.error("Error al obtener el objeto:", error);
  }
};
