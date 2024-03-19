import { useEffect, useState } from "react";
import List from "./List";
import {
  ListPriceInterface,
  MoneyInterface,
  RotationInterface,
  SupplyInterface,
  UnitSupplyInterface,
} from "../components/interfaces/interface";

interface SearchInputProps {
  allSupplies: SupplyInterface[];
  allUnits: UnitSupplyInterface[];
  allRotations: RotationInterface[];
  allListPrice: ListPriceInterface[];
  allMoney: MoneyInterface[];
}

export const SearchInput: React.FC<SearchInputProps> = ({
  allSupplies,
  allUnits,
  allRotations,
  allListPrice,
  allMoney,
}) => {
  const [filteredListPrice, setFilteredListPrice] = useState<
    ListPriceInterface[]
  >([]);
  const [searchTerm, setSearchTerm] = useState(""); // buscador

  // Obtener los datos iniciales al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFilteredListPrice(allListPrice);
      } catch (error) {
        throw new Error(`Error al obtener la lista de Rotaciones: ${error}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar lotes según el término de búsqueda
    if (allListPrice && allListPrice.length > 0) {
      const filtered = allListPrice.filter((value: ListPriceInterface) =>
        value.commercialBrand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredListPrice(filtered);
    }
  }, [searchTerm, allListPrice]);

  return (
    <div className="mt-4 card">
      <input
        type="search"
        className="input"
        placeholder="Busqueda por Marca"
        aria-label="Search"
        aria-describedby="button-addon3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tabla de lotes filtrados */}
      <List
        filtered={filteredListPrice}
        allSupplies={allSupplies}
        allUnits={allUnits}
        allRotations={allRotations}
        allMoney={allMoney}
      />
    </div>
  );
};
