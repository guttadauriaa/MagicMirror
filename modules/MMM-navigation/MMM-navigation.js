Module.register("MMM-navigation", {
    
    // Function to create the iframe element
    getDom: function() {
        let wrapper = document.createElement("div");
        wrapper.id = "menu_houzeau";
        let html = "";
        
        const imagePath = "./modules/menu_houzeau/menu.png";
        
        
        html += `<img src="${imagePath}" alt="Your Image" style="width: 60%; height: 60%;" />`;
        wrapper.innerHTML = html;
       
        return wrapper; 
    }
});