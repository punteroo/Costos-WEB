"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";
import {
  faGlobe,
  faList,
  faArrowsSpin,
  faBoxesPacking,
  faDollarSign,
  faArrowTrendDown,
  faHandHoldingDollar,
  faSunPlantWilt,
  faBarChart,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface MenuItem {
  id: number;
  label: string;
  icon: any;
  link: string;
}

const menuItems: MenuItem[] = [
  { id: 1, label: "Panel", icon: faBarChart, link: "/dashboard" },
  { id: 2, label: "Lotes", icon: faGlobe, link: "/lots" },
  { id: 3, label: "Insumos", icon: faBoxesPacking, link: "/supplies" },
  { id: 4, label: "Rotacion", icon: faArrowsSpin, link: "/rotations" },
  { id: 5, label: "Labores", icon: faList, link: "/labors" },
  { id: 6, label: "L. de Precios", icon: faDollarSign, link: "/listPrice" },
  { id: 7, label: "Costos", icon: faArrowTrendDown, link: "/costs" },
  {
    id: 8,
    label: "P. x Grano",
    icon: faHandHoldingDollar,
    link: "/priceGrain",
  },
  { id: 9, label: "Produccion", icon: faSunPlantWilt, link: "/production" },
];

export default function Sidebar() {
  const [toggleCollapse, setToggleCollapse] = useState<Boolean | undefined>(); // estado del toggle
  const [toggleCollapseStored, setToggleCollapseStored] = useState(""); // estado del toggle

  // funcion para el logo
  const Logo = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-6 h-6"
        onClick={() => {
          setToggleCollapse((prevState) => !prevState);
          // localStorage.setItem('toggle',toggleCollapse.toString())
        }}
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 1-11-4.69v.447a3.5 3.5 0 0 0 1.025 2.475L8.293 10 8 10.293a1 1 0 0 0 0 1.414l1.06 1.06a1.5 1.5 0 0 1 .44 1.061v.363a1 1 0 0 0 .553.894l.276.139a1 1 0 0 0 1.342-.448l1.454-2.908a1.5 1.5 0 0 0-.281-1.731l-.772-.772a1 1 0 0 0-1.023-.242l-.384.128a.5.5 0 0 1-.606-.25l-.296-.592a.481.481 0 0 1 .646-.646l.262.131a1 1 0 0 0 .447.106h.188a1 1 0 0 0 .949-1.316l-.068-.204a.5.5 0 0 1 .149-.538l1.44-1.234A6.492 6.492 0 0 1 16.5 10Z"
          clipRule="evenodd"
        />
      </svg>
    );
  };
  // use Effect
  useEffect(() => {
    const stateToggleStored = localStorage.getItem("toggle");
    setToggleCollapseStored(stateToggleStored || "true");
    setToggleCollapse(Boolean(toggleCollapseStored));
  }, []);

  return (
    // boton sidebar
    <div
      className={`h-screen overflow-auto flex flex-col border-r ${
        toggleCollapse ? `w-16` : `w-60`
      }`}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div
        className="group flex items-center justify-between min-h-[120px] border-b px-2 cursor-pointer"
        onClick={() => {
          // aca esta listo, presiono el boton y me recupera el estado anterior
          // y el segundo setea el estado nuevo en local
          setToggleCollapse((prevState) => !prevState);
          // localStorage.setItem('toggle',toggleCollapse.toString())
        }}
      >
        <div className="flex items-center gap-2">
          {/* logo */}
          <Logo />

          {/* text logo */}
          <p
            className={`text-lg truncate font-semibold ${
              toggleCollapse ? `hidden` : ``
            }`}
          >
            Menu
          </p>
        </div>

        {/* handle close */}
        <div className="opacity-50 group-hover:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-6 h-6 cursor-pointer ${
              toggleCollapse ? `rotate-180` : ``
            }`}
          >
            <path
              fillRule="evenodd"
              d="M15.28 9.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L13.69 10 9.97 6.28a.75.75 0 0 1 1.06-1.06l4.25 4.25ZM6.03 5.22l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L8.69 10 4.97 6.28a.75.75 0 0 1 1.06-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div
        className="w-full h-full overflow-auto"
        onClick={() => {
          const storedToggle = Boolean(localStorage.getItem("toggle"));
          if (storedToggle == !toggleCollapse) {
          }
        }}
      >
        {menuItems.map(({ id, label, icon: itemIcon, link }) => (
          <Link key={id} href={link}>
            <div className="group flex gap-2 items-center px-2 mx-auto hover:bg-slate-100 transition-all duration-300 h-20">
              <div>
                <FontAwesomeIcon
                  className="opacity-50 group-hover:opacity-100 transition-all"
                  icon={itemIcon}
                  color="black"
                  style={{ width: "2.5rem" }}
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar la propagación del evento al contenedor Link
                    setToggleCollapse((prevState) => !prevState);
                  }}
                />
              </div>
              <p
                className={classNames(
                  `text-md font-medium truncate ${
                    toggleCollapse ? `hidden` : ``
                  }`
                )}
              >
                {label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
