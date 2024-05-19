export const NavigateAfterTime = (href, navigator, timestamps) => {
    setTimeout(()=> {
        navigator(href);
    }, timestamps)
}