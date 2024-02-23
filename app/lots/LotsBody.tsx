"use client";

import { postLot } from "../api/apis";
import { addOk } from "../components/alerts/sweet";
import { useState } from "react";
import SearchInput from "./SearchInput";


type Lot = {
  businessName: string;
  establishment: string;
  lot: string;
  surface: number;
  latitude: number;
  length: number;
  condition: string;
};

export default function Lots() {
  // hooks states
  const [businessName, setBusinessName] = useState("");
  const [establishment, setEstablishment] = useState("");
  const [lot, setLot] = useState("");
  const [surface, setSurface] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [length, setLength] = useState(0);
  const [condition, setCondition] = useState("");

  // handlers
  const handleSetBusinessName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessName(e.target.value);
  };

  const handleSetStablishment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEstablishment(e.target.value);
  };

  const handleSetLot = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLot(e.target.value);
  };

  const handleSetSurface = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurface(Number(e.target.value));
  };

  const handleSetLatitude = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(Number(e.target.value));
  };

  const handleSetLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(Number(e.target.value));
  };

  const handleSetCondition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCondition(e.target.value);
  };

  const handleSaveLot = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const lotObject: Lot = {
      businessName,
      establishment,
      lot,
      surface,
      latitude,
      length,
      condition,
    };

    try {
      const result = await postLot(lotObject);

      // Verifica si result es undefined antes de acceder a sus propiedades
      if (result && result.status === 201) {
        addOk("Lote cargado con éxito");
        setBusinessName("");
        setEstablishment("");
        setLot("");
        setSurface(0);
        setLatitude(0);
        setLength(0);
        setCondition("");
      } else {
        console.log("Error al cargar el Lote o resultado no válido");
      }
    } catch (error) {
      console.error("Error al cargar el Lote:", error);
    }
  };

  // useEffect(() => {}, [handleSaveLot]);








  return (
    <>
      <div className='space-y-4 px-6'>
        <div className="card grid grid-cols-4 gap-4 mt-10">
          <input
            type="text"
            className="input"
            placeholder="Razon Social"
            onChange={handleSetBusinessName}
          />

          <input
            type="text"
            className="input"
            placeholder="Establecimiento"
            onChange={handleSetStablishment}
          />
          <input
            type="text"
            className="input"
            placeholder="Lote"
            onChange={handleSetLot}
          />

          <input
            type="number"
            min={0}
            max={10000000}
            className="input"
            placeholder="Supercie"
            onChange={handleSetSurface}
          />
          <input
            type="number"
            className="input"
            placeholder="Latitud"
            onChange={handleSetLatitude}
          />
          <input
            type="number"
            className="input"
            placeholder="Longitud"
            onChange={handleSetLength}
          />

          <input
            type="text"
            className="input"
            placeholder="Condicion"
            onChange={handleSetCondition}
          />

          <button
            className="primary_btn btn_black max-w-max"
            onClick={handleSaveLot}
          >
            <p className='w-28'>
              Agregar
            </p>
          </button>
        </div>

        <SearchInput />
      </div>
    </>
  );
}
