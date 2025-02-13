import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Context 생성
const NavigateContext = createContext();

//  Provider 설정
export const NavigateProvider = ({ children }) => {
    const navigate = useNavigate();

    return <NavigateContext.Provider value={{ navigate }}>{children}</NavigateContext.Provider>;
};

//  useNavigateContext() 커스텀 훅 정의
export const useNavigateContext = () => {
    return useContext(NavigateContext);
};
