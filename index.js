document.addEventListener("DOMContentLoaded", function () {
  const inputTitle = document.getElementById("inp");
  const inputBut = document.getElementById("sub");

  function getMovieTitle() {
    event.preventDefault();
    const xhr = new XMLHttpRequest();

    const title = inputTitle.value;

    xhr.open("GET", `https://www.omdbapi.com/?t=${title}&apikey=b7bc9e56`);

    xhr.send();

    xhr.onload = function () {
      if (xhr.status === 200) {
        const movieTitle = document.getElementById("movieTitle");
        const releaseDate = document.getElementById("releaseDate");
        const plotSummary = document.getElementById("plotSummary");

        const image = document.getElementById("image");

        const { Title } = JSON.parse(xhr.responseText);
        const { Released } = JSON.parse(xhr.responseText);
        const { Plot } = JSON.parse(xhr.responseText);
        const { Poster } = JSON.parse(xhr.responseText);

        if (Title === undefined) {
          movieTitle.innerHTML = "MOVIE NOT FOUND";
          releaseDate.innerHTML = "";
          plotSummary.innerHTML = "";
          image.src = "";
        } else {
          movieTitle.innerHTML = "The title: " + Title;
          releaseDate.innerHTML = "The released date: " + Released;
          plotSummary.innerHTML = "The plot summary: " + Plot;
          image.src = Poster;
          inputTitle.value = "";
        }
      }
    };
  }
  inputTitle.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      if (inputTitle.value.trim() !== "") {
        getMovieTitle();
      }
    }
  });

  inputBut.addEventListener("click", function (e) {
    if (inputTitle.value.trim() !== "") {
      getMovieTitle();
    }
  });
});
