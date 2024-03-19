"use client";

import {
  getAllRotations,
  getAllPriceGrains,
  postPriceGrain,
} from "../api/apis";
import { alertAddOk } from "../components/alerts/sweet";
import { useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";

// interfases
import {
  RotationInterface,
  PriceGrainInterface,
} from "../components/interfaces/interface";

import moment from "moment";

export default function PriceGrainBody() {
  // hooks states

  const [AllRotations, setAllRotations] = useState([]);
  const [AllPriceGrain, setAllPriceGrain] = useState([]);
  const [AllCrops, setAllCrops] = useState([]);
  const [AllCampaigns, setAllCampaigns] = useState([]);

  const [campaign, setCampaign] = useState("");
  const [price, setPrice] = useState(0);
  const [crop, setCrop] = useState("");

  // useEffect para traer info de las apis
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resAllRotations, resAllPriceGrain] = await Promise.all([
          getAllRotations(),
          getAllPriceGrains(),
        ]);
        const resultAllRotations = resAllRotations?.data;
        const resultAllPriceGrain = resAllPriceGrain?.data;

        setAllRotations(resultAllRotations);
        setAllPriceGrain(resultAllPriceGrain);

        setAllCampaigns(Array.from(new Set(resultAllRotations.map((value: { campaign: any; }) => value.campaign))));



      } catch (error) {
        throw new Error(`Error al obtener el Precio por : ${error}`);
      }
    };
    fetchData();
  }, []);

  // handlers

  const handleSetCampaignAndCrop = (value: string) => {
    const found: RotationInterface[] = AllRotations.filter(
      (rotation: RotationInterface) => rotation.campaign === value
    );

    if (found.length > 0) {

      const { campaign } = found[0];
      console.log('campaña: ', campaign)
      setCampaign(campaign || "");
      setAllCrops([]);

      const arrayCrop: any = [];
      found.forEach((element) => {
        if (element.crop) {
          arrayCrop.push(element.crop);
        }
      });

      (arrayCrop)
      setAllCrops(arrayCrop);
    } else {
      throw new Error("Campaña no encontrada");
    }
  };

  const handleSetCrop = (value: string) => {
    const found: RotationInterface | undefined = AllCrops.find(
      (item: any) => item === value
    );

    if (found) {
      console.log('cultivo: ', found)
      setCrop(found);
    } else {
      throw new Error("Cultivo no encontrado");
    }
  };

  const handleSetPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const currentDate = moment().format("DD/MM/YYYY HH:mm:ss"); // Obtener la fecha actual formateada
    const finalPrice = Number(price.toFixed(2))

    const Object: PriceGrainInterface = {
      campaign,
      crop,
      price: finalPrice,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    try {
      const result = await postPriceGrain(Object);

      // Verifica si result es undefined antes de acceder a sus propiedades
      if (result && result.status === 201) {
        alertAddOk("Precio x Grano (tn) cargado con éxito");
        setCampaign("");
        setCrop("");
        setPrice(0);
      }
    } catch (error) {
      throw new Error(`Error al cargar del el precio x Grano: ${error}`);
    }
  };


  return (
    <>
      <div className="space-y-4 px-6">
        <div className="card grid grid-cols-4 gap-4 mt-4">

          
          {/* Campaña */}
          <select
            onInput={(e) =>
              handleSetCampaignAndCrop((e.target as HTMLSelectElement).value)
            }
            className="input"
            defaultValue={"Seleccione una Campaña"}
          >
            <option disabled>Seleccione una Campaña</option>
            {AllCampaigns &&
              AllCampaigns.map((item: any) => (
                <option key={item} value={item}>
                  {`${item}`}
                </option>
              ))}
          </select>

          {/* Cultivo */}
          <select
            onInput={(e) =>
              handleSetCrop((e.target as HTMLSelectElement).value)
            }
            className="input"
            defaultValue={"Seleccione un Cultivo"}
          >
            <option disabled>Seleccione un Cultivo</option>
            {AllCrops &&
              AllCrops.map((item: any) => (
                <option key={item} value={item}>
                  {`${item}`}
                </option>
              ))}
          </select>

          {/* Precio */}
          <input
            type="number"
            className="input"
            placeholder="Precio"
            onChange={handleSetPrice}
            step=".01"
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
          allPriceGrains={AllPriceGrain}
        />
      </div>
    </>
  );
}
