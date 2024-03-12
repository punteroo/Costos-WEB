import React, { useEffect, useState } from "react";
import { getAllLots } from "../api/apis";
import List from "./List";
import { LotInterface } from "../components/interfaces/interface";

export default function SearchInput() {
  const [allLots, setAllLots] = useState<LotInterface[]>([]);
  const [filteredLots, setFilteredLots] = useState<LotInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // buscador

  const fetchData = async () => {
    try {
      const response = await getAllLots();

      // Verifica si hay datos en la respuesta antes de llamar a setAllLots
      if (response && response.data) {
        const resultAllLots: LotInterface[] = response.data;
        setAllLots(resultAllLots);
        setFilteredLots(resultAllLots);
      } else {
        console.error("La respuesta de getAllLots no contiene datos");
      }
    } catch (error) {
      console.error("Error al obtener la lista de productos: ", error);
    }
  };

  // Llamada a fetchData solo si allLots está vacío
  useEffect(() => {
    if (!allLots || allLots.length === 0) {
      fetchData();
    }
  }, [allLots]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filtrar lotes según el término de búsqueda
    if (allLots && allLots.length > 0) {
      const filtered = allLots.filter(
        (lot: LotInterface) =>
          lot.lot &&
          lot.lot.toLowerCase().includes(searchTerm?.toLowerCase() ?? "")
      );
      setFilteredLots(filtered);
    } else {
      console.error("La lista de lotes está vacía o indefinida.");
    }
  };

  return (
    <div className="mt-4 card">
      <input
        type="search"
        className="input"
        placeholder="Busqueda por lote"
        aria-label="Search"
        aria-describedby="button-addon3"
        onChange={handleSearch}
      />

      {/* Tabla de lotes filtrados */}
      <List filtered={filteredLots} />
    </div>
  );
}
