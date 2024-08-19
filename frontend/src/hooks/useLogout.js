import { useSetRecoilState } from "recoil";
import useShowToast from "./useShowToast";
import userAtom from "../atoms/userAtom";

const useLogout = () => {

    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();

    const logout = async() => {
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json();
            console.log(data);

            if(data.error){
                showToast("Error", data.error, "error")
                return;
            }
            localStorage.removeItem("user-social");
            setUser(null);
        } catch (error) {
            showToast("Error", error, "error")
        }
    };
    return logout;
}

export default useLogout
