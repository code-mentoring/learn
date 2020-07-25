import React from 'react';
import { User } from '@codement/api';
import { Size } from '../../types/styled';
export interface UserProfileProps extends React.HTMLAttributes<HTMLDivElement> {
    user: User | string;
    size?: Size | number;
}
export declare const UserProfile: React.FC<UserProfileProps>;
