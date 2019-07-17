export default sectionScroll = (sectionList, onLoad, onLeave) => {
    let previousScrollY = window.scrollY;
    let targetSection;

    const scrollHandler = () => {
        const getCurrentSection = () => {
            let currentSection;
            for (let element of sectionList) {
                if (element.getBoundingClientRect().top < window.innerHeight) {
                    currentSection = element;
                }
            }
            return currentSection;
        };

        // Page reload
        if (window.scrollY === previousScrollY) return;
        // Scrolling down
        else if (window.scrollY > previousScrollY) {
            let nextSection = getCurrentSection();
            // If next section exists and user scroll through topmost pixel of next section
            if (nextSection && nextSection.getBoundingClientRect().top > 0) {
                scrollToSection(nextSection);
            }
        }
        // Scrolling up
        else {
            let previousSection = getCurrentSection().previousElementSibling;
            // If previous section exists and user scroll through bottommost pixel of previous section
            if (previousSection && previousSection.getBoundingClientRect().bottom > 0) {
                scrollToSection(previousSection);
            }
        }

        previousScrollY = window.scrollY;
    };
    const scrollToSection = (sectionToScroll) => {
        // Scroll behaviour can only prevented by CSS "overflow: hidden" but not event.preventDefault()
        document.body.style.overflowY = 'hidden';
        onLeave();

        targetSection = sectionToScroll;
        window.scroll({ top: targetSection.offsetTop, behavior: 'smooth' });
        window.removeEventListener('scroll', scrollHandler);

        // Wait for scroll finish
        let resetOverflow = setInterval(() => {
            /* If window reach target section 
               getBoundingClientRect().top may be float number so we need to floor() it 
               trunc() is not the suitable function to use as it will clear the interval too early (before the scroll actually finish) while scrolling up */
            if (Math.floor(targetSection.getBoundingClientRect().top) === 0) { // To do: && navbarBottom === 0
                document.body.style.overflowY = '';
                clearInterval(resetOverflow);
                window.addEventListener('scroll', scrollHandler);
                onLoad();
            }
        }, 10);
    };

    window.addEventListener('scroll', scrollHandler);
}