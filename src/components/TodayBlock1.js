const TodayBlock1 = ({ title, iconSunny, tempRange, description, alt }) => {
    return (
        <div className="flex justify-center gap-20 laptop:gap-80 large-desktop:gap-80 grow">
            {title && <h1 className="text-lg">{title}</h1>}
            <div className="icon-large">
                <img src={iconSunny} alt={alt} />
            </div>
            <div className="col justify-center h-full">
                <p className="text-base">{tempRange}</p>
                <p className="text-base">{description}</p>
            </div>
        </div>
    );
};

export default TodayBlock1;
