Module.register("menu_houzeau", {
    // Override the start function to initialize the module
    start: function() {
        // You can initialize variables here if needed
        this.sendSocketNotification('START_MENU_HOUZEAU', {});
    },
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'PYTHON_DATA_MENU_HOUZEAU') {
            console.log("notification de menu_houzeau python");
            let wrapper = document.getElementById('menu_houzeau');
            if (wrapper) {
                console.log("notification de menu_houzeau python 2");
                let html = "";
                html += payload;
                const imagePath = "./modules/menu_houzeau/menu.png";
                
                
                html += `<img src="${imagePath}" alt="Your Image" style="width: 100%; height: 100%;" />`;
                wrapper.innerHTML = html;
            }
        }
    },
    // Function to create the iframe element
    getDom: function() {
        // // Replace "path/to/your/pdf.pdf" with the actual path to your PDF file
        // const pdfPath = "/Users/martinlehouck/developement/Miroir_Projetbac3/MagicMirror/modules/menu_houzeau/menu.pdf";

        // // Create an iframe element to display the PDF
        // const iframe = document.createElement("iframe");
        // iframe.src = `/Users/martinlehouck/developement/Miroir_Projetbac3/MagicMirror/node_modules/pdfjs-4/web/viewer.html?file=${encodeURIComponent(pdfPath)}`;
        // iframe.style.width = "100%";
        // iframe.style.height = "100%";

        // // Create a wrapper and append the iframe to it
        // const wrapper = document.createElement("div");
        // wrapper.appendChild(iframe);

        let wrapper = document.createElement("div");
        wrapper.id = "menu_houzeau";
        // //wrapper.innerHTML = "Exécution du script, veuillez patienter...";
        // let html = "";
        // html += '<h1>Electron PDF.js Desktop PDF Viewer Example</h1>';
		// html += '<canvas id="pdfContainer" />';
		// html += '<script src="./pdf.min.js"></script>';
		// html += '<script src="./renderer.js"></script>';
        // wrapper.innerHTML = html;
        // return wrapper;
        
        wrapper.innerHTML = 'pas encore executé';
        return wrapper; 
    }
});