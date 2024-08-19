import { Button, Flex, Image, useColorMode } from "@chakra-ui/react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import userAtom from "../atoms/userAtom"
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi"
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import { MdOutlineSettings } from "react-icons/md";

const Header = () => {

  const user = useRecoilValue(userAtom);
  const {colorMode, toggleColorMode} = useColorMode();
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <div>
        <Flex justifyContent={'space-between'} mt={6} mb={12}>
            {user && (
              <Link to='/'>
                <AiFillHome size={24} />
              </Link>
            )}
            {!user && (
              <Link to={"/auth"} onClick={() => setAuthScreen("login")}>
                Login
              </Link>
			      )}
            <Image
              cursor={"pointer"}
              alt="logo"
              w={6}
              src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
              onClick={toggleColorMode}
            />

            {user && (
                <Flex alignItems={"center"} gap={4}>
                  <Link to={`/${user.username}`}>
                    <RxAvatar size={24} />
                  </Link>
                  <Link to={`/chat`}>
                    <BsFillChatQuoteFill size={20} />
                  </Link>
                  <Link to={`/settings`}>
                    <MdOutlineSettings size={20} />
                  </Link>
                  <Button size={"xs"}
                    onClick={logout}
                  ><HiOutlineLogout size={20} /></Button>
                </Flex>
			      )}

            {!user && (
              <Link to={"/auth"} onClick={() => setAuthScreen("signup")}>
                Sign up
              </Link>
			      )}
        </Flex>      
    </div>
  )
}

export default Header
