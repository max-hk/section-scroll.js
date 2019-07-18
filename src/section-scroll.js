export default (sectionList, options) => {
    let previousScrollY = window.scrollY;
    let previousSection;

    const getCurrentSection = () => {
        for (let element of sectionList) {
            if (element.getBoundingClientRect().top >= 0) {
                return element;
            }
        }
    };
    const scrollToSection = (sectionToScroll) => {
        // Scroll behaviour can only prevented by CSS "overflow: hidden" but not event.preventDefault()
        document.body.style.overflowY = 'hidden';
        if (options.onLeave) options.onLeave(previousSection);
        window.removeEventListener('scroll', scrollHandler);
        window.scroll({ top: sectionToScroll.offsetTop, behavior: 'smooth' });

        // Wait for scroll finish
        const resetOverflow = setInterval(() => {
            /* If window reach target section 
               getBoundingClientRect().top may be float number so we need to floor() it 
               trunc() is not the suitable function to use as it will clear the interval too early (before the scroll actually finish) while scrolling up */
            if (Math.floor(sectionToScroll.getBoundingClientRect().top) === 0) { // To do: && navbarBottom === 0
                document.body.style.overflowY = '';
                clearInterval(resetOverflow);
                window.addEventListener('scroll', scrollHandler);
                if (options.afterLeave) options.afterLeave(previousSection);
                if (options.onLoad) options.onLoad(sectionToScroll);

                previousSection = sectionToScroll;
            }
        }, 10);
    };
    const scrollHandler = () => {
        // Scrolling down
        if (window.scrollY > previousScrollY) {
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

    // Initialize sectionScroll
    window.addEventListener('scroll', scrollHandler);
    previousSection = getCurrentSection();
    options.onLoad(previousSection);
}