window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    //// remove useless code of initializing the bulma carousel.
    // var options = {
		// 	slidesToScroll: 1,
		// 	slidesToShow: 3.3,
		// 	loop: true,
		// 	infinite: true,
		// 	autoplay: false,
		// 	autoplaySpeed: 3000,
    // }


    

})


// switch video in multiple morphology
function update_rm2d_comp_multiH() {
  var num_rollouts = document.getElementById("rm2d-comp-multi-h-1").value;
  // var inst = document.getElementById("single-menu-instances-single-task-real").value;
  // console.log("gpt", task, inst)

  var predv_video = document.getElementById("lb_qual_nVidEp_predv");
  var r_video = document.getElementById("lb_qual_nVidEp_rollout");

  r_video.src = "materials/lb-suc-vs-numRollout/rollout_tk71_envSd120_fps60_r" + num_rollouts + ".mp4";

  // video.playbackRate = 2.0;
  r_video.play();
  // playVideosSequentially([predv_video, r_video])

}


// Function for the Calvin qualitative dropdown list
function update_cal_our_qual_list() {
  var tk_name = document.getElementById("cal-our-qual-list").value;

  predv_path = "materials/calvin/ours-turn-on-lightbulb/predv_0_tk1_turn_on_lightbulb_envSd105_fps4.mp4"
  r_path = "materials/calvin/ours-turn-on-lightbulb/rollout_tk1_turn_on_lightbulb_envSd105_fps70.mp4"
  if (tk_name == 'lightbulb') {

  } else if (tk_name == 'led') {
    predv_path = "materials/calvin/ours-turn-on-led/predv_0_tk2_turn_on_led_envSd101_fps4.mp4"
    r_path = "materials/calvin/ours-turn-on-led/rollout_tk2_turn_on_led_envSd101_fps70.mp4"
  }
  else if (tk_name == 'slider') {
    predv_path = "materials/calvin/ours-slide-left/predv_0_tk0_move_slider_left_envSd101_fps4.mp4"
    r_path = "materials/calvin/ours-slide-left/rollout_tk0_move_slider_left_envSd101_fps70.mp4"
  }
  else if (tk_name == 'drawer') {
    predv_path = "materials/calvin/ours-open-drawer/predv_0_tk3_open_drawer_envSd101_fps4.mp4"
    r_path = "materials/calvin/ours-open-drawer/rollout_tk3_open_drawer_envSd101_fps70.mp4"
  }
  r_video = document.getElementById("cal-our-qual-list-rollout");
  r_video.src = r_path
  predv_video = document.getElementById("cal-our-qual-list-predv");
  predv_video.src = predv_path

  predv_video.currentTime = 0;
  r_video.currentTime = 0;
  predv_video.pause();
  r_video.pause();

  // r_video.play();
  // predv_video.play();
  playVideosSequentially([predv_video, r_video])

}

function playVideosSequentially(videoList) {

  let currentVideoIndex = 0;

  // Function to play the next video
  function playNextVideo() {
    if (currentVideoIndex < videoList.length - 1) {
      videoList[currentVideoIndex+1].play()
      currentVideoIndex++;
    } else {
      // All videos have been played
      console.log('All videos have been played.');
      // Optionally, remove the event listener if no longer needed
      videoList[currentVideoIndex].removeEventListener('ended', playNextVideo);
    }
  }
  // start the first video, add listen to catch the end of the first video
  for (let i = 0; i < videoList.length; i++) {
    videoList[i].addEventListener('ended', playNextVideo);
  }
  videoList[0].play()

}



// function playVideosSequentially(videoList) {
//   // const videoPlayer = document.getElementById('videoPlayer');
//   let currentVideoIndex = 0;

//   // Function to play the next video
//   function playNextVideo() {
//     if (currentVideoIndex < videoList.length) {
//       videoList[currentVideoIndex].play();
//       currentVideoIndex++;
//     } else {
//       // All videos have been played
//       console.log('All videos have been played.');
//       // Optionally, remove the event listener if no longer needed
//       // videoPlayer.removeEventListener('ended', playNextVideo);
//     }
//   }

//   // Event listener for when the current video ends
//   videoPlayer.addEventListener('ended', playNextVideo);

//   // Start playing the first video
//   playNextVideo();
// }


// ===========================
// Nov 5
// ===========================

// document.addEventListener('DOMContentLoaded', () => {
//   // Select all replay buttons
//   const replayButtons = document.querySelectorAll('.replay-button');

