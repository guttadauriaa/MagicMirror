Module.register("MMM-navigation", {
    
    // Function to create the iframe element
    getDom: function() {
        let wrapper = document.createElement("div");
        wrapper.id = "MMM-navigation";
        let html = "";
        
        const imagePath = "./modules/MMM-navigation/map/test.jpg";
        
        
        html += `<img src="${imagePath}" alt="Your Image" style="width: 50%; height: 50%;" />`;
        wrapper.innerHTML = html;
       
        return wrapper; 
    }
});