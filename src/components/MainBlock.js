import { StatusBar } from "./StatusBar";

const MainBlock = ({ title, cards }) => {
    return (
        <div className="main-weather gap-4 large-desktop:gap-8">
            <div className="main-title">
                <p className="text-lg">{title}</p>
            </div>
            <div className="container">
                {cards.map((card, id) => {

                    return (
                        <div key={id} className="weather-card">
                            <div>
                                <p className="text-sm">{card.title}</p>
                            </div>
                            <div className="content">
                                {card.image ? (
                                    <img className="icon-large" src={card.image} alt={card.alt} />
                                ) : (
                                    <p className="text-xxl">{card.value}</p>
                                )}
                            </div>
                            {card.showStatusBar && (
                                <StatusBar
                                    value={card.value}
                                    min={card.min}
                                    max={card.max}
                                    type={card.type} // 傳遞計算類型
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MainBlock;
