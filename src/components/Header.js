import { FaLocationDot } from "react-icons/fa6";
const Header = ({ onToggleCityOption, selectedCity }) => {

    return (
        <header>
            <div className="location-icon cursor-pointer" onClick={onToggleCityOption}>
                <FaLocationDot />
            </div>
            <h1 className="text-xl text-center grow">{selectedCity || "臺北市"}</h1>
        </header>
    );
}

export default Header;