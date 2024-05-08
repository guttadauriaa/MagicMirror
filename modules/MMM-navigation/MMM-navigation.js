Module.register("MMM-navigation", {
    
    // Function to create the iframe element
    getDom: function() {
        let wrapper = document.createElement("div");
        wrapper.id = "MMM-navigation";
        let html = "";
        
        const imagePath = "./modules/MMM-navigation/map/23.png";
        
        
        html += `<img src="${imagePath}" alt="Your Image" style="width: 90%; height: 100%;" />`;
        wrapper.innerHTML = html;
       
        return wrapper; 
    }
});