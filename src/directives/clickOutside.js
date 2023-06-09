const clickOutside = {
    beforeMount: (el, binding) => {
        el.clickOutsideEvent = event => {
            if (!(el == event.target || el.contains(event.target))) {
                binding.value();
            }
        };
        window.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted: el => {
        window.removeEventListener("click", el.clickOutsideEvent);
    },
};

export default clickOutside;
