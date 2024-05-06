Module.register("MMM-navigation", {
    
    // Function to create the iframe element
    getDom: function() {
        let wrapper = document.createElement("div");
        wrapper.id = "MMM-navigation";
        let html = "";
        
        const imagePath = "./modules/MMM-navigation/map/vers_12.jpg";
        
        
        html += `<img src="${imagePath}" alt="Your Image" style="width: 60%; height: 60%;" />`;
        wrapper.innerHTML = html;
       
        return wrapper; 
    }
});