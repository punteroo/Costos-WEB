import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { LotInterface, SupplyInterface } from "../interfaces/interface";
import {
  getOneLot,
  editLot,
  deleteLot,
  getOneSupply,
  editSupply,
  deleteSupply,
} from "@/app/api/apis";

const MySwal = withReactContent(Swal);

// Carga registro ok
export const alertAddOk = (value: string) => {
  MySwal.fire({
    position: "top",
    icon: "success",
    title: value,
    showConfirmButton: false,
    timer: 1500,
    toast: true,
  });
};

/* LOTES */

// Editar un Lote
export const alertPatchLot = async (id: number, param1: string) => {
  try {
    const response = await getOneLot(id);
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
        <label for="condition">Condicion</label>
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

          try {
            const result = await editLot(id, finalPatchLot);

            alertAddOk("El Lote se modifico con exito");

            return result?.data;
          } catch (error) {
            console.error(
              `error al intentar realizar el patch en ${param1}: ${error}`
            );
          }
        },
      });
    }
  } catch (error) {
    console.error("Error al obtener el objeto:", error);
  }
};

// Eliminar un registro
export const alertDeleteLot = async (id: number, param1: string) => {
  try {
    await Swal.fire({
      title: "¿Confirma la Eliminación?",
      text: "Este proceso no tiene retorno",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC143C",
      cancelButtonColor: "#DCDCDC",
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resultDelete = await deleteLot(id);
          if (resultDelete?.status === 200) {
            Swal.fire({
              title: "Eliminado",
              text: `El ${param1} ha sido eliminado`,
              icon: "success",
            });
          }
        } catch (error) {
          console.error(`Error al intentar eliminar el ${param1}: ${error}`);
        }
      }
    });
  } catch (error) {
    console.error(`Error en el método de eliminar ${param1}: ${error}`);
  }
};

/* INSUMOS */

// Editar un Insumo
export const alertPatchSupply = async (id: number, param1: string) => {
  try {
    const response = await getOneSupply(id);
    const objeto: SupplyInterface | undefined = response?.data;

    if (objeto) {
      Swal.fire({
        title: "Editar Objeto",
        html: `
        <label for="category" >Categoria</label>
        <input type="text" id="category" class="inputEdit" value="${objeto.category}">
        <label for="subCategory">Sub Categoria</label>
        <input type="text" id="subCategory" class="inputEdit" value="${objeto.subCategory}">
        <label for="family">Familia</label>
        <input type="text" id="family" class="inputEdit" value="${objeto.family}">
        <label for="commercialBrand">Marca Comercial</label>
        <input type="text" id="commercialBrand" class="inputEdit" value="${objeto.commercialBrand}">
        <label for="unit">Unidad</label>
        <select id="unit" class="inputEdit" value="${objeto.idUnit}">
          <option value="1>Gr/Kg</option>
          <option value="2">Gr</option>
          <option value="3">Cm3/Lt</option>
          <option value="4">Kg</option>
          <option value="5">Lt/Gr</option>
          <option value="6">Lts</option>
          <option value="7">Cm3</option>
        </select>
        
        `,
        showCancelButton: true,
        confirmButtonText: "Guardar Cambios",
        cancelButtonText: "Cancelar",
        preConfirm: async () => {
          // Obtén los valores de los campos de manera segura
          const categoryInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#category");
          const subCategoryInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#subCategory");
          const familyInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#family");
          const commercialBrandInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>(
              "#commercialBrand"
            );
          const unitInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#unit");

          const category = categoryInput?.value;
          const subCategory = subCategoryInput?.value;
          const family = familyInput?.value;
          const commercialBrand = commercialBrandInput?.value;
          const idUnit = unitInput?.value;

          const object = {
            category,
            subCategory,
            family,
            commercialBrand,
            idUnit,
          };

          const finalPatch = Object.fromEntries(
            Object.entries(object).filter(([key, value]) => value !== "")
          );

          try {
            const result = await editSupply(id, finalPatch);


            alertAddOk(`El ${param1} se modifico con exito`);

            return result?.data;
          } catch (error) {
            console.error(
              `error al intentar realizar el patch en ${param1}: ${error}`
            );
          }
        },
      });
    }
  } catch (error) {
    throw new Error(`Error en el método de patch ${param1}: ${error}`);
  }
};


// Eliminar un registro
export const alertDeleteSupply = async (id: number, param1: string) => {
  try {
    await Swal.fire({
      title: "¿Confirma la Eliminación?",
      text: "Este proceso no tiene retorno",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC143C",
      cancelButtonColor: "#DCDCDC",
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resultDelete = await deleteSupply(id);
          if (resultDelete?.status === 200) {
            Swal.fire({
              title: "Eliminado",
              text: `El ${param1} ha sido eliminado`,
              icon: "success",
            });
          }
        } catch (error) {
          throw new Error(`Error al intentar eliminar el ${param1}: ${error}`);
        }
      }
    });
  } catch (error) {
   throw new Error(`Error en el método de eliminar ${param1}: ${error}`);
  }
};
