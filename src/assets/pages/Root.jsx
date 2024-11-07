import React, { useContext } from 'react';
import Left from '../../sections/Left';
import Chat from '../../sections/Chat';
import Right from '../../sections/Right';
import CustomGPTs from '../../sections/CustomGPTs';
import CustomMLModels from '../../sections/CustomMLModels';
import { VscEye, VscEyeClosed } from "react-icons/vsc"; // Import eye icons
import { TbLogout2 } from "react-icons/tb";
import Modals from '../../sections/Modals';
import AuthContext from '../../Contexts/AuthContext';
import Toasts from '../../sections/Toasts';
import Logout from '../../sections/Logout';

const Root = () => {
    const { isAuthenticated } = useContext(AuthContext);

    const [showCustomGPTs, setShowCustomGPTs] = React.useState(true);
    const [showCustomMLModels, setShowCustomMLModels] = React.useState(true);
    const [showLeft, setShowLeft] = React.useState(false);
    const [showRight, setShowRight] = React.useState(true);


    return (
        <div className={`h-dvh flex flex-col p-1 ${isAuthenticated ? 'font-main' : 'font-loading'}`}>
            <div className='flex-1 overflow-auto overflow-x-auto flex w-full gap-2'>
                {showLeft && (
                    <div className='w-64 h-full overflow-auto'>
                        <Left moreOptions={!showCustomGPTs && !showCustomMLModels} />
                    </div>
                )}
                <div className='flex-1 w-full overflow-x-auto rounded cc border-main border flex flex-col justify-center'>
                    <Chat moreOptions={!showCustomGPTs && !showCustomMLModels} />
                </div>
                {showRight && (
                    <div className='w-60'>
                        <Right />
                    </div>
                )}
            </div>
            <div className='overflow-auto flex flex-wrap w-full p-1'>
                {showCustomGPTs && (
                    <div className='flex-1 h-52'>
                        <CustomGPTs />
                    </div>
                )}
                {showCustomMLModels && (
                    <div className='flex-1 h-52'>
                        <CustomMLModels />
                    </div>
                )}
                <div className='w-full flex justify-between items-center border-t border-main border-opacity-25 gap-2'>
                    <div className='flex gap-2'>
                        {/* Toggle button for Custom GPTs with dynamic label and icon */}
                        <span className='cp font-semibold flex items-center gap-2' onClick={() => setShowCustomGPTs(!showCustomGPTs)}>
                            {showCustomGPTs ? 'Hide Custom GPTs' : 'Show Custom GPTs'}
                            {showCustomGPTs ? <VscEyeClosed className='text-xl mt-1' /> : <VscEye className='text-xl mt-1' />}
                        </span>

                        <span className='cp font-semibold flex items-center gap-2'>|</span>

                        {/* Toggle button for Custom ML Models with dynamic label and icon */}
                        <span className='cp font-semibold flex items-center gap-2' onClick={() => setShowCustomMLModels(!showCustomMLModels)}>
                            {showCustomMLModels ? 'Hide Custom ML Models' : 'Show Custom ML Models'}
                            {showCustomMLModels ? <VscEyeClosed className='text-xl mt-1' /> : <VscEye className='text-xl mt-1' />}
                        </span>

                        <span className='cp font-semibold flex items-center gap-2'>|</span>

                        {/* Toggle button for Left component with dynamic label and icon */}
                        <span className='cp font-semibold flex items-center gap-2' onClick={() => setShowLeft(!showLeft)}>
                            {showLeft ? 'Hide Left' : 'Show Left'}
                            {showLeft ? <VscEyeClosed className='text-xl mt-1' /> : <VscEye className='text-xl mt-1' />}
                        </span>

                        <span className='cp font-semibold flex items-center gap-2'>|</span>

                        {/* Toggle button for Right component with dynamic label and icon */}
                        <span className='cp font-semibold flex items-center gap-2' onClick={() => setShowRight(!showRight)}>
                            {showRight ? 'Hide Right' : 'Show Right'}
                            {showRight ? <VscEyeClosed className='text-xl mt-1' /> : <VscEye className='text-xl mt-1' />}
                        </span>
                    </div>
                    <Logout />
                </div>
            </div>
            <Modals />
            <Toasts />
        </div>
    );
}

export default Root;
