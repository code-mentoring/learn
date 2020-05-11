import React from 'react';
import { Modal } from '@codement/ui/components/Modal/Modal';
import { Icon, PathIcon, Button } from '@codement/ui';

// TODO: Fetch available paths
// TODO: Handle selection of paths
// TODO: Disable begin button until path selected

interface JoinPath {
  setShow: any;
}

// Click add path button in progress widget to open modal

// TEAM NOTE:
// - Modal closes when clicked anywhere.  Changed to only close on (x).
// - Refractor CSS to its own individual file.

// CSS can be found @     ui/css/modal-join-path.css
// Figma Design:          https://www.figma.com/file/eyk5tQgLhIpyiORYfWxeUh/Learning-App?node-id=197%3A0

export const JoinPath: React.FC<JoinPath> = ({ setShow }) => {
  const paths = [
    {
      id: 1,
      name: 'HTML5',
      icon: 'html' as 'html'
    },
    {
      id: 2,
      name: 'CSS3',
      icon: 'css' as 'css'
    },
    {
      id: 3,
      name: 'JavaScript',
      icon: 'js' as 'js'
    },
    {
      id: 4,
      name: 'Node',
      icon: 'nodejs' as 'nodejs'
    },
    {
      id: 5,
      name: 'React',
      icon: 'react' as 'react'
    }
  ];

  return (
    <Modal setShow={setShow}>
      <div className="join-path-card">
        <Icon
          icon="x"
          size="small"
          className="btn-close-icon"
          onClick={() => setShow()}
        />
        <h1 className="mb-3 font-semibold">Join a Path</h1>
        <p className="text-sm leading-4 text-grey-800 mb-12" style={{ letterSpacing: '0.75px' }}>
          Select a path below to begin your journey...
        </p>

        <div className="grid grid-cols-5 items-center" style={{ justifyItems: 'center' }}>
          {paths && paths.map(path => (
            <div key={path.id}>
              <div className="path-icon-container">
                <PathIcon
                  icon={path.icon}
                  className="m-auto"
                />
              </div>
              <p className="font-semibold text-sm leading-4 mt-2 text-grey-600" style={{ letterSpacing: '0.875px' }}>{path.name.toUpperCase()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            color="success"
            className="mt-8"
          >
            Begin
          </Button>
        </div>
      </div>
    </Modal>
  );
};
