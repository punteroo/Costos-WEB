import { useEffect, useState } from "react";
import List from "./List";
import {
  RotationInterface,
  PriceGrainInterface,
  ProductionInterface,
  LotInterface,
} from "../components/interfaces/interface";

interface SearchInputProps {
  allRotations: RotationInterface[];
  allProductions: ProductionInterface[];
  allLots: LotInterface[];
}

export const SearchInput: React.FC<SearchInputProps> = ({
  allRotations,
  allProductions,
  allLots,
}) => {
  const [filteredPriceGrain, setFilteredPriceGrain] = useState<
    ProductionInterface[]
  >([]);
  const [searchTerm, setSearchTerm] = useState(""); // buscador

  // Obtener los datos iniciales al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFilteredPriceGrain(allProductions);
      } catch (error) {
        throw new Error(`Error al obtener la lista de Rotaciones: ${error}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar lotes según el término de búsqueda
    if (allProductions && allProductions.length > 0) {
      const filtered = allProductions.filter((value: PriceGrainInterface) =>
        value.campaign?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPriceGrain(filtered);
    }
  }, [searchTerm, allProductions]);

  return (
    <div className="mt-4 card">
      <input
        type="search"
        className="input"
        placeholder="Busqueda por Campaña"
        aria-label="Search"
        aria-describedby="button-addon3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tabla de lotes filtrados */}
      <List
        filtered={filteredPriceGrain}
        allRotations={allRotations}
        allLots={allLots}
      />
    </div>
  );
};
