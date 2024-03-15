"use client";

import { getAllUnits, postSupply } from "../api/apis";
import { alertAddOk } from "../components/alerts/sweet";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import {
  SupplyInterface,
  UnitSupplyInterface,
} from "../components/interfaces/interface";

import moment from "moment";


export default function SupplyBody() {
  // hooks states
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [allUnits, setAllUnits] = useState([]);
  const [family, setFamily] = useState("");
  const [commercialBrand, setCommercialBrand] = useState("");
  const [unit, setUnit] = useState(0);

  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseAllUnits] = await Promise.all([getAllUnits()]);
        const resultAllUnits = responseAllUnits?.data;
        setAllUnits(resultAllUnits);
      } catch (error) {
        throw new Error(`Error al obtener la lista de productos: ${error}`);
        // setLoading(false);
      }
    };
    fetchData();
  }, []);

  // handlers
  const handleSetCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleSetSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubCategory(e.target.value);
  };

  const handleSetFamily = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamily(e.target.value);
  };

  const handlesetCommercialBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommercialBrand(e.target.value);
  };

  const handlesetUnit = (value: string) => {
    const foundUnit: UnitSupplyInterface | undefined = allUnits.find(
      (unit: UnitSupplyInterface) => unit.description === value
    );

    if (foundUnit) {
      const { idUnit } = foundUnit;
      setUnit(idUnit);
    } else {
      throw new Error("Unidad no encontrada");
    }
  };



  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const currentDate = moment().format("DD/MM/YYYY HH:mm:ss"); // Obtener la fecha actual formateada


    const Object: SupplyInterface = {
      category,
      subCategory,
      family,
      commercialBrand,
      idUnit: unit,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    try {
      const result = await postSupply(Object);

      // Verifica si result es undefined antes de acceder a sus propiedades
      if (result && result.status === 201) {
        alertAddOk("Insumo cargado con éxito");
        setCategory("");
        setCommercialBrand("");
        setFamily("");
        setSubCategory("");
        setUnit(0);
      }
    } catch (error) {
      throw new Error(`Error al cargar el Insumo: ${error}`);
    }
  };

  return (
    <>
      <div className="space-y-4 px-6">
        <div className="card grid grid-cols-4 gap-4 mt-4">
          <input
            type="text"
            className="input"
            placeholder="Categoria"
            onChange={handleSetCategory}
          />

          <input
            type="text"
            className="input"
            placeholder="Sub Cateoria"
            onChange={handleSetSubCategory}
          />
          <input
            type="text"
            className="input"
            placeholder="Familia"
            onChange={handleSetFamily}
          />

          <input
            type="text"
            className="input"
            placeholder="Marca Comercial"
            onChange={handlesetCommercialBrand}
          />

          <select
            onInput={(e) =>
              handlesetUnit((e.target as HTMLSelectElement).value)
            }
            className="input"
            defaultValue={"Seleccione una Unidad"}
          >
            <option disabled>Seleccione una Unidad</option>
            {allUnits.map((item: UnitSupplyInterface) => (
              <option key={item.idUnit}>{item.description}</option>
            ))}
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
