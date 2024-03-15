import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  LaborInterface,
  ListPriceInterface,
  LotInterface,
  MoneyInterface,
  RotationInterface,
  SupplyInterface,
  UnitSupplyInterface,
} from "../interfaces/interface";
import {
  getOneLot,
  editLot,
  deleteLot,
  getOneSupply,
  editSupply,
  deleteSupply,
  getOneRotation,
  getAllLots,
  editRotation,
  deleteRotation,
  getOneLabor,
  editLabor,
  deleteLabor,
  getOneListPrice,
  editListPrice,
  deleteListPrice,
} from "@/app/api/apis";

const MySwal = withReactContent(Swal);
import moment from "moment";

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

// Error al eliminar ok
export const alertRemoveError = (value: string) => {
  MySwal.fire({
    position: "top",
    icon: "error",
    title: value,
    showConfirmButton: false,
    timer: 3500,
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
          const currentDate = moment().format("DD/MM/YYYY HH:mm:ss"); // Obtener la fecha actual formateada

          const lotObject = {
            businessName,
            establishment,
            lot,
            surface,
            latitude,
            length,
            condition,
            updatedAt: currentDate,
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
export const alertPatchSupply = async (
  id: number,
  param1: string,
  units: UnitSupplyInterface[]
) => {
  try {
    const response = await getOneSupply(id);
    const objeto: SupplyInterface | undefined = response?.data;

    if (objeto) {
      Swal.fire({
        title: "Editar Objeto",
        html: `
        <label for="category" >Categoria</label>
        <input type="text" id="category" class="inputEdit" value="${
          objeto.category
        }">
        <label for="subCategory">Sub Categoria</label>
        <input type="text" id="subCategory" class="inputEdit" value="${
          objeto.subCategory
        }">
        <label for="family">Familia</label>
        <input type="text" id="family" class="inputEdit" value="${
          objeto.family
        }">
        <label for="commercialBrand">Marca commercial</label>
        <input type="text" id="commercialBrand" class="inputEdit" value="${
          objeto.commercialBrand
        }">
        <label for="unit">Unidad</label>
        <select id="unit" class="inputEdit">
          ${units
            .map(
              (option) => `
            <option value="${option.idUnit}" ${
                objeto.idUnit === option.idUnit ? "selected" : ""
              }>${option.description}</option>
          `
            )
            .join("")}
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
          const idUnit = Number(unitInput?.value);
          const currentDate = moment().format("DD/MM/YYYY HH:mm:ss"); // Obtener la fecha actual formateada

          const object = {
            category,
            subCategory,
            family,
            commercialBrand,
            idUnit,
            updatedAt: currentDate,
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

/* ROTACION */

// Editar una Rotacion
export const alertPatchRotation = async (
  id: number,
  param1: string,
  lots: LotInterface[]
) => {
  try {
    const [responseRotation, responseAllLots] = await Promise.all([
      getOneRotation(id),
      getAllLots(),
    ]);

    const objetoRotation: RotationInterface | undefined =
      responseRotation?.data;
    const objetoLots: LotInterface[] | undefined = responseAllLots?.data;
    if (objetoRotation) {
      Swal.fire({
        title: "Editar Objeto",
        html: `
        <label for="lot">Lote</label>   
        <select id="lot" class="inputEdit">
        ${objetoLots
          ?.map(
            (option) => `
          <option value="${option.idLot}" ${
              objetoRotation.idLot === option.idLot ? "selected" : ""
            }>${option.businessName} - ${option.establishment} - ${
              option.lot
            }</option>
        `
          )
          .join("")}
      </select>
        <label for="campaign" >Campaña</label>
        <input type="text" id="campaign" class="inputEdit" value="${
          objetoRotation.campaign
        }">
        <label for="crop">Cosecha</label>
        <input type="text" id="crop" class="inputEdit" value="${
          objetoRotation.crop
        }">
        <label for="epoch">Epoca</label>
        <input type="text" id="epoch" class="inputEdit" value="${
          objetoRotation.epoch
        }">
        <label for="state">Estado</label>
        <label for="state">Estado</label>
        <select id="state" class="inputEdit">
          <option value="Activo" ${
            objetoRotation.state === "Activo" ? "selected" : ""
          }>Activo</option>
          <option value="Inactivo" ${
            objetoRotation.state === "Inactivo" ? "selected" : ""
          }>Inactivo</option>
        </select>
        `,
        showCancelButton: true,
        confirmButtonText: "Guardar Cambios",
        cancelButtonText: "Cancelar",
        preConfirm: async () => {
          // Obtén los valores de los campos de manera segura
          const lotInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#lot");
          const campaignInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#campaign");
          const cropInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#crop");
          const epochInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#epoch");
          const stateInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#state");

          const campaign = campaignInput?.value;
          const crop = cropInput?.value;
          const epoch = epochInput?.value;
          const state = stateInput?.value;
          const idLot = Number(lotInput?.value);
          const currentDate = moment().format("DD/MM/YYYY HH:mm:ss"); // Obtener la fecha actual formateada

          const object = {
            campaign,
            crop,
            epoch,
            state,
            idLot,
            updatedAt: currentDate,
          };

          const finalPatch = Object.fromEntries(
            Object.entries(object).filter(([key, value]) => value !== "")
          );

          try {
            const result = await editRotation(id, finalPatch);

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

// Eliminar una Rotacion
export const alertDeleteRotation = async (id: number, param1: string) => {
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
          const resultDelete = await deleteRotation(id);
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

/* LABOR */

// Editar un labor
export const alertPatchLabor = async (
  id: number,
  param1: string,
  lots: LotInterface[],
  rotations: RotationInterface[],
  allUnits: UnitSupplyInterface[]
) => {
  try {
    const responseLabor = await getOneLabor(id);
    const objetoLabor: LaborInterface | undefined = responseLabor?.data;

    // const objetoLots: LotInterface[] | undefined = responseAllLots?.data;

    if (objetoLabor) {
      Swal.fire({
        title: "Editar Objeto",
        html: `
        <label for="lot">Lote</label>   
        <select id="lot" class="inputEdit">
        ${lots
          ?.map(
            (option) => `
          <option value="${option.idLot}" ${
              objetoLabor.idLot === option.idLot ? "selected" : ""
            }>${option.businessName} - ${option.establishment} - ${
              option.lot
            }</option>
        `
          )
          .join("")}
        </select>
        <label for="rotation">Rotacion</label>   
        <select id="rotation" class="inputEdit">
        ${rotations
          ?.map(
            (option) => `
          <option value="${option.idRotation}" ${
              objetoLabor.idRotation === option.idRotation ? "selected" : ""
            }>${option.campaign} - ${option.epoch} - ${option.crop}</option>
        `
          )
          .join("")}
        </select>
        
        <label for="date">Fecha</label>
        <input type="Date" id="date" class="inputEdit" value="${
          objetoLabor.date
        }">
        <label for="commercialBrand">Marca Comercial</label>
        <input type="text" id="commercialBrand" class="inputEdit" value="${
          objetoLabor.commercialBrand
        }">
        <label for="dose">Dosis (x ha)</label>
        <input type="text" id="dose" class="inputEdit" value="${
          objetoLabor.dose
        }">
        <label for="unit">Unidad</label>   
        <select id="unit" class="inputEdit">
        ${allUnits
          ?.map(
            (option) => `
          <option value="${option.idUnit}" ${
              objetoLabor.idUnit === option.idUnit ? "selected" : ""
            }>${option.description}</option>
        `
          )
          .join("")}
        </select>
  
        `,
        showCancelButton: true,
        confirmButtonText: "Guardar Cambios",
        cancelButtonText: "Cancelar",
        preConfirm: async () => {
          // Obtén los valores de los campos de manera segura
          const lotInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#lot");
          const rotationInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#rotation");
          const dateInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#date");
          const commercialBrandInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>(
              "#commercialBrand"
            );
          const doseInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#dose");
          const unitInput =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#unit");

          const idLot = Number(lotInput?.value);
          const idRotation = Number(rotationInput?.value);
          const date = dateInput?.value;
          const formattedDate = moment(date).format("DD/MM/YYYY HH:mm:ss");
          const commercialBrand = commercialBrandInput?.value;
          const idUnit = Number(unitInput?.value);
          const dose = Number(doseInput?.value);

          const currentDate = moment().format("DD/MM/YYYY HH:mm:ss"); // Obtener la fecha actual formateada

          const object: LaborInterface = {
            date: formattedDate,
            commercialBrand,
            dose,
            idUnit,
            idRotation,
            idLot,
            updatedAt: currentDate,
          };

          const finalPatch = Object.fromEntries(
            Object.entries(object).filter(([key, value]) => value !== "")
          );

          try {
            const result = await editLabor(id, finalPatch as LaborInterface);

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

// Eliminar una Rotacion
export const alertDeleteLabor = async (id: number, param1: string) => {
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
          const resultDelete = await deleteLabor(id);
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


/* LISTA DE PRECIOS */

// Editar un insumo dentro de la lista

export const alertPatchListPrice = async (
  id: number,
  param1: string,
  allSupplies: SupplyInterface[],
  allUnits: UnitSupplyInterface[],
  allRotations: RotationInterface[],
  allMoney: MoneyInterface[]
) => {
  try {
    const response = await getOneListPrice(id);
    const objectResponse: ListPriceInterface | undefined = response?.data;

    if (objectResponse) {
      Swal.fire({
        title: "Editar Objeto",
        html: `

        <label for="commercialBrand">Marca Comercial</label>   
        <select id="commercialBrand" class="inputEdit">
        ${allSupplies
          ?.map(
            (option) => `
          <option value="${option.commercialBrand}" ${
            objectResponse.commercialBrand === option.commercialBrand ? "selected" : ""
            }>${option.commercialBrand}</option>
        `
          )
          .join("")}
        </select>

        <label for="campaign">Campaña</label>   
        <select id="campaign" class="inputEdit">
        ${allRotations
          ?.map(
            (option) => `
          <option value="${option.campaign}" ${
              objectResponse.campaign === option.campaign ? "selected" : ""
            }>${option.campaign}</option>
        `
          )
          .join("")}
        </select>
        
        <label for="price">Precio</label>
        <input type="number" id="price" class="inputEdit" value="${
          objectResponse.price
        }">
        <label for="money">Moneda</label>   
        <select id="money" class="inputEdit">
        ${allMoney
          ?.map(
            (option) => `
          <option value="${option.idMoney}" ${
              objectResponse.idMoney === option.idMoney ? "selected" : ""
            }>${option.description}</option>
        `
          )
          .join("")}
        </select>

        <label for="unit">Unidad</label>   
        <select id="unit" class="inputEdit">
        ${allUnits
          ?.map(
            (option) => `
          <option value="${option.idUnit}" ${
              objectResponse.idUnit === option.idUnit ? "selected" : ""
            }>${option.description}</option>
        `
          )
          .join("")}
        </select>
  
        `,
        showCancelButton: true,
        confirmButtonText: "Guardar Cambios",
        cancelButtonText: "Cancelar",
        preConfirm: async () => {
          // Obtén los valores de los campos de manera segura
          const input1 =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#commercialBrand");
          const input2 =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#campaign");
          const input3 =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#price");
          const input4 =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#money");
          const input5 =
            Swal.getPopup()?.querySelector<HTMLInputElement>("#unit");


          const inputTransform1 = input1?.value;
          const inputTransform2 = input2?.value;
          const inputTransform3 = Number(input3?.value);
          const inputTransform4 = Number(input4?.value);
          const inputTransform5 = Number(input5?.value);

          const currentDate = moment().format("DD/MM/YYYY HH:mm:ss"); // Obtener la fecha actual formateada

          const object: ListPriceInterface = {
            commercialBrand: inputTransform1,
            campaign: inputTransform2,
            price: inputTransform3,
            idMoney: inputTransform4,
            idUnit: inputTransform5,
            updatedAt: currentDate,
          };

          const finalPatch = Object.fromEntries(
            Object.entries(object).filter(([key, value]) => value !== "")
          );

          try {
            const result = await editListPrice(id, finalPatch as ListPriceInterface);

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

// Eliminar un insumo dentro de la lista de precios
export const alertDeleteListPrice = async (id: number, param1: string) => {
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
          const resultDelete = await deleteListPrice(id);
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
