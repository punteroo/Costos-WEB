"use client";

import { postLot } from "../api/apis";
import { addOk } from "../components/alerts/sweet";
import { useState } from "react";
import SearchInput from "./SearchInput";

export default function Lots() {
  // hooks states
  const [businessName, setBusinessName] = useState("");
  const [establishment, setEstablishment] = useState("");
  const [lot, setLot] = useState("");
  const [surface, setSurface] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [length, setLength] = useState(0);
  const [condition, setCondition] = useState("");

  type Lot = {
    businessName: string;
    establishment: string;
    lot: string;
    surface: number;
    latitude: number;
    length: number;
    condition: string;
  };



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

    const lotObject:Lot = {
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
      <div className="grid grid-cols-4 gap-4 mt-10">
        <input
          type="text"
          className="border p-2 rounded-md"
          placeholder="Razon Social"
          onChange={handleSetBusinessName}
        />

        <input
          type="text"
          className="border p-2 rounded-md"
          placeholder="Establecimiento"
          onChange={handleSetStablishment}
        />
        <input
          type="text"
          className="border p-2 rounded-md"
          placeholder="Lote"
          onChange={handleSetLot}
        />

        <input
          type="number"
          className="border p-2 rounded-md"
          placeholder="Supercie"
          onChange={handleSetSurface}
        />
        <input
          type="number"
          className="border p-2 rounded-md"
          placeholder="Latitud"
          onChange={handleSetLatitude}
        />
        <input
          type="number"
          className="border p-2 rounded-md"
          placeholder="Longitud"
          onChange={handleSetLength}
        />

        <input
          type="text"
          className="border p-2 rounded-md"
          placeholder="Condicion"
          onChange={handleSetCondition}
        />

        <button
          className="border rounded-md hover:bg-gray-300 p-2"
          onClick={handleSaveLot}
        >
          Agregar
        </button>
      </div>
      <div>
        <SearchInput/>

      </div>
    </>
  );
}
