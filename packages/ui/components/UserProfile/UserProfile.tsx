import React from 'react';
import styled from 'styled-components';

import { User } from '@codement/api';
import { Size } from '../../types/styled';

export interface UserProfileProps extends React.HTMLAttributes<HTMLImageElement> {
  user: User | string;
  size?: Size | number;
}

const Image = styled.img<{size?: Size | number}>`
  height: ${p => p.theme.size(p.size)};
  width: ${p => p.theme.size(p.size)};
  border-radius: 50%;
  background-color: ${p => p.theme.color('grey.200')};
`;

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  size = 'xl',
  ...props
}) => {
  const src = typeof user === 'string' ? user : user.profileImage;
  return <Image {...props} src={src} size={size} />;
};
