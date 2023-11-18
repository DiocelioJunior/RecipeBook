
// Function to create video cards and append them to the video-lessons div
function createVideoCards(videoAulas) {
    const videoLessonsContainer = document.getElementById("video-lessons");
  
    // Loop through the videoAulas array and create cards
    videoAulas.forEach(video => {
      const card = document.createElement("div");
      card.classList.add("video-card");
  
      const title = document.createElement("h2");
      title.textContent = video.titulo;
  
      const description = document.createElement("p");
      description.textContent = video.descricao;
  
      const videoFrame = document.createElement("iframe");
      videoFrame.style.width = "95%";
      videoFrame.height = "250";
      videoFrame.src = `https://www.youtube.com/embed/${getYouTubeVideoId(video.link)}`;
      videoFrame.frameBorder = "0";
      videoFrame.allowFullscreen = true;
  
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(videoFrame);
      videoLessonsContainer.appendChild(card);
    });
  }
  
  // Function to extract YouTube video ID from a YouTube video link
  function getYouTubeVideoId(url) {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v\/|.*[?&]v=)|.*[?&]vi?=)([^"&?\/\s]*)/);
    return videoIdMatch ? videoIdMatch[1] : '';
  }
  
  // Function to filter videos by type
  function filterVideosByType(videoAulas, selectedType) {
    return videoAulas.filter(video => video.type === selectedType);
  }
  
  // Function to clear existing video cards
  function clearVideoCards() {
    const videoLessonsContainer = document.getElementById("video-lessons");
    videoLessonsContainer.innerHTML = ''; // Clear the content
  }
  
  // Function to fetch and create video cards with a specified type
  function filterVideos(selectedType, buttonElement) {
    // Clear existing video cards
    clearVideoCards();
  
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.filter-container button');
    buttons.forEach(button => button.classList.remove('active'));
  
    // Fetch data from drinks.json
    fetch('drinks.json')
      .then(response => response.json())
      .then(data => {
        const videoAulas = data.videoAulas;
        
        // Check for the 'All' filter or filter by type
        const filteredVideos = selectedType === 'All' ? videoAulas : filterVideosByType(videoAulas, selectedType);
        
        // Call the function to create video cards with the filtered videos
        createVideoCards(filteredVideos);
  
        // Add active class to the clicked button
        buttonElement.classList.add('active');
      })
      .catch(error => console.error('Error fetching drinks.json:', error));
  }
  
  // Function to reset the filter and display all videos
  function resetFilter() {
    // Clear existing video cards
    clearVideoCards();
  
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.filter-container button');
    buttons.forEach(button => button.classList.remove('active'));
  
    // Fetch data from drinks.json
    fetch('drinks.json')
      .then(response => response.json())
      .then(data => {
        const videoAulas = data.videoAulas;
        // Call the function to create video cards with all videos
        createVideoCards(videoAulas);
      })
      .catch(error => console.error('Error fetching drinks.json:', error));
  }
  
  // Fetch data from drinks.json and create video cards with all videos when the page loads
  document.addEventListener('DOMContentLoaded', function() {
    fetch('drinks.json')
      .then(response => response.json())
      .then(data => {
        const videoAulas = data.videoAulas;
        // Call the function to create video cards with all videos
        createVideoCards(videoAulas);
      })
      .catch(error => console.error('Error fetching drinks.json:', error));
  });
  