"use client";

import { getAllLots, getAllRotations, postRotation } from "../api/apis";
import { alertAddOk } from "../components/alerts/sweet";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import {
  LotInterface,
  RotationInterface,
} from "../components/interfaces/interface";

import moment from "moment";


export default function RotationBody() {
  // hooks states
  const [AllLots, setAllLots] = useState([]);
  const [lot, setLot] = useState(0);
  const [campaign, setCampaign] = useState("");
  const [epoch, setEpoch] = useState("");
  const [crop, setCrop] = useState("");
  const [state, setState] = useState("Activo");
  // const [unit, setUnit] = useState(0);

  // useEffect para traer info de las apis
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resAllLots] = await Promise.all([getAllLots()]);
        const resultAllLots = resAllLots?.data;
        setAllLots(resultAllLots);
      } catch (error) {
        throw new Error(`Error al obtener la lista de productos: ${error}`);
      }
    };
    fetchData();
  }, []);

  // handlers
  const handleSetLot = (value: string) => {
    const found: LotInterface | undefined = AllLots.find(
      (lot: LotInterface) => lot.idLot === Number(value)
    );
    if (found) {
      const { idLot } = found;
      setLot(Number(idLot));
    } else {
      throw new Error("Lote no encontrado");
    }
  };

  const handleSetCampaign = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCampaign(e.target.value);
  };

  const handleSetEpoch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEpoch(e.target.value);
  };

  const handleSetCrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCrop(e.target.value);
  };

  const handleSetState = (value: string) => {
    setState(value);
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const currentDate = moment().format("DD/MM/YYYY HH:mm:ss"); // Obtener la fecha actual formateada


    const Object: RotationInterface = {
      campaign,
      epoch,
      crop,
      state,
      idLot: lot,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    try {
      const result = await postRotation(Object);

      // Verifica si result es undefined antes de acceder a sus propiedades
      if (result && result.status === 201) {
        alertAddOk("Rotacion cargada con éxito");
        setLot(0);
        setCampaign("");
        setEpoch("");
        setCrop("");
        setState("");
      }
    } catch (error) {
      throw new Error(`Error al cargar la Rotacion: ${error}`);
    }
  };

  return (
    <>
      <div className="space-y-4 px-6">
        <div className="card grid grid-cols-4 gap-4 mt-4">
          <select
            onInput={(e) => handleSetLot((e.target as HTMLSelectElement).value)}
            className="input"
            defaultValue={"Seleccione un Lote"}
          >
            <option disabled>Seleccione un Lote</option>
            {AllLots && AllLots.map((item: LotInterface) => (
              <option key={item.idLot} value={item.idLot}>
                {`${item.businessName} - ${item.establishment} - ${item.lot}`}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="input"
            placeholder="Campaña"
            onChange={handleSetCampaign}
          />

          <input
            type="text"
            className="input"
            placeholder="Epoca"
            onChange={handleSetEpoch}
          />
          <input
            type="text"
            className="input"
            placeholder="Cultivo"
            onChange={handleSetCrop}
          />

          <select
            onInput={(e) =>
              handleSetState((e.target as HTMLSelectElement).value)
            }
            className="input"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>

          <button
            className="primary_btn btn_black max-w-max"
            onClick={handleSave}
          >
            <p className="w-28">Agregar</p>
          </button>
        </div>

        <SearchInput />
      </div>
    </>
  );
}
