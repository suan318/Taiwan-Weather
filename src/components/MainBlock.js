const MainBlock = ({ title, cards }) => {
    return (
        <div className="main-weather gap-4 large-desktop:gap-8">
            <div className="main-title">
                <p className="text-lg">{title}</p>
            </div>
            <div className="container">
                {cards.map((card, id) => {
                    // 計算當前溫度在最高與最低溫的百分比
                    let fillWidth = 0;
                    if (card.showStatusBar && card.min !== undefined && card.max !== undefined) {
                        fillWidth = ((card.value - card.min) / (card.max - card.min)) * 100;
                        fillWidth = Math.max(0, Math.min(fillWidth, 100));
                    }

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
                                <div className="status-bar">
                                    <div
                                        className="status-bar-fill"
                                        style={{ width: `${fillWidth}%`, }}
                                    ></div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MainBlock;
