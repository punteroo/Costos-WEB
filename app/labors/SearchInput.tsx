import { useEffect, useState } from "react";
import List from "./List";
import { LaborInterface, LotInterface, RotationInterface, UnitSupplyInterface } from "../components/interfaces/interface";

interface SearchInputProps {
  allRotations: RotationInterface[];
  allLots: LotInterface[]; 
  allLabors: LaborInterface[]; 
  allUnits: UnitSupplyInterface[]; 
}

export const SearchInput: React.FC<SearchInputProps> = ({ allRotations, allLots, allLabors, allUnits }) => {

  const [filteredLabors, setFilteredLabors] = useState<LaborInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // buscador

  // Obtener los datos iniciales al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFilteredLabors(allLabors);
      } catch (error) {
        throw new Error(`Error al obtener la lista de Rotaciones: ${error}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar lotes según el término de búsqueda
    if (allLabors && allLabors.length > 0) {
      const filtered = allLabors.filter((labor: LaborInterface) =>
        labor.commercialBrand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLabors(filtered);
    }
  }, [searchTerm, allLabors]);

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
      <List filtered={filteredLabors} allLots={allLots} allRotations={allRotations} allUnits={allUnits} />
    </div>
  );
};
