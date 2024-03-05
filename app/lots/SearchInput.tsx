import { useEffect, useState } from "react";
import { getAllLots } from "../api/apis";
import List from "./List";
import { LotInterface } from "../components/interfaces/interface";

export default function SearchInput() {
  const [allLots, setAllLots] = useState([]);
  const [filteredLots, setFilteredLots] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // buscador

   // useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllLots();

        // Verifica si hay datos en la respuesta antes de llamar a setAllLots
        if (response && response.data) {
          const resultAllLots = response.data;
          setAllLots(resultAllLots);
          setFilteredLots(resultAllLots);
        } else {
          console.error("La respuesta de getAllLots no contiene datos");
        }
      } catch (error) {
        console.error("Error al obtener la lista de productos: ", error);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar lotes según el término de búsqueda
    const filtered = allLots.filter((lot: LotInterface) =>
      lot.lot?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLots(filtered);
  }, [searchTerm, allLots]);

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
      <List filtered={filteredLots}/>
    </div>
  );
}
