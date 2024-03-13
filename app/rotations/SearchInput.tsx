import { useEffect, useState } from "react";
import { getAllRotations, getAllLots } from "../api/apis";
import List from "./List";
import { RotationInterface } from "../components/interfaces/interface";

export default function SearchInput() {
  const [allRotation, setAllRotation] = useState([]);
  const [allLots, setAllLots] = useState([]);
  const [filteredRotation, setFilteredRotation] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // buscador

  // Obtener los datos iniciales al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseAllRotation, responseAllLots] = await Promise.all([
          getAllRotations(),
          getAllLots(),
        ]);
        
        if (responseAllRotation && responseAllRotation.data) {
          const resultAllRotation = responseAllRotation?.data;
          
          setAllRotation(resultAllRotation);
          setFilteredRotation(resultAllRotation);
          const resultAllLots = responseAllLots?.data;
          setAllLots(resultAllLots);
        } else {
          console.error("No se encontraron Rotaciones");
        }
      } catch (error) {
        throw new Error(`Error al obtener la lista de Rotaciones: ${error}`);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    // Filtrar lotes según el término de búsqueda
    if (allRotation && allRotation.length > 0) {
      const filtered = allRotation.filter((rotation: RotationInterface) =>
      rotation.campaign?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRotation(filtered);
    }
  }, [searchTerm, allRotation]);

  return (
    <div className="mt-4 card">
      <input
        type="search"
        className="input"
        placeholder="Busqueda por Rotaciones"
        aria-label="Search"
        aria-describedby="button-addon3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tabla de lotes filtrados */}
      <List filtered={filteredRotation} lots={allLots} />
    </div>
  );
}

