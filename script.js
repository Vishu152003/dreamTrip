    

    class ImageSlider {
  constructor() {
    // DOM elements
    this.sliderContainer = document.getElementById('sliderContainer');
    this.sliderWrapper = document.getElementById('sliderWrapper');
    this.slides = this.sliderWrapper.querySelectorAll('.slide');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.dotsContainer = document.getElementById('dotsContainer');

    // state
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    this.createDots();
    this.updateSlider();

    // events
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());

    // autoplay
    this.startAutoPlay();

    // pause on hover over whole slider container
    this.sliderContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());

    // keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });

    // touch events
    this.setupTouchEvents();
  }

  createDots() {
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === this.currentSlide) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  updateSlider() {
    const offset = -this.currentSlide * 100;
    this.sliderWrapper.style.transform = `translateX(${offset}%)`;

    const dots = this.dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === this.currentSlide));
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  }

  goToSlide(index) {
    if (index < 0 || index >= this.totalSlides) return;
    this.currentSlide = index;
    this.updateSlider();
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 4000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  setupTouchEvents() {
    this.sliderWrapper.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.sliderWrapper.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) this.nextSlide();
      else this.prevSlide();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ImageSlider();
});



   
      $(".start-btn").click(function() {
        $("#overlay").addClass("active");
        $("#formSection").removeClass("hidden").addClass("show");
      });

      $("#overlay").click(function() {
        $(this).removeClass("active");
        $("#formSection").removeClass("show").addClass("hidden");
      });

      $("#budget").on("input", function() {
        $("#budgetValue").text("₹" + parseInt($(this).val()).toLocaleString());
      });
    
      const faqs = document.querySelectorAll('.faq-box');
faqs.forEach(faq => {
faq.addEventListener('click', () => {
faq.classList.toggle('active');
});
});
      
const backtotop=document.getElementById('backtotop');
window.addEventListener("scroll",()=>{
  if(window.scrollY>200){
    backtotop.style.display="block";
  }
  else{
    backtotop.style.display="none";
  }
})      

backtotop.addEventListener("click",()=>{
    window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
const formSection = document.getElementById("formSection");
const blurBg = document.getElementById("blurBg");

// Show form
function showForm() {
    formSection.classList.add("show");
    blurBg.classList.add("active");
}

// Hide form
function hideForm() {
    formSection.classList.remove("show");
    blurBg.classList.remove("active");
}

// Event delegation for all clicks
document.addEventListener("click", function(e) {
    // Any "Start Planning" button, even if dynamically created/cloned
    if (e.target.closest('.start-btn')) {
        showForm();
    }

    // Any close button
    if (e.target.closest('.tog')) {
        hideForm();
    }
});

// Clicking overlay closes form
blurBg.addEventListener("click", hideForm);




  const themeBtn=document.getElementById("themeToggle");

  if(localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark");
    themeBtn.classList.replace("fa-sun", "fa-moon");
  }

  themeBtn.addEventListener('click',()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
      themeBtn.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme","dark");
    }
    else{
      themeBtn.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme","light");
    }

  });
const interestButtons = document.querySelectorAll(".interest-btn");
let selectedInterests = [];

interestButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("selected");

    const interest = btn.textContent;

    if (btn.classList.contains("selected")) {
      selectedInterests.push(interest);
    } else {
      selectedInterests = selectedInterests.filter(item => item !== interest);
    }

    console.log("Selected Interests:", selectedInterests);
  });
});


// Add this to your existing script.js file

// Form submission handler
 $("#travelForm").submit(function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        destination: $("#destination").val(),
        duration: $("#duration").val(),
        travelers: $("#travelers").val(),
        season: $("#season").val(),
        interests: selectedInterests,
        budget: $("#budget").val()
    };
    
    // Validate form
    if (!formData.destination || !formData.duration || !formData.travelers || !formData.season || selectedInterests.length === 0) {
        showToast("Please fill all required fields and select at least one interest");
        return;
    }
    
    // Store form data in sessionStorage
    sessionStorage.setItem('destination', formData.destination);
    sessionStorage.setItem('duration', formData.duration);
    sessionStorage.setItem('travelers', formData.travelers);
    sessionStorage.setItem('season', formData.season);
    sessionStorage.setItem('interests', formData.interests.join(','));
    sessionStorage.setItem('budget', formData.budget);
    
    // Close the form
    formSection.classList.add("hidden");
    blurBg.classList.add("hidden");
    
    // Redirect to travel plan page
    window.location.href = 'travel-plan.html';
});

// Toast notification function
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Style the toast
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.backgroundColor = '#1b3da0';
    toast.style.color = 'white';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '10px';
    toast.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    toast.style.zIndex = '1001';
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.3s ease';
    
    // Show the toast
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 100);
    
    // Hide the toast after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// ⭐ Full website parallax effect
window.addEventListener("scroll", function () {
  let scrolled = window.pageYOffset;

  document.querySelectorAll(".parallax-global").forEach((layer) => {
    let speed = layer.getAttribute("data-speed");
    layer.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// window.addEventListener("scroll", function () {
//   let scrolled = window.pageYOffset;

//   document.querySelectorAll(".parallax-global").forEach((layer) => {
//     let speed = layer.getAttribute("data-speed");
//     layer.style.backgroundPositionY = -(scrolled * speed) + "px";
//   });
// });


const aboutElements = document.querySelectorAll('.about-section, .about-img');

function revealOnScroll() {
  aboutElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".feature-card").forEach((card) => {
  observer.observe(card);
});

 

document.querySelectorAll("[data-tilt]").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    let rect = card.getBoundingClientRect();
    let x = e.clientX - rect.left - rect.width / 2;
    let y = e.clientY - rect.top - rect.height / 2;

    card.style.transform =
      `rotateX(${ -y / 20 }deg) rotateY(${ x / 20 }deg) scale(1.06)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });
});
