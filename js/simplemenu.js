"use strict";
$.fn.simplemenu = function(options) {
  // This is the easiest way to have default options.
  var settings = $.extend(
    {
      usingbtn: true,
      custombtnname: "openmenu",
      directorylink: true
    },
    options
  );

  var btnclassname = settings.custombtnname,
    directorylink = settings.directorylink,
    usingbtn = settings.usingbtn;
  
  this.find("a").each(function() {
    //build icon
    if ($(this).siblings("ul").length > 0) {
      $(this)
        .append('<span class="' + btnclassname + '"></span>')
        .parent()
        .addClass("has-submenu");
    }

    //setting event
    $(this)
      .find("." + btnclassname)
      .on("click", function(event) {
        event.preventDefault(); //取消預設事件
        event.stopPropagation(); //終止事件傳導
        
        var _this_parent_li=$(this).parent('a').parent('li');
      
        if(_this_parent_li.hasClass('active')){
          //如果已經展開 轉回關閉 連同子選單一起
          _this_parent_li.removeClass('active').children('ul').slideUp().find('.active').removeClass('active').children('ul').slideUp();
        }else{
          //如果還沒展開 展開這一層
          _this_parent_li.addClass('active').children('ul').slideDown();
          //關閉其他階層的選單
          _this_parent_li.siblings().removeClass('active').children('ul').slideUp().find('.active').removeClass('active').children('ul').slideUp();
        }  
      });
  });

  if (!usingbtn) {
    this.find(".has-submenu").addClass("nobtn");
  }
  if (!directorylink) {
    this.find(".has-submenu").addClass("nodirectorylink");
  }

  // return this;
};