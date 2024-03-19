"use client";

import {
  getAllLots,
  getAllRotations,
  getAllSupplies,
  getAllUnits,
  getAllLabors,
  postLabor,
} from "../api/apis";
import { alertAddOk } from "../components/alerts/sweet";
import { useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  LaborInterface,
  LotInterface,
  RotationInterface,
  SupplyInterface,
  UnitSupplyInterface,
} from "../components/interfaces/interface";

import moment from "moment";

export default function LaborBody() {
  // hooks states
  const [AllLots, setAllLots] = useState([]);
  const [AllRotations, setAllRotations] = useState([]);
  const [AllSupplies, setAllSupplies] = useState([]);
  const [AllUnits, setAllUnits] = useState([]);
  const [AllLabors, setAllLabors] = useState([]);
  const [lot, setLot] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateFormated, setDateFormated] = useState(
    moment(selectedDate).format("DD/MM/YYYY")
  );

  const [commercialBrand, setCommercialBrand] = useState("");
  const [dose, setDose] = useState(0);
  const [unit, setUnit] = useState(0);

  // useEffect para traer info de las apis
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          resAllLots,
          resAllRotations,
          resAllSupplies,
          resAllUnits,
          resAllLabors,
        ] = await Promise.all([
          getAllLots(),
          getAllRotations(),
          getAllSupplies(),
          getAllUnits(),
          getAllLabors(),
        ]);
        const resultAllLots = resAllLots?.data;
        const resultAllRotations = resAllRotations?.data;
        const resultAllSupplies = resAllSupplies?.data;
        const resultAllUnits = resAllUnits?.data;
        const resultAllLabors = resAllLabors?.data;

        setAllLots(resultAllLots);
        setAllRotations(resultAllRotations);
        setAllSupplies(resultAllSupplies);
        setAllUnits(resultAllUnits);
        setAllLabors(resultAllLabors);
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

  const handleSetRotation = (value: string) => {
    const found: RotationInterface | undefined = AllRotations.find(
      (Rotation: RotationInterface) => Rotation.idRotation === Number(value)
    );
    if (found) {
      const { idRotation } = found;
      setRotation(Number(idRotation));
    } else {
      throw new Error("Rotacion no encontrada");
    }
  };

  const handleSetDate = (selectedDate: Date | null) => {
    const formatDate = moment(selectedDate).format("DD/MM/YYYY"); // Obtener la fecha actual formateada
    setDateFormated(formatDate);
  };

  const handleSetCommercialBrand = (value: string) => {
    const found: SupplyInterface | undefined = AllSupplies.find(
      (supply: SupplyInterface) => supply.idSupply === Number(value)
    );
    if (found) {
      const { commercialBrand } = found;
      setCommercialBrand(commercialBrand);
    } else {
      throw new Error("Rotacion no encontrada");
    }
  };

  const handleSetDose = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDose(Number(e.target.value));
  };

  const handleSetUnit = (value: string) => {
    const found: SupplyInterface | undefined = AllUnits.find(
      (unit: UnitSupplyInterface) => unit.idUnit === Number(value)
    );
    if (found) {
      const { idUnit } = found;
      setUnit(idUnit);
    } else {
      throw new Error("Rotacion no encontrada");
    }
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const currentDate = moment().format("DD/MM/YYYY HH:mm:ss"); // Obtener la fecha actual formateada
    const finalDose = Number(dose.toFixed(2));

    const Object: LaborInterface = {
      idLot: lot,
      idRotation: rotation,
      date: dateFormated,
      commercialBrand,
      dose: finalDose,
      idUnit: unit,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    try {
      const result = await postLabor(Object);

      // Verifica si result es undefined antes de acceder a sus propiedades
      if (result && result.status === 201) {
        alertAddOk("Labor cargada con éxito");
        setLot(0);
        setRotation(0);
        setCommercialBrand("");
        setDose(0);
        setUnit(0);
      }
    } catch (error) {
      throw new Error(`Error al cargar del labor: ${error}`);
    }
  };

  return (
    <>
      <div className="space-y-4 px-6">
        <div className="card grid grid-cols-4 gap-4 mt-4">
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

          {/* Rotacion */}
          <select
            className="input"
            defaultValue={"Seleccione una Rotacion"}
            onChange={(e) => handleSetRotation(e.target.value)}
          >
            <option disabled>Seleccione una Rotacion</option>
            {AllRotations &&
              AllRotations.map((item: RotationInterface) => (
                <option key={item.idRotation} value={item.idRotation}>
                  {`${item.campaign} - ${item.epoch} - ${item.crop}`}
                </option>
              ))}
          </select>

          {/* Fecha */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <ReactDatePicker
              selected={selectedDate}
              className="input"
              onChange={handleSetDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="Seleccione una fecha"
              value={dateFormated}
            />
          </div>

          {/* Marca Comercial */}
          <select
            onInput={(e) =>
              handleSetCommercialBrand((e.target as HTMLSelectElement).value)
            }
            className="input"
            defaultValue={"Seleccione una Marca Comercial"}
          >
            <option disabled>Seleccione una Marca Comercial</option>
            {AllSupplies &&
              AllSupplies.map((item: SupplyInterface) => (
                <option key={item.idSupply} value={item.idSupply}>
                  {`${item.commercialBrand}`}
                </option>
              ))}
          </select>

          {/* Dosis */}
          <input
            type="text"
            className="input"
            placeholder="Dosis"
            onChange={handleSetDose}
          />

          {/* Unidad */}
          <select
            onInput={(e) =>
              handleSetUnit((e.target as HTMLSelectElement).value)
            }
            className="input"
            defaultValue={"Seleccione una Unidad"}
          >
            <option disabled>Seleccione una Unidad</option>
            {AllUnits &&
              AllUnits.map((item: UnitSupplyInterface) => (
                <option key={item.idUnit} value={item.idUnit}>
                  {`${item.description}`}
                </option>
              ))}
          </select>

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
          allLabors={AllLabors}
          allUnits={AllUnits}
        />
      </div>
    </>
  );
}
