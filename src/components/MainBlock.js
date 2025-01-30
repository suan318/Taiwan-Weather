import iconSunny from '../images/icon-sunny.png';

const MainBlock = ({ title, cards, showStatusBar }) => {
    return (
        <div className="main-weather gap-4 large-desktop:gap-8">
            <div className="main-title">
                <p className="text-lg">{title}</p>
            </div>
            <div className="container">
                {cards.map((card, id) => (
                    <div key={id} className="weather-card">
                        <div>
                            <p className="text-sm">{card.title}</p>
                        </div>
                        <div className="content">
                            {card.image ? (
                                <img className="icon-large" src={iconSunny} alt={card.alt} />
                            ) : (
                                <p className="text-xxl">{card.value}</p>
                            )}
                        </div>
                        {card.showStatusBar && (
                            <div className="status-bar"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainBlock;