import useAuthStore from "../store/auth.store";

const useAuth = () => {
    const {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        setUser,
    } = useAuthStore();

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        setUser,
    };
};

export default useAuth;