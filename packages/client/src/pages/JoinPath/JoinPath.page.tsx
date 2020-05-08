import React from 'react';
import { Modal } from '@codement/ui/components/Modal/Modal';
import { PathIcon } from '@codement/ui';

export const JoinPathPage = ( ) => {
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
        },
    ]

    return (
        <Modal>
            <div className=" bg-primary-200 w-1/2 m-auto">
                <h1 className="text-center mb-4">What are you interested in learning?</h1>

                <p className="text-blue-500 w-1/2 text-center mx-auto mb-10">
                    Choose some of the base <span className="link">paths</span> to get you started.
                    You'll unlock more as you go, but these are here to get you started.
                </p>
                
                <div className="flex justify-between">
                    { paths && paths.map( path => {
                        return ( <div className="flex flex-col ">
                            <div className="flex w-20 h-20 rounded border-2 border-grey-300">
                                <PathIcon key={path.id} icon={path.icon} className="m-auto w-6"/>
                            </div>
                            
                            <div className="text-center">
                                {path.name}
                            </div>
                        </div> )
                    })}
                </div>
            </div>
        </Modal>
    )
};