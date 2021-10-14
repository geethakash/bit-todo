<script>
</script>

<div class="flex w-full h-full items-center justify-center z-10">
  <img class="loader" src="./assets/img/Loading.png" alt="Loading..." />
</div>

<style>
  .loader { 
    transform: scale(0.5);
    width: 150px;
    height: 150px;
    animation: mymove 5s infinite;
   
  }

  @keyframes mymove {
    25% {
      transform: rotate(50deg);
      background-color:#8a1ee2 ;
      border-radius:30%;

    }
    50% {
      transform: rotate(180deg);
      background-color:#8a1ee2 ;
      border-radius: 50%;
    }
    75% {
     transform: rotate(1200deg);
     border-radius: 30%;
    }


  }
</style>
