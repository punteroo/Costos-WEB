"use client";

//marca comercial de supply - campaña - unidad

import {
  getAllSupplies,
  getAllRotations,
  getAllUnits,
  getAllListPrice,
  getAllMoney,
  postListPrice,
} from "../api/apis";
import { alertAddOk } from "../components/alerts/sweet";
import { useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";

// interfases
import {
  SupplyInterface,
  UnitSupplyInterface,
  RotationInterface,
  MoneyInterface,
  ListPriceInterface,
} from "../components/interfaces/interface";

import moment from "moment";

export default function ListPriceBody() {
  // hooks states
  const [AllSupplies, setAllSupplies] = useState([]);
  const [AllUnits, setAllUnits] = useState([]);
  const [AllRotations, setAllRotations] = useState([]);
  const [AllListPrice, setAllListPrice] = useState([]);
  const [AllMoney, setAllMoney] = useState([]);

  const [commercialBrand, setCommercialBrand] = useState("");
  const [campaign, setCampaign] = useState("");
  const [price, setPrice] = useState(0);
  const [money, setMoney] = useState(0);
  const [unit, setUnit] = useState(0);

  // useEffect para traer info de las apis
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          resAllRotations,
          resAllSupplies,
          resAllUnits,
          resAllListPrice,
          resAllMoney,
        ] = await Promise.all([
          getAllRotations(),
          getAllSupplies(),
          getAllUnits(),
          getAllListPrice(),
          getAllMoney(),
        ]);
        const resultAllRotations = resAllRotations?.data;
        const resultAllSupplies = resAllSupplies?.data;
        const resultAllUnits = resAllUnits?.data;
        const resultAllListPrice = resAllListPrice?.data;
        const resultAllMoney = resAllMoney?.data;

        setAllRotations(resultAllRotations);
        setAllSupplies(resultAllSupplies);
        setAllUnits(resultAllUnits);
        setAllListPrice(resultAllListPrice);
        setAllMoney(resultAllMoney);
      } catch (error) {
        throw new Error(`Error al obtener la listas: ${error}`);
      }
    };
    fetchData();
  }, []);

  // handlers

  const handleSetCommercialBrand = (value: string) => {
    const found: SupplyInterface | undefined = AllSupplies.find(
      (supply: SupplyInterface) => supply.commercialBrand === value
    );
    if (found) {
      const { commercialBrand } = found;
      setCommercialBrand(commercialBrand);
    } else {
      throw new Error("Marca Comercial no encontrada");
    }
  };

  const handleSetCampaign = (value: string) => {
    const found: RotationInterface | undefined = AllRotations.find(
      (rotation: RotationInterface) => rotation.campaign === value
    );
    if (found) {
      const { campaign } = found;
      setCampaign(campaign);
    } else {
      throw new Error("Campaña no encontrada");
    }
  };

  const handleSetPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleSetUnit = (value: number) => {
    const found: UnitSupplyInterface | undefined = AllUnits.find(
      (unit: UnitSupplyInterface) => unit.idUnit === Number(value)
    );
    if (found) {
      const { idUnit } = found;
      setUnit(Number(idUnit));
    } else {
      throw new Error("Rotacion no encontrada");
    }
  };

  const handleSetMoney = (value: number) => {
    const found: MoneyInterface | undefined = AllMoney.find(
      (unit: MoneyInterface) => unit.idMoney === Number(value)
    );
    if (found) {
      const { idMoney } = found;
      (idMoney)
      setMoney(Number(idMoney));
    } else {
      throw new Error("Moneda no encontrada");
    }
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const currentDate = moment().format("DD/MM/YYYY HH:mm:ss"); // Obtener la fecha actual formateada

    const Object: ListPriceInterface = {
      commercialBrand,
      campaign,
      price,
      idMoney: money,
      idUnit: unit,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    try {
      const result = await postListPrice(Object);

      // Verifica si result es undefined antes de acceder a sus propiedades
      if (result && result.status === 201) {
        alertAddOk("Insumo cargado en la lista con éxito");
        setCommercialBrand("");
        setCampaign("");
        setPrice(0);
        setMoney(0);
        setUnit(0);
      }
    } catch (error) {
      throw new Error(`Error al cargar del Insumo en la lista: ${error}`);
    }
  };

  return (
    <>
      <div className="space-y-4 px-6">
        <div className="card grid grid-cols-4 gap-4 mt-4">
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
                <option key={item.idSupply} value={item.commercialBrand}>
                  {`${item.commercialBrand}`}
                </option>
              ))}
          </select>

          {/* Campaña */}
          <select
            className="input"
            defaultValue={"Seleccione una Campaña"}
            onChange={(e) => handleSetCampaign(e.target.value)}
          >
            <option disabled>Seleccione una Campaña</option>
            {AllRotations &&
              AllRotations.map((item: RotationInterface) => (
                <option key={item.idRotation} value={item.campaign}>
                  {`${item.campaign}`}
                </option>
              ))}
          </select>

          {/* Precio */}
          <input
            type="number"
            className="input"
            placeholder="Precio"
            onChange={handleSetPrice}
          />

          {/* Moneda */}
          <select
            onInput={(e) =>
              handleSetMoney(Number((e.target as HTMLSelectElement).value))
            }
            className="input"
            defaultValue={"Seleccione una Moneda"}
          >
            <option disabled>Seleccione una Moneda</option>
            {AllMoney &&
              AllMoney.map((item: MoneyInterface) => (
                <option key={item.idMoney} value={item.idMoney}>
                  {`${item.description}`}
                </option>
              ))}
          </select>

          {/* Unidad */}
          <select
            onInput={(e) =>
              handleSetUnit(Number((e.target as HTMLSelectElement).value))
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
          allSupplies={AllSupplies}
          allUnits={AllUnits}
          allRotations={AllRotations}
          allMoney={AllMoney}
          allListPrice={AllListPrice}
        />
      </div>
    </>
  );
}
