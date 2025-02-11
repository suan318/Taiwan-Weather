const WeatherCard = ({ title, cards, iconClass = 'icon-medium', renderCard }) => {
    return (
        <>
            {title && <h1 className="text-lg">{title}</h1>}
            <div className="flex tablet:gap-5 justify-around">
                {cards && cards.length > 0 && cards.map((card, id) => (
                    <div key={id} className="three-hours">
                        <div className={iconClass}>
                            <img src={card.icon} alt={card.alt || title} />
                        </div>
                        {/* 三小時預報的降雨率及時間 */}
                        {renderCard ? renderCard(card) : (
                            <>
                                <p className="text-sm">{card.pop}</p>
                                <p className="text-sm">{card.time}</p>
                            </>
                        )}
                        {/* 三小時預報的降雨率及時間 */}
                    </div>))}
            </div>
        </>
    );
}

export default WeatherCard;