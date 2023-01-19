import { useSelector } from "react-redux"

export function LoginModal(){
    const isLoginModalOpen = useSelector(storeState => storeState.userModule.isLoginModalOpen)
    
    return <div className={`login-modal ${(isLoginModalOpen)? 'open':'closed'}`}>login</div>
}