import React, { useEffect, useState } from 'react';
import { Loader } from '../../components';
export const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, []);

    return (
        <>
            {
                loading ? <Loader />
                :
                <div>Dashboard</div>
            }
        </>
    );
};