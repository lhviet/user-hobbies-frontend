import React, { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from '../../../5_constants/theme';

const LOGO_URL = 'https://cdn.shopify.com/s/files/1/0003/1938/9747/t/7/assets/180619_mercavus_ohne_slogan.png';

const Root = styled.nav`
  position: relative;
  display: flex;
  justify-content: flex-end;
  height: 2rem;
  padding: .5rem .8rem;
  background-color: ${colors.bgBlue.toString()};  
`;
const NavBrandIcon = styled.img.attrs({
  alt: 'logo',
  src: LOGO_URL,
})`
  position: absolute;
  left: 0;
  width: auto;
  height: 2.5rem;
`;
const Title = styled.div`
  font-size: 1.4rem;
  color: ${colors.white.toString()};
`;

interface Props {
  className?: string;
}

const TopBarNavigation: FC<Props> = (
  { className }: Props
) => {
   return (
    <Root className={className}>
      <NavLink to="/" exact={true}>
        <NavBrandIcon />
      </NavLink>
      <Title>User - Hobbies</Title>
    </Root>
  );
};

export default memo(TopBarNavigation);
