"use strict";
$.fn.simplemenu = function(options) {
  // This is the easiest way to have default options.
  var settings = $.extend(
    {
      usingbtn: true,
      directorylink: true,
      custombtnname: "openmenu",
      currentcss:'active',
      autoopen:true,
      customicon:'<div class="simplemenu-normal-icon"><span></span><span></span></div>'
    },
    options
  );

  var btnclassname = settings.custombtnname,
      directorylink = settings.directorylink,
      usingbtn = settings.usingbtn,
      currentcss = settings.currentcss,
      autoopen= settings.autoopen,
      customicon= settings.customicon;

  
  this.find("a").each(function() {
    //build icon
    if ($(this).siblings("ul").length > 0) {
      $(this)
        .append('<span class="' + btnclassname + '">'+customicon+'</span>')
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
      
        if(_this_parent_li.hasClass(currentcss)){
          //如果已經展開 轉回關閉 連同子選單一起
          _this_parent_li.removeClass(currentcss).children('ul').slideUp().find('.'+currentcss).removeClass(currentcss).children('ul').slideUp();
        }else{
          //如果還沒展開 展開這一層
          _this_parent_li.addClass(currentcss).children('ul').slideDown();
          //關閉其他階層的選單
          _this_parent_li.siblings().removeClass(currentcss).children('ul').slideUp().find('.'+currentcss).removeClass(currentcss).children('ul').slideUp();
        }  
      });
  });

  if (!usingbtn) {
    this.find(".has-submenu").addClass("nobtn");
  }
  if (!directorylink) {
    this.find(".has-submenu").addClass("nodirectorylink");
  }
  
  //載入時預設展開currentcss下的ul
  if(autoopen){
    this.find('.'+currentcss).children('ul').slideDown();
  }

  // return this;
};