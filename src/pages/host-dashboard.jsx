import { AppHeader } from "../cmps/app-header";

export function HostDashBoard(){

    // const [userTrips, setUserTrips] = useState([])
    // // const user = userService.getLoggedinUser()
    // // console.log(user,'user')
    // const orders = useSelector(storeState => storeState.orderModule.orders)
    // const navigate = useNavigate()
    // useEffect(() => {
    //     OnloadUserOrders()
    // }, [])


    // async function OnloadUserOrders() {
    //     try {
    //       const  currUserOrders = await loadOrders()
    //       console.log(currUserOrders,'prder!!!!!!!!!')
    //         setUserTrips(currUserOrders)

    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }


    return <section className="host-dashboard order-layout">
        <AppHeader/>
    </section>
}