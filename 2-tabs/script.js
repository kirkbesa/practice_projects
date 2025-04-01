
document.addEventListener("DOMContentLoaded", function() {
    const tabItem = document.querySelectorAll('.tab-item');
    const tabContent = document.querySelectorAll('.tab-content');
    let tabIndex = 0 ;

    tabItem.forEach((item) => {
        item.addEventListener('click', () => {
            tabItem.forEach((selected) => {
                selected.classList.remove('selected');
            });
            item.classList.add('selected');

            tabIndex = Array.prototype.indexOf.call(tabItem, item);

            tabContent.forEach(content => content.classList.remove('show', 'hide'));
            tabContent[tabIndex].classList.add('show');

            // ORIGINAL LOGIC (with hide class)
            // tabContent.forEach((content) => {
            //     if (content.classList.contains('show')) {
            //         content.classList.remove('show');
            //         content.classList.add('hide');
            //     } else {
            //         if (content === tabContent[tabIndex]) {
            //             content.classList.add('show');
            //             tabContent[tabIndex].classList.remove('hide');
            //         }
            //     }
            // })
        })
    });
});