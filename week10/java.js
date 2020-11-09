        document.addEventListener('click', function (event) {

            // Only run if the clicked link was an accordion toggle
            if ( !event.target.classList.contains('accordion-toggle') ) return;

            // Get the target content
            let content = document.querySelector(event.target.hash);
            if ( !content ) return;

            // Prevent default link behavior
            event.preventDefault();

            // If the content is already expanded, collapse it and quit
            if ( content.classList.contains('active') ) {
                content.classList.remove('active');
                return;
            }

            // Get all accordion content, loop through it, and close it
            let accordions = document.querySelectorAll('.accordion');
            for (let i = 0; i < accordions.length; i++) {
                accordions[i].classList.remove('active');
            }

            // Open our target content area
            content.classList.add('active');

        }, false);
      
        {
            var apiUrl = [];
            apiUrl.push('https://fonts.googleapis.com/css?family=');
            apiUrl.push(anonymousPro.family.replace(/ /g, '+'));
            if (contains('italic', anonymousPro.variants)) {
              apiUrl.push(':');
              apiUrl.push('italic');
            }
            if (contains('greek', anonymousPro.subsets)) {
              apiUrl.push('&subset=');
              apiUrl.push('greek');
            }
            
            // url: 'https://fonts.googleapis.com/css?family=Anonymous+Pro:italic&subset=greek'
            var url = apiUrl.join('');
            
        }


