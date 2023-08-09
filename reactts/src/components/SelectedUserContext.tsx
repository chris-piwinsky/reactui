import React, { createContext, useContext, useState } from 'react';
import { TableRow } from './types'; // Make sure to import the TableRow type

interface SelectedUserContextType {
    selectedUser: TableRow | null;
    setSelectedUser: React.Dispatch<React.SetStateAction<TableRow | null>>;
}

const SelectedUserContext = createContext<SelectedUserContextType | undefined>(undefined);

export const SelectedUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedUser, setSelectedUser] = useState<TableRow | null>(null);

    return (
        <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
            {children}
        </SelectedUserContext.Provider>
    );
};

export const useSelectedUser = () => {
    const context = useContext(SelectedUserContext);
    if (context === undefined) {
        throw new Error('useSelectedUser must be used within a SelectedUserProvider');
    }
    return context;
};