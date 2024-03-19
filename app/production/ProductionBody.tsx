"use client";

import {
  getAllLots,
  getAllProductions,
  getAllRotations,
  postProduction,
} from "../api/apis";
import { alertAddOk } from "../components/alerts/sweet";
import { useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";

// interfases
import {
  RotationInterface,
  LotInterface,
  ProductionInterface,
} from "../components/interfaces/interface";

import moment from "moment";

export default function ProductionBody() {
  // hooks states

  const [AllRotations, setAllRotations] = useState([]);
  const [AllLots, setAllLots] = useState([]);
  const [AllProductions, setAllProductions] = useState([]);
  const [AllCampaign, setAllCampaign] = useState([]);
  const [idLot, setLot] = useState(0);
  const [campaign, setCampaign] = useState("");
  const [productionTn, setProductionTN] = useState(0);
  const [productionOptimum, setProductionOptimum] = useState(0);

  // useEffect para traer info de las apis
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resAllRotations, resAllLots, resAllProductions] =
          await Promise.all([
            getAllRotations(),
            getAllLots(),
            getAllProductions(),
          ]);
        const resultAllRotations = resAllRotations?.data;
        const resultAllLots = resAllLots?.data;
        const resultAllProductions = resAllProductions?.data;

        setAllRotations(resultAllRotations);
        setAllLots(resultAllLots);
        setAllProductions(resultAllProductions);

        if (resultAllRotations.length > 0) {
          const uniqueCampaigns:any = Array.from(new Set(resultAllRotations.map((value:any) => value.campaign)));
          setAllCampaign(uniqueCampaigns);
        }
        
        
      } catch (error) {
        throw new Error(`Error al obtener el Precio por : ${error}`);
      }
    };
    fetchData();
  }, []);

  // handlers

  const handleSetLot = (value: string) => {
    const found: LotInterface | undefined = AllLots.find(
      (item: any) => item.idLot === Number(value)
    );

    if (found) {
      const { idLot } = found;
      setLot(idLot);
    } else {
      throw new Error("Lote no encontrado");
    }
  };

  const handleSetCampaign = (value: string) => {
    const found: RotationInterface | undefined = AllCampaign.find(
      (item: any) => item === value
    );

    if (found) {
      setCampaign(found);
    } else {
      throw new Error("Campaña no encontrada");
    }
  };

  const handleSetProductionTn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductionTN(Number(e.target.value));
  };

  const handleSetProductionOptimum = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductionOptimum(Number(e.target.value));
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const currentDate = moment().format("DD/MM/YYYY HH:mm:ss"); // Obtener la fecha actual formateada
    const finalProductionTn = Number(productionTn.toFixed(2))
    const finalProductionOptimum = Number(productionOptimum.toFixed(2))

    const Object: ProductionInterface = {
      idLot,
      campaign,
      productionTn:finalProductionTn,
      productionOptimum:finalProductionOptimum,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    try {
      const result = await postProduction(Object);

      // Verifica si result es undefined antes de acceder a sus propiedades
      if (result && result.status === 201) {
        alertAddOk("Produccion cargada con éxito");
        setLot(0);
        setCampaign("");
        setProductionTN(0);
        setProductionOptimum(0);
      }
    } catch (error) {
      throw new Error(`Error al cargar la produccion: ${error}`);
    }
  };

  return (
    <>
      <div className="space-y-4 px-6">
        <div className="card grid grid-cols-3 gap-4 mt-4">
          {/* Lote */}
          <select
            onInput={(e) => handleSetLot((e.target as HTMLSelectElement).value)}
            className="input"
            defaultValue={"Seleccione un Lote"}
          >
            <option disabled>Seleccione un Lote</option>
            {AllLots &&
              AllLots.map((item: LotInterface) => (
                <option key={item.idLot} value={item.idLot}>
                  {`${item.businessName} - ${item.establishment} - ${item.lot}`}
                </option>
              ))}
          </select>

          {/* Campaña */}
          <select
            onInput={(e) =>
              handleSetCampaign((e.target as HTMLSelectElement).value)
            }
            className="input"
            defaultValue={"Seleccione una Campaña"}
          >
            <option disabled>Seleccione una Campaña</option>
            {AllCampaign &&
              AllCampaign.map((item: any, index) => (
                <option key={index} value={item}>
                  {`${item}`}
                </option>
              ))}
          </select>

          {/* Produccion x tn */}
          <input
            type="number"
            className="input"
            placeholder="Produccion x tn"
            onChange={handleSetProductionTn}
          />

          {/* Produccion Optima */}
          <input
            type="number"
            className="input"
            placeholder="Produccion óptima"
            onChange={handleSetProductionOptimum}
          />

          <button
            className="primary_btn btn_black max-w-max"
            onClick={handleSave}
          >
            <p className="w-28">Agregar</p>
          </button>
        </div>

        <SearchInput
          allRotations={AllRotations}
          allLots={AllLots}
          allProductions={AllProductions}
        />
      </div>
    </>
  );
}
