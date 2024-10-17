function setActiveSidebarItem() {
    const currentPath = window.location.pathname.split("/").pop();
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    sidebarItems.forEach(item => {
        const link = item.getAttribute('href');
        if (link === currentPath) {
            item.classList.add('active');
        }
    });
}

// Call the function when the page loads
window.onload = setActiveSidebarItem;