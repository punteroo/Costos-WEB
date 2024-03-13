import { useEffect, useState } from "react";
import { getAllSupplies, getAllUnits } from "../api/apis";
import List from "./List";
import { SupplyInterface } from "../components/interfaces/interface";

export default function SearchInput() {
  const [allSupplies, setAllSupplies] = useState([]);
  const [allUnits, setAllUnits] = useState([]);
  const [filteredSupplies, setFilteredSupplies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // buscador

  // Obtener los datos iniciales al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseAllSupplies, responseAllUnits] = await Promise.all([
          getAllSupplies(),
          getAllUnits(),
        ]);
        if (responseAllSupplies && responseAllSupplies.data) {
          const resultAllSupplies = responseAllSupplies?.data;
          
          setAllSupplies(resultAllSupplies);
          setFilteredSupplies(resultAllSupplies);
          const resultAllUnits = responseAllUnits?.data;
          setAllUnits(resultAllUnits);
        } else {
          console.error("No se encontraron insumos");
        }
      } catch (error) {
        throw new Error(`Error al obtener la lista de productos: ${error}`);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Filtrar lotes según el término de búsqueda
    if (allSupplies && allSupplies.length > 0) {
      const filtered = allSupplies.filter((supply: SupplyInterface) =>
        supply.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSupplies(filtered);
    }
  }, [searchTerm, allSupplies]);

  return (
    <div className="mt-4 card">
      <input
        type="search"
        className="input"
        placeholder="Busqueda por lote"
        aria-label="Search"
        aria-describedby="button-addon3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tabla de lotes filtrados */}
      <List filtered={filteredSupplies} units={allUnits} />
    </div>
  );
}

