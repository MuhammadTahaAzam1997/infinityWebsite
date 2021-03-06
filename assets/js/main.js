function owl_carusel(divclass) {
    jQuery("."+divclass).owlCarousel({
      autoplay: false,
      lazyLoad: true,
      loop: true,
      margin: 0,
      pagination: false,
       /*
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      */
      responsiveClass: true,
      autoHeight: true,
      autoplayTimeout: 7000,
      smartSpeed: 800,
      navigation: true,
      navigationText: [
        "<i class='fa fa-chevron-left'></i>",
        "<i class='fa fa-chevron-right'></i>"
      ],
      nav: false,
      responsive: {
        0: {
          items: 1
        },

        600: {
          items: 1
        },

        800: {
          items: 2
        },
        1000: {
          items: 3
        },
        1200: {
          items: 5
        }
      }
    });
  }
  function reinit_owl_carusel(divclass) {
    jQuery("."+divclass).data('owlCarousel').reinit();
  }
   function mobile_carusel(divclass) {
    jQuery("."+divclass).owlCarousel({
      autoplay: false,
      lazyLoad: true,
      loop: true,
      margin: 0,
      items: 5,
       /*
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      */
      responsiveClass: true,
      autoHeight: true,
      autoplayTimeout: 7000,
      smartSpeed: 800,
      navigation: true,
      navigationText: [
        "<i class='fa fa-chevron-left'></i>",
        "<i class='fa fa-chevron-right'></i>"
      ],
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        767: {
          items: 5
        },
        992: {
          items: 5
        }
      }
    });
  }
  function season_counter() {
    var con = 1;
    var total = $('.chapter-item--duration').length
    $('.chapter-item--duration').each(function() {
      var number = (con <= 9) ? '0'+con : con;
      var total_number = (total <= 9) ? '0'+total : total;
      $(this).after('<div class="season-counter"><span class="episode-index">'+number+' </span><span class="episode-total">/'+total_number+'</span></div>')
      con++;
    })
  }
  function run_counter_frame() {
    setInterval(function() {
      $('.next-page-container').show()
      var con = 0;
      $('#program-page').contents().find('.chapter-item').each(function() {
        con++;
        if ($(this).hasClass('chapter-item-active')) {
          var number = (con <= 9) ? '0'+con : con;
          if (con == $('#program-page').contents().find('.chapter-item').length) {
            $('.next-page-container').hide()
          }
          $('.episode-span-container:visible .episode-count').text(number)
        }
      })
    }, 3000)
  }
  //Equal height function
  function equalheight(container) {
      var currentTallest = 0,
          currentRowStart = 0,
          rowDivs = new Array(),
          $el, topPosition = 0;
      jQuery(container).each(function () {
          $el = jQuery(this);
          jQuery($el).height('auto')
          topPostion = $el.position().top;
          if (currentRowStart != topPostion) {
              for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                  rowDivs[currentDiv].height(currentTallest);
              }
              rowDivs.length = 0;
              currentRowStart = topPostion;
              currentTallest = $el.height();
              rowDivs.push($el);
          } else {
              rowDivs.push($el);
              currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
          }
          for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
              rowDivs[currentDiv].height(currentTallest);
          }
      });
  }

  $(document).ready(function() {
    //Setting  Boxes Height
    equalheight('.video_carusel .card .card-body ');
    $('#season_select').change(function() {
      var id = $(this).val()
      $('.season_detail').hide()
      $('.season_'+id).show()
      if ($(window).width < 768) {
        $('.season_para_detail').hide()
        $('.season_para_'+id).show()
      }
    })

    $('.program-btn').click(function() {
      $('.loader_wrapper').show()
      var url = $(this).attr('data-url')
      var key = $(this).attr('data-key')
      var title = $(this).attr('data-title')
      var number = (key <= 9) ? '0'+key : key;

      //title_html += '</div>';
      $('.episode-span-container:visible .episode-count').text(number)
      var title_html = '<div class="col-sm-1 col-4 episode-box-1">';
      title_html += $('.episode-box-1.popup').html();
      title_html += '</div>';
      title_html += '<div class="vline"> </div>';
      title_html += '<div class="col-sm-3  col-6 episode-box-2">';
      title_html += $('.episode-box-2').html()
      title_html += '</div>';
      $('#program-page').attr('src', url)
      $('#program-page').load(function () {
          setTimeout(function() {
            $('#program-page').height($('#program-page').contents().height());
            var deviceAgent = navigator.userAgent.toLowerCase();
      var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
      if (agentID) {

          $('#program-page').contents().find('html, .dark').width($('#program-page').width() - 65)

      }

            if (key == 1) {
              $('#program-page').contents().find('.chapter-sidebar .chapter-item').first().find('*').trigger('click')
            }
            else{
              $('#program-page').contents().find('.chapter-sidebar .chapter-item:eq('+(key - 1)+') *').trigger('click')
            }
            $('#program-page').contents().find('.chapter-sidebar .chapter-item').parent().addClass('item')
            owl_carusel('chapter-sidebar')
            $('#program-page').contents().find('.cbt-header').addClass('col-md-12 row')
            //$('#program-page').contents().find('.cbt-header').parent().addClass('col-md-12 row')
            $('#program-page').contents().find('.cbt-header').html(title_html)
            run_counter_frame()
            $('.loader_wrapper').hide()
            //season_counter()
            dataLayer.push({
              'event' : 'Video',
              'eventCategory' : 'Home Slider',
              'eventAction' : 'Play',
              'eventLabel' : 'Start',
              'eventValue' : (title) ? title : 1
              });
          }, 1500)
      });
    })
    $('.remove-frame').click(function() {
      $('#program-page').attr('src', '')
    })
    $("#videomodal").on('hide.bs.modal', function () {
      $('#program-page').attr('src', '')
      $('.page').removeClass('bg-blur');
    });
    $("#videomodal").on('show.bs.modal', function () {
        $('.page').addClass('bg-blur');
      });
    $('.next-page-container').click(function() {
      var con = 0;
      var active = 0;
      $('#program-page').contents().find('.chapter-item').each(function() {
        con++;
        if ($(this).hasClass('chapter-item-active')) {
          active = con;
          $('#program-page').contents().find('.chapter-sidebar .chapter-item:eq('+active+') *').trigger('click')
        }
      })
      //$('#program-page').contents().find('.chapter-sidebar .chapter-item-active.chapter-item').next('.chapter-item').find('*').trigger('click')
    })
    owl_carusel('video_carusel')
  })


  function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("mySidenav").style.display = "block";

  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.display = "none";
  }


window.addEventListener('orientationchange', function() {

    reinit_owl_carusel("video_carusel")
    owl_carusel('chapter-sidebar')
    console.log('Orientation changed')
})