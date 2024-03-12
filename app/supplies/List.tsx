import React, { useState, useEffect } from "react";
import { SupplyInterface } from "../components/interfaces/interface";
import {  alertDeleteSupply, alertPatchSupply } from "../components/alerts/sweet";
import { UnitSupplyInterface } from "../components/interfaces/interface";


interface ListProps {
  filtered: SupplyInterface[];
  units: UnitSupplyInterface[];
}


function List({ filtered, units }: ListProps) {
  // paginado
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula el índice de inicio y fin de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filtered.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maximum = Math.max(...pageNumbers);

  // handlers
  const handleEditSupply = (idSupply: number) => {
    alertPatchSupply(
      idSupply,
      "Insumo",
      units
    );
  };
  const handleDeleteRow = async (idSupply: number) => {
    try {
      await alertDeleteSupply(
        idSupply,
        "Insumo"
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="overflow-auto rounded-lg border border-gray-200 shadow-md my-5 md:h-80">
        <table className="w-full border-collapse bg-white text-left text-xs lg:text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Categoria
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Subcategoria
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Familia
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Marca Comercial
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Unidad
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100 text-left">
            {currentItems.map((Supply: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="text-sm">{Supply.category}</div>
                </th>
                <td className="px-6 py-4">{Supply.subCategory}</td>
                <td className="px-6 py-4">{Supply.family}</td>
                <td className="px-6 py-4">{Supply.commercialBrand}</td>
                <td>{Supply.idUnit?.description}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button x-data="{ tooltip: 'Edite' }">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                        onClick={() =>
                          Supply.idSupply !== undefined &&
                          handleEditSupply(Supply.idSupply)
                        }
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                    <button x-data="{ tooltip: 'Delete' }">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                        onClick={() =>
                          Supply.idSupply !== undefined &&
                          handleDeleteRow(Supply.idSupply)
                        }
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Botones de paginación */}

      <div className="flex justify-center mt-4">
        <div
          className="
           inline-flex
           border border-[#e4e4e4]
           bg-white
           p-4
           rounded-xl
           "
        >
          <ul className="flex items-center -mx-[6px]">
            <li className="px-[6px]">
              <button
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
                disabled={currentPage === 1}
                className="disabled w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-black"
              >
                <span>
                  <svg
                    width="8"
                    height="15"
                    viewBox="0 0 8 15"
                    className="fill-current stroke-current"
                  >
                    <path
                      d="M7.12979 1.91389L7.1299 1.914L7.1344 1.90875C7.31476 1.69833 7.31528 1.36878 7.1047 1.15819C7.01062 1.06412 6.86296 1.00488 6.73613 1.00488C6.57736 1.00488 6.4537 1.07206 6.34569 1.18007L6.34564 1.18001L6.34229 1.18358L0.830207 7.06752C0.830152 7.06757 0.830098 7.06763 0.830043 7.06769C0.402311 7.52078 0.406126 8.26524 0.827473 8.73615L0.827439 8.73618L0.829982 8.73889L6.34248 14.6014L6.34243 14.6014L6.34569 14.6047C6.546 14.805 6.88221 14.8491 7.1047 14.6266C7.30447 14.4268 7.34883 14.0918 7.12833 13.8693L1.62078 8.01209C1.55579 7.93114 1.56859 7.82519 1.61408 7.7797L1.61413 7.77975L1.61729 7.77639L7.12979 1.91389Z"
                      strokeWidth="0.3"
                    ></path>
                  </svg>
                </span>
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li key={number} className="px-[6px]">
                <button
                  onClick={() => setCurrentPage(number)}
                  className={`w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-black ${
                    currentPage === number ? "bg-slate-300 text-white" : ""
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
            <li className="px-[6px]">
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-black"
                disabled={currentPage === maximum}
              >
                <span>
                  <svg
                    width="8"
                    height="15"
                    viewBox="0 0 8 15"
                    className="fill-current stroke-current"
                  >
                    <path
                      d="M0.870212 13.0861L0.870097 13.086L0.865602 13.0912C0.685237 13.3017 0.684716 13.6312 0.895299 13.8418C0.989374 13.9359 1.13704 13.9951 1.26387 13.9951C1.42264 13.9951 1.5463 13.9279 1.65431 13.8199L1.65436 13.82L1.65771 13.8164L7.16979 7.93248C7.16985 7.93243 7.1699 7.93237 7.16996 7.93231C7.59769 7.47923 7.59387 6.73477 7.17253 6.26385L7.17256 6.26382L7.17002 6.26111L1.65752 0.398611L1.65757 0.398563L1.65431 0.395299C1.454 0.194997 1.11779 0.150934 0.895299 0.373424C0.695526 0.573197 0.651169 0.908167 0.871667 1.13067L6.37922 6.98791C6.4442 7.06886 6.43141 7.17481 6.38592 7.2203L6.38587 7.22025L6.38271 7.22361L0.870212 13.0861Z"
                      strokeWidth="0.3"
                    ></path>
                  </svg>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default List;
