const TodayBlock2 = ({ title, iconSunny, tempRange, description }) => {
    return (
        <div className="col gap-2.5 large-desktop:gap-5">
            {title && <h1 className="text-lg">{title}</h1>}
            <div className="flex gap-2.5 large-desktop:gap-5">
                <div className="icon-medium">
                    <img src={iconSunny} alt={`${title}天氣`} />
                </div>
                <div className="content-center">
                    <p className="text-sm">{tempRange}</p>
                    <p className="text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default TodayBlock2;
