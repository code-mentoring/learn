import React from 'react';
import svgBody from './body';
import svgFace from './face';
import svgHead from './head';
export * from './Characters';
export interface CharacterProps {
    body: keyof typeof svgBody;
    head: keyof typeof svgHead;
    face?: keyof typeof svgFace;
}
export declare const Character: React.FC<CharacterProps>;
