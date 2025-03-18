import "./AppDownLoad.css"
import { assets } from "../../assets/assets"

const AppDownLoad = ()=>{
    return (
        <div className="app-download" id="app-download">
            <p>For Better Experiance Download App</p>
            <div className="app-download-platform">
                <img src={assets.play_store} alt="" />
                <img src={assets.app_store} alt="" />
            </div>
        </div>
    )
}

export default AppDownLoad