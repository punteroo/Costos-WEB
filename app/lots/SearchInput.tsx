import { useEffect, useState } from "react";
import { getAllLots, postLot } from "../api/apis";

export default function SearchInput() {
  const [allLots, setAllLots] = useState([]);
  const [filteredLots, setFilteredLots] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // buscador

  type Lot = {
    idLot: number;
    businessName: string;
    establishment: string;
    lot: string;
    surface: number;
    latitude: number;
    length: number;
    condition: string;
  };

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
    const filtered = allLots.filter((lot: Lot) =>
      lot.lot.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLots(filtered);
  }, [searchTerm, allLots]);

  return (
    <div className="mt-4 card">
      <input
        type="search"
        className="input"
        placeholder="Buscar"
        aria-label="Search"
        aria-describedby="button-addon3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />


      {/* Tabla de lotes filtrados */}
      <table className="table-auto mt-4 w-full text-center text-white">
        <thead>
          <tr>
            <th>Razon Social</th>
            <th>Establecimiento</th>
            <th>Lote</th>
            <th>Superficie</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>Condicion</th>
          </tr>
        </thead>
        <tbody>
          {filteredLots.map((lot: Lot) => (
            <tr key={lot.idLot}>
              <td>{lot.businessName}</td>
              <td>{lot.establishment}</td>
              <td>{lot.lot}</td>
              <td>{lot.surface}</td>
              <td>{lot.latitude}</td>
              <td>{lot.length}</td>
              <td>{lot.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
