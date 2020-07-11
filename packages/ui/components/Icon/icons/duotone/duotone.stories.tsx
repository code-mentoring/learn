import React from 'react';
import { IconCloudUpload } from './cid-cloud-upload';
import { IconImages } from './cid-images';
import { IconMenu } from './cid-menu';
import { IconNote } from './cid-note';
import { IconTrash } from './cid-trash';
import { IconWarning } from './cid-warning';

export default {
  title: 'DuoTone Icons',
  parameters: {
    info: { inline: true }
  }
};

export const CloudIcon = () => <IconCloudUpload />;
export const ImagesIcon = () => <IconImages />;
export const MenuIcon = () => <IconMenu />;
export const NoteIcon = () => <IconNote />;
export const TrashIcon = () => <IconTrash />;
export const WarningIcon = () => <IconWarning />;
