import { AiFillCloseCircle } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'
import { MdPendingActions } from 'react-icons/md'
import { utilService } from '../services/util.service'

  export  function GetOrderStatusStyle({status}){
        if (status === 'pending'){
            return <span className={status}>{status} <MdPendingActions /> </span>
        }
        if (status === 'approved'){
            return <span className={status}>{status} <BsCheckLg/> </span>
        }
        if (status === 'declined'){
            return <span className={status}>{status} <AiFillCloseCircle/> </span>
        }
    }