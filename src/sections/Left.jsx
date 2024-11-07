import React, { useEffect, useState } from 'react';
import SystemInfo from '../components/Left/SystemInfo';
import UserInfo from '../components/Left/UserInfo';
import ResponseMeta from '../components/Chat/Side/ResponseMeta';
import SiteInfo from '../components/Left/SiteInfo';
import Theme from '../components/Left/Theme';
import Network from '../components/Left/Network';

const Left = ({
    moreOptions = false
}) => {

    return (
        <div className="h-full flex flex-col">
            <SiteInfo />
            <SystemInfo />
            {
                moreOptions && (
                    <></>
                )
            }
            <Network />
            <Theme />
            <UserInfo />
        </div>
    );
};

export default Left;
