/*function setActiveSidebarItem() {
    const currentPath = window.location.pathname.split("/").pop();
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    sidebarItems.forEach(item => {
        const link = item.getAttribute('href');
        if (link === currentPath) {
            item.classList.add('active');
        }
    });
}*/

// Call the function when the page loads
//window.onload = setActiveSidebarItem;



function setActiveSidebarItem() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => item.classList.remove('active')); // Remove 'active' from all items

    if (homepage_section.style.display === "block") {
        homepage_nav.classList.add('active');
    } else if (customer_section.style.display === "block") {
        customer_nav.classList.add('active');
    } else if (item_section.style.display === "block") {
        item_nav.classList.add('active');
    } else if (order_manage_section.style.display === "block") {
        order_nav.classList.add('active');
    } else if (order_history_section.style.display === "block") {
        order_history_nav.classList.add('active');
    }
}
