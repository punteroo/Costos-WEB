import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe  } from '@fortawesome/free-solid-svg-icons';


import { IconDefinition } from '@fortawesome/fontawesome-svg-core';


interface LotIcon {
  fill?: string;
  [key: string]: any; // Puedes agregar otras propiedades según tus necesidades
}

const LogoIcon: FC<LotIcon> = ({ fill = "#6C7281", ...rest }) => {
  const icon: IconDefinition = faGlobe;

  return (
    <FontAwesomeIcon icon={icon} color={fill} {...rest} />
  );
};

export default LotIcon;
