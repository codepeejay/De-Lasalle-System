document.addEventListener("DOMContentLoaded", () => {
    const reportForm = document.getElementById("reportForm");
    const itemsList = document.getElementById("itemsList");
    const searchInput = document.getElementById("searchInput");
  
    // Add new item to localStorage
    if (reportForm) {
      reportForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        const name = document.getElementById("name").value.trim();
        const description = document.getElementById("description").value.trim();
        const location = document.getElementById("location").value.trim();
        const type = document.getElementById("type").value;
  
        if (!name || !description || !location) {
          alert("Please fill out all fields!");
          return;
        }
  
        const item = {
          name,
          description,
          location,
          type,
          status: "Not Returned", // Default status
          timestamp: new Date().toISOString()
        };
  
        const items = JSON.parse(localStorage.getItem("lostFoundItems")) || [];
        items.push(item);
        localStorage.setItem("lostFoundItems", JSON.stringify(items));
  
        alert("Item reported successfully!");
        reportForm.reset();
        displayItems();
      });
    }
  
    // Display items
    function displayItems(filter = "") {
      const items = JSON.parse(localStorage.getItem("lostFoundItems")) || [];
      itemsList.innerHTML = "";
  
      const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );
  
      if (filteredItems.length === 0) {
        itemsList.innerHTML = "<p>No reports found.</p>";
        return;
      }
  
      filteredItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <div>
            <strong>${item.name}</strong> (${item.type})<br>
            Description: ${item.description}<br>
            Location: ${item.location}<br>
            Status: <span id="status-${index}">${item.status}</span>
          </div>
          <button class="return-btn" onclick="markAsReturned(${index})">Mark as Returned</button>
          <button class="delete-btn" onclick="deleteItem(${index})">X</button>
        `;
        itemsList.appendChild(li);
      });
    }
  
    // Delete specific item
    window.deleteItem = (index) => {
      const items = JSON.parse(localStorage.getItem("lostFoundItems")) || [];
      items.splice(index, 1); // Remove the selected item
      localStorage.setItem("lostFoundItems", JSON.stringify(items));
      displayItems(searchInput.value); // Update list based on search filter
    };
  
    // Mark item as Returned
    window.markAsReturned = (index) => {
      const items = JSON.parse(localStorage.getItem("lostFoundItems")) || [];
      items[index].status = "Returned"; // Update status
      localStorage.setItem("lostFoundItems", JSON.stringify(items));
      displayItems(searchInput.value); // Update list based on search filter
      alert("Item marked as Returned!");
    };
  
    // Filter items by search input
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        displayItems(searchInput.value);
      });
    }
  
    displayItems(); // Display items on page load
  });
  