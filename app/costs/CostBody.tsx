"use client";

import {
  getAllSupplies,
  getAllMoney,
  getAllCosts,
  postCost,
} from "../api/apis";
import { alertAddOk } from "../components/alerts/sweet";
import { useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  CostInterface,
  SupplyInterface,
  MoneyInterface,
} from "../components/interfaces/interface";

import moment from "moment";

export default function CostBody() {
  // hooks states
  const [AllSupplies, setAllSupplies] = useState([]);
  const [AllCosts, setAllCosts] = useState([]);
  const [AllMoney, setAllMoney] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateFormated, setDateFormated] = useState(
    moment(selectedDate).format("DD/MM/YYYY")
  );

  const [supply, setSupply] = useState(0);
  const [money, setMoney] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  // useEffect para traer info de las apis
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resAllSupplies, resAllCosts, resAllMoney] = await Promise.all([
          getAllSupplies(),
          getAllCosts(),
          getAllMoney(),
        ]);
        const resultAllSupplies = resAllSupplies?.data;
        const resultAllCosts = resAllCosts?.data;
        const resultAllMoney = resAllMoney?.data;

        setAllSupplies(resultAllSupplies);
        setAllCosts(resultAllCosts);
        setAllMoney(resultAllMoney);
      } catch (error) {
        throw new Error(`Error al obtener datos del servicio: ${error}`);
      }
    };
    fetchData();
  }, []);

  // handlers

  const handleSetDate = (selectedDate: Date | null) => {
    const formatDate = moment(selectedDate).format("DD/MM/YYYY"); // Obtener la fecha actual formateada
    setDateFormated(formatDate);
  };

  const handleSetSupply = (value: string) => {
    const found: SupplyInterface | undefined = AllSupplies.find(
      (supply: SupplyInterface) => supply.idSupply === Number(value)
    );
    if (found) {
      const { idSupply } = found;
      setSupply(idSupply);
    } else {
      throw new Error("Insumo no encontrado");
    }
  };

  const handleSetMoney = (value: string) => {
    const found: MoneyInterface | undefined = AllMoney.find(
      (money: MoneyInterface) => money.idMoney === Number(value)
    );
    if (found) {
      const { idMoney } = found;
      setMoney(idMoney);
    } else {
      throw new Error("Moneda no encontrada");
    }
  };

  const handleSetPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const handleSetquantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const currentDate = moment().format("DD/MM/YYYY HH:mm:ss"); // Obtener la fecha actual formateada
    const finalPrice = Number(price.toFixed(2));
    const finalQuantity = Number(quantity.toFixed(2));

    const Object: CostInterface = {
      date: dateFormated,
      idSupply: supply,
      idMoney: money,
      price: finalPrice,
      quantity: finalQuantity,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    try {
      const result = await postCost(Object);

      // Verifica si result es undefined antes de acceder a sus propiedades
      if (result && result.status === 201) {
        alertAddOk("Costo cargado con éxito");
        setDateFormated(dateFormated);
        setSupply(0);
        setMoney(0);
        setQuantity(0);
      }
    } catch (error) {
      throw new Error(`Error al cargar el Costo: ${error}`);
    }
  };

  return (
    <>
      <div className="space-y-4 px-6">
        <div className="card grid grid-cols-3 gap-4 mt-4">
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

          {/* Insumo */}
          <select
            onInput={(e) =>
              handleSetSupply((e.target as HTMLSelectElement).value)
            }
            className="input"
            defaultValue={"Seleccione un Insumo"}
          >
            <option disabled>Seleccione un Insumo</option>
            {AllSupplies &&
              AllSupplies.map((item: SupplyInterface) => (
                <option key={item.idSupply} value={`${item.idSupply}`}>
                  {`${item.category} - ${item.subCategory} - ${item.family}`}
                </option>
              ))}
          </select>

          {/* Moneda */}
          <select
            className="input"
            onChange={(e) => handleSetMoney(e.target.value)}
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
          {/* Precio */}
          <input
            type="number"
            className="input"
            placeholder="Precio"
            onChange={handleSetPrice}
          />

          {/* Cantidad */}
          <input
            type="number"
            className="input"
            placeholder="Cantidad"
            onChange={handleSetquantity}
          />

          <button
            className="primary_btn btn_black max-w-max"
            onClick={handleSave}
          >
            <p className="w-28">Agregar</p>
          </button>
        </div>

        <SearchInput
          allSupplies={AllSupplies}
          allCosts={AllCosts}
          allMoney={AllMoney}
        />
      </div>
    </>
  );
}