//   // Attach click event listeners to each button
//   replayButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       const sectionId = button.getAttribute('data-section');
//       replayVideosInDiv(sectionId);
//     });
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  // Select all replay buttons
  // const replayButtons = document.querySelectorAll('.replay');
  // const replayButtons = document.querySelectorAll('.replay, .replay_lb_suc');
  replayButtons = document.querySelectorAll('.replay, .replay_lb_suc');
  // replayButtons = document.querySelectorAll('.replay_lb_suc');

  rm_id = 'btn_cal_replay'
  replayButtons = Array.from(replayButtons).filter(button => button.id !== rm_id);

  // replayButtons.concat(replayButtons_2)
  // const array1 = Array.from(replayButtons);
  // const array2 = Array.from(replayButtons_2);
  // Concatenate the arrays
  // replayButtons = array1.concat(array2);
  console.log('replayButtons', replayButtons)

  // Attach click event listeners to each button
  replayButtons.forEach(button => {
    button.addEventListener('click', () => {
      const sectionId = button.getAttribute('video_section');
      replayVideosInDiv(sectionId, 'parallel');
    });
  });

  btn_2 = document.getElementById('btn_cal_replay');
  // btn_2.removeEventListener('click');
  console.log(`btn_2: ${btn_2}`)

  btn_2.addEventListener('click', () => {
    const sectionId = btn_2.getAttribute('video_section');
    replayVideosInDiv(sectionId, 'seq');
  });

  // replayButtons_2
  // replayButtons_2.forEach(button => {
  //   btn_2.removeEventListener('click');
  //   // button.addEventListener('click', () => {
  //   //   const sectionId = button.getAttribute('video_section');
  //   //   replayVideosInDiv(sectionId, 'seq');
  //   // });
  // });

});


/**
 * Replays all video elements within a specified div.
 * @param {string} divId - The ID of the div containing the videos to replay.
 */
function replayVideosInDiv(divId, replay_type) {
  const div = document.getElementById(divId);
  
  console.log(`divId: ${divId}, ${div} `);

  if (!div) {
    console.log(`Div with ID '${divId}'.`);
    return;
  }

  const videos = div.querySelectorAll('video');

  console.log(`video elements found within div '${divId}: ${div}, ${videos.length}'.`);

  if (videos.length === 0) {
    console.warn(`No video elements found within div '${divId}'.`);
    return;
  }

  if (replay_type == 'parallel'){
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0;
      video.play();
    });
  }
  else if (replay_type == 'seq'){
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0;
    });
    playVideosSequentially(videos)
  }
  else {
    console.error("Not Implemented.");
  }

  console.log(` ${divId}: ${videos[0].currentSrc}, ${videos[0].currentTime}. `);

  

  // videos[0].play().catch(error => {
  //   console.error("Autoplay prevented:", error);
  // });

}



// ============================
// Nov 6
// ============================

// sequentially play the video
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the sequential video playback
  setupSequentialVideos({
    containerId: 'div_cal_our_qual',
    videoIds: ['cal-our-qual-list-predv', 'cal-our-qual-list-rollout'],
    threshold: 0.99, // The fraction of the container that must be visible to trigger playback
    unmuteOnInteraction: true, // Unmute videos after user interaction (click)
  });

  setupSequentialVideos({
    containerId: 'div_lb_qual_rout',
    videoIds: ['lb_qual_nVidEp_predv', 'lb_qual_nVidEp_rollout'],
    threshold: 0.99, // The fraction of the container that must be visible to trigger playback
    unmuteOnInteraction: true, // Unmute videos after user interaction (click)
  });

});



/**
 * Sets up videos to play sequentially when their container scrolls into view.
 *
 * @param {Object} options - Configuration options.
 * @param {string} options.containerId - The ID of the video container element.
 * @param {string[]} options.videoIds - An array of video element IDs in the order they should play.
 * @param {number} [options.threshold=0.5] - Visibility threshold (0 to 1) to trigger playback.
 * @param {boolean} [options.unmuteOnInteraction=false] - Whether to unmute videos after user interaction.
 */
function setupSequentialVideos(options) {
  const {
    containerId,
    videoIds,
    threshold = 0.5,
    unmuteOnInteraction = false,
  } = options;

  const videoContainer = document.getElementById(containerId);
  if (!videoContainer) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  const videos = videoIds.map(id => {
    const video = document.getElementById(id);
    if (!video) {
      console.error(`Video element with ID "${id}" not found.`);
    }
    return video;
  }).filter(video => video !== undefined);

  if (videos.length === 0) {
    console.error('No valid video elements found.');
    return;
  }

  let videosPlayed = false;

  /**
   * Plays the videos sequentially.
   */
  function playVideosSequentially() {
    if (videosPlayed) return;
    videosPlayed = true;

    let currentIndex = 0;

    /**
     * Plays the next video in the sequence.
     */
    function playNextVideo() {
      if (currentIndex >= videos.length) {
        // All videos have been played
        return;
      }
      const currentVideo = videos[currentIndex];
      currentVideo.play();

      currentVideo.addEventListener('ended', function onVideoEnded() {
        currentVideo.removeEventListener('ended', onVideoEnded);
        currentIndex++;
        playNextVideo();
      });
    }

    playNextVideo();
  }

  // Set up Intersection Observer to detect when the container is in view
  const observerOptions = {
    root: null,
    threshold: threshold,
  };

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        playVideosSequentially();
        observerInstance.disconnect(); // Stop observing after playback starts
      }
    });
  }, observerOptions);

  // observer.observe(videoContainer);
  observer.observe(videos[0]); // Nov 7 Luo


  // Optional: Unmute videos after user interaction
  if (unmuteOnInteraction) {
    function unmuteVideos() {
      videos.forEach(video => {
        video.muted = false;
      });
      document.removeEventListener('click', unmuteVideos);
    }
    document.addEventListener('click', unmuteVideos);
  }
}