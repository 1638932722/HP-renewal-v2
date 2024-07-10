// ローディングアニメーション、テキストアニメーション
document.addEventListener("DOMContentLoaded", function() {
  window.onload = function() {
  // ローディングアニメーション
    let loadingScreen = document.getElementById('loading-screen');
    let mainContent = document.getElementById('main-content');
    loadingScreen.style.opacity = 0;
    loadingScreen.addEventListener('transitionend', function() {
      loadingScreen.style.display = 'none';
    });
    mainContent.style.display = 'block';
    mainContent.style.opacity = 1; 

  // テキストアニメーション
  // 拆分字符用span包裹
       function wrapTextNodes(node) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
            const parent = node.parentNode;
            const text = node.textContent;
            const fragment = document.createDocumentFragment();
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.position = 'relative';
                fragment.appendChild(span);
            });
            parent.replaceChild(fragment, node);
        } else {
            Array.from(node.childNodes).forEach(child => wrapTextNodes(child));
        }
    }

    // 处理所有 .textanimation 元素
    document.querySelectorAll('.textanimation').forEach(textElement => {
        wrapTextNodes(textElement);

        // 初始化字符位置(随机)
        gsap.set(textElement.querySelectorAll('span'), {
            x: () => Math.random() * 400 - 200, // -200 ~ 200
            y: () => Math.random() * 400 - 200, // -200 ~ 200
            opacity: 0
        });

        // Y轴浮现
        const splitTimeline = gsap.timeline({ paused: true });
        splitTimeline.to(textElement.querySelectorAll('span'), {
            x: 0,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out'
        });

        // 指定视窗口
        function handleTextAnimation(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    splitTimeline.play(); // 入视口时播放动画
                    observer.unobserve(entry.target); // 停止观察
                }
            });
        }

        // 50%可见时触发
        const textAnimationObserver = new IntersectionObserver(handleTextAnimation, {
            threshold: 0.5
        });

        // 观察当前 textanimation 元素
        textAnimationObserver.observe(textElement);
    });
    
  // アニメーション　FadeInUp
    ScrollReveal().reveal('.timeline-item', { 
        distance: '100px',
        duration: 1000,
        easing: 'ease-in-out',
        origin: 'bottom',
        viewFactor: 0.2
    });

    //ネットワーク数字アニメーション
    $(document).ready(function(){
      $('.odometer').each(function() {
          let odometer = new Odometer({
              el: this,
              value: 0,
              theme: 'minimal',
              duration: 3000
          });
          $(this).data('odometerInstance', odometer);
      });

      function handleIntersection(entries, observer) {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.style.visibility = 'visible';
                  entry.target.classList.add('animated', 'fadeIn');

                  // 获取并设置新的值以触发 odometer 动画
                  let value = $(entry.target).data('value');
                  $(entry.target).data('odometerInstance').update(value);

                  // 停止观察已触发动画的元素
                  observer.unobserve(entry.target);
              }
          });
      }
      let observer = new IntersectionObserver(handleIntersection, {
          threshold: 0.5 // 元素至少有50%可见时触发
      });

      let targets = document.querySelectorAll('.odometer');
      targets.forEach(target => {
          observer.observe(target);
      });
    });

    
  };
});


//ナビゲーションバー色変化
$(document).ready(function () {
  let $navbar = $('.navbar');
  let $inquiryBtn = $('.inquiry-btn');
  let $logoText = $('.nav-logo-text');
  let $heroBg = $('.hero-bg');

  function onScroll() {
    if ($(window).scrollTop() > $heroBg.height() -200) {
      $navbar.addClass('scrolled');
      $inquiryBtn.addClass('scrolled');
      $logoText.addClass('scrolled');
    } else {
      $navbar.removeClass('scrolled');
      $inquiryBtn.removeClass('scrolled');
      $logoText.removeClass('scrolled');
    }
  }

  $(window).on('scroll', onScroll);
});

//メリットカードカルーセル
$(document).ready(function(){
  $('.merit-carousel').owlCarousel({
    items: 1,
    loop: false ,
    nav: false,
    dots: false,
    margin:100,
    center: true,
    slideSpeed : 200,
    responsive: {
      0: {
        mergeFit:true,
        items: 1
      },
      768: {
        mergeFit:true,
        items: 1
      }
    }
});


$('.owl-nav-prev').click(function() {
  $('.merit-carousel').trigger('prev.owl.carousel');
});

$('.owl-nav-next').click(function() {
  $('.merit-carousel').trigger('next.owl.carousel');
});
});

  //ボタンアニメーション
  $(document).ready(function() {
    $(".button_su_inner").mouseenter(function(e) {
        let parentOffset = $(this).offset(); 
        let relX = e.pageX - parentOffset.left;
        let relY = e.pageY - parentOffset.top;
        $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
        $(this).prev(".su_button_circle").removeClass("desplode-circle");
        $(this).prev(".su_button_circle").addClass("explode-circle");
    });

    $(".button_su_inner").mouseleave(function(e) {
        let parentOffset = $(this).offset(); 
        let relX = e.pageX - parentOffset.left;
        let relY = e.pageY - parentOffset.top;
        $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
        $(this).prev(".su_button_circle").removeClass("explode-circle");
        $(this).prev(".su_button_circle").addClass("desplode-circle");
    });
});
