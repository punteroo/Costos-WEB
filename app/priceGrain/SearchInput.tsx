import { useEffect, useState } from "react";
import List from "./List";
import {
  RotationInterface,
  PriceGrainInterface,
} from "../components/interfaces/interface";

interface SearchInputProps {
  allRotations: RotationInterface[];
  allPriceGrains: PriceGrainInterface[];
}

export const SearchInput: React.FC<SearchInputProps> = ({
  allRotations,
  allPriceGrains,
}) => {
  const [filteredPriceGrain, setFilteredPriceGrain] = useState<
    PriceGrainInterface[]
  >([]);
  const [searchTerm, setSearchTerm] = useState(""); // buscador
  // Obtener los datos iniciales al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFilteredPriceGrain(allPriceGrains);
      } catch (error) {
        throw new Error(`Error al obtener la lista de Rotaciones: ${error}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar lotes según el término de búsqueda
    if (allPriceGrains && allPriceGrains.length > 0) {
      const filtered = allPriceGrains.filter((value: PriceGrainInterface) =>
        value.campaign?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPriceGrain(filtered);
    }
  }, [searchTerm, allPriceGrains]);

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
      <List filtered={filteredPriceGrain} allRotations={allRotations} />
    </div>
  );
};
