// src/hooks/useAuth.ts
import { useState } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Your authentication logic here
    
    return { isAuthenticated, setIsAuthenticated };
};

export default useAuth; // This line makes it a module
