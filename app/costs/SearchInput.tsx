import { useEffect, useState } from "react";
import List from "./List";
import {
  CostInterface,
  MoneyInterface,
  SupplyInterface,
} from "../components/interfaces/interface";

interface SearchInputProps {
  allSupplies: SupplyInterface[];
  allMoney: MoneyInterface[];
  allCosts: CostInterface[];
}

export const SearchInput: React.FC<SearchInputProps> = ({
  allSupplies,
  allMoney,
  allCosts,
}) => {
  allCosts;
  const [filteredCosts, setFilteredCosts] = useState<CostInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // buscador

  // Obtener los datos iniciales al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFilteredCosts(allCosts);
      } catch (error) {
        throw new Error(`Error al obtener costos: ${error}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar lotes según el término de búsqueda
    if (allCosts && allCosts.length > 0) {
      const filtered = allCosts.filter((cost: CostInterface) =>
        cost.date?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCosts(filtered);
    }
  }, [searchTerm, allCosts]);

  return (
    <div className="mt-4 card">
      <input
        type="search"
        className="input"
        placeholder="Busqueda por Fecha"
        aria-label="Search"
        aria-describedby="button-addon3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tabla de lotes filtrados */}
      <List
        filtered={filteredCosts}
        allSupplies={allSupplies}
        allMoney={allMoney}
      />
    </div>
  );
};
