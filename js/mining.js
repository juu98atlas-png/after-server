const mineBtn = document.getElementById("mineBtn");

mineBtn.addEventListener("click", () => {
  if(currentUser){
    const gain = Math.floor(Math.random() * 12) + 6;
    currentUser.xp += gain;

    if(Math.random() < 0.35){
      currentUser.coins++;
    }

    if(currentUser.xp >= 100){
      currentUser.xp -= 100;
      currentUser.level++;
    }

    updateProfile();
  }
});

const buyArtifactBtn = document.getElementById("buyArtifact");
buyArtifactBtn.addEventListener("click", () => {
  window.open("https://jlfactoryswoadlyers.blogspot.com","_blank");
});
