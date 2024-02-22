"use client";

import classNames from "classnames";
import { useState } from "react";
import LogoIcon from "./icons/LogoIcon";
import { CollapsIcon } from "./icons/ColapsIcon";
import { faGlobe, faList, faArrowsSpin, faBoxesPacking, faDollarSign, faArrowTrendDown, faHandHoldingDollar, faSunPlantWilt, faBarChart } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface MenuItem {
  id: number;
  label: string;
  icon: any; // O el tipo específico del icono
  link: string;
}

const menuItems: MenuItem[] = [
  { id: 1, label: "Panel", icon: faBarChart, link: "/dashboard" },
  { id: 2, label: "Lotes", icon: faGlobe, link: "/lots" },
  { id: 3, label: "Insumos", icon: faBoxesPacking, link: "/supplies" },
  { id: 4, label: "Rotacion", icon: faArrowsSpin, link: "/rotations" },
  { id: 5, label: "Labores", icon: faList, link: "/labors" },
  { id: 6, label: "P.Insumos", icon: faDollarSign, link: "/priceSupplies" },
  { id: 7, label: "Costos", icon: faArrowTrendDown, link: "/costs" },
  { id: 8, label: "P. x Grano", icon: faHandHoldingDollar, link: "/priceGrains" },
  { id: 9, label: "Produccion", icon: faSunPlantWilt, link: "/productions" },
];

export default function Sidebar() {
  const [toggleCollapse, setToggleCollapse] = useState(false);

  const wrapperClasses = classNames(
    "md:h-screen md:px-4 md:pt-8 md:pb-4 min-h-screen pt-6 bg-light flex justify-between flex-col",
    {
      "w-60": !toggleCollapse,
      "w-16": toggleCollapse,
    }
  );

  const handleSidebarToggle = () => {
    setToggleCollapse((prevToggleCollapse) => !prevToggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <LogoIcon />
            {!toggleCollapse && (
              <span
                className={classNames("mt-2 text-lg font-medium text-text")}
              >
                MENU
              </span>
            )}
          </div>
          <button
            className="p-4 rounded bg-light-lighter absolute right-0"
            onClick={handleSidebarToggle}
          >
            <CollapsIcon />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start w-full h-full mt-6">
        {menuItems.map(({ id, label, icon: itemIcon, link }) => (
          <Link key={id} href={link}>
            <div className="menu-item flex py-4 items-center w-full h-full hover:shadow-md">
              <FontAwesomeIcon
                icon={itemIcon}
                color="#6C7281"
                style={{ width: "2.5rem" }}
              />
              {!toggleCollapse && (
                <span
                  className={classNames(
                    "text-md font-medium text-text-light"
                  )}
                >
                  {label}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
