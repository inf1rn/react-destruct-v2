import bg from "../../../assets/img/login-page-bg.png"
import bgTablet from "../../../assets/img/login-page-bg-tablet.png"

export const Bg = () => {
    return (
        <>
            <img className="login-page__bg login-page__bg_desktop" src={bg} alt="" />
            <img className="login-page__bg login-page__bg_tablet" src={bgTablet} alt="" />
        </>
    )
}
