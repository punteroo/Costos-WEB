import { useEffect, useState } from "react";
import { getAllSupplies, getAllUnits } from "../api/apis";
import List from "./List";
import { SupplyInterface } from "../components/interfaces/interface";




export default function SearchInput() {
  const [allSupplies, setAllSupplies] = useState([]);
  const [allUnits, setAllUnits] = useState([]);
  const [filteredSupplies, setFilteredSupplies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // buscador


   // useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseAllSupplies, responseAllUnits] = await Promise.all([
          getAllSupplies(),
          getAllUnits(),
        ])
        // Verifica si hay datos en la respuesta antes de llamar a setAllSupplies
          const resultAllSupplies = responseAllSupplies?.data;
          const resultAllUnits = responseAllUnits?.data;
          setAllSupplies(resultAllSupplies);
          setAllUnits(resultAllUnits);
          setFilteredSupplies(resultAllSupplies);

      } catch (error) {
        throw new Error(`Error al obtener la lista de productos: ${error}`);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar lotes según el término de búsqueda
    const filtered = allSupplies.filter((lot: SupplyInterface) =>
      lot.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSupplies(filtered);
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
