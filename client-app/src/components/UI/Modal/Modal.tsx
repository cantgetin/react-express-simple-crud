import React from 'react';
import { ReactComponent as Close } from '../../../assets/close.svg'

type Props = {
    active: boolean,
    setActive: Function,
    children: any
}

const Modal = ({active, setActive, children}: Props) => {
    return (
        <div
            className={active ? "z-10 h-screen w-screen fixed top-0 left-0 flex items-center justify-center bg-opacity-50 bg-black" : 'hidden'}
            onClick={() => setActive(false)}>
            <div className="p-4 bg-white rounded-2xl relative shadow-md" onClick={e => e.stopPropagation()}>
                <Close width="20" height="20" className="cursor-pointer top-0 right-0 ml-auto" fill="var(--primaryBlue)" onClick={() => setActive(false)}/>
                <div className="mt-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
