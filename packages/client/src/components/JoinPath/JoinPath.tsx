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

export const JoinPath: React.FC<JoinPath> = ({ setShow }) => {
  const paths = [
    {
      id: 1,
      name: 'CSS3',
      icon: 'css' as 'css'
    },
    {
      id: 2,
      name: 'HTML5',
      icon: 'html' as 'html'
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
      <div className="w-2/5 bg-white text-center py-6 px-12 relative rounded">
        <Icon
          icon="x"
          size="small"
          className="absolute top-6 right-12 text-grey-300 hover:text-primary-400 cursor-pointer"
          onClick={() => setShow(false)}
        />
        <h3 className="mb-3 font-medium">Join a Path</h3>
        <p className="text-sm leading-4 text-grey-800 mb-12" style={{ letterSpacing: '0.75px' }}>Select a path below to begin your journey...</p>
        <div className="grid grid-cols-5 items-center" style={{ justifyItems: 'center' }}>
          {paths && paths.map(path => (
            <div key={path.id}>
              <div className="p-6 border-2 rounded border-grey-100">
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
