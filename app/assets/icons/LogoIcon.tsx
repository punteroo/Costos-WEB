import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarChart  } from '@fortawesome/free-solid-svg-icons';
import { faRavelry } from '@fortawesome/free-brands-svg-icons';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';


interface LogoIconProps {
  fill?: string;
  [key: string]: any; // Puedes agregar otras propiedades según tus necesidades
}

const LogoIcon: FC<LogoIconProps> = ({ fill = "#6C7281", ...rest }) => {
  const icon: IconDefinition = faRavelry;

  return (
    <FontAwesomeIcon icon={icon} color={fill} {...rest} />
  );
};

export default LogoIcon;
