document.addEventListener("DOMContentLoaded", () => {
    const memeImage = document.getElementById("memeImage");
    const getMemeBtn = document.getElementById("getMeme");
    const downloadMemeBtn = document.getElementById("downloadMeme");
    const shareMemeBtn = document.getElementById("shareMeme");
    const saveMemeBtn = document.getElementById("saveMeme");
    const captionInput = document.getElementById("captionInput");
    const savedMemesDiv = document.getElementById("savedMemes");
    const toggleModeBtn = document.getElementById("toggleMode");

    let currentMemeUrl = "";

    toggleModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    function fetchMeme() {
        fetch("https://meme-api.com/gimme")
            .then(response => response.json())
            .then(data => {
                currentMemeUrl = data.url;
                memeImage.src = currentMemeUrl;
                captionInput.value = "";
            })
            .catch(error => console.error("Error fetching meme:", error));
    }

    getMemeBtn.addEventListener("click", fetchMeme);

    downloadMemeBtn.addEventListener("click", () => {
        const link = document.createElement("a");
        link.href = currentMemeUrl;
        link.download = "meme.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    shareMemeBtn.addEventListener("click", () => {
        const shareText = `Check out this meme! 😂 ${currentMemeUrl}`;
        if (navigator.share) {
            navigator.share({
                title: "Funny Meme",
                text: shareText,
                url: currentMemeUrl
            });
        } else {
            alert("Sharing not supported on this browser.");
        }
    });

    saveMemeBtn.addEventListener("click", () => {
        if (!currentMemeUrl) return;
        
        const memeDiv = document.createElement("div");
        memeDiv.classList.add("saved-meme");
        
        const img = document.createElement("img");
        img.src = currentMemeUrl;
        img.style.width = "80px";
        
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.onclick = () => memeDiv.remove();
        
        memeDiv.appendChild(img);
        memeDiv.appendChild(removeBtn);
        savedMemesDiv.appendChild(memeDiv);
    });

    fetchMeme();
});
