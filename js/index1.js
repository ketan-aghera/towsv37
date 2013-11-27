var nvBusiId="";

var userSessionId="";

var myAddress = "";

var nvAddSt = "";

var nvFullAdd = "";

var BidEndbtn = "Bidding has ended";

var BidDecTxt = "You declined to quote";

var SelBtnTxt = "You have been selected. Payment has been processed";

var NotSelBtnTxt = "You have not been selected. The job has been assigned to someone else";

var BidRecBtnTxt = "Your quote has been recorded";

var userhasnotmodetxt = "User has not made a selection";

var ShowLargeTxtBtn = "Show larger map";

var JobComBtnTxt = "Job Completed";

var AnothBidSel ="Another quote has already been selected";

var map;

var directionsDisplay;

var directionsService = new google.maps.DirectionsService();

var geocoder = new google.maps.Geocoder();

var geocoder;

var centerChangedLast;

var reverseGeocodedLast;

var currentReverseGeocodeResponse;

var infowindow;

geocoder = new google.maps.Geocoder();

infoWindow = new google.maps.InfoWindow({
                                        
                                        maxWidth: 200
                                        
                                        });



var image = new google.maps.MarkerImage('http://towchoice.com/quotes/images/bluedot_retina.png',                                        null, // size
                                        
                                        null, // origin
                                        
                                        new google.maps.Point( 8, 8 ), // anchor (move to center of marker)
                                        
                                        new google.maps.Size( 17, 17 ) // scaled size (required for Retina display icon)
                                        
                                        );



var track_click = 1;




var nvHostName = location.host;
if(nvHostName=="localhost")
{
	var Url = "http://localhost/tests.towchoice/sautotestv26.php";
	var LMUrl = "http://localhost/tests.towchoice/moreload.php";
	var pushUrl = "";
}
else
{
	if(nvHostName=="towchoice.com")
	{
		var Url = "http://towchoice.com/test/sautotestv26.php";
		var LMUrl = "http://towchoice.com/test/moreload.php";
		var pushUrl = "http://towchoice.com/test/pushnoti/examples/php/notify.php";
	}
	else
	{
		/*var Url = "http://www.towchoice.com/test/sautotestv14.php";
		var pushUrl = "http://www.towchoice.com/test/pushnoti/examples/php/notify.php";*/
		var newURL = window.location.host + "" + window.location.pathname+ ""+ window.location.hash;
		var newURL = newURL.replace("www.","");
		window.location = 'http://'+newURL+'';
	}
}

$(document).ready(function () {
                  
                  createDatabase();
                  
                  //Getcountrieslistfunc();
                  
                  $.mobile.orientationChangeEnabled = false;
                  
                  $.mobile.page.prototype.options.domCache = false;
                  
                  $.mobile.defaultPageTransition = "slide";
                  
                  $.mobile.useFastClick  = false;
                  
                  getcountrycodefunc();
                  
                  $("#load_more_button").hide();
                  
                  });



$(function(){
  
  var pusher = new Pusher('adce6a8be1858ef1d3b2');
  
  var channel = pusher.subscribe('test_channel');
  
  var notifier = new PusherNotifier(channel);
  
  pusher.connection.bind('state_change', function(states) {
                         if(states.current=="connecting")
                         {
                         var lasthelpId = $("#LastUpHelpList").html();
                         FetchHelpRequestFunLastUpd(lasthelpId,"");
                         
                         var lastId = $("#LastUpSelJobId").html();
                         GetSerProListOfJobsLastUpdFun(lastId);
                         
                         }
                         });
  
  
  
  $.mobile.orientationChangeEnabled = false;
  
  $.mobile.page.prototype.options.domCache = false;
  
  $.mobile.defaultPageTransition = "slide";
  
  $.mobile.useFastClick  = false;
  
  
  
  $(".version").html("Test.37");
  $("#loginversion").val("Test.37");
  $("#regversion").val("Test.37");
  
  
  
  $('#SerProHelpReqButtonP1').tap(function(){
                                  
                                  var lastId = $("#LastUpHelpList").html();
                                  
                                  FetchHelpRequestFunLastUpd(lastId,"");
                                  
                                  });
  
  
  
  
  
  $('#SerProHelpReqButtonP2').tap(function(){
                                  
                                  var lastId = $("#LastUpHelpList").html();
                                  
                                  FetchHelpRequestFunLastUpd(lastId,"");
                                  
                                  });
  
  
  
  $('#serProListOfJobsP1').tap(function(){
                               
                               var lastId = $("#LastUpSelJobId").html();
                               
                               GetSerProListOfJobsLastUpdFun(lastId);
                               
                               });
  
  
  
  $('#serProListOfJobsP2').tap(function(){
                               
                               var lastId = $("#LastUpSelJobId").html();
                               
                               GetSerProListOfJobsLastUpdFun(lastId);
                               
                               });
  
  
  
  $('#providerRegBtn').tap(function(){
                           
                           providerRegBtnFun();
                           
                           });
  
  
  
  $('#providerLoginBtn').tap(function(){
                             
                             providerLoginFun();
                             
                             });
  
  
  
  $('#NewMobNoRegBtn').tap(function(){
                           
                           providerRetryRegFun();
                           
                           });
  
  
  
  $('#provProfileBtn').tap(function(){
                           
                           providerProfileNameFun();
                           
                           });
  
  
  
  $('#setradiuslocation').tap(function(){
                              
                              var Value = $("#txtcurrentlocation").val();
                              
                              var latval = $("#txtcurrentlati").val();
                              
                              var lonval = $("#txtcurrentlong").val();
                              
                              var radval = $("#txtradiuslocation").val();
                              
                              //setradiusfunc(latval,lonval,radval,"map_canvas","txtradiusCity","checkbox-city");
                              
                              onBlurFunForGeolocation(Value,latval,lonval,'txtcurrentlocation','txtradiuslocationerromsg','provprofilepage');
                              
                              });
  
  
  
  $('#setradiuslocationbtn1').tap(function(){
                                  
                                  var Value = $("#txtsetcurrentlocation").val();
                                  
                                  var nvlocallati = $("#txtsetcurrentlati").val();
                                  
                                  var nvlocallong = $("#txtsetcurrentlong").val();
                                  
                                  var nvlocalrad = $("#txtsetradiuslocation").val();
                                  
                                  //setradiusfunc(nvlocallati,nvlocallong,nvlocalrad,"set_map_canvas","txtsetradiusCity","acco-checkbox-city");
                                  
                                  onBlurFunForGeolocation(Value,nvlocallati,nvlocallong,'txtsetcurrentlocation','txtsetcurrentlocationerromsg','settingpage');
                                  
                                  });
  
  
  
  $('#providersavebtn').tap(function(){
                            
                            updateProviderProfileFun();
                            
                            });
  
  $(".layers").live('tap', function()
                    
                    {
                    if($(".layers:checked").length > 0)
                    
                    {
                    
                    $("#selecallchk").attr("checked","checked");
                    
                    $("#selecallchk1").attr("checked","checked");
                    
                    }
                    
                    else
                    
                    {
                    
                    $("#selecallchk").removeAttr("checked");
                    
                    $("#selecallchk1").removeAttr("checked");
                    
                    }
                    
                    $(this).attr('checked',this.checked);
                    
                    $(".layers").checkboxradio("refresh");
                    
                    $("#selecallchk").checkboxradio("refresh");
                    
                    $("#selecallchk1").checkboxradio("refresh");
                    
                    });
  
  
  $('.viewinfohelp img').live('tap', function(){
                              
                              $.mobile.changePage($("#viewbigmapandbidrep"));
                              
                              $("#helpviewinfodetail").empty();
                              
                              var nvHelpId = this.id;
                              
                              var devHei = $(window).height();
                              
                              var mapWid = $(window).width();
                              
                              var nvHei = devHei/1.5;
                              
                              $("#big_map_canvas_1").height(nvHei);
                              
                              ViewBigMapDetailsFun(nvHelpId,nvHei,mapWid);
                              
                              });
  
  
  
  $('.jobviewinfohelp img').live('tap', function(){
                                 
                                 $.mobile.changePage($("#jobviewinfopage"));
                                 
                                 $("#jobviewinfodetail").empty();
                                 
                                 var nvHelpId = this.id;
                                 
                                 var fromlat = $("#jobfromlat"+nvHelpId+"").html();
                                 
                                 var fromlng = $("#jobfromlng"+nvHelpId+"").html();
                                 
                                 var tolat = $("#jobtolat"+nvHelpId+"").html();
                                 
                                 var tolng = $("#jobtolng"+nvHelpId+"").html();
                                 
                                 var devHei = $(window).height();
                                 
                                 var mapWid = $(window).width();
                                 
                                 var nvHei = devHei/1.5;
                                 
                                 $("#big_map_canvas_2").height(nvHei);
                                 
                                 ViewjobDetailsFun(nvHelpId,nvHei,mapWid,fromlat,fromlng,tolat,tolng);
                                 
                                 });
  
  
  
  $('.backtopage').live('tap', function(){
                        
                        window.history.back();
                        
                        //$.mobile.changePage($("#viewbigmapandbidrep"));
                        
                        });
  
  
  
  $('#getBidId a').live('tap', function () {
                        
                        var HelpId = this.id;
                        
                        //GetListOfHelpAsg(HelpId);
                        
                        
                        
                        $('#time').val('');
                        
                    	$('#chargePrice').val('');
                        
                    	var date = new Date();
                        
                    	Ye = date.getFullYear();
                        
                    	Mo = date.getMonth()+1;
                        
                    	Da = date.getDate();
                        
                    	Ho = date.getHours();
                        
                    	Mi = date.getMinutes();
                        
                    	Se = date.getSeconds();
                        
                    	CurrenDate = Ye+"-"+Mo+"-"+Da+" "+Ho+":"+Mi+":"+Se;
                        
                    	
                        
                    	var nvBDLat = $.trim($("#bidbreakdownLatitude"+HelpId+"").html());
                        
                    	var nvBDLng = $.trim($("#bidbreakdownLongitude"+HelpId+"").html());
                        
                    	var nvProbId = $.trim($("#bidProbId"+HelpId+"").html());
                        
                    	var nvUsrId = $.trim($("#bidUsrId"+HelpId+"").html());
                        
                    	
                        
                    	$("#breakdownLatitude").val(nvBDLat);
                        
                    	$("#breakdownLongitude").val(nvBDLng);
                        
                    	$("#prob_id").val(nvProbId);
                        
                    	$("#help_id").val(HelpId);
                        
                    	$("#cust_id").val(nvUsrId);
                        
                    	$("#dateHelp").val(CurrenDate);
                        
                    	
                        
                    	$.mobile.changePage($("#popupbidrep"));
                        
                        
                        
                        });
  
  
  
  $('#getBidId span').live('tap', function () {
                           /*var nvConfirm = confirm ("Are you sure you would like to DECLINE to give a quote?");
                           if(nvConfirm==true)
                           {
                           var HelpId = this.id;
                           //$('#EnbDis'+HelpId+' button:last').attr("disabled","disabled");
                           $("#countdown_dashboard"+HelpId+"").stopCountDown();
                           $("#countdown_dashboardwaittimer"+HelpId+"").stopCountDown();
                           $("#countdown_dashboard"+HelpId+"").hide();
                           $("#countdown_dashboardwaittimer"+HelpId+"").hide();
                           //$('#HOL'+HelpId+'').attr("style","background-color:#cccccc;");
                           $("#HOL"+HelpId+"").removeClass("BidRedCls");
                           $("#HOL"+HelpId+"").removeClass("BidGreenCls");
                           $("#HOL"+HelpId+"").addClass("BidGrayCls");
                           $("#EnbDis"+HelpId+"").html('<p class="yellowmsg ui-li-desc">'+BidDecTxt+'</p>');
                           DeclineHelpRequestInfoFun(HelpId);
                           }*/
                           
                           
                           sessionStorage.decline = this.id;
                           
                           var nvConfirm = "Are you sure you would like to DECLINE to give a quote?";
                           
                           navigator.notification.confirm(''+nvConfirm+'',onConfirm,'Tow Choice','Cancel,Done');
                           
                           if(nvConfirm==true)
                            
                            {
                            
                            var HelpId = this.id;
                            
                            //$('#EnbDis'+HelpId+' button:last').attr("disabled","disabled");
                            
                            $("#countdown_dashboard"+HelpId+"").stopCountDown();
                            
                            $("#countdown_dashboardwaittimer"+HelpId+"").stopCountDown();
                            
                            $("#countdown_dashboard"+HelpId+"").hide();
                            
                            $("#countdown_dashboardwaittimer"+HelpId+"").hide();
                            
                            //$('#HOL'+HelpId+'').attr("style","background-color:#cccccc;");
                            
                            $("#HOL"+HelpId+"").removeClass("BidRedCls");
                            
                            $("#HOL"+HelpId+"").removeClass("BidGreenCls");
                            
                            $("#HOL"+HelpId+"").addClass("BidGrayCls");
                            
                            $("#EnbDis"+HelpId+"").html('<p class="yellowmsg ui-li-desc">'+BidDecTxt+'</p>');
                            
                            DeclineHelpRequestInfoFun(HelpId);
                            
                            }
                           
                           
                           
                           //$(this).hide();
                           
                           });
  
  
  
  $('#viewBigMapPageId a').live('tap', function () {
                                
                                var HelpId = this.id;
                                
                                var devHei = $(window).height();
                                
                                var mapWid = $(window).width();
                                
                                var nvHei = devHei-210;
                                
                                ViewBigMapDetailsFun(HelpId,nvHei,mapWid);
                                
                                });
  
  
  
  $('#subBidDataButton').live('tap',function(event) {
                              
                              SubmitBidDataFun();
                              
                              });
  
  
  
  $('button').live('touchstart',function(event) {
                   
                   $(this).addClass("ui-btn-down-b");
                   
                   });
  
  $('button').live('touchend',function(event) {
                   
                   $(this).removeClass("ui-btn-down-b");
                   
                   });
  
  
  
  $('#jobsListDataId').live('tap',function(event) {
                            
                            listSelector = "div.pull-demo-page ul.ui-listview";
                            
                            $(listSelector).listview("refresh");  // Prepend new content and refresh listview
                            
                            });
  
  
  
  $('#helpListDataId').live('tap',function(event) {
                            
                            listSelector = "div.pull-demo-page ul.ui-listview";
                            
                            $(listSelector).listview("refresh");  // Prepend new content and refresh listview
                            
                            });
  
  
  
  $('#jobsListDataId li:gt(-4)').live('touchend',function(event) {
                                      
                                      listSelector = "div.pull-demo-page ul.ui-listview";
                                      
                                      $(listSelector).listview("refresh");  // Prepend new content and refresh listview
                                      
                                      });
  
  
  
  $('#helpListDataId li:gt(-4)').live('touchend',function(event) {
                                      
                                      listSelector = "div.pull-demo-page ul.ui-listview";
                                      
                                      $(listSelector).listview("refresh");  // Prepend new content and refresh listview
                                      
                                      });
  
  
  
  $('#settingpage').on('pageshow',function(event, ui){
                       
                       $(".abcd").show();
                       
                       $(".abc").hide();
                       
                       $(".notsupportedcityerrmsg").hide();
                       
                       $("#checkactivecitystatus").html("");
                       
                       providerSettingFunc();
                       
                       $("#txtaccprofilenameerrormsg").hide();
                       
                       $("#txtaccprofilelastnameerrormsg").hide();
                       
                       $("#txtaccprofilecompnameerrormsg").hide();
                       
                       $("#txtsetcurrentlocationerromsg").hide();
                       
                       $("#txtaccproviderpasserrormsg").hide();
                       
                       $("#txtaccprofileEmailAddErrorMsg").hide();
                       
                       $("#txtsetradiuslocationerromsg").hide();
                       
                       });
  
  
  
  $('#newmobverifypage').on('pageshow',function(event, ui){
                            
                            $("#provloginErrorMsg").hide();
                            
                            });
  
  
  
  $('#sphelplistmain').on('pageshow',function(event, ui){
                          
                          var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
                          
                          if(deviceType=="Android" || deviceType=="android")
                    	  {
                          var pusher1 = new Pusher('adce6a8be1858ef1d3b2');
                          
                          var channel1 = pusher1.subscribe('test_channel');
                          
                          var notifier1 = new PusherNotifier(channel1);
                          
                          pusher1.connection.bind('state_change', function(states) {});
                    	  }
                          
                          return false;
                          
                          });
  
  
  
  $('#settingpage').on('pagehide',function(event, ui){
                       
                       $("#txtsetcurrentlati").val('');
                       
                       $("#txtsetcurrentlong").val('');
                       
                       $("#txtsetradiuslocation").val('');
                       
                       });
  
  
  
  $('#signinpage').on('pagehide',function(event, ui){
                      
                      $("#provEmailErrorMsg").hide();
                      
                      $("#provPassWordErrorMsg").hide();
                      
                      });
  
  
  
  $('#provprofilepage').on('pageshow',function(event, ui){
                           
                           $(".abcd").show();
                           
                           $(".abc").hide();
                           
                           $(".notsupportedcityerrmsg").hide();
                           
                           geoloc(success, fail, "map_canvas", "fromlatitude", "fromlng", "tolatitude", "tolng");
                           
                           });
  
  
  
  $('#passwordrecoverpage').on('pagehide',function(event, ui){
                               
                               $("#provEmailAddErrorMsg").hide();
                               
                               });
  
  
  
  $('#newmobnoreg').on('pagehide',function(event, ui){
                       
                       $("#provmobilecountrycodeErrorMsg").hide();
                       
                       $("#provMobNoErrorMsg").hide();
                       
                       });
  
  
  
  $('#provsigninbtn').live('tap',function(event) {
                           
                           ProviderSignInFunc();
                           
                           });
  
  
  
  $('#opentowweb').live('tap',function(event) {
                        
                        window.open("http://towchoice.com", "_system");
                        
                        });
  
  
  
  $('#provpasswordrecoverbtn').live('tap',function(event) {
                                    
                                    ProviderRestFunc();
                                    
                                    });
  
  
  
  $('#helplinkpanel').live('tap', function () {
                           
                           $("#panel-nav").panel("close");
                           
                           });
  
  
  
  $('#joblinkpanel').live('tap', function () {
                          
                          $("#panel-nav1").panel("close");
                          
                          });
  
  
  
  $('#accolinkpanel').live('tap', function () {
                           
                           $("#panel-nav2").panel("close");
                           
                           });
  
  
  
  $('#logoutdivid').live('tap',function(event) {
                         
                         sessionStorage.sqlprovstutas = 0;
                         
                         mydb.transaction(
                                          
                                          function (transaction) {
                                          
                                          transaction.executeSql("DROP TABLE providerprofile;");
                                          
                                          }
                                          
                                          );
                         
                         
                         
                         mydb.transaction(
                                          
                                          function (t) {
                                          
                                          t.executeSql(
                                                       
                                                       'CREATE TABLE IF NOT EXISTS providerprofile ' +
                                                       
                                                       '  (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
                                                       
                                                       '   provId INTEGER NOT NULL, firstname TEXT NOT NULL, mob_status TEXT NOT NULL, companyname TEXT NULL, password TEXT NULL, call_notification TEXT NULL, sms_notification TEXT NULL, currentlatitude TEXT NULL, currentlongitude TEXT NULL, currentradius TEXT NULL, email TEXT NULL );',
                                                       
                                                       [],
                                                       
                                                       nullDataHandler,
                                                       
                                                       errorHandler
                                                       
                                                       );
                                          
                                          }
                                          
                                          );
                         
                         //$.mobile.changePage("#newmobnoreg", {transition: "slide"});
                         
                         $.mobile.changePage($("#signinpage"));
                         
                         });
  
  
  
  $('#txtcurrentlocation').live('tap',function(event) {
                                
                                var radval = $.trim($("#txtradiuslocation").val());
                                
                                settowlocationfun("map_canvas",radval,"txtcurrentlocation","txtcurrentlati","txtcurrentlong","txtradiusCity","checkbox-city");
                                
                                });
  
  
  
  
  
  $('#load_more_button').live('tap',function(event) {
                              
                              
                              
                              var total_pages = $("#TotalHelpReq").html();
                              
                              
                              
                              //$(this).hide(); //hide load more button on click
                              
                              $(this).hide();
                              
                              $('#animation_image').show(); //show loading image
                              
                              
                              
                              if(track_click <= total_pages) //make sure user clicks are still less than total pages
                              
                              {
                              
                              //post page number and load returned data into result element
                              
                              var nvLocSes = sessionStorage.current;
                              
                              
                              
                              var b = 1;
                              
                              $.getJSON(""+LMUrl+"?get=TextHelpOfList&page="+track_click+"&TwId="+nvLocSes,function(result){
                                        
                                        $.each(result.HelpList, function(index, HelpListEach){
                                               
                                               var OHId = $("#helpListDataId li:first").attr('id');
                                               
                                               var NHId = "HOL"+HelpListEach.help_id;
                                               
                                               if(OHId!=NHId)
                                               
                                               {
                                               
                                               //$('#helpListDataId li').last().remove();
                                               
                                               var i = HelpListEach.help_id;
                                               
                                               GetUserNameFun(HelpListEach.cust_id,"userName"+i);
                                               
                                               GetProbNameFun(HelpListEach.prob_id,"probName"+i);
                                               
                                               
                                               
                                               /*if(HelpListEach.status1=="No")
                                                
                                                {*/
                                               
                                               var nvLocVar = "<b>Location : </b>";
                                               
                                               if(HelpListEach.prob_id=="1")
                                               
                                               {
                                               
                                               var nvLocVar = "<b>From : </b>";
                                               
                                               }
                                               
                                               
                                               
                                               myAddress= nvLocVar+""+HelpListEach.latlng_address;
                                               
                                               if(HelpListEach.sec_latlng_address=="")
                                               
                                               {
                                               
                                               myAddress=myAddress;
                                               
                                               }
                                               
                                               else
                                               
                                               {
                                               
                                               myAddress= myAddress+' </p><p class="ui-li-desc"><b>To :</b> '+HelpListEach.sec_latlng_address;
                                               
                                               }
                                               
                                               /*}
                                                
                                                
                                                
                                                else
                                                
                                                {
                                                
                                                myAddress="";
                                                
                                                }*/
                                               
                                               
                                               
                                               myVehicleInfo="";
                                               
                                               if(HelpListEach.car_year!="")
                                               
                                               {
                                               
                                               myVehicleInfo= HelpListEach.car_year+" / ";
                                               
                                               }
                                               
                                               if(HelpListEach.car_make!="")
                                               
                                               {
                                               
                                               myVehicleInfo= myVehicleInfo+""+HelpListEach.car_make+" / ";
                                               
                                               }
                                               
                                               if(HelpListEach.car_model!="")
                                               
                                               {
                                               
                                               myVehicleInfo= myVehicleInfo+""+HelpListEach.car_model+" / ";
                                               
                                               }
                                               
                                               var strLen = myVehicleInfo.length;
                                               
                                               myVehicleInfo = myVehicleInfo.slice(0,strLen-1);
                                               
                                               
                                               
                                               myVehicleModInfo="";
                                               
                                               if(HelpListEach.carmodification_detail!="")
                                               
                                               {
                                               
                                               myVehicleModInfo = "<b>Vehicle info : </b>"+HelpListEach.carmodification_detail;
                                               
                                               }
                                               
                                               
                                               
                                               myVehiclecolor="";
                                               
                                               if(HelpListEach.car_color!="")
                                               
                                               {
                                               
                                               myVehiclecolor= HelpListEach.car_color;
                                               
                                               }
                                               
                                               
                                               
                                               var nvTime = "";
                                               
                                               if(HelpListEach.time!="")
                                               
                                               {
                                               
                                               var nvTime = "<b>Time Quoted : </b>"+HelpListEach.time+" minutes";
                                               
                                               if(HelpListEach.time==undefined)
                                               
                                               {
                                               
                                               var nvTime = "";
                                               
                                               }
                                               
                                               }
                                               
                                               var nvPrice = "";
                                               
                                               if(HelpListEach.price!="")
                                               
                                               {
                                               
                                               var nvPrice = "<b>Amount Quoted : </b>$"+HelpListEach.price+"";
                                               
                                               if(HelpListEach.price==undefined)
                                               
                                               {
                                               
                                               var nvPrice = "";
                                               
                                               }
                                               
                                               }
                                               
                                               
                                               
                                               var additionalinfo = "";
                                               
                                               if(HelpListEach.additionalInfo!="")
                                               
                                               {
                                               
                                               var additionalinfo = "<b>Comment : </b>"+HelpListEach.additionalInfo;
                                               
                                               }
                                               
											   
                                               
											   var nvdistance = "";
                                               
                                               if(HelpListEach.distance!="")
                                               
                                               {
                                               
                                               var nvdistance = "<b>Estimated Distance : </b>"+HelpListEach.distance;
                                               
                                               }
                                               
                                               
                                               
                                               $("#helpListDataId").append('<li class="btpad ui-btn-up-d ui-corner-all" id="HOL'+i+'"><p class="ui-li-desc" id="probName'+i+'"></p><span class="viewinfohelp"><img src="images/mapzoom.png" id="'+i+'" /></span><img src="" height="150" class="ui-corner-all" id="mapId'+i+'" /><div style="clear:both;"></div><p class="ui-li-desc namebold" id="userName'+i+'"></p><p class="ui-li-desc">'+myAddress+'</p><p class="ui-li-desc">'+nvdistance+'</p><p class="ui-li-desc"><b>Make & Model : </b>'+myVehicleInfo+' '+myVehiclecolor+'</p><p class="ui-li-desc">'+additionalinfo+'</p><p class="ui-li-desc">'+myVehicleModInfo+'</p><p class="ui-li-desc">'+HelpListEach.date+'</p><p id="HOLPR'+i+'">'+nvPrice+'</p><p id="HOLTM'+i+'">'+nvTime+' </p><div id="countdown_dashboard'+i+'" class="timertoppad"><div class="dash hours_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash minutes_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash seconds_dash"><div class="digit">0</div><div class="digit">0</div></div></div><div id="countdown_dashboardwaittimer'+i+'" class="timertoppadbid"><div class="dash hours_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash minutes_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash seconds_dash"><div class="digit">0</div><div class="digit">0</div></div></div><b id="getBidId"><p id="EnbDis'+i+'" class="ui-li-desc"></p></b><p style="display:none;"><b id="bidStatus'+i+'"></b><b id="decStatus'+i+'"></b><b id="bidbreakdownLatitude'+i+'">'+HelpListEach.breckdown_cur_latitude+'</b><b id="bidbreakdownLongitude'+i+'">'+HelpListEach.breckdown_cur_longitude+'</b><b id="bidProbId'+i+'">'+HelpListEach.prob_id+'</b><b id="bidUsrId'+i+'">'+HelpListEach.cust_id+'</b><b id="hlddistance'+i+'">'+nvdistance+'</b><b id="hldadditinfo'+i+'">'+additionalinfo+'</b><b id="hldvehinfo'+i+'">'+myVehicleInfo+'</b><b id="hldsecaddrlat'+i+'">'+HelpListEach.sec_cur_latitude+'</b><b id="hldsecaddrlng'+i+'">'+HelpListEach.sec_cur_longitude+'</b><b id="hldfromaddr'+i+'">'+HelpListEach.latlng_address+'</b><b id="hldtoaddr'+i+'">'+HelpListEach.sec_latlng_address+'</b></p></li><div style="clear:both; height:6px;"></div>');
                                               
                                               
                                               
                                               if(HelpListEach.status=="Yes")
                                               
                                               {
                                               
                                               if(HelpListEach.prov_select_status=="Yes")
                                               
                                               {
                                               
                                               if(HelpListEach.status1=="Yes")
                                               
                                               {
                                               
                                               $("#userName"+i+"").show();
                                               
                                               $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+SelBtnTxt+'</p>');
                                               
                                               $("#HOL"+i+"").removeClass("BidRedCls");
                                               
                                               $("#HOL"+i+"").removeClass("BidGrayCls");
                                               
                                               $("#HOL"+i+"").addClass("BidGreenCls");
                                               
                                               $("#HOL"+i+" a").show();
                                               
                                               }
                                               
                                               else
                                               
                                               {
                                               
                                               $("#userName"+i+"").hide();
                                               
                                               if(HelpListEach.decline=="Yes")
                                               
                                               {
                                               
                                               $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+BidDecTxt+'</p>');
                                               
                                               $("#HOL"+i+"").removeClass("BidGreenCls");
                                               
                                               $("#HOL"+i+"").removeClass("BidRedCls");
                                               
                                               $("#HOL"+i+"").addClass("BidGrayCls");
                                               
                                               }
                                               
                                               else
                                               
                                               {
                                               
                                               if(nvTime=="" && nvPrice=="")
                                               
                                               {
                                               
                                               $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+BidEndbtn+'</p>');
                                               
                                               $("#HOL"+i+"").removeClass("BidGreenCls");
                                               
                                               $("#HOL"+i+"").removeClass("BidRedCls");
                                               
                                               $("#HOL"+i+"").addClass("BidGrayCls");
                                               
                                               }
                                               
                                               else
                                               
                                               {
                                               
                                               $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+NotSelBtnTxt+'</p>');
                                               
                                               $("#HOL"+i+"").removeClass("BidGrayCls");
                                               
                                               $("#HOL"+i+"").removeClass("BidGreenCls");
                                               
                                               $("#HOL"+i+"").addClass("BidRedCls");
                                               
                                               }
                                               
                                               }
                                               
                                               }
                                               
                                               }
                                               
                                               else
                                               
                                               {
                                               
                                               if(HelpListEach.status1=="No")
                                               
                                               {
                                               
                                               $("#userName"+i+"").hide();
                                               
                                               if(HelpListEach.decline=="Yes")
                                               
                                               {
                                               
                                               $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+BidDecTxt+'</p>');
                                               
                                               $("#HOL"+i+"").removeClass("BidGreenCls");
                                               
                                               $("#HOL"+i+"").removeClass("BidRedCls");
                                               
                                               $("#HOL"+i+"").addClass("BidGrayCls");
                                               
                                               }
                                               
                                               else
                                               
                                               {
                                               
                                               if(HelpListEach.help_timeout=="Yes")
                                               
                                               {
                                               
                                               $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+BidEndbtn+'</p>');
                                               
                                               $("#HOL"+i+"").removeClass("BidGreenCls");
                                               
                                               $("#HOL"+i+"").removeClass("BidRedCls");
                                               
                                               $("#HOL"+i+"").addClass("BidGrayCls");
                                               
                                               }
                                               
                                               else
                                               
                                               {
                                               
                                               var nvSecwait = parseInt(HelpListEach.waitTimeDiff);
                                               
                                               if(nvSecwait>=0)
                                               
                                               {
                                               
                                               $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+BidRecBtnTxt+'</p>');
                                               
                                               $("#HOL"+i+"").removeClass("BidGreenCls");
                                               
                                               $("#HOL"+i+"").removeClass("BidRedCls");
                                               
                                               $("#HOL"+i+"").addClass("BidGrayCls");
                                               
                                               $("#countdown_dashboardwaittimer"+i+"").show();
                                               
                                               }
                                               
                                               else
                                               
                                               {
                                               
                                               $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+userhasnotmodetxt+'</p>');
                                               
                                               $("#HOL"+i+"").removeClass("BidGreenCls");
                                               
                                               $("#HOL"+i+"").removeClass("BidGrayCls");
                                               
                                               $("#HOL"+i+"").addClass("BidRedCls");
                                               
                                               $("#countdown_dashboardwaittimer"+i+"").hide();
                                               
                                               }
                                               
                                               }
                                               
                                               }
                                               
                                               }
                                               
                                               }
                                               
                                               }
                                               
                                               else
                                               
                                               {
                                               
                                               $("#EnbDis"+i+"").html('<a href="#" id="'+i+'"><div class="ui-shadow ui-btn-corner-all ui-btn-up-b bigbutton">Quote</div></a><span id='+i+'><div style="padding:6px 10px;" class="ui-shadow ui-btn-corner-all ui-btn-up-r">Decline</div></span>');
                                               
                                               $("#userName"+i+"").hide();
                                               
                                               var nvSec = parseInt(HelpListEach.TimeDiff);
                                               
                                               if(nvSec>=0)
                                               
                                               {
                                               
                                               $("#countdown_dashboard"+i+"").show();
                                               
                                               $('#countdown_dashboard'+i+'').countDown({
                                                                                        
                                                                                        targetOffset: {
                                                                                        
                                                                                        'day': 0,
                                                                                        
                                                                                        'month': 0,
                                                                                        
                                                                                        'year': 0,
                                                                                        
                                                                                        'hour': 0,
                                                                                        
                                                                                        'min': 0,
                                                                                        
                                                                                        'sec': nvSec,
                                                                                        
                                                                                        'utc': true
                                                                                        
                                                                                        },
                                                                                        
                                                                                        onComplete: function() {
                                                                                        
                                                                                        $("#countdown_dashboardwaittimer"+i+"").stopCountDown();
                                                                                        
                                                                                        HelpRequestTimeOutFun(i,HelpListEach.cust_id);
                                                                                        
                                                                                        }
                                                                                        
                                                                                        });
                                               
                                               }
                                               
                                               }
                                               
                                               
                                               
                                               var nvSecwait = parseInt(HelpListEach.waitTimeDiff);
                                               
                                               if(nvSecwait>=0)
                                               
                                               {
                                               
                                               $('#countdown_dashboardwaittimer'+i+'').countDown({
                                                                                                 
                                                                                                 targetOffset: {
                                                                                                 
                                                                                                 'day': 0,
                                                                                                 
                                                                                                 'month': 0,
                                                                                                 
                                                                                                 'year': 0,
                                                                                                 
                                                                                                 'hour': 0,
                                                                                                 
                                                                                                 'min': 0,
                                                                                                 
                                                                                                 'sec': nvSecwait,
                                                                                                 
                                                                                                 'utc': true
                                                                                                 
                                                                                                 },
                                                                                                 
                                                                                                 onComplete: function() {
                                                                                                 
                                                                                                 $("#countdown_dashboardwaittimer"+i+"").hide();
                                                                                                 
                                                                                                 $("#countdown_dashboardwaittimer"+i+"").stopCountDown();
                                                                                                 
                                                                                                 var bid = HelpListEach.bids_id;
                                                                                                 
                                                                                                 UpdBidsListFun(bid,i,"","");
                                                                                                 
                                                                                                 }
                                                                                                 
                                                                                                 });
                                               
                                               }
                                               
                                               
                                               
                                               DisplaySmallMapJobsListFun(HelpListEach.breckdown_cur_latitude,HelpListEach.breckdown_cur_longitude,"mapId"+i,"directions"+i,"150px","150px","sphelplistmain");
                                               
                                               b = b+1;
                                               
                                               }
                                               
                                               });
                                        
                                        track_click++;
                                        
                                        //$("#load_more_button").show();
                                        
                                        $("#load_more_button").show();
                                        
                                        $('#animation_image').hide();
                                        
                                        //$("#helpListDataId").listview("refresh");
                                        
                                        listSelector = "div.pull-demo-page ul.ui-listview";
                                        
                                        $(listSelector).listview("refresh");  // Prepend new content and refresh listview
                                        
                                        });
                              
                              
                              
                              
                              
                              if(track_click >= total_pages-1)
                              
                              {
                              
                              //reached end of the page yet? disable load button
                              
                              //$("#load_more_button").hide(); //hide load more button on click
                              
                              $("#load_more_button").hide();
                              
                              $('#animation_image').hide(); //show loading image
                              
                              }
                              
                              }
                              
                              });
  
  $("#selecallchk").on('click',function()
                       {
                       
                       $('.layers').attr('checked',this.checked);
                       
                       $(".layers").checkboxradio("refresh");
                       
                       $("#selecallchk").checkboxradio("refresh");
                       
                       });
  
  
  
  $("#selecallchk1").on('click',function()
                        
                        {
                        
                        $('.layers').attr('checked',this.checked);
                        
                        $(".layers").checkboxradio("refresh");
                        
                        $("#selecallchk1").checkboxradio("refresh");
                        
                        });
  
  
  
  });



function ProviderRestFunc()

{
    
	var provEmailAdd = $.trim($('#provEmailAdd').val());
    
	if(provEmailAdd=="")
        
	{
        
		$('#provEmailAddErrorMsg').show();
        
	}
    
	if(provEmailAdd.length>0)
        
	{
        
		$('#provpasswordrecoverbtn').addClass('ui-disabled');
        
		var postData = $('#passwordrecoverpage form').serialize();
        
		$.ajax({
               
               type: 'POST',
               
               data: postData+'&FormType=ProviderResetPassword',
               
               url: Url,
               
               success: function(data){
               
               if(data=="No")
               
               {
               
               $('#provpasswordrecoverbtn').removeClass('ui-disabled');
               
               $("#provEmailAddErrorMsg").show();
               
               //$("#provEmailAddErrorMsg").html("<div style='color:#FF0000;'>Email address invalid</div>");
               
               }
               
               else
               
               {
               
               var alertmsg = "Your password has been reset successfully, an email has been sent to "+provEmailAdd+" with your reset link.";
               
               navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
               // alert(alertmsg);
               $('#provEmailAdd').val('');
               
               $('#provpasswordrecoverbtn').removeClass('ui-disabled');
               
               $("#provEmailAddErrorMsg").hide();
               
			   $('#provEmail').val(provEmailAdd);
               
			   $.mobile.changePage($("#signinpage"));
               
			   $("#provEmailAddErrorMsg").hide();
               
               //$("#provEmailAddErrorMsg").html("<div style='color:#FF0000;'>Email sent successfully</div>");
               
               //window.history.back();
               
               }
               
               },
               
               error: function(){
               
               //console.log(data);
               
               }
               
               });
        
		return false;
        
	}
    
}



function ProviderSignInFunc()

{
    
	var provEmail = $.trim($('#provEmail').val());
    
	var provPassWord = $.trim($('#provPassWord').val());
    
	if(provEmail=="")
        
	{
        
		$("#provEmailErrorMsg").show();
        
		//$("#provEmailErrorMsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	if(provPassWord=="")
        
	{
        
		$("#provPassWordErrorMsg").show();
        
		//$("#provPassWordErrorMsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	if(provEmail.length>0 && provPassWord.length>0)
        
	{
        
		$('#provsigninbtn').addClass('ui-disabled');
        
		var postData = $('#signinpage form').serialize();
        
		$.ajax({
               
               type: 'POST',
               
               data: postData+'&FormType=ProviderSignIn',
               
               url: Url,
               
               success: function(data){
               
               if(data=="Not")
               
               {
               
               $('#provsigninbtn').removeClass('ui-disabled');
               
               $("#provPassWordErrorMsg").show();
               
               $("#provPassWordErrorMsg").html("<div style='color:#FF0000;'>Username or password invalid</div>");
               
               }
               
               else
               
               {
               
               var split = data.split(',');
               
               sessionStorage.current = split[0];
               
               sessionStorage.provname = split[1];
               
               sessionStorage.provcomp = split[2];
               
               sessionStorage.provpass = split[3];
               
               sessionStorage.callnoti = split[4];
               
               sessionStorage.smsnoti = split[5];
               
               sessionStorage.latitude = split[6];
               
               sessionStorage.longitude = split[7];
               
               sessionStorage.radius = split[8];
               
               sessionStorage.email = split[9];
               
               $(".welToProName").html(split[1]);
               
               if(sessionStorage.sqlprovstutas == "0")
               
               {
               
               sessionStorage.sqlprovstutas = 1;
               
               mydb.transaction(
                                
								function (transaction) {
                                
                                transaction.executeSql("INSERT INTO providerprofile(provId, firstname, companyname, password, call_notification, sms_notification, currentlatitude, currentlongitude, currentradius, email, mob_status) VALUES ('"+split[0]+"','"+split[1]+"','"+split[2]+"','"+split[3]+"','"+split[4]+"','"+split[5]+"','"+split[6]+"','"+split[7]+"','"+split[8]+"','"+split[9]+"','Yes');");
                                
								}
                                
                                );
               
               
               
               }
               
               else
               
               {
               
               var id = 1;
               
               mydb.transaction(
                                
								function(transaction) {
                                
                                transaction.executeSql("UPDATE providerprofile SET provId =?, firstname = ?, companyname = ?, password = ?, call_notification = ?, sms_notification = ?, currentlatitude = ?, currentlongitude = ?, currentradius = ?, email = ?, mob_status = ? WHERE id = ?", [split[0], split[1], split[2], split[3], split[4], split[5], split[6], split[7], split[8], split[9], 'Yes', id], null, onError);
                                
								});
               
               }
               
               $("#towtruck_id").val(split[0]);
               
               $('#provsigninbtn').removeClass('ui-disabled');
               
               $("#helpListDataId").empty();
               
               var lasthelpId = "";
               
               FetchHelpRequestFunLastUpd(lasthelpId,"");
               
               ProviderHelpRequestTotalFunc();
               
               //$.mobile.changePage("#sphelplistmain", {transition: "slide"});
               
               $.mobile.changePage($("#sphelplistmain"));
               
               }
               
               },
               
               error: function(){
               
               //console.log(data);
               
               }
               
               });
        
		return false;
        
	}
    
}



function providerSettingFunc()

{
    
	var nvLocSes = sessionStorage.current;
    
    $.ajax({
           
           type: 'POST',
           
           data: '&ProvId='+nvLocSes+'&FormType=ProviderInfo',
           
           url: Url,
           
           success: function(data){
           
           if(data!="")
           
           {
           
           var split = data.split(',');
           
           var nvProvProfName = split[1];
           
           var nvCompName = split[2];
           
           var nvPassword = split[3];
           
           var nvCallnoti = split[4];
           
           var nvSmsnoti = split[5];
           
           var nvlatitude = split[6];
           
           var nvlongitude = split[7];
           
           var nvradius = split[8];
           
           var nvEmail = split[9];
           
           var nvProvProfLastName = split[10];
           
           
           
           $("#txtaccprofilename").val(nvProvProfName);
           
           $("#txtaccprofilelastname").val(nvProvProfLastName);
           
           $("#txtaccprofilecompname").val(nvCompName);
           
           $("#txtaccproviderpass").val(nvPassword);
           
           $("#txtsetradiuslocation").val(nvradius);
           
           $("#txtaccprofileEmailAdd1").val(nvEmail);
           
           $("#txtaccprofileEmailAdd").val(nvEmail);
           
		   
           
           if(nvCallnoti=="Yes")
           
           {
           
           var myswitch = $("#callnotific");
           
           myswitch[0].selectedIndex = 1;
           
           myswitch.slider("refresh");
           
           }
           
		   else
           
		   {
           
           var myswitch = $("#callnotific");
           
           myswitch[0].selectedIndex = 2;
           
           myswitch.slider("refresh");
           
		   }
           
		   
           
           if(nvSmsnoti=="Yes")
           
           {
           
           var myswitch = $("#smsnotific");
           
           myswitch[0].selectedIndex = 1;
           
           myswitch.slider("refresh");
           
           }
           
		   else
           
		   {
           
           var myswitch = $("#smsnotific");
           
           myswitch[0].selectedIndex = 2;
           
           myswitch.slider("refresh");
           
		   }
           
           
           
           success(nvlatitude, nvlongitude, "set_map_canvas", "fromlatitude", "fromlng", "tolatitude", "tolng");
           
           
           
           }
           
           },
           
           error: function(){
           
           //console.log(data);
           
           }
           
           });
    
    return false;
    
}



function DeclineHelpRequestInfoFun(HelpId)

{
    
	$("#countdown_dashboard"+HelpId+"").stopCountDown();
    
	$("#countdown_dashboardwaittimer"+HelpId+"").stopCountDown();
    
	$.getJSON(""+Url+"?get=ProviderHelpInfo&HId="+HelpId,function(result){
              
              $.each(result.HelpListPop, function(index, HelpListPopEach){
                     
                     DeclineHelpRequestFun(HelpId,HelpListPopEach.cust_id);
                     
                     });
              
              });
    
}



function DeclineHelpRequestFun(HelpId,CustId)

{
    
	$("#countdown_dashboard"+HelpId+"").stopCountDown();
    
	$("#countdown_dashboardwaittimer"+HelpId+"").stopCountDown();
    
	var nvLocSes = sessionStorage.current;
    
	$.ajax({
           
           type: 'POST',
           
           data: 'HId='+HelpId+'&PrId='+nvLocSes+'&CId='+CustId+'&FormType=DeclineHelpReq',
           
           url: Url,
           
           success: function(Udata){
           
           //console.log(Udata);
           
           handleNotifyButtonClick(Udata);
           
           $("#decStatus"+HelpId+"").html("Yes");
           
           $("#EnbDis"+HelpId+"").html('<p class="yellowmsg ui-li-desc">'+BidDecTxt+'</p>');
           
           //$('#HOL'+HelpId+'').attr("style","background-color:#cccccc;");
           
           $("#HOL"+HelpId+"").removeClass("BidRedCls");
           
           $("#HOL"+HelpId+"").removeClass("BidGreenCls");
           
           $("#HOL"+HelpId+"").addClass("BidGrayCls");
           
           var alertmsg = "Decline to quote was successful.";
           //alert(alertmsg);
           navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
           
           $("#countdown_dashboard"+HelpId+"").stopCountDown();
           
           $("#countdown_dashboardwaittimer"+HelpId+"").stopCountDown();
           
           $("#countdown_dashboard"+HelpId+"").hide();
           
           $("#countdown_dashboardwaittimer"+HelpId+"").hide();
           
           },
           
           error: function(){
           
           //console.log(data);
           
           //alert('There was an error in register form');
           
           }
           
           });
    
	return false;
    
}



function ViewjobDetailsFun(HelpId,devHei,mapWid,fromlat,fromlng,tolat,tolng)

{
    
	//var a = ''+$("#JOL"+HelpId+"").html()+'';
    
    
    
    
    
    var $currentHtml = $('<div>').append($("#JOL"+HelpId+"").html());
    
    $currentHtml.find('span').remove();
    
	$currentHtml.find('img').remove();
    
	$("#jobviewinfodetail").html($currentHtml.html());
    
    
    
	googlelivemap(fromlat,fromlng,tolat,tolng,"big_map_canvas_2");
    
	
    
	//setTimeout(function(){googlelivemap(fromlat,fromlng,tolat,tolng,"big_map_canvas_2")},2000);
    
}



function ViewBigMapDetailsFun(HelpId,devHei,mapWid)

{
    
	var $currentHtml = $('<div>').append($("#HOL"+HelpId+"").html());
    
    $currentHtml.find('span').remove();
    
	$currentHtml.find('img').remove();
    
	$currentHtml.find('#countdown_dashboard'+HelpId+'').remove();
    
	$currentHtml.find('#countdown_dashboardwaittimer'+HelpId+'').remove();
    
	$currentHtml.find("p:last-child").remove();
    
	$currentHtml.find('#getBidId').remove();
    
	$currentHtml.find('#userName'+HelpId+'').remove();
    
	$currentHtml.find('#HOLPR'+HelpId+'').remove();
    
	$currentHtml.find('#HOLTM'+HelpId+'').remove();
    
    
    
	var userName = $("#userName"+HelpId+"").html();
    
	var HOLPR = $("#HOLPR"+HelpId+"").html();
    
	var HOLTM = $("#HOLTM"+HelpId+"").html();
    
    
    
    
    
    var nvCheckBidGreen = $("#HOL"+HelpId+"").hasClass("BidGreenCls");
    if(nvCheckBidGreen==false)
    {
    	var helpdetial = ""+$currentHtml.html()+"<p>"+HOLPR+"</p>"+"<p>"+HOLTM+"</p>";
    }
    else
    {
        var helpdetial = "<p>"+userName+"</p>"+$currentHtml.html()+"<p>"+HOLPR+"</p>"+"<p>"+HOLTM+"</p>";
    }
    
	$("#helpviewinfodetail").html(helpdetial);
    
	
    
	//var hldvehinfo = $("#hldvehinfo"+HelpId+"").html();
    
	var bidbreakdownLatitude = $("#bidbreakdownLatitude"+HelpId+"").html();
    
	var bidbreakdownLongitude = $("#bidbreakdownLongitude"+HelpId+"").html();
    
	//var hlddistance = $("#hlddistance"+HelpId+"").html();
    
	//var hldadditinfo = $("#hldadditinfo"+HelpId+"").html();
    
	//var hldfromaddr = $("#hldfromaddr"+HelpId+"").html();
    
	var hldsecaddrlat = $("#hldsecaddrlat"+HelpId+"").html();
    
	var hldsecaddrlng = $("#hldsecaddrlng"+HelpId+"").html();
    
	//var hldtoaddr = $("#hldtoaddr"+HelpId+"").html();
    
	
    
	/*$("#hldvehinfoVBM").html(hldvehinfo);
     
     $("#bidbreakdownLatitudeVBM").html(bidbreakdownLatitude);
     
     $("#bidbreakdownLongitudeVBM").html(bidbreakdownLongitude);
     
     $("#hlddistanceVBM").html(hlddistance);
     
     $("#hldadditinfoVBM").html(hldadditinfo);
     
     $("#hldfromaddrVBM").html(hldfromaddr);
     
     $("#hldsecaddrlatVBM").html(hldsecaddrlat);
     
     $("#hldsecaddrlngVBM").html(hldsecaddrlng);
     
     $("#hldtoaddrVBM").html(hldtoaddr);*/
    
	
    
	googlelivemap(bidbreakdownLatitude,bidbreakdownLongitude,hldsecaddrlat,hldsecaddrlng,"big_map_canvas_1");
    
	
    
	//setTimeout(function(){googlelivemap(bidbreakdownLatitude,bidbreakdownLongitude,hldsecaddrlat,hldsecaddrlng,"big_map_canvas_1")},2000);
    
}



function FetchHelpRequestFunLastUpd(HId,PUSH)

{
    
	var nvLocSes = sessionStorage.current;
    
	if(nvLocSes!="" && nvLocSes!=undefined)
        
	{
        
		var b = 1;
		$.getJSON(""+Url+"?get=TextHelpOfList&Hid="+HId+"&TwId="+nvLocSes,function(result){
                  
                  $.each(result.HelpList, function(index, HelpListEach){
                         
                         var OHId = $("#helpListDataId li:first").attr('id');
                         
                         var NHId = "HOL"+HelpListEach.help_id;
                         
                         if(OHId!=NHId)
                         
                         {
                         
                         //$('#helpListDataId li').last().remove();
                         
                         var i = HelpListEach.help_id;
                         
                         GetUserNameFun(HelpListEach.cust_id,"userName"+i);
                         
                         GetProbNameFun(HelpListEach.prob_id,"probName"+i);
                         
                         
                         
                         /*if(HelpListEach.status1=="No")
                          
                          {*/
                         
                         var nvLocVar = "<b>Location : </b>";
                         
                         if(HelpListEach.prob_id=="1")
                         
                         {
                         
                         var nvLocVar = "<b>From : </b>";
                         
                         }
                         
						 
                         
                         myAddress= nvLocVar+""+HelpListEach.latlng_address;
                         
                         if(HelpListEach.sec_latlng_address=="")
                         
                         {
                         
                         myAddress=myAddress;
                         
                         }
                         
                         else
                         
                         {
                         
                         myAddress= myAddress+' </p><p class="ui-li-desc"><b>To :</b> '+HelpListEach.sec_latlng_address;
                         
                         }
                         
                         /*}
                          
                          
                          
                          else
                          
                          {
                          
                          myAddress="";
                          
                          }*/
                         
                         
                         
                         myVehicleInfo="";
                         
                         if(HelpListEach.car_year!="")
                         
                         {
                         
                         myVehicleInfo= HelpListEach.car_year+" / ";
                         
                         }
                         
                         if(HelpListEach.car_make!="")
                         
                         {
                         
                         myVehicleInfo= myVehicleInfo+""+HelpListEach.car_make+" / ";
                         
                         }
                         
                         if(HelpListEach.car_model!="")
                         
                         {
                         
                         myVehicleInfo= myVehicleInfo+""+HelpListEach.car_model+" / ";
                         
                         }
                         
                         var strLen = myVehicleInfo.length;
                         
                         myVehicleInfo = myVehicleInfo.slice(0,strLen-1);
                         
                         
                         
                         myVehicleModInfo="";
                         
                         if(HelpListEach.carmodification_detail!="")
                         
                         {
                         
                         myVehicleModInfo= "<b>Vehicle info : </b>"+HelpListEach.carmodification_detail;
                         
                         }
                         
                         
                         
                         myVehiclecolor="";
                         
                         if(HelpListEach.car_color!="")
                         
                         {
                         
                         myVehiclecolor= HelpListEach.car_color;
                         
                         }
                         
                         
                         
                         var nvTime = "";
                         
                         if(HelpListEach.time!="")
                         
                         {
                         
                         var nvTime = "<b>Time Quoted : </b>"+HelpListEach.time+" minutes";
                         
                         if(HelpListEach.time==undefined)
                         
                         {
                         
                         var nvTime = "";
                         
                         }
                         
                         }
                         
                         var nvPrice = "";
                         
                         if(HelpListEach.price!="")
                         
                         {
                         
                         var nvPrice = "<b>Amount Quoted : </b>$"+HelpListEach.price+"";
                         
                         if(HelpListEach.price==undefined)
                         
                         {
                         
                         var nvPrice = "";
                         
                         }
                         
                         }
                         
                         
                         
                         var additionalinfo = "";
                         
                         if(HelpListEach.additionalInfo!="")
                         
                         {
                         
                         var additionalinfo = "<b>Comment : </b>"+HelpListEach.additionalInfo;
                         
                         }
                         
						 
                         
						 var nvdistance = "";
                         
                         if(HelpListEach.distance!="")
                         
                         {
                         
                         var nvdistance = "<b>Estimated Distance : </b>"+HelpListEach.distance;
                         
                         }
                         
                         //$("#LastUpHelpList").html(HelpListEach.help_id);
                         
                         if(HId!="")
                         
                         {
                         
                         $("#LastUpHelpList").html(i);
                         
                         $("#helpListDataId").prepend('<li class="btpad ui-btn-up-d ui-corner-all" id="HOL'+i+'"><p class="ui-li-desc" id="probName'+i+'"></p><span class="viewinfohelp"><img src="images/mapzoom.png" id="'+i+'" /></span><img src="" height="150" class="ui-corner-all" id="mapId'+i+'" /><div style="clear:both;"></div><p class="ui-li-desc namebold" id="userName'+i+'"></p><p class="ui-li-desc">'+myAddress+'</p><p class="ui-li-desc">'+nvdistance+'</p><p class="ui-li-desc"><b>Make & Model : </b>'+myVehicleInfo+' '+myVehiclecolor+'</p><p class="ui-li-desc">'+additionalinfo+'</p><p class="ui-li-desc">'+myVehicleModInfo+'</p><p class="ui-li-desc">'+HelpListEach.date+'</p><p id="HOLPR'+i+'">'+nvPrice+'</p><p id="HOLTM'+i+'">'+nvTime+' </p><div id="countdown_dashboard'+i+'" class="timertoppad"><div class="dash hours_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash minutes_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash seconds_dash"><div class="digit">0</div><div class="digit">0</div></div></div><div id="countdown_dashboardwaittimer'+i+'" class="timertoppadbid"><div class="dash hours_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash minutes_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash seconds_dash"><div class="digit">0</div><div class="digit">0</div></div></div><b id="getBidId"><p id="EnbDis'+i+'" class="ui-li-desc"></p></b><p style="display:none;"><b id="bidStatus'+i+'"></b><b id="decStatus'+i+'"></b><b id="bidbreakdownLatitude'+i+'">'+HelpListEach.breckdown_cur_latitude+'</b><b id="bidbreakdownLongitude'+i+'">'+HelpListEach.breckdown_cur_longitude+'</b><b id="bidProbId'+i+'">'+HelpListEach.prob_id+'</b><b id="bidUsrId'+i+'">'+HelpListEach.cust_id+'</b><b id="hlddistance'+i+'">'+nvdistance+'</b><b id="hldadditinfo'+i+'">'+additionalinfo+'</b><b id="hldvehinfo'+i+'">'+myVehicleInfo+'</b><b id="hldsecaddrlat'+i+'">'+HelpListEach.sec_cur_latitude+'</b><b id="hldsecaddrlng'+i+'">'+HelpListEach.sec_cur_longitude+'</b><b id="hldfromaddr'+i+'">'+HelpListEach.latlng_address+'</b><b id="hldtoaddr'+i+'">'+HelpListEach.sec_latlng_address+'</b></p></li><div style="clear:both; height:6px;"></div>');
                         
						 }
                         
                         else
                         
                         {
                         
                         if(b==1)
                         
                         {
                         
                         $("#LastUpHelpList").html(i);
                         
                         }
                         
                         /* 9s */  $("#helpListDataId").append('<li class="btpad ui-btn-up-d ui-corner-all" id="HOL'+i+'"><p class="ui-li-desc" id="probName'+i+'"></p><span class="viewinfohelp"><img src="images/mapzoom.png" id="'+i+'" /></span><img src="" height="150" class="ui-corner-all" id="mapId'+i+'" /><div style="clear:both;"></div><p class="ui-li-desc namebold" id="userName'+i+'"></p><p class="ui-li-desc">'+myAddress+'</p><p class="ui-li-desc">'+nvdistance+'</p><p class="ui-li-desc"><b>Make & Model : </b>'+myVehicleInfo+' '+myVehiclecolor+'</p><p class="ui-li-desc">'+additionalinfo+'</p><p class="ui-li-desc">'+myVehicleModInfo+'</p><p class="ui-li-desc">'+HelpListEach.date+'</p><p id="HOLPR'+i+'">'+nvPrice+'</p><p id="HOLTM'+i+'">'+nvTime+' </p><div id="countdown_dashboard'+i+'" class="timertoppad"><div class="dash hours_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash minutes_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash seconds_dash"><div class="digit">0</div><div class="digit">0</div></div></div><div id="countdown_dashboardwaittimer'+i+'" class="timertoppadbid"><div class="dash hours_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash minutes_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash seconds_dash"><div class="digit">0</div><div class="digit">0</div></div></div><b id="getBidId"><p id="EnbDis'+i+'" class="ui-li-desc"></p></b><p style="display:none;"><b id="bidStatus'+i+'"></b><b id="decStatus'+i+'"></b><b id="bidbreakdownLatitude'+i+'">'+HelpListEach.breckdown_cur_latitude+'</b><b id="bidbreakdownLongitude'+i+'">'+HelpListEach.breckdown_cur_longitude+'</b><b id="bidProbId'+i+'">'+HelpListEach.prob_id+'</b><b id="bidUsrId'+i+'">'+HelpListEach.cust_id+'</b><b id="hlddistance'+i+'">'+nvdistance+'</b><b id="hldadditinfo'+i+'">'+additionalinfo+'</b><b id="hldvehinfo'+i+'">'+myVehicleInfo+'</b><b id="hldsecaddrlat'+i+'">'+HelpListEach.sec_cur_latitude+'</b><b id="hldsecaddrlng'+i+'">'+HelpListEach.sec_cur_longitude+'</b><b id="hldfromaddr'+i+'">'+HelpListEach.latlng_address+'</b><b id="hldtoaddr'+i+'">'+HelpListEach.sec_latlng_address+'</b></p></li><div style="clear:both; height:6px;"></div>');
                         
						 
                         
						 
                         
                         }
                         
                         
                         
                         if(HelpListEach.status=="Yes")
                         
                         {
                         
                         if(HelpListEach.prov_select_status=="Yes")
                         
                         {
                         
                         if(HelpListEach.status1=="Yes")
                         
                         {
                         
                         $("#userName"+i+"").show();
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+SelBtnTxt+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidRedCls");
                         
                         $("#HOL"+i+"").removeClass("BidGrayCls");
                         
                         $("#HOL"+i+"").addClass("BidGreenCls");
                         
                         $("#HOL"+i+" a").show();
                         
                         }
                         
                         else
                         
                         {
                         
                         $("#userName"+i+"").hide();
                         
                         if(HelpListEach.decline=="Yes")
                         
                         {
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+BidDecTxt+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidGreenCls");
                         
                         $("#HOL"+i+"").removeClass("BidRedCls");
                         
                         $("#HOL"+i+"").addClass("BidGrayCls");
                         
                         }
                         
                         else
                         
                         {
                         
                         if(nvTime=="" && nvPrice=="")
                         
                         {
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+BidEndbtn+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidGreenCls");
                         
                         $("#HOL"+i+"").removeClass("BidRedCls");
                         
                         $("#HOL"+i+"").addClass("BidGrayCls");
                         
                         }
                         
                         else
                         
                         {
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+NotSelBtnTxt+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidGrayCls");
                         
                         $("#HOL"+i+"").removeClass("BidGreenCls");
                         
                         $("#HOL"+i+"").addClass("BidRedCls");
                         
                         }
                         
                         }
                         
                         }
                         
                         }
                         
                         else
                         
                         {
                         
                         if(HelpListEach.status1=="No")
                         
                         {
                         
                         $("#userName"+i+"").hide();
                         
                         if(HelpListEach.decline=="Yes")
                         
                         {
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+BidDecTxt+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidGreenCls");
                         
                         $("#HOL"+i+"").removeClass("BidRedCls");
                         
                         $("#HOL"+i+"").addClass("BidGrayCls");
                         
                         }
                         
                         else
                         
                         {
                         
                         if(HelpListEach.help_timeout=="Yes")
                         
                         {
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+BidEndbtn+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidGreenCls");
                         
                         $("#HOL"+i+"").removeClass("BidRedCls");
                         
                         $("#HOL"+i+"").addClass("BidGrayCls");
                         
                         }
                         
                         else
                         
                         {
                         
                         var nvSecwait = parseInt(HelpListEach.waitTimeDiff);
                         
                         if(nvSecwait>=0)
                         
                         {
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+BidRecBtnTxt+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidGreenCls");
                         
                         $("#HOL"+i+"").removeClass("BidRedCls");
                         
                         $("#HOL"+i+"").addClass("BidGrayCls");
                         
                         $("#countdown_dashboardwaittimer"+i+"").show();
                         
                         }
                         
                         else
                         
                         {
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+userhasnotmodetxt+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidGreenCls");
                         
                         $("#HOL"+i+"").removeClass("BidGrayCls");
                         
                         $("#HOL"+i+"").addClass("BidRedCls");
                         
                         $("#countdown_dashboardwaittimer"+i+"").hide();
                         
                         }
                         
                         }
                         
                         }
                         
                         }
                         
                         }
                         
                         }
                         
                         else
                         
                         {
                         
                         $("#EnbDis"+i+"").html('<a href="#" id="'+i+'"><div class="ui-shadow ui-btn-corner-all ui-btn-up-b bigbutton">Quote</div></a><span id='+i+'><div style="padding:6px 10px;" class="ui-shadow ui-btn-corner-all ui-btn-up-r">Decline</div></span>');
                         
                         $("#userName"+i+"").hide();
                         
                         var nvSec = parseInt(HelpListEach.TimeDiff);
                         
                         if(nvSec>=0)
                         
                         {
                         
                         $("#countdown_dashboard"+i+"").show();
                         
                         $('#countdown_dashboard'+i+'').countDown({
                                                                  
                                                                  targetOffset: {
                                                                  
                                                                  'day': 0,
                                                                  
                                                                  'month': 0,
                                                                  
                                                                  'year': 0,
                                                                  
                                                                  'hour': 0,
                                                                  
                                                                  'min': 0,
                                                                  
                                                                  'sec': nvSec,
                                                                  
                                                                  'utc': true
                                                                  
                                                                  },
                                                                  
                                                                  onComplete: function() {
                                                                  
                                                                  $("#countdown_dashboardwaittimer"+i+"").stopCountDown();
                                                                  
                                                                  HelpRequestTimeOutFun(i,HelpListEach.cust_id);
                                                                  
                                                                  }
                                                                  
                                                                  });
                         
                         }
                         
                         }
                         
                         
                         
                         var nvSecwait = parseInt(HelpListEach.waitTimeDiff);
                         
                         if(nvSecwait>=0)
                         
                         {
                         
                         $('#countdown_dashboardwaittimer'+i+'').countDown({
                                                                           
                                                                           targetOffset: {
                                                                           
                                                                           'day': 0,
                                                                           
                                                                           'month': 0,
                                                                           
                                                                           'year': 0,
                                                                           
                                                                           'hour': 0,
                                                                           
                                                                           'min': 0,
                                                                           
                                                                           'sec': nvSecwait,
                                                                           
                                                                           'utc': true
                                                                           
                                                                           },
                                                                           
                                                                           onComplete: function() {
                                                                           
                                                                           $("#countdown_dashboardwaittimer"+i+"").hide();
                                                                           
                                                                           $("#countdown_dashboardwaittimer"+i+"").stopCountDown();
                                                                           
                                                                           var bid = HelpListEach.bids_id;
                                                                           
                                                                           UpdBidsListFun(bid,i,"","");
                                                                           
                                                                           }
                                                                           
                                                                           });
                         
                         }
                         
                         
                         
                         DisplaySmallMapJobsListFun(HelpListEach.breckdown_cur_latitude,HelpListEach.breckdown_cur_longitude,"mapId"+i,"directions"+i,"150px","150px","sphelplistmain");
                         
                         b = b+1;
                         
                         }
                         
                         $('#load_more_button').show();
                         
                         });
                  
                  
                  
                  //$("#helpListDataId").listview("refresh");
                  
                  listSelector = "div.pull-demo-page ul.ui-listview";
                  
                  $(listSelector).listview("refresh");  // Prepend new content and refresh listview
                  
                  $(listSelector).listview("refresh");  // Prepend new content and refresh listview
                  
                  });
        
		if(PUSH!="PUSH" && HId!="")
            
		{
            
			updatehelprequeststatusfun(HId,"");
            
		}
        
		
        
	}
    
}



function updatehelprequeststatusfun(UpdHId,ALRUHId)

{
    
	var nvLocSes = sessionStorage.current;
    
	if(nvLocSes!="" && nvLocSes!=undefined)
        
	{
        
		var l = 1;
        
		$.getJSON(""+Url+"?get=TextHelpOfList&TwId="+nvLocSes+"&UHId="+UpdHId+"&LUHId="+ALRUHId,function(result){
                  
                  $.each(result.HelpList, function(index, HelpListEach){
                         
                         var i = HelpListEach.help_id;
                         
                         
                         
                         GetUserNameFun(HelpListEach.cust_id,"userName"+i);
                         
                         $("#countdown_dashboard"+i+"").stopCountDown();
                         
                         $("#countdown_dashboardwaittimer"+i+"").stopCountDown();
                         
                         $("#countdown_dashboard"+i+"").hide();
                         
                         $("#countdown_dashboardwaittimer"+i+"").hide();
                         
                         
                         
                         var nvTime = "";
                         
                         if(HelpListEach.time!="")
                         
                         {
                         
                         var nvTime = "<b>Time Quoted : </b>"+HelpListEach.time+" minutes";
                         
                         if(HelpListEach.time==undefined)
                         
                         {
                         
                         var nvTime = "";
                         
                         }
                         
                         }
                         
                         var nvPrice = "";
                         
                         if(HelpListEach.price!="")
                         
                         {
                         
                         var nvPrice = "<b>Amount Quoted : </b>$"+HelpListEach.price+"";
                         
                         if(HelpListEach.price==undefined)
                         
                         {
                         
                         var nvPrice = "";
                         
                         }
                         
                         }
                         
                         
                         
                         if(HelpListEach.status=="Yes")
                         
                         {
                         
                         $("#countdown_dashboard"+i+"").stopCountDown();
                         
                         $("#countdown_dashboardwaittimer"+i+"").stopCountDown();
                         
                         $("#countdown_dashboard"+i+"").hide();
                         
                         $("#countdown_dashboardwaittimer"+i+"").hide();
                         
                         
                         
                         if(HelpListEach.prov_select_status=="Yes")
                         
                         {
                         
                         if(HelpListEach.status1=="Yes")
                         
                         {
                         
                         $("#userName"+i+"").show();
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+SelBtnTxt+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidRedCls");
                         
                         $("#HOL"+i+"").removeClass("BidGrayCls");
                         
                         $("#HOL"+i+"").addClass("BidGreenCls");
                         
                         //$("#HOL"+i+" a").show();
                         
                         }
                         
                         else
                         
                         {
                         
                         $("#userName"+i+"").hide();
                         
                         if(HelpListEach.decline=="Yes")
                         
                         {
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+BidDecTxt+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidGreenCls");
                         
                         $("#HOL"+i+"").removeClass("BidRedCls");
                         
                         $("#HOL"+i+"").addClass("BidGrayCls");
                         
                         }
                         
                         else
                         
                         {
                         
                         if(nvTime=="" && nvPrice=="")
                         
                         {
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+BidEndbtn+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidGreenCls");
                         
                         $("#HOL"+i+"").removeClass("BidRedCls");
                         
                         $("#HOL"+i+"").addClass("BidGrayCls");
                         
                         }
                         
                         else
                         
                         {
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+NotSelBtnTxt+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidGrayCls");
                         
                         $("#HOL"+i+"").removeClass("BidGreenCls");
                         
                         $("#HOL"+i+"").addClass("BidRedCls");
                         
                         }
                         
                         }
                         
                         }
                         
                         }
                         
                         else
                         
                         {
                         
                         if(HelpListEach.status1=="No")
                         
                         {
                         
                         $("#userName"+i+"").hide();
                         
                         if(HelpListEach.decline=="Yes")
                         
                         {
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+BidDecTxt+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidGreenCls");
                         
                         $("#HOL"+i+"").removeClass("BidRedCls");
                         
                         $("#HOL"+i+"").addClass("BidGrayCls");
                         
                         }
                         
                         else
                         
                         {
                         
                         if(HelpListEach.help_timeout=="Yes")
                         
                         {
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+BidEndbtn+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidGreenCls");
                         
                         $("#HOL"+i+"").removeClass("BidRedCls");
                         
                         $("#HOL"+i+"").addClass("BidGrayCls");
                         
                         }
                         
                         else
                         
                         {
                         
                         var nvSecwait = parseInt(HelpListEach.waitTimeDiff);
                         
                         if(nvSecwait>=0)
                         
                         {
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+BidRecBtnTxt+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidGreenCls");
                         
                         $("#HOL"+i+"").removeClass("BidRedCls");
                         
                         $("#HOL"+i+"").addClass("BidGrayCls");
                         
                         $("#countdown_dashboardwaittimer"+i+"").show();
                         
                         }
                         
                         else
                         
                         {
                         
                         $("#EnbDis"+i+"").html('<p class="yellowmsg ui-li-desc">'+userhasnotmodetxt+'</p>');
                         
                         $("#HOL"+i+"").removeClass("BidGreenCls");
                         
                         $("#HOL"+i+"").removeClass("BidGrayCls");
                         
                         $("#HOL"+i+"").addClass("BidRedCls");
                         
                         $("#countdown_dashboardwaittimer"+i+"").hide();
                         
                         }
                         
                         }
                         
                         }
                         
                         }
                         
                         }
                         
                         if(ALRUHId!="")
                         
                         {
                         
                         $("#HOLTM"+i+"").html(nvTime);
                         
                         $("#HOLPR"+i+"").html(nvPrice);
                         
                         }
                         
                         }
                         
                         else
                         
                         {
                         
                         $("#countdown_dashboard"+i+"").stopCountDown();
                         
                         $("#countdown_dashboardwaittimer"+i+"").stopCountDown();
                         
                         $("#countdown_dashboard"+i+"").hide();
                         
                         $("#countdown_dashboardwaittimer"+i+"").hide();
                         
                         
                         
                         $("#EnbDis"+i+"").html('<a href="#" id="'+i+'"><div class="ui-shadow ui-btn-corner-all ui-btn-up-b bigbutton">Quote</div></a><span id='+i+'><div class="ui-shadow ui-btn-corner-all ui-btn-up-r">Decline</div></span>');
                         
                         $("#userName"+i+"").hide();
                         
                         var nvSec = parseInt(HelpListEach.TimeDiff);
                         
                         if(nvSec>=0)
                         
                         {
                         
                         $("#countdown_dashboard"+i+"").show();
                         
                         $('#countdown_dashboard'+i+'').countDown({
                                                                  
                                                                  targetOffset: {
                                                                  
                                                                  'day': 0,
                                                                  
                                                                  'month': 0,
                                                                  
                                                                  'year': 0,
                                                                  
                                                                  'hour': 0,
                                                                  
                                                                  'min': 0,
                                                                  
                                                                  'sec': nvSec,
                                                                  
                                                                  'utc': true
                                                                  
                                                                  },
                                                                  
                                                                  onComplete: function() {
                                                                  
                                                                  $("#countdown_dashboardwaittimer"+i+"").stopCountDown();
                                                                  
                                                                  HelpRequestTimeOutFun(i,HelpListEach.cust_id);
                                                                  
                                                                  }
                                                                  
                                                                  });
                         
                         }
                         
                         }
                         
                         
                         
                         var nvSecwait = parseInt(HelpListEach.waitTimeDiff);
                         
                         if(nvSecwait>=0)
                         
                         {
                         
                         $('#countdown_dashboardwaittimer'+i+'').countDown({
                                                                           
                                                                           targetOffset: {
                                                                           
                                                                           'day': 0,
                                                                           
                                                                           'month': 0,
                                                                           
                                                                           'year': 0,
                                                                           
                                                                           'hour': 0,
                                                                           
                                                                           'min': 0,
                                                                           
                                                                           'sec': nvSecwait,
                                                                           
                                                                           'utc': true
                                                                           
                                                                           },
                                                                           
                                                                           onComplete: function() {
                                                                           
                                                                           $("#countdown_dashboardwaittimer"+i+"").hide();
                                                                           
                                                                           $("#countdown_dashboardwaittimer"+i+"").stopCountDown();
                                                                           
                                                                           var bid = HelpListEach.bids_id;
                                                                           
                                                                           UpdBidsListFun(bid,i,"","");
                                                                           
                                                                           }
                                                                           
                                                                           });
                         
                         }
                         
                         });
                  
                  });
        
	}
    
}



function ProviderDeviceRegiterFun()

{
    
	var devRegId = $('#devRegId').val();
    
	var nvSerProSesId = sessionStorage.current;
    
	if(nvSerProSesId!=undefined)
        
	{
        
		$.ajax({
               
               type: 'POST',
               
               data: 'DevId='+devRegId+'&UsrId='+nvSerProSesId+'&FormType=UpdProvDevRegId',
               
               url: Url,
               
               success: function(Udata){
               
               //console.log(Udata);
               
               },
               
               error: function(){
               
               //console.log(data);
               
               //alert('There was an error in register form');
               
               }
               
               });
        
		return false;
        
	}
    
}

//sir logic and ketan



function GetUserNameFun(nvUserId,Id)

{
    
	$.getJSON(""+Url+"?get=getUserName&Us_Id="+nvUserId,function(result){
              
              $.each(result.userNameList, function(index, userNameListEach){
                     
                     //$('#'+Id+'').html(userNameListEach.username+' -&nbsp;'+userNameListEach.mobile);
                     
					 $('#'+Id+'').html(userNameListEach.username+' -&nbsp;<a href="tel:'+userNameListEach.mobile+'">'+userNameListEach.mobile+'</a>');
                     
                     });
              
              });
    
}



function GetProbNameFun(ProbId,Id)

{
    
	$.getJSON(""+Url+"?get=getProbName&Pro_Id="+ProbId,function(result){
              
              $.each(result.probName, function(index, probNameEach){
                     
                     $('#'+Id+'').html("<b>"+probNameEach.problem_name+"</b>");
                     
                     });
              
              });
    
}



function GetProvNameFun(nvProvId,Id)

{
    
	$.getJSON(""+Url+"?get=getProvName&Pro_Id="+nvProvId,function(result){
              
              $.each(result.provNameList, function(index, provNameListEach){
                     
                     $('#'+Id+'').html(provNameListEach.prov_name);
                     
                     });
              
              });
    
}



function DisplayBigMap(a,b,getById,Dir,W,H,MainDivId)

{
    
	var Clat = $('#popProLatitude').val();
    
	var Clon = $('#popProlongitude').val();
    
    
    
    directionsDisplay = new google.maps.DirectionsRenderer();
    
    var center = new google.maps.LatLng(a, b);
    
    var mapOptions = {
        
    zoom:12,
        
    mapTypeId: google.maps.MapTypeId.ROADMAP,
        
    scrollwheel:false,
        
	panControl: false,
        
    center: center
        
    }
    
    map = new google.maps.Map(document.getElementById(''+getById+''), mapOptions);
    
    var marker=new google.maps.Marker({position:center,map:map,title:"User are here!",icon: 'http://maps.google.com/mapfiles/ms/micons/red-dot.png'});
    
    directionsDisplay.setMap(map);
    
    
    
	var summaryPanel = document.getElementById(''+Dir+'');
    
	summaryPanel.innerHTML = '';
    
    var request = {
        
		origin : new google.maps.LatLng(Clat, Clon),
        
    destination: new google.maps.LatLng(a, b),
        
    optimizeWaypoints: true,
        
    travelMode: google.maps.DirectionsTravelMode.DRIVING
        
    };
    
    directionsService.route(request, function(response, status) {
                            
                            if (status == google.maps.DirectionsStatus.OK) {
                            
                            directionsDisplay.setDirections(response);
                            
                            var route = response.routes[0];
                            
                            for (var i = 0; i < route.legs.length; i++) {
                            
                            var routeSegment = i + 1;
                            
                            summaryPanel.innerHTML += route.legs[i].distance.text + '&nbsp;';
                            
                            summaryPanel.innerHTML += route.legs[i].duration.text + '';
                            
                            }
                            
                            }
                            
                            });
    
    return false;
    
}



function DisplaySmallMap(a,b,getById,Dir,W,H,MainDivId)

{
    
	var Clat = $('#popProLatitude').val();
    
	var Clon = $('#popProlongitude').val();
    
	
    
	var summaryPanel = document.getElementById(''+Dir+'');
    
	summaryPanel.innerHTML = '';
    
    var request = {
        
		origin : new google.maps.LatLng(a, b),
        
    destination: new google.maps.LatLng(Clat,Clon),
        
    optimizeWaypoints: true,
        
    travelMode: google.maps.DirectionsTravelMode.DRIVING
        
    };
    
	directionsService.route(request, function(response, status) {
                            
                            if (status == google.maps.DirectionsStatus.OK) {
                            
                            //directionsDisplay.setDirections(response);
                            
                            var route = response.routes[0];
                            
                            for (var i = 0; i < route.legs.length; i++) {
                            
                            var	dist = route.legs[i].distance.text;
                            
                            var routeSegment = i + 1;
                            
                            summaryPanel.innerHTML += route.legs[i].distance.text + '&nbsp;';
                            
                            summaryPanel.innerHTML += route.legs[i].duration.text + '';
                            
                            }
                            
                            }
                            
                            });
    
	
    
	$('#'+getById+'').html('<img src="http://maps.googleapis.com/maps/api/staticmap?center='+a+','+b+'&zoom=14&size=150x150&maptype=roadmap&markers=color:blue%7Clabel:U%7C'+a+','+b+'&sensor=false&key=AIzaSyCauZSkGgnTM75hBM_8Fldn36rsKBHG3xI" />');
    
    
    
	/*var mobileDemo = { 'center': ''+a+','+b+'', 'zoom': 11 };
     
     demo.add(''+MainDivId+'', function() {
     
     $('#'+getById+'').gmap({'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI':false, 'draggable': false, 'scaleControl': false, 'scrollwheel': false, 'disableDoubleClickZoom': true, 'callback': function() {
     
     var self = this;
     
     self.addMarker({'position': this.get('map').getCenter(), title: "User", icon : 'http://maps.google.com/mapfiles/ms/micons/red-dot.png' });
     
     //self.addMarker({'position': new google.maps.LatLng(Clat,Clon), title: "Provider", icon : 'http://maps.google.com/mapfiles/ms/micons/blue-dot.png'});
     
     }});
     
     }).load(''+MainDivId+'');
     
     
     
     $('#'+MainDivId+'').live('pageshow', function() {
     
     demo.add(''+MainDivId+'', function() { $('#'+getById+'').gmap('refresh'); }).load(''+MainDivId+'');
     
     });*/
    
}



function DisplaySmallMapJobsListFun(a,b,getById,Dir,W,H,MainDivId)

{
    
	var nvWid = $(window).width()-55;
    
	
    
	var Clat = $('#popProLatitude').val();
    
	var Clon = $('#popProlongitude').val();
    
	
    
    var request = {
        
		origin : new google.maps.LatLng(a, b),
        
    destination: new google.maps.LatLng(Clat,Clon),
        
    optimizeWaypoints: true,
        
    travelMode: google.maps.DirectionsTravelMode.DRIVING
        
    };
    
	directionsService.route(request, function(response, status) {
                            
                            if (status == google.maps.DirectionsStatus.OK) {
                            
                            //directionsDisplay.setDirections(response);
                            
                            var route = response.routes[0];
                            
                            for (var i = 0; i < route.legs.length; i++) {
                            
                            var	dist = route.legs[i].distance.text;
                            
                            var routeSegment = i + 1;
                            
                            $('#'+Dir+'').html(route.legs[i].distance.text+'&nbsp;'+route.legs[i].duration.text);
                            
                            return false;
                            
                            }
                            
                            }
                            
                            });
    
	
    
	if(a=="" && b=="")
        
	{
        
        $('#'+getById+'').attr('src','http://maps.googleapis.com/maps/api/staticmap?center=21.481185,-157.956619&zoom=14&size='+nvWid+'x145&maptype=roadmap&markers=icon:http://towchoice.com/demo/quotes/images/iconcar.png%7C21.481185,-157.956619&sensor=false&key=AIzaSyCauZSkGgnTM75hBM_8Fldn36rsKBHG3xI');
        
	}
    
	else
        
	{
        
		$('#'+getById+'').attr('src','http://maps.googleapis.com/maps/api/staticmap?center='+a+','+b+'&zoom=14&size='+nvWid+'x145&maptype=roadmap&markers=icon:http://towchoice.com/demo/quotes/images/iconcar.png%7C'+a+','+b+'&sensor=false&key=AIzaSyCauZSkGgnTM75hBM_8Fldn36rsKBHG3xI');
        
	}
    
	//alert(a);
    
	
    
    
    
	/*var mobileDemo = { 'center': ''+a+','+b+'', 'zoom': 11 };
     
     demo.add(''+MainDivId+'', function() {
     
     $('#'+getById+'').gmap({'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI':false, 'draggable': false, 'scaleControl': false, 'scrollwheel': false, 'disableDoubleClickZoom': true, 'callback': function() {
     
     var self = this;
     
     self.addMarker({'position': this.get('map').getCenter(), title: "User", icon : 'http://maps.google.com/mapfiles/ms/micons/red-dot.png' });
     
     //self.addMarker({'position': new google.maps.LatLng(Clat,Clon), title: "Provider", icon : 'http://maps.google.com/mapfiles/ms/micons/blue-dot.png'});
     
     }});
     
     }).load(''+MainDivId+'');
     
     
     
     $('#'+MainDivId+'').live('pageshow', function() {
     
     demo.add(''+MainDivId+'', function() { $('#'+getById+'').gmap('refresh'); }).load(''+MainDivId+'');
     
     });*/
    
}



function GetSerProListOfJobsLastUpdFun(LId)

{
    
	var nvLocSes = sessionStorage.current;
    
	if(nvLocSes!="" && nvLocSes!=undefined)
        
	{
        
		var OJId = $("#jobsListDataId li:first").attr('id');
        
		$.getJSON(""+Url+"?get=JobsList&Date="+LId+"&ProId="+nvLocSes,function(result){
                  
                  $.each(result.JobList, function(index, JobsListEach){
                         
                         var NJId = "JOL"+JobsListEach.bids_id;
                         
                         
                         
                         if(OJId!=NJId)
                         
                         {
                         
                         var i = JobsListEach.bids_id;
                         
                         GetUserNameFun(JobsListEach.cust_id,"userNameLOJ"+i);
                         
                         GetProbNameFun(JobsListEach.prob_id,"probNameLOJ"+i);
                         
                         $("#LastUpSelJobId").html(JobsListEach.selected_datetime);
                         
                         
                         
						 var nvLocVar = "<b>Location : </b>";
                         
                         if(JobsListEach.prob_id=="1")
                         
                         {
                         
                         var nvLocVar = "<b>From : </b>";
                         
                         }
                         
						 
                         
                         myAddress= nvLocVar+""+JobsListEach.latlng_address;
                         
                         if(JobsListEach.sec_latlng_address=="")
                         
                         {
                         
                         myAddress=myAddress;
                         
                         }
                         
                         else
                         
                         {
                         
                         myAddress= myAddress+' </p><p class="ui-li-desc"><b>To :</b> '+JobsListEach.sec_latlng_address;
                         
                         }
                         
                         
                         
                         myVehicleInfo="";
                         
                         if(JobsListEach.car_year!="")
                         
                         {
                         
                         myVehicleInfo= JobsListEach.car_year+" / ";
                         
                         }
                         
                         if(JobsListEach.car_make!="")
                         
                         {
                         
                         myVehicleInfo= myVehicleInfo+""+JobsListEach.car_make+" / ";
                         
                         }
                         
                         if(JobsListEach.car_model!="")
                         
                         {
                         
                         myVehicleInfo= myVehicleInfo+""+JobsListEach.car_model+" / ";
                         
                         }
                         
                         var strLen = myVehicleInfo.length;
                         
                         myVehicleInfo = myVehicleInfo.slice(0,strLen-1);
                         
                         
                         
                         myVehiclecolor="";
                         
                         if(JobsListEach.car_color!="")
                         
                         {
                         
                         myVehiclecolor= JobsListEach.car_color;
                         
                         }
                         
                         
                         
                         myVehicleModInfo="";
                         
                         if(JobsListEach.carmodification_detail!="")
                         
                         {
                         
                         myVehicleModInfo= JobsListEach.carmodification_detail;
                         
                         }
                         
                         
                         
                         var nvOthVcl = "";
                         
                         if(JobsListEach.other_vehicle!="")
                         
                         {
                         
                         var nvOthVcl = JobsListEach.other_vehicle;
                         
                         if(JobsListEach.other_vehicle==undefined)
                         
                         {
                         
                         var nvOthVcl = "";
                         
                         }
                         
                         }
                         
                         
                         
                         var additionalinfo = "";
                         
                         if(JobsListEach.additionalInfo!="")
                         
                         {
                         
                         var additionalinfo = "<b>Comment : </b>"+JobsListEach.additionalInfo;
                         
                         }
                         
                         
                         
						 var nvdistance = "";
                         
                         if(JobsListEach.distance!="")
                         
                         {
                         
                         var nvdistance = "<b>Estimated Distance : </b>"+JobsListEach.distance;
                         
                         }
                         
                         //$("#jobsListDataId").prepend('<div class="map" id="mapLOJId'+i+'"></div><div class="rd"><ul><li id="userNameLOJ'+i+'"></li><li id="probNameLOJ'+i+'"></li><li>'+JobsListEach.time+' minutes</li><li>$'+JobsListEach.price+'</li><li>'+JobsListEach.selected_datetime+'</li><li>'+JobsListEach.latlng_address+'</li><li><div id="directionsLOJ'+i+'"></div></li></ul><div class="clr"></div>');
                         
                         //$("#jobsListDataId").prepend('<li class="ui-li ui-li-static ui-btn-up-c ui-li-has-thumb" id="JOL'+JobsListEach.bids_id+'"><img src="" width="150" height="150" class="ui-li-thumb ui-corner-tl" id="mapLOJId'+i+'" /><p class="ui-li-desc" id="userNameLOJ'+i+'"></p><p class="ui-li-desc" id="probNameLOJ'+i+'"></p><p class="ui-li-desc">'+myAddress+'</p><p class="ui-li-desc">'+myVehicleInfo+'</p><p class="ui-li-desc">'+myVehicleModInfo+'</p><p class="ui-li-desc">'+garpark+'</p><p class="ui-li-desc">'+militarybase+'</p><p class="ui-li-desc">'+nearestshop+'</p><p class="ui-li-desc">'+nvOthVcl+'</p><p class="ui-li-desc">'+JobsListEach.additionalInfo+'</p><p class="ui-li-desc">'+JobsListEach.selected_datetime+'</p><p class="ui-li-desc">'+JobsListEach.time+' minutes</p><p class="ui-li-desc">$'+JobsListEach.price+'</p><p class="ui-li-desc" id="directionsLOJ'+i+'">--</p></li>');
                         
                         $("#jobsListDataId").prepend('<li class="ui-li ui-li-static ui-btn-up-c ui-li-has-thumb" id="JOL'+JobsListEach.bids_id+'"><span class="jobviewinfohelp"><img src="images/mapzoom.png" id="'+i+'" /></span><img src="" height="150" class="ui-li-thumb ui-corner-tl" id="mapLOJId'+i+'" /><p class="ui-li-desc" id="userNameLOJ'+i+'"></p><p class="ui-li-desc" id="probNameLOJ'+i+'"></p><p class="ui-li-desc">'+myAddress+'</p><p class="ui-li-desc">'+nvdistance+'</p><p class="ui-li-desc">'+additionalinfo+'</p><p class="ui-li-desc">'+myVehicleInfo+' '+myVehiclecolor+'</p><p class="ui-li-desc">'+myVehicleModInfo+'</p><p class="ui-li-desc">'+nvOthVcl+'</p><p class="ui-li-desc">'+JobsListEach.Seldateformat+'</p><p class="ui-li-desc"><b>Amount Quoted : </b>$'+JobsListEach.price+' minutes</p><p class="ui-li-desc"><b>Time Quoted : </b>'+JobsListEach.time+'</p><p style="display:none;"><b id="jobfromlat'+i+'">'+JobsListEach.breckdown_cur_latitude+'</b><b id="jobfromlng'+i+'">'+JobsListEach.breckdown_cur_longitude+'</b><b id="jobtolat'+i+'">'+JobsListEach.sec_cur_latitude+'</b><b id="jobtolng'+i+'">'+JobsListEach.sec_cur_longitude+'</b></p></li>');
                         
                         //$("#jobsListDataId").prepend('<li>ddd</li>');
                         
                         DisplaySmallMapJobsListFun(JobsListEach.breckdown_cur_latitude,JobsListEach.breckdown_cur_longitude,"mapLOJId"+i,"directionsLOJ"+i,"150px","150xp","spjoblistmain");
                         
                         }
                         
                         //OJId = "JOL"+JobsListEach.bids_id;
                         
                         });
                  
                  //$("#jobsListDataId").listview("refresh");
                  
                  listSelector = "div.pull-demo-page ul.ui-listview";
                  
                  $(listSelector).listview("refresh");  // Prepend new content and refresh listview
                  
                  });
        
	}
    
}



function GetListOfHelpAsg(HelpId)

{
    
	$('#time').val('');
    
	$('#chargePrice').val('');
    
	var date = new Date();
    
	Ye = date.getFullYear();
    
	Mo = date.getMonth()+1;
    
	Da = date.getDate();
    
	Ho = date.getHours();
    
	Mi = date.getMinutes();
    
	Se = date.getSeconds();
    
	CurrenDate = Ye+"-"+Mo+"-"+Da+" "+Ho+":"+Mi+":"+Se;
    
	$.getJSON(""+Url+"?get=ProviderHelpInfo&HId="+HelpId,function(result){
              
              $.each(result.HelpListPop, function(index, HelpListPopEach){
                     
                     $("#hiddePopData").html('<input type="hidden" name="breakdownLatitude" id="breakdownLatitude" value="'+HelpListPopEach.breckdown_cur_latitude+'" /><input type="hidden" name="breakdownLongitude" id="breakdownLongitude" value="'+HelpListPopEach.breckdown_cur_longitude+'" /><input type="hidden" name="prob_id" id="prob_id" value="'+HelpListPopEach.prob_id+'" /><input type="hidden" name="help_id" id="help_id" value="'+HelpListPopEach.help_id+'" /><input type="hidden" name="cust_id" id="cust_id" value="'+HelpListPopEach.cust_id+'" /><input type="hidden" name="dateHelp" id="dateHelp" value="'+CurrenDate+'" />');
                     
                     
                     
                     });
              
              });
    
}



function SubmitBidDataFun()

{
    
	var nvTime = $('#time').val();
    
	var nvChargePrice = $('#chargePrice').val();
    
	if(nvTime=="")
        
	{
        
		$("#timeerrorMsg").show();
        
		//$("#timeerrorMsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	if(nvChargePrice=="")
        
	{
        
		$("#priceerrorMsg").show();
        
		//$("#priceerrorMsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
   	var HeId = $('#help_id').val();
    
	if(nvTime.length>0 && nvChargePrice.length>0)
        
	{
        
		var nvLocSes = sessionStorage.current;
        
		$("#countdown_dashboard"+HeId+"").stopCountDown();
        
		$("#subBidDataButton").addClass('ui-disabled');
        
        var postData = $('#popupbidrep form').serialize();
        
        $.ajax({
               
               type: 'POST',
               
               data: postData+'&FormType=InstAdminHelp',
               
               url: Url,
               
               success: function(data){
               
               //console.log(data);
               
               $("#countdown_dashboard"+HeId+"").stopCountDown();
               
               if(data=="Not")
               
               {
               
               $("#subBidDataButton").removeClass('ui-disabled');
               
               $("#countdown_dashboard"+HeId+"").stopCountDown();
               
               //$.mobile.changePage("#sphelplistmain", {transition: "slide"});
               
               $.mobile.changePage($("#sphelplistmain"));
               
               }
               
               else
               
               {
               
               $("#countdown_dashboard"+HeId+"").stopCountDown();
               
               handleNotifyButtonClick(data);
               
               $("#countdown_dashboard"+HeId+"").hide();
               
               $("#countdown_dashboardwaittimer"+HeId+"").show();
               
               $("#HOL"+HeId+"").removeClass("BidRedCls");
               
               $("#HOL"+HeId+"").removeClass("BidGreenCls");
               
               $("#HOL"+HeId+"").addClass("BidGrayCls");
               
               
               
               $('#HOLTM'+HeId+'').html("<b>Time Quoted : </b>"+nvTime+" minutes");
               
               $('#HOLPR'+HeId+'').html("<b>Amount Quoted : </b>$"+nvChargePrice+"");
               
               $("#bidStatus"+HeId+"").html("Yes");
               
               $("#EnbDis"+HeId+"").html('<p class="yellowmsg ui-li-desc">'+BidRecBtnTxt+'</p>');
               
               var alertmsg = "Your quote was submitted successfully.";
               //alert(alertmsg);
               navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
               
               var nvAlrSubBid = "ALREADYSUBBID,"+HeId+","+nvLocSes+"";
               
               handleNotifyButtonClick(nvAlrSubBid);
               
               $("#countdown_dashboard"+HeId+"").stopCountDown();
               
               $("#subBidDataButton").removeClass('ui-disabled');
               
               window.history.back();
               
               return false;
               
               }
               
               },
               
               error: function(){
               
               //console.log(data);
               
               //alert('There was an error in register form');
               
               }
               
               });
        
        return false;
        
	}
    
}



function OnClickSucc(UserData,errId)

{
    
	var nvUserData = $.trim(UserData);
    
	if(nvUserData.length == 0)
        
	{
        
		$('#'+errId+'').hide();
        
	}
    
}



function OnClickError(UserData,errId)

{
    
	var nvUserData = $.trim(UserData);
    
	if(nvUserData.length == 0)
        
	{
        
		$('#'+errId+'').show();
        
		//$('#'+errId+'').html("<div style='color:#FF0000;'>This field is required.</div>");
        
	}
    
}



function OnChangeSucc(UserData,chanId)

{
    
	var nvUserData = $.trim(UserData);
    
	if(nvUserData.length == 0)
        
	{
        
		$('#'+chanId+'').show();
        
		//$('#'+chanId+'').html("<div style='color:#FF0000;'>This field is required.</div>");
        
	}
    
	else
        
	{
        
		$('#'+chanId+'').hide();
        
	}
    
}



function OnClickSuccEmail(email,errId)

{
    
	var address = $.trim(email);
    
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    
	//var address = document.forms[formName].elements[inpId].value;
    
	if(reg.test(address) == false) {
        
        $('#'+errId+'').hide();
        
    }
    
}



function OnClickErrorEmail(email,errId)

{
    
	var address = $.trim(email);
    
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    
	//var address = document.forms[formName].elements[inpId].value;
    
	if(reg.test(address) == false) {
        
		$('#'+errId+'').show();
        
		//$('#'+errId+'').html("<div style='color:#FF0000;'>Email address invalid.</div>");
        
    }
    
}



function OnKeyPressFun(Retype,formName,elementName){
    
	var Email = document.forms[formName].elements[elementName].value;
    
	if(Email!=Retype)
        
	{
        
		$("#errorMsgRePass").show();
        
		//$("#errorMsgRePass").html("<div style='color:#FF0000;'>Password does not match.</div>");
        
	}
    
	else
        
	{
        
		$("#errorMsgRePass").hide();
        
	}
    
}



function find_scriptEmail(Email)

{
    
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    
	if(reg.test(Email) == false)
        
	{
        
		return false;
        
	}
    
	else
        
	{
        
		return true;
        
	}
    
}



function isNumberKey(evt)

{
    
	var charCode = (evt.which) ? evt.which : event.keyCode
    
	if (charCode > 31 && (charCode < 48 || charCode > 57))
        
	{
        
		//$("#errorMsgMobile").show();
        
		//$("#errorMsgMobile").html("<div style='color:#FF0000;'>Enter only number.</div>");
        
		return false;
        
	}
    
	else
        
	{
        
		//$("#errorMsgMobile").attr("style","display:none");
        
		return true;
        
	}
    
}





function geoloc(success, fail, mapid, fromlat, fromlon, tolat, tolng)

{
    
	var is_echo = false;
    
    if(navigator && navigator.geolocation) {
        
    	navigator.geolocation.getCurrentPosition(
                                                 
                                                 function(pos) {
                                                 
                                                 if (is_echo){ return; }
                                                 
                                                 is_echo = true;
                                                 
                                                 success(pos.coords.latitude,pos.coords.longitude, mapid, fromlat, fromlon, tolat, tolng);
                                                 
                                                 },
                                                 
                                                 function() {
                                                 
                                                 if (is_echo){ return; }
                                                 
                                                 is_echo = true;
                                                 
                                                 fail(mapid, fromlat, fromlon, tolat, tolng);
                                                 
                                                 },{ maximumAge: 600000, timeout: 5000, enableHighAccuracy: true }
                                                 
                                                 );
        
    }
    
    else
        
    {
        
    	fail(mapid, fromlat, fromlon, tolat, tolng);
        
    }
    
}



function success(lat, lng, mapid, fromlat, fromlon, tolat, tolng)

{
    
	if(mapid=="map_canvas")
        
	{
        
		var nvradius = $("#txtradiuslocation").val();
        
		settowlocationfun("map_canvas",nvradius,"txtcurrentlocation","txtcurrentlati","txtcurrentlong","txtradiusCity","checkbox-city");
        
		setradiusfunc(lat,lng,nvradius,"map_canvas","txtradiusCity","checkbox-city");
        
	}
    
	else
        
	{
        
		sessionStorage.curlatitude = lat;
        
		sessionStorage.curlongitude = lng;
        
		var nvradius = sessionStorage.radius;
        
		settowlocationfun("set_map_canvas",nvradius,"txtsetcurrentlocation","txtsetcurrentlati","txtsetcurrentlong","txtsetradiusCity","acco-checkbox-city");
        
		setradiusfunc(lat,lng,nvradius,"set_map_canvas","txtsetradiusCity","acco-checkbox-city");
        
	}
    
}

function fail(mapid, fromlat, fromlon, tolat, tolng)

{
    
    var alertmsg = "Location information is unavailable. Please enable from phone settings.";
    
    navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
    //alert(alertmsg);
	if(mapid=="map_canvas")
        
	{
        
		var nvradius = $("#txtradiuslocation").val();
        
		lat = "0";
        
		lng = "0";
        
		settowlocationfun("map_canvas",nvradius,"txtcurrentlocation","txtcurrentlati","txtcurrentlong","txtradiusCity","checkbox-city");
        
		setradiusfunc(lat,lng,nvradius,"map_canvas","txtradiusCity","checkbox-city");
        
	}
    
	else
        
	{
        
		var nvlatitude = sessionStorage.latitude;
        
		var nvlongitude = sessionStorage.longitude;
        
		var nvradius = sessionStorage.radius;
        
		settowlocationfun("set_map_canvas",nvradius,"txtsetcurrentlocation","txtsetcurrentlati","txtsetcurrentlong","txtsetradiusCity","acco-checkbox-city");
        
		setradiusfunc(nvlatitude,nvlongitude,nvradius,"set_map_canvas","txtsetradiusCity","acco-checkbox-city");
        
	}
    
}



function setradiusfunc(latval,lonval,radval,mapdivid,citydivid,arrcitydivid)

{
    
	if(latval!="" && lonval!="")
        
	{
        
		$("#"+citydivid+"").empty();
        
		latlon=new google.maps.LatLng(latval, lonval)
        
		var myOptions={
            
        center:latlon,zoom:(radval) ? setZoomForMapFunc(radval) : 10,
            
        mapTypeId:google.maps.MapTypeId.ROADMAP,
            
        mapTypeControl:false,
            
        scrollwheel:false,
            
		panControl: false,
            
        zoomControl:true,
            
        streetViewControl:false,
            
        navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
            
		};
        
		map = new google.maps.Map(document.getElementById(""+mapdivid+""), myOptions);
        
		var marker=new google.maps.Marker({icon: image,position:latlon,map:map,optimized: false});
        
		
        
		setupEvents();
        
		centerChanged();
        
		reverseGeocode();
        
		
        
		rad = parseInt(radval)*1609;
        
		var circle = new google.maps.Circle({
                                            
                                            map: map,
                                            
                                            radius: rad,    // 10 miles in metres
                                            
                                            fillColor: '#AA0000'
                                            
                                            });
        
		circle.bindTo('center', marker, 'position');
        
		
        
		
        
		
        
		var myLatlng = new google.maps.LatLng(sessionStorage.curlatitude,sessionStorage.curlongitude);
        
		var marker = new google.maps.Marker({
                                            
                                            position: myLatlng,
                                            
                                            icon: image,
                                            
                                            title:"I might be here",
                                            
                                            optimized: false
                                            
                                            });
        
		
        
		if(sessionStorage.curlatitude!=undefined)
            
		{
            
			// To add the marker to the map, call setMap();
            
			marker.setMap(map);
            
		}
        
		
        
		
        
		$("#txtradiusCity").empty();
        
		$("#txtsetradiusCity").empty();
		
		$("#checkactivecitystatus").html("");
        
		i = 1;
        
		var pid = sessionStorage.current;
        $.getJSON(""+Url+"?lat="+latval+"&lng="+lonval+"&radius="+radval+"&prov_id="+pid+"&type=citylistbyradius&mapdivid="+mapdivid,function(result){
                  
                  $.each(result.radiuslist, function(index, radiuslistEach){
                         
                         /*if(radiuslistEach.id=="null")
                          
                          {
                          
                          $(".notsupportedcityerrmsg").show();
                          
                          var alertmsg = "The city you have selected is NOT active at the moment, please check back soon. Or contact us for more info.";
                          
                          navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
                          alert(alertmsg);
                          }
                          
                          else
                          
                          {
                          
                          $(".notsupportedcityerrmsg").hide();*/
                         
                         if(radiuslistEach.supported=="No" || radiuslistEach.supported=="no")
                         {
                         $("#checkactivecitystatus").html("No");
                         }
                         
                         var point = new google.maps.LatLng(parseFloat(radiuslistEach.lat), parseFloat(radiuslistEach.lng));
                         
                         var marker = new google.maps.Marker({
                                                             
                                                             map: map,
                                                             
                                                             position: point,
                                                             
                                                             icon: "http://towchoice.com/quotes/images/bluedot_retina.png"
                                                             
                                                             });
                         
                         var nvCheck = "";
                         
                         if(radiuslistEach.status=="checked")
                         
                         {
                         
                         var nvCheck = "checked";
                         
                         }
                         
                         var boxText = "<div style='border: 1px solid black; margin-top: 8px; background: #d5d5d5; padding: 5px;'>";
                         
                         boxText += ""+radiuslistEach.address+"";
                         
                         boxText += "</div>";
                         
                         
                         
                         var myOptions = {
                         
                         content: boxText
                         
                         ,disableAutoPan: false
                         
                         ,maxWidth: 0
                         
                         ,pixelOffset: new google.maps.Size(-140, 0)
                         
                         ,zIndex: null
                         
                         ,boxStyle: {
                         
                         background: "url('http://www.garylittle.ca/map/artwork/tipbox.gif') no-repeat"
                         
                         ,opacity: 0.75
                         
                         ,width: "280px"
                         
                         }
                         
                         ,closeBoxMargin: "10px 2px 2px 2px"
                         
                         ,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
                         
                         ,infoBoxClearance: new google.maps.Size(1, 1)
                         
                         ,isHidden: false
                         
                         ,pane: "floatPane"
                         
                         };
                         
                         
                         
                         bindInfoWindow(marker, map, infoWindow, myOptions);
                         
                         
                         
                         if ($('#'+citydivid+':contains("'+radiuslistEach.city+'")').length > 0)
                         
                         {
                         
                         }
                         
                         else
                         
                         {
                         if(radiuslistEach.supported=="No")
                         {
                         $("#"+citydivid+"").append('<input type="checkbox" name="not-'+arrcitydivid+'[]" id="not-'+arrcitydivid+''+i+'" value="'+radiuslistEach.city+'" '+nvCheck+' class="layers"><label for="not-'+arrcitydivid+''+i+'">'+radiuslistEach.city+'</label>');
                         }
                         else
                         {
                         $("#"+citydivid+"").append('<input type="checkbox" name="'+arrcitydivid+'[]" id="'+arrcitydivid+''+i+'" value="'+radiuslistEach.city+'" '+nvCheck+' class="layers"><label for="'+arrcitydivid+''+i+'">'+radiuslistEach.city+'</label>');
                         }
                         
                         }
                         
                         
                         
                         i = i+1;
                         
                         /*}*/
                         
                         });
                  
                  checkboxbindfunc();
                  
                  
                  
                  $("input[type='checkbox']").checkboxradio().checkboxradio("refresh");
                  
                  /*if(mapdivid=="map_canvas")
                   
                   {
                   
                   $(".profilepagecontcls").data("mobileIscrollview").refresh();
                   
                   $(".profilepagecontcls").jqmData("iscrollview").refresh();
                   
                   $(".profilepagecontcls").iscrollview("refresh");
                   
                   }
                   
                   else
                   
                   {
                   
                   $(".settingpagecontcls").data("mobileIscrollview").refresh();
                   
                   $(".settingpagecontcls").jqmData("iscrollview").refresh();
                   
                   $(".settingpagecontcls").iscrollview("refresh");
                   
                   }*/
                  
                  });
        
	}
    
}



function bindInfoWindow(marker, map, infoWindow, myOptions) {
    
	
    
	google.maps.event.addListener(marker, "click", function (e) {
                                  
                                  $(".infoBox").hide();
                                  
                                  
                                  
                                  ib.open(map, this);
                                  
                                  });
    
	var ib = new InfoBox(myOptions);
    
    /*google.maps.event.addListener(marker, 'click', function() {
     
     infoWindow.setContent(html);
     
     infoWindow.open(map, marker);
     
     });*/
    
}



function downloadUrl(url, callback) {
    
	var request = window.ActiveXObject ?
    
    new ActiveXObject('Microsoft.XMLHTTP') :
    
    new XMLHttpRequest;
    
    
    
    request.onreadystatechange = function() {
        
        if (request.readyState == 4) {
            
            request.onreadystatechange = doNothing;
            
            callback(request, request.status);
            
        }
        
    };
    
    
    
    request.open('GET', url, true);
    
    request.send(null);
    
}



function doNothing() {}



function setupEvents() {
    
 	reverseGeocodedLast = new Date();
    
 	centerChangedLast = new Date();
    
    
    
 	setInterval(function() {
                
                if((new Date()).getSeconds() - centerChangedLast.getSeconds() > 1) {
                
                if(reverseGeocodedLast.getTime() < centerChangedLast.getTime())
                
                reverseGeocode();
                
                }
                
                }, 1000);
    
    
    
 	google.maps.event.addListener(map, 'center_changed', centerChanged);
    
}



function getCenterLatLngText() {
    
	/*$("#fromlatitude").val(map.getCenter().lat());
     
     $("#fromlng").val(map.getCenter().lng());*/
    
	return '(' + map.getCenter().lat() +', '+ map.getCenter().lng() +')';
    
}



function centerChanged() {
    
	centerChangedLast = new Date();
    
	var latlng = getCenterLatLngText();
    
	//$("#formatedAddress").html("");
    
	currentReverseGeocodeResponse = null;
    
}



function reverseGeocode() {
    
 	reverseGeocodedLast = new Date();
    
 	geocoder.geocode({latLng:map.getCenter()},reverseGeocodeResult);
    
}



function reverseGeocodeResult(results, status) {
    
	currentReverseGeocodeResponse = results;
    
    if(status == 'OK')
        
    {
        
        if(results.length == 0)
            
        {
            
            //$("#formatedAddress").html("None");
            
        }
        
        else
            
        {
            
            $("#txtcurrentlocation").val(results[0].formatted_address);
            
            $("#txtsetcurrentlocation").val(results[0].formatted_address);
            
            $("#txtcurrentlati").val(results[0].geometry.location.lat());
            
            $("#txtcurrentlong").val(results[0].geometry.location.lng());
            
            $("#txtsetcurrentlati").val(results[0].geometry.location.lat());
            
            $("#txtsetcurrentlong").val(results[0].geometry.location.lng());
            
            
            
            revtmpaddval = results[0].formatted_address.split(',').reverse().join(',');
            
            splitval = revtmpaddval.split(',');
            
            if(splitval[2]!="")
                
			{
                
                var nvCityName = splitval[2];
                
			}
            
            else
                
			{
                
                if(splitval[1]!="")
                    
				{
                    
                    var nvCityName = splitval[1];
                    
				}
                
                else
                    
				{
                    
                    var nvCityName = splitval[0];
                    
				}
                
			}
            
            /*$("#txtdefradiusCity").empty();
             
             $("#txtdefradiusCity").append('<input type="checkbox" name="checkbox-city[]" id="checkbox-city0" value="'+nvCityName+'" checked><label for="checkbox-city0">'+nvCityName+'</label>');
             
             $("#txtsetdefradiusCity").empty();
             
             $("#txtsetdefradiusCity").append('<input type="checkbox" name="acco-checkbox-city[]" id="acco-checkbox-city0" value="'+nvCityName+'" checked><label for="acco-checkbox-city0">'+nvCityName+'</label>');*/
            
            $("input[type='checkbox']").checkboxradio().checkboxradio("refresh");
            
            
            
        }
        
    }
    
    else
        
    {
        
        $("#txtcurrentlocation").val(results[0].formatted_address);
        
        $("#txtsetcurrentlocation").val(results[0].formatted_address);
        
        $("#txtcurrentlati").val(results[0].geometry.location.lat());
        
        $("#txtcurrentlong").val(results[0].geometry.location.lng());
        
        $("#txtsetcurrentlati").val(results[0].geometry.location.lat());
        
        $("#txtsetcurrentlong").val(results[0].geometry.location.lng());
        
        
        
        revtmpaddval = results[0].formatted_address.split(',').reverse().join(',');
        
		splitval = revtmpaddval.split(',');
        
		if(splitval[2]!="")
            
		{
            
			var nvCityName = splitval[2];
            
		}
        
		else
            
		{
            
			if(splitval[1]!="")
                
			{
                
				var nvCityName = splitval[1];
                
			}
            
			else
                
			{
                
				var nvCityName = splitval[0];
                
			}
            
		}
        
		/*$("#txtdefradiusCity").empty();
         
         $("#txtdefradiusCity").append('<input type="checkbox" name="checkbox-city[]" id="checkbox-city0" value="'+nvCityName+'" checked><label for="checkbox-city0">'+nvCityName+'</label>');
         
         $("#txtsetdefradiusCity").empty();
         
         $("#txtsetdefradiusCity").append('<input type="checkbox" name="acco-checkbox-city[]" id="acco-checkbox-city0" value="'+nvCityName+'" checked><label for="acco-checkbox-city0">'+nvCityName+'</label>');*/
        
		$("input[type='checkbox']").checkboxradio().checkboxradio("refresh");
        
    }
    
}



function onError(tx, error) {
    
	//alert(error.message);
    
    navigator.notification.alert(''+error.message+'',alertDismissed,'Tow Choice','Done');
    //alert(alertmsg);
}



function providerLoginFun()

{
    
	var ProvVerCode = $.trim($('#providerVerifyNo').val());
    
	
    
	if(ProvVerCode=="")
        
	{
        
		$("#provloginErrorMsg").show();
        
		//$("#provloginErrorMsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	else
        
	{
        
		$('#providerLoginBtn').addClass('ui-disabled');
        
		var postData = $('#newmobverifypage form').serialize();
        
		$.ajax({
               
               type: 'POST',
               
               data: postData+'&FormType=ProvVerCode',
               
               url: Url,
               
               success: function(rData){
               
               if(rData=="")
               
               {
               
               var alertmsg = "There was a problem while submitting, please try again.";
               
               navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
               //alert(alertmsg);
               $('#providerLoginBtn').removeClass('ui-disabled');
               
               }
               
               else
               
               {
               
               $("#towtruck_id").val(rData);
               
               sessionStorage.current = rData;
               
               $('#providerLoginBtn').removeClass('ui-disabled');
               
               var id = 1;
               
               var mobileverifystatus = "Yes"
               
               mydb.transaction(
                                
                                function(transaction) {
                                
								transaction.executeSql("UPDATE providerprofile SET mob_status = ? WHERE id = ?", [mobileverifystatus, id], null, onError);
                                
                                }
                                
                                );
               
               //$.mobile.changePage("#provprofilepage", {transition: "slide"});
               
               $.mobile.changePage($("#provprofilepage"));
               
               $("#provloginErrorMsg").hide();
               
               }
               
               },
               
               error: function(){
               
               //console.log(data);
               
               //alert('There was an error in register form');
               
               }
               
               });
        
		return false;
        
	}
    
}



function errorHandler(transaction, error) {
    
    var alertmsg = 'Oops. Error was '+error.message+' (Code '+error.code+').';
    
    navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
    //alert(alertmsg);
    
    
    return true;
    
}



function newHelpRequestPushFun(pData)

{
    
  	/*var split = pData.split(',');
     
     var HId = split[1];
     
     var CId = split[2];
     
     var nvLocSes = sessionStorage.current;
     
     if(nvLocSes!="" && nvLocSes!=undefined)
     
     {
     
     $.getJSON(""+Url+"?get=PushNewHelpReq&HId="+HId+"&PId="+nvLocSes,function(result){
     
     $.each(result.HelpList, function(index, HelpListEach){
     
     var OHId = $("#helpListDataId li:first").attr('id');
     
     var NHId = "HOL"+HelpListEach.help_id;
     
     
     
     if(OHId!=NHId)
     
     {
     
     //$('#helpListDataId li').last().remove();
     
     var i = HelpListEach.help_id;
     
     GetUserNameFun(HelpListEach.cust_id,"userName"+i);
     
     GetProbNameFun(HelpListEach.prob_id,"probName"+i);
     
     
     
     
     
     myAddress="";
     
     if(HelpListEach.latlng_address=="")
     
     {
     
     myAddress="";
     
     }
     
     else
     
     {
     
     myAddress= HelpListEach.latlng_address;
     
     }
     
     if(HelpListEach.sec_latlng_address=="")
     
     {
     
     myAddress=myAddress;
     
     }
     
     else
     
     {
     
     myAddress= myAddress+' <b>To</b> '+HelpListEach.sec_latlng_address;
     
     }
     
     
     
     
     
     myVehicleInfo="";
     
     if(HelpListEach.car_year!="")
     
     {
     
     myVehicleInfo= HelpListEach.car_year+" / ";
     
     }
     
     if(HelpListEach.car_make!="")
     
     {
     
     myVehicleInfo= myVehicleInfo+""+HelpListEach.car_make+" / ";
     
     }
     
     if(HelpListEach.car_model!="")
     
     {
     
     myVehicleInfo= myVehicleInfo+""+HelpListEach.car_model+" / ";
     
     }
     
     var strLen = myVehicleInfo.length;
     
     myVehicleInfo = myVehicleInfo.slice(0,strLen-1);
     
     
     
     myVehiclecolor="";
     
     if(HelpListEach.car_color!="")
     
     {
     
     myVehiclecolor= HelpListEach.car_color;
     
     }
     
     
     
     myVehicleModInfo="";
     
     if(HelpListEach.carmodification_detail!="")
     
     {
     
     myVehicleModInfo= HelpListEach.carmodification_detail;
     
     }
     
     
     
     var nvTime = "";
     
     if(HelpListEach.time!="")
     
     {
     
     var nvTime = HelpListEach.time+" minutes";
     
     if(HelpListEach.time==undefined)
     
     {
     
     var nvTime = "";
     
     }
     
     }
     
     var nvPrice = "";
     
     if(HelpListEach.price!="")
     
     {
     
     var nvPrice = "$"+HelpListEach.price;
     
     if(HelpListEach.price==undefined)
     
     {
     
     var nvPrice = "";
     
     }
     
     }
     
     var nvOthVcl = "";
     
     if(HelpListEach.other_vehicle!="")
     
     {
     
     var nvOthVcl = HelpListEach.other_vehicle;
     
     if(HelpListEach.other_vehicle==undefined)
     
     {
     
     var nvOthVcl = "";
     
     }
     
     }
     
     
     
     var garpark = "";
     
     if(HelpListEach.garageorparking=="Yes")
     
     {
     
     var garpark = "Vehicle is in a garage or parking structure";
     
     }
     
     
     
     var militarybase = "";
     
     if(HelpListEach.militarybase=="Yes")
     
     {
     
     var militarybase = "Vehicle is on a military base";
     
     }
     
     
     
     var nearestshop = "";
     
     if(HelpListEach.nearest_repair_status=="Yes")
     
     {
     
     var nearestshop = "Take me to the nearest open repair shop / tire center";
     
     }
     
     
     
     var additionalinfo = "";
     
     if(HelpListEach.additionalInfo!="")
     
     {
     
     var additionalinfo = "<b>Comment - </b>"+HelpListEach.additionalInfo;
     
     }
     
     
     
     $("#LastUpHelpList").html(HelpListEach.help_id);
     
     //$("#helpListDataId").prepend('<div id="HOL'+HelpListEach.help_id+'"><div style="width:158px; float:left; padding:0 10px 5px 0;"><div class="map" id="mapId'+i+'"></div><span id="viewBigMapPageId"><a href="#viewbigmapandbidrep" id="'+HelpListEach.help_id+'" data-transition="slide" style="padding-left:20px;display:none;"><button type="submit" style="padding:6px 10px;" class="ui-shadow ui-btn-corner-all ui-btn-up-e">'+ShowLargeTxtBtn+'</button></a></span></div><div class="rd"><ul><li id="userName'+i+'"></li><li id="probName'+i+'"></li><li>'+myAddress+'</li><li>'+myVehicleInfo+'</li><li>'+myVehicleModInfo+'</li><li>'+HelpListEach.date+'</li><li id="HOLTM'+HelpListEach.help_id+'">'+nvTime+'</li><li id="HOLPR'+HelpListEach.help_id+'">'+nvPrice+'</li><li><div id="directions'+i+'"></div></li><li id="getBidId"><b id="EnbDis'+i+'"></b></li></ul><div class="clr"></div><li style="display:none;"><b id="bidStatus'+HelpListEach.help_id+'"></b><b id="decStatus'+HelpListEach.help_id+'"></b></li></div>');
     
     $("#helpListDataId").prepend('<li class="ui-li ui-li-static ui-btn-up-c ui-li-has-thumb" id="HOL'+HelpListEach.help_id+'"><img src="" width="150" height="150" class="ui-li-thumb ui-corner-tl" id="mapId'+i+'" /><div style="clear:both;"></div><div id="countdown_dashboard'+i+'" class="timertoppad"><div class="dash hours_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash minutes_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash seconds_dash"><div class="digit">0</div><div class="digit">0</div></div></div><div id="countdown_dashboardwaittimer'+i+'" class="timertoppad"><div class="dash hours_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash minutes_dash"><div class="digit">0</div><div class="digit">0</div><div class="dot">:</div></div><div class="dash seconds_dash"><div class="digit">0</div><div class="digit">0</div></div></div><p class="ui-li-desc" id="userName'+i+'"></p><p class="ui-li-desc" id="probName'+i+'"></p><p class="ui-li-desc">'+myAddress+'</p><p class="ui-li-desc">'+additionalinfo+'</p><p class="ui-li-desc">'+myVehicleInfo+' '+myVehiclecolor+'</p><p class="ui-li-desc">'+myVehicleModInfo+'</p><p class="ui-li-desc">'+garpark+'</p><p class="ui-li-desc">'+militarybase+'</p><p class="ui-li-desc">'+nearestshop+'</p><p class="ui-li-desc">'+nvOthVcl+'</p><p class="ui-li-desc">'+HelpListEach.date+'</p><p class="ui-li-desc" id="HOLTM'+HelpListEach.help_id+'">'+nvTime+'</p><p class="ui-li-desc" id="HOLPR'+HelpListEach.help_id+'">'+nvPrice+'</p><p class="ui-li-desc">--</p><p class="ui-li-desc" id="viewBigMapPageId"><a href="#viewbigmapandbidrep" id="'+HelpListEach.help_id+'" data-transition="slide" style="display:none;"><button type="submit" style="padding:6px 10px;" class="ui-shadow ui-btn-corner-all ui-btn-up-e">'+ShowLargeTxtBtn+'</button></a></p><b id="getBidId"><p id="EnbDis'+i+'" class="ui-li-desc"></p><p class="ui-li-desc" style="display:none;"></b><b id="bidStatus'+HelpListEach.help_id+'"></b><b id="decStatus'+HelpListEach.help_id+'"></b></p></li><div style="clear:both; border-top: solid 1px #A7A7A7;"></div>');
     
     
     
     $("#EnbDis"+i+"").html('<a href="#popupbidrep" id="'+HelpListEach.help_id+'" data-transition="slide"><button type="submit" style="padding:6px 10px;" class="ui-shadow ui-btn-corner-all ui-btn-up-b">Bid</button></a><label id='+HelpListEach.help_id+'><button type="submit" style="padding:6px 10px;" class="ui-shadow ui-btn-corner-all ui-btn-up-b">Decline</button></label>');
     
     $("#userName"+HelpListEach.help_id+"").hide();
     
     
     
     DisplaySmallMapJobsListFun(HelpListEach.breckdown_cur_latitude,HelpListEach.breckdown_cur_longitude,"mapId"+i,"directions"+i,"150px","150px","sphelplistmain");
     
     var nvSec = parseInt(HelpListEach.TimeDiff);
     
     var nvSecwait = parseInt(HelpListEach.waitTimeDiff);
     
     if(nvSec>=0)
     
     {
     
     $("#countdown_dashboard"+i+"").show();
     
     $('#countdown_dashboard'+i+'').countDown({
     
     targetOffset: {
     
     'day': 0,
     
     'month': 0,
     
     'year': 0,
     
     'hour': 0,
     
     'min': 0,
     
     'sec': nvSec,
     
     'utc': true
     
     },
     
     onComplete: function() { HelpRequestTimeOutFun(HelpListEach.help_id,HelpListEach.cust_id); }
     
     });
     
     }
     
     $("#countdown_dashboardwaittimer"+i+"").hide();
     
     if(nvSecwait>=0)
     
     {
     
     $("#countdown_dashboardwaittimer"+i+"").show();
     
     $('#countdown_dashboardwaittimer'+i+'').countDown({
     
     targetOffset: {
     
     'day': 0,
     
     'month': 0,
     
     'year': 0,
     
     'hour': 0,
     
     'min': 0,
     
     'sec': nvSecwait,
     
     'utc': true
     
     },
     
     onComplete: function() {
     
     $("#countdown_dashboardwaittimer"+i+"").hide();
     
     var bid = HelpListEach.bids_id;
     
     UpdBidsListFun(bid,i,"","");
     
     }
     
     });
     
     }
     
     }
     
     });
     
     //$("#helpListDataId").listview("refresh");
     
     listSelector = "div.pull-demo-page ul.ui-listview";
     
     $(listSelector).listview("refresh");  // Prepend new content and refresh listview
     
     });
     
     }
     
     //sir logic and ketan*/
    
	var lasthelpId = $("#LastUpHelpList").html();
    
    FetchHelpRequestFunLastUpd(lasthelpId,"PUSH");
    
}



function newSelectBidPushFun(pData)

{
    
  	var split = pData.split(',');
    
	var BId = split[1];
    
  	var HId = split[2];
    
  	var PId = split[3];
    
  	var UId = split[4];
    
	var nvLocSes = sessionStorage.current;
    
	$("#countdown_dashboard"+HId+"").stopCountDown();
    
	$("#countdown_dashboardwaittimer"+HId+"").stopCountDown();
    
	$("#countdown_dashboard"+HId+"").hide();
    
	$("#countdown_dashboardwaittimer"+HId+"").hide();
    
	if(nvLocSes==PId)
        
	{
        
		$("#countdown_dashboard"+HId+"").stopCountDown();
        
    	$("#countdown_dashboardwaittimer"+HId+"").stopCountDown();
        
		GetUserNameFun(UId,"userName"+HId);
        
		var lastId = $("#LastUpSelJobId").html();
        
		GetSerProListOfJobsLastUpdFun(lastId);
        
		$("#EnbDis"+HId+"").html('<p class="yellowmsg ui-li-desc">'+SelBtnTxt+'</p>');
        
    	//$('#HOL'+HId+'').attr("style","background-color:#2BAF2B;");
        
		$("#HOL"+HId+"").removeClass("BidGrayCls");
        
		$("#HOL"+HId+"").removeClass("BidRedCls");
        
		$("#HOL"+HId+"").addClass("BidGreenCls");
        
    	$('#HOL'+HId+' a').show();
        
    	$('#userName'+HId+'').show();
        
    	$("#countdown_dashboard"+HId+"").stopCountDown();
        
    	$("#countdown_dashboardwaittimer"+HId+"").stopCountDown();
        
	}
    
	else
        
	{
        
		$("#countdown_dashboard"+HId+"").stopCountDown();
        
    	$("#countdown_dashboardwaittimer"+HId+"").stopCountDown();
        
		var bidStatus = $("#bidStatus"+HId+"").html();
        
		var decStatus = $("#decStatus"+HId+"").html();
        
		if(bidStatus=="Yes")
            
		{
            
	    	/*$("#EnbDis"+HId+"").html('<button type="submit" style="padding:6px 10px;" class="ui-shadow ui-btn-corner-all ui-btn-up-c" disabled="disabled">'+NotSelBtnTxt+'</button>');
             
             //$('#HOL'+HId+'').attr("style","background-color:#FF3535;");
             
             $("#HOL"+HId+"").removeClass("BidGrayCls");
             
             $("#HOL"+HId+"").removeClass("BidGreenCls");
             
             $("#HOL"+HId+"").addClass("BidRedCls");*/
            
			UpdBidsListFun(BId,HId,PId,UId);
            
		}
        
		else
            
		{
            
			if(decStatus=="Yes")
                
			{
                
				//$("#"+decBtnId+"").html('<div class="ui-block-a"><button type="submit" style="padding:6px 10px;" class="ui-shadow ui-btn-corner-all ui-btn-up-d" disabled="disabled">'+BidDecTxt+'</button></div>');
                
		    	//$('#HOL'+HId+'').attr("style","background-color:#FF3535;");
                
			}
            
			else
                
			{
                
				//$('#HOL'+HId+'').hide();
                
				$("#countdown_dashboard"+HId+"").hide();
                
				//AnotherProviderSelFun(HId);
                
				//InsertAnotherProviderSelFun(HId,UId);
                
				$("#decStatus"+HId+"").html("Yes");
                
				$("#EnbDis"+HId+"").html('<p class="yellowmsg ui-li-desc">'+BidEndbtn+'</p>');
                
				$("#HOL"+HId+"").removeClass("BidRedCls");
                
				$("#HOL"+HId+"").removeClass("BidGreenCls");
                
				$("#HOL"+HId+"").addClass("BidGrayCls");
                
			}
            
		}
        
		$("#countdown_dashboard"+HId+"").stopCountDown();
        
		$("#countdown_dashboardwaittimer"+HId+"").stopCountDown();
        
	}
    
}



function handleNotifyButtonClick(data) {
    
    //var message = $.trim($("#notifyMessage").val());
    
    if(data!="") {
        
        $.ajax({
               
               url: pushUrl,
               
               data: {"message": data}
               
               });
        
    }
    
}



function providerRegBtnFun()

{
    
	var provMobileNo = $.trim($('#provMobileNo').val());
    
	/*var provmobilecountrycode = $.trim($('#provmobilecountrycode').val());
     
     if(provmobilecountrycode=="")
     
     {
     
     $("#provmobilecountrycodeErrorMsg").show();
     
     //$("#provmobilecountrycodeErrorMsg").html("<div style='color:#FF0000;'>This field is required</div>");
     
     }*/
    
	if(provMobileNo=="")
        
	{
        
		$("#provMobNoErrorMsg").show();
        
		//$("#provMobNoErrorMsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	if(provMobileNo.length<10)
        
	{
        
		$("#provMobNoErrorMsg").show();
        
		//$("#provMobNoErrorMsg").html("<div style='color:#FF0000;'>Please enter 10 digit mobile number</div>");
        
	}
    
	else
        
	{
        
		$("#provMobNoErrorMsg").hide();
        
	}
    
	if(provMobileNo.length>0 && provMobileNo.length>=10)
        
	{
        
		$('#providerRegBtn').addClass('ui-disabled');
        
		var postData = $('#newmobnoreg form').serialize();
        
		$.ajax({
               
               type: 'POST',
               
               data: postData+'&FormType=ProvMobReg',
               
               url: Url,
               
               success: function(rData){
               
               if(rData=="NO")
               
               {
               
               //alert("This number is already in use. Please login with your password or register with another number.");
               
               $("#signinpopup").popup('open');
               
               $('#providerRegBtn').removeClass('ui-disabled');
               
               }
               
               else
               
               {
               
               $('#providerRegBtn').removeClass('ui-disabled');
               
               checkInsertProvideMobileStatus();
               
               /*var mob_status = "Yes";
                
                mydb.transaction(
                
                function (transaction) {
                
                transaction.executeSql("INSERT INTO providerprofile(provId, firstname, mob_status) VALUES ('','','"+mob_status+"');");
                
                }
                
                );*/
               
               var split = rData.split(',');
               
               var verifyCode = split[0];
               
               var ProvId = split[1];
               
               $("#verproviderid").val(ProvId);
               
               sessionStorage.provId = ProvId;
               
               //$("#verifyCode").html(verifyCode);
               
               //$.mobile.changePage("#newmobverifypage", {transition: "slide"});
               
               $.mobile.changePage($("#newmobverifypage"));
               
               }
               
               },
               
               error: function(){
               
               //alert('There was an error in register form');
               
               }
               
               });
        
		return false;
        
	}
    
}



function checkInsertProvideMobileStatus()

{
    
	mydb.readTransaction(
                         
                         function (t) {
                         
                         t.executeSql("SELECT * FROM providerprofile", [],checkDatabaseProviderMobileStatus,errorHandler);
                         
                         }
                         
                         );
    
}



function checkDatabaseProviderMobileStatus(t, results)

{
    
	var provSesId = sessionStorage.provId;
    
	var mob_status = "";
    
	if(results.rows.length=="0")
        
	{
        
		mydb.transaction(
                         
                         function (transaction) {
                         
                         transaction.executeSql("INSERT INTO providerprofile(provId, firstname, mob_status) VALUES ('"+provSesId+"','','"+mob_status+"');");
                         
                         }
                         
                         );
        
	}
    
	else
        
	{
        
		var id = 1;
        
		mydb.transaction(
                         
                         function(transaction) {
                         
                         transaction.executeSql("UPDATE providerprofile SET provId = ?, mob_status = ? WHERE id = ?", [provSesId, mob_status, id], null, onError);
                         
                         }
                         
                         );
        
	}
    
}



function providerRetryRegFun()

{
    
	var postData = $('#newmobverifypage form').serialize();
    
	$.ajax({
           
           type: 'POST',
           
           data: postData+'&FormType=DeleteMobileNo',
           
           url: Url,
           
           success: function(rData){
           
           if(rData=="")
           
           {
           
           var alertmsg = "There was an error in register form.";
           
           navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
           //alert(alertmsg);
           }
           
           else
           
           {
           
           
           
           }
           
           },
           
           error: function(){
           
           //console.log(data);
           
           //alert('There was an error in register form');
           
           }
           
           });
    
    
    
	sessionStorage.sqlprovstutas = 0;
    
	mydb.transaction(
                     
                     function (transaction) {
                     
                     transaction.executeSql("DROP TABLE providerprofile;");
                     
                     }
                     
                     );
    
    
    
	mydb.transaction(
                     
                     function (t) {
                     
                     t.executeSql(
                                  
                                  'CREATE TABLE IF NOT EXISTS providerprofile ' +
                                  
                                  '  (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
                                  
                                  '   provId INTEGER NOT NULL, firstname TEXT NOT NULL, mob_status TEXT NOT NULL, companyname TEXT NULL, password TEXT NULL, call_notification TEXT NULL, sms_notification TEXT NULL, currentlatitude TEXT NULL, currentlongitude TEXT NULL, currentradius TEXT NULL, email TEXT NULL );',
                                  
                                  [],
                                  
                                  nullDataHandler,
                                  
                                  errorHandler
                                  
                                  );
                     
                     }
                     
                     );
    
	//$.mobile.changePage("#newmobnoreg", {transition: "slide"});
    
	$.mobile.changePage($("#signinpage"));
    
}



function providerProfileNameFun()

{
    
	var provProfName = $.trim($('#txtProviderName').val());
    
	var provProfLastName = $.trim($('#txtProviderLastName').val());
    
	var CompName = $.trim($('#txtProviderComName').val());
    
	var txtcurrentlati = $.trim($('#txtcurrentlati').val());
    
	var txtcurrentlong = $.trim($('#txtcurrentlong').val());
    
	var Password = $.trim($('#txtProviderPassWord').val());
    
	var txtradiuslocation = $.trim($('#txtradiuslocation').val());
    
	var txtProviderEmailAdd = $.trim($('#txtProviderEmailAdd').val());
    
	
    
	if(provProfName=="")
        
	{
        
		$("#profileNameErrorMsg").show();
        
		//$("#profileNameErrorMsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	if(provProfLastName=="")
        
	{
        
		$("#profileLastNameErrorMsg").show();
        
		//$("#profileLastNameErrorMsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	if(CompName=="")
        
	{
        
		$("#txtCompNameErrorMsg").show();
        
		//$("#txtCompNameErrorMsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	if(txtcurrentlati=="")
        
	{
        
		$("#txtcurrentlocationerromsg").show();
        
		//$("#txtcurrentlocationerromsg").html("<div style='color:#FF0000;'>Location information is unavailable</div>");
        
	}
    
	if(txtcurrentlong=="")
        
	{
        
		$("#txtcurrentlocationerromsg").show();
        
		//$("#txtcurrentlocationerromsg").html("<div style='color:#FF0000;'>Location information is unavailable</div>");
        
	}
    
	if(txtProviderEmailAdd=="")
        
	{
        
		$("#txtProviderEmailAddErrorMsg").show();
        
		//$("#txtProviderEmailAddErrorMsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	if(provProfName=="")
        
	{
        
		$("#profileNameErrorMsg").show();
        
		//$("#profileNameErrorMsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	if(Password=="")
        
	{
        
		$("#txtPasswordErrorMsg").show();
        
		//$("#profileNameErrorMsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	
    
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    
	//var address = document.forms[formName].elements[inpId].value;
    
	var nvValideEmail = reg.test(txtProviderEmailAdd);
    
	
    
	var postData = $('#txtProviderEmailAdd').serialize();
    
	$.ajax({
           
           type: 'POST',
           
           data: postData+'&FormType=checkemailinsystem',
           
           url: Url,
           
           success: function(data){
           
           if(data=="OK")
           
           {
           
           if(provProfName.length>0 && provProfLastName.length>0 && CompName.length>0 && Password.length>0 && txtcurrentlati.length>0 && txtcurrentlong.length>0 && txtProviderEmailAdd.length>0 && nvValideEmail==true)
           
           {
           
           $('#provProfileBtn').addClass('ui-disabled');
           
           var PId = sessionStorage.current;
           
           var postData = $('#provprofilepage form').serialize();
           
           $.ajax({
                  
                  type: 'POST',
                  
                  data: postData+'&PId='+PId+'&FormType=provprofilepage',
                  
                  url: Url,
                  
                  success: function(rData){
                  
                  if(rData=="")
                  
                  {
                  
                  var alertmsg = "There was a problem while submitting, please try again.";
                  
                  navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
                  //alert(alertmsg);
                  
                  
                  $('#provProfileBtn').removeClass('ui-disabled');
                  
                  }
                  
                  else
                  
                  {
                  
                  $('#provProfileBtn').removeClass('ui-disabled');
                  
                  var id = 1;
                  
                  var callnoti = "Yes";
                  
                  var smsnoti = "Yes";
                  
                  mydb.transaction(
                                   
                                   function(transaction) {
                                   
                                   transaction.executeSql("UPDATE providerprofile SET firstname = ?, companyname = ?, password = ?, currentlatitude = ?, currentlongitude = ?, call_notification = ?, sms_notification = ?, currentradius = ?, email = ? WHERE id = ?", [rData, CompName, Password, txtcurrentlati, txtcurrentlong, callnoti, smsnoti, txtradiuslocation, txtProviderEmailAdd, id], null, onError);
                                   
                                   });
                  
                  $("#towtruck_id").val(PId);
                  
                  $(".welToProName").html(rData);
                  
                  sessionStorage.provname = provProfName;
                  
                  sessionStorage.provcomp = CompName;
                  
                  sessionStorage.provpass = Password;
                  
                  sessionStorage.latitude = txtcurrentlati;
                  
                  sessionStorage.longitude = txtcurrentlong;
                  
                  sessionStorage.radius = txtradiuslocation;
                  
                  sessionStorage.callnoti = callnoti;
                  
                  sessionStorage.smsnoti = smsnoti;
                  
                  sessionStorage.email = txtProviderEmailAdd;
                  
                  //$.mobile.changePage("#sphelplistmain", {transition: "slide"});
                  
                  $.mobile.changePage($("#sphelplistmain"));
                  
                  $("#helpListDataId").empty();
                  
                  var lasthelpId = $("#LastUpHelpList").html();
                  
                  FetchHelpRequestFunLastUpd(lasthelpId,"");
                  
                  ProviderHelpRequestTotalFunc();
                  
                  //GetSerProListOfJobsFun();
                  
                  }
                  
                  },
                  
                  error: function(){
                  
                  //alert('There was an error in register form');
                  
                  }
                  
                  });
           
           return false;
           
           }
           
           }
           
           else
           
           {
           
           $("#txtProviderEmailAddErrorMsg").hide();
           
           $("#txtProviderEmailAlrdErrorMsg").show();
           
           return false;
           
           }
           
           },
           
           error: function(){
           
           //console.log(data);
           
           }
           
           });
    
	return false;
    
}



function updateProviderProfileFun()

{
    
	var txtaccprofilename = $.trim($('#txtaccprofilename').val());
    
	var txtaccprofilelastname = $.trim($('#txtaccprofilelastname').val());
    
	var txtaccprofilecompname = $.trim($('#txtaccprofilecompname').val());
    
	var txtsetcurrentlati = $.trim($('#txtsetcurrentlati').val());
    
	var txtsetcurrentlong = $.trim($('#txtsetcurrentlong').val());
    
	var txtaccproviderpass = $.trim($('#txtaccproviderpass').val());
    
	var txtsetradiuslocation = $.trim($('#txtsetradiuslocation').val());
    
	var callnotific = $.trim($('#callnotific').val());
    
	var smsnotific = $.trim($('#smsnotific').val());
    
	var txtaccprofileEmailAdd = $.trim($('#txtaccprofileEmailAdd').val());
    
	
    
	if(txtaccprofilename=="")
        
	{
        
		$("#txtaccprofilenameerrormsg").show();
        
		//$("#txtaccprofilenameerrormsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	if(txtaccprofilelastname=="")
        
	{
        
		$("#txtaccprofilelastnameerrormsg").show();
        
		//$("#txtaccprofilelastnameerrormsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	if(txtaccprofilecompname=="")
        
	{
        
		$("#txtaccprofilecompnameerrormsg").show();
        
		//$("#txtaccprofilecompnameerrormsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	if(txtsetcurrentlati=="")
        
	{
        
		$("#txtsetcurrentlocationerromsg").show();
        
		//$("#txtsetcurrentlocationerromsg").html("<div style='color:#FF0000;'>Location information is unavailable</div>");
        
	}
    
	if(txtsetcurrentlong=="")
        
	{
        
		$("#txtsetcurrentlocationerromsg").show();
        
		//$("#txtsetcurrentlocationerromsg").html("<div style='color:#FF0000;'>Location information is unavailable</div>");
        
	}
    
	if(txtaccproviderpass=="")
        
	{
        
		$("#txtaccproviderpasserrormsg").show();
        
		//$("#txtaccproviderpasserrormsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	if(txtaccprofileEmailAdd=="")
        
	{
        
		$("#txtaccprofileEmailAddErrorMsg").show();
        
		//$("#txtaccprofileEmailAddErrorMsg").html("<div style='color:#FF0000;'>This field is required</div>");
        
	}
    
	if(txtaccprofilename.length>0 && txtaccprofilelastname.length>0 && txtaccprofilecompname.length>0 && txtsetcurrentlati.length>0 && txtsetcurrentlong.length>0 && txtaccproviderpass.length>0 && txtaccprofileEmailAdd.length>0)
        
	{
		var checkactivecitystatus = $.trim($('#checkactivecitystatus').html());
        
        if(checkactivecitystatus=="No" || checkactivecitystatus=="no")
    	{
        	var alertmsg = "Some of the cities you have selected are not supported at the moment. We will update you when they become available.";
            
            navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
            //alert(alertmsg);
    	}
        
		$('#providersavebtn').addClass('ui-disabled');
        
		var PId = sessionStorage.current;
        
		var postData = $('#settingpage form').serialize();
        
		$.ajax({
               
               type: 'POST',
               
               data: postData+'&PId='+PId+'&FormType=updProvProfilePage',
               
               url: Url,
               
               success: function(rData){
               
               if(rData=="")
               
               {
               
               var alertmsg = "There was a problem while submitting, please try again.";
               
               navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
               //alert(alertmsg);
               
               $('#providersavebtn').removeClass('ui-disabled');
               
               }
               
               else
               
               {
               
               $('#checkactivecitystatus').html("");
               
               $('#providersavebtn').removeClass('ui-disabled');
               
               var id = 1;
               
               mydb.transaction(
                                
                                function(transaction) {
                                
								transaction.executeSql("UPDATE providerprofile SET firstname = ?, companyname = ?, password = ?, currentlatitude = ?, currentlongitude = ?, call_notification = ?, sms_notification = ?, currentradius = ?, email = ? WHERE id = ?", [rData, txtaccprofilecompname, txtaccproviderpass, txtsetcurrentlati, txtsetcurrentlong, callnotific, smsnotific, txtsetradiuslocation, txtaccprofileEmailAdd, id], null, onError);
                                
                                });
               
               $(".welToProName").html(rData);
               
               sessionStorage.provname = txtaccprofilename;
               
               sessionStorage.provcomp = txtaccprofilecompname;
               
               sessionStorage.provpass = txtaccproviderpass;
               
               sessionStorage.latitude = txtsetcurrentlati;
               
               sessionStorage.longitude = txtsetcurrentlong;
               
               sessionStorage.radius = txtsetradiuslocation;
               
               sessionStorage.callnoti = callnotific;
               
               sessionStorage.smsnoti = smsnotific;
               
               sessionStorage.email = txtaccprofileEmailAdd;
               
               /*$("#helpListDataId").empty();
                
                var lasthelpId = "";
                
                FetchHelpRequestFunLastUpd(lasthelpId,"");
                
                ProviderHelpRequestTotalFunc();*/
               
               var alertmsg = "Your profile has been updated successfully.";
               
               navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
               //alert(alertmsg);
               $('html, body').stop().animate({ scrollTop : 8 }, 2000);
               
               }
               
               },
               
               error: function(){
               
               //alert('There was an error in register form');
               
               }
               
               });
        
		return false;
        
	}
    
    else
        
    {
        
        $('html, body').stop().animate({ scrollTop : 8 }, 2000);
        
    }
    
}



function AnotherProviderSelFun(HId)

{
    
	$.getJSON(""+Url+"?get=ProviderHelpInfo&HId="+HId,function(result){
              
              $.each(result.HelpListPop, function(index, HelpListPopEach){
                     
                     InsertAnotherProviderSelFun(HId,HelpListPopEach.cust_id);
                     
                     });
              
              });
    
}



/*function HelpTimeOutFun(HelpId)
 
 {
 
 $.getJSON(""+Url+"?get=ProviderHelpInfo&HId="+HelpId,function(result){
 
 $.each(result.HelpListPop, function(index, HelpListPopEach){
 
 HelpRequestTimeOutFun(HelpId,HelpListPopEach.cust_id);
 
 });
 
 });
 
 }*/



function HelpRequestTimeOutFun(HelpId,CustId)

{
    
	$("#countdown_dashboardwaittimer"+HelpId+"").stopCountDown();
    
	var nvLocSes = sessionStorage.current;
    
	$.ajax({
           
           type: 'POST',
           
           data: 'HId='+HelpId+'&PrId='+nvLocSes+'&CId='+CustId+'&FormType=HelpReqTimeout',
           
           url: Url,
           
           success: function(Udata){
           
           //console.log(Udata);
           
           $("#countdown_dashboard"+HelpId+"").hide();
           
           $("#decStatus"+HelpId+"").html("Yes");
           
           $("#EnbDis"+HelpId+"").html('<p class="yellowmsg ui-li-desc">'+BidEndbtn+'</p>');
           
           //$('#HOL'+HelpId+'').attr("style","background-color:#cccccc;");
           
           $("#HOL"+HelpId+"").removeClass("BidRedCls");
           
           $("#HOL"+HelpId+"").removeClass("BidGreenCls");
           
           $("#HOL"+HelpId+"").addClass("BidGrayCls");
           
           $("#countdown_dashboardwaittimer"+HelpId+"").stopCountDown();
           
           },
           
           error: function(){
           
           //console.log(data);
           
           //alert('There was an error in register form');
           
           }
           
           });
    
	return false;
    
}



function InsertAnotherProviderSelFun(HelpId,CustId)

{
    
	var nvLocSes = sessionStorage.current;
    
	$.ajax({
           
           type: 'POST',
           
           data: 'HId='+HelpId+'&PrId='+nvLocSes+'&CId='+CustId+'&FormType=AnotherProvSel',
           
           url: Url,
           
           success: function(Udata){
           
           //console.log(Udata);
           
           $("#decStatus"+HelpId+"").html("Yes");
           
           $("#EnbDis"+HelpId+"").html('<p class="yellowmsg ui-li-desc">'+AnothBidSel+'</p>');
           
           //$('#HOL'+HelpId+'').attr("style","background-color:#FF3535;");
           
           $("#HOL"+HelpId+"").removeClass("BidGrayCls");
           
           $("#HOL"+HelpId+"").removeClass("BidGreenCls");
           
           $("#HOL"+HelpId+"").addClass("BidRedCls");
           
           },
           
           error: function(){
           
           //console.log(data);
           
           //alert('There was an error in register form');
           
           }
           
           });
    
	return false;
    
}



function Getcountrieslistfunc()

{
    
	$.getJSON(""+Url+"?get=getcountrieslist",function(result){
              
              $.each(result.countriesList, function(index, countriesListEach){
                     
                     $('#select_choice_state').append("<option value='"+countriesListEach.id_state+"'>"+countriesListEach.state_name+"</option>");
                     
                     });
              
              });
    
}





function onChangeAjaxContentWithName(mytype,id,dont)

{
    
	$("#txtProvStateErrorMsg").hide();
    
	$("#txtProvCityErrorMsg").hide();
    
	$("#mynearbycitylist").empty();
    
	$("#mysuppnearbycitylist").empty();
    
	var xmlhttp=false;
    
	try {
        
		xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
        
	}
    
	catch (e)
    
	{
        
		try {
            
			xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
            
		} catch (E) {
            
			xmlhttp = false;
            
        }
        
	}
    
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
        
		xmlhttp = new XMLHttpRequest();
        
	}
    
	if(mytype=='CityList')
        
	{
        
		var file = ""+Url+"?type="+mytype+"&stateId="+id+"&dont="+dont;
        
	}
    
	if(mytype=='settingPageState')
        
	{
        
		var file = ""+Url+"?type="+mytype+"&stateId="+id+"&dont="+dont;
        
	}
    
	if(mytype=='setSuppCity')
        
	{
        
		var nvCityId = sessionStorage.longitude;
        
		var file = ""+Url+"?type="+mytype+"&stateId="+id+"&cityId="+nvCityId;
        
	}
    
	if(mytype=='setSuppCityList')
        
	{
        
		var nvProvSes = sessionStorage.current;
        
		var file = ""+Url+"?type="+mytype+"&cityId="+id+"&pId="+nvProvSes;
        
	}
    
	
    
	//window.open(file);       //**** check start or stop********
    
	xmlhttp.open('GET', file, true);
    
	xmlhttp.onreadystatechange=function() {
        
		if (xmlhttp.readyState==4) {
            
			var myContent;
            
			myContent=xmlhttp.responseText;
            
			//alert(myContent);  // **** check  div update or not else alter php file***********
            
			if(mytype=='CityList')
                
			{
                
				document.getElementById('mycitylist').innerHTML=myContent;
                
			}
            
			if(mytype=='settingPageState')
                
			{
                
				document.getElementById('acco_select_choice_state').innerHTML=myContent;
                
				$('#acco_select_choice_state').selectmenu('refresh', true);
                
			}
            
			if(mytype=='setSuppCity')
                
			{
                
				document.getElementById('acco_select_choice_city').innerHTML=myContent;
                
				$('#acco_select_choice_city').selectmenu('refresh', true);
                
				onChangeAjaxContentWithName('setSuppCityList',document.getElementById('acco_select_choice_city').value,'DoNotKnow');
                
			}
            
			if(mytype=='setSuppCityList')
                
			{
                
				document.getElementById('mysuppnearbycitylist').innerHTML=myContent;
                
				//$("input[type='checkbox']").attr("checked",true).checkboxradio("refresh");
                
			}
            
		}
        
	}
    
	xmlhttp.send(null) //Nullify the XMLHttpRequest
    
	return;
    
}



function onChangeAjaxContentWithCityName(mytype,cityname,stateid,dont)

{
    
	$("#txtProvCityErrorMsg").hide();
    
	var split = cityname.split(',');
    
	var nvcityid = split[0];
    
	var nvcityname = split[1];
    
	if(cityname=="")
        
	{
        
		$("#tempCityName").html("City");
        
	}
    
	if(nvcityname=="")
        
	{
        
		$("#tempCityName").html("City");
        
	}
    
	else
        
	{
        
	  	$("#tempCityName").html(nvcityname);
        
	}
    
	
    
	var xmlhttp=false;
    
	try {
        
		xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
        
	}
    
	catch (e)
    
	{
        
		try {
            
			xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
            
		} catch (E) {
            
			xmlhttp = false;
            
        }
        
	}
    
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
        
		xmlhttp = new XMLHttpRequest();
        
	}
    
	if(mytype=='NearByCity')
        
	{
        
		var file = ""+Url+"?type="+mytype+"&stateid="+stateid+"&cityid="+nvcityid;
        
	}
    
	//window.open(file);       //**** check start or stop********
    
	xmlhttp.open('GET', file, true);
    
	xmlhttp.onreadystatechange=function() {
        
		if (xmlhttp.readyState==4) {
            
			var myContent;
            
			myContent=xmlhttp.responseText;
            
			//alert(myContent);  // **** check  div update or not else alter php file***********
            
			if(mytype=='NearByCity')
                
			{
                
				document.getElementById('mynearbycitylist').innerHTML=myContent;
                
			}
            
		}
        
	}
    
	xmlhttp.send(null) //Nullify the XMLHttpRequest
    
	return;
    
	
    
}



function createDatabase() {
    
	try {
        
        if (!window.openDatabase) {
            
            var alertmsg = 'Databases are not supported in this browser.';
            
            navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
            //alert(alertmsg);
        } else {
            
            var shortName = 'sqlite_provider_testapp';
            
            var version = '1.0';
            
            var displayName = 'sqlite_provider_testapp db';
            
            var maxSize = 1024*1024*2;
            
            mydb = openDatabase(shortName, version, displayName, maxSize, null);
            
            
            
            mydb.transaction(
                             
                             function (t) {
                             
                             t.executeSql(
                                          
                                          'CREATE TABLE IF NOT EXISTS providerprofile ' +
                                          
                                          '  (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
                                          
                                          '   provId INTEGER NOT NULL, firstname TEXT NOT NULL, mob_status TEXT NOT NULL, companyname TEXT NULL, password TEXT NULL, call_notification TEXT NULL, sms_notification TEXT NULL, currentlatitude TEXT NULL, currentlongitude TEXT NULL, currentradius TEXT NULL, email TEXT NULL );',
                                          
                                          [],
                                          
                                          nullDataHandler,
                                          
                                          errorHandler);
                             
                             }
                             
                             );
            
            SelectProviderProfile();
            
        }
        
    } catch(e) {
        
        if (e == 2) {
            
            var alertmsg = "Invalid database version.";
            
            navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
            //alert(alertmsg);
        } else {
            
            var alertmsg = "Unknown error "+e+".";
            
            navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
            //alert(alertmsg);
            
            
        }
        
        return;
        
    }
    
    return false;
    
}



function SelectProviderProfile() {
    
    mydb.readTransaction(
                         
                         function (t) {
                         
                         t.executeSql("SELECT * FROM providerprofile", [],dataSelectProviderProfile,errorHandler);
                         
                         }
                         
                         );
    
}



function dataSelectProviderProfile(t, results){
    
	sessionStorage.sqlprovstutas = results.rows.length;
    
	if(results.rows.length=="0")
        
	{
        
		//$.mobile.changePage("#newmobnoreg", {transition: "slide"});
        
		$.mobile.changePage($("#signinpage"));
        
	}
    
	else
        
	{
        
		for (var i=0; i<results.rows.length; i++)
            
        {
            
        	var row = results.rows.item(i);
            
        	$("#verproviderid").val(row.provId);
            
			if(row.mob_status=="")
                
			{
                
				//$.mobile.changePage("#newmobverifypage", {transition: "slide"});
                
				$.mobile.changePage($("#newmobverifypage"));
                
				$("#helpListDataId").empty();
                
				$("#jobsListDataId").empty();
                
			}
            
			else
                
			{
                
				if(row.firstname=="")
                    
				{
                    
					sessionStorage.current = row.provId;
                    
					//$.mobile.changePage("#provprofilepage", {transition: "slide"});
                    
					$.mobile.changePage($("#provprofilepage"));
                    
					$("#helpListDataId").empty();
                    
					$("#jobsListDataId").empty();
                    
				}
                
				else
                    
				{
                    
					$.mobile.changePage($("#sphelplistmain"));
                    
					sessionStorage.current = row.provId;
                    
					sessionStorage.provname = row.firstname;
                    
					sessionStorage.provcomp = row.companyname;
                    
					sessionStorage.provpass = row.password;
                    
					sessionStorage.latitude = row.currentlatitude;
                    
					sessionStorage.longitude = row.currentlongitude;
                    
					sessionStorage.radius = row.currentradius;
                    
					sessionStorage.callnoti = row.call_notification;
                    
					sessionStorage.smsnoti = row.sms_notification;
                    
					sessionStorage.email = row.email;
                    
					$("#towtruck_id").val(row.provId);
                    
					$(".welToProName").html(row.firstname);
                    
					var lasthelpId = $("#LastUpHelpList").html();
                    FetchHelpRequestFunLastUpd(lasthelpId,""); //only webbase off
                    
                    ProviderHelpRequestTotalFunc();
                    
					//$.mobile.changePage("#sphelplistmain", {transition: "slide"});
                    
				}
                
			}
            
        }
        
	}
    
}



function errorHandler(transaction, error){
    
    if (error.code==1){
        
        var alertmsg = "DB Table already exists.";
        
        navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
        //alert(alertmsg);
    } else {
        
        // Error is a human-readable string.
        
        var alertmsg = 'Oops.  Error was '+error.message+' (Code '+error.code+').';
        
        navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
        //alert(alertmsg);
        
        
    }
    
    return false;
    
}





function nullDataHandler(){
    
    //alert("SQL Query Succeeded");
    
}



function settowlocationfun(mapid,radiusval,addressid,latitudeid,longitudeid,txtsetradiusCity,checkboxcity)

{
    
	//var map = new google.maps.Map(document.getElementById(''+mapid+''));
    
	var input = /** @type {HTMLInputElement} */(document.getElementById(''+addressid+''));
    
	var autocomplete = new google.maps.places.Autocomplete(input);
    
    
    
	google.maps.event.addListener(autocomplete, 'place_changed', function() {
                                  
                                  //infowindow.close();
                                  
                                  //marker.setVisible(false);
                                  
                                  input.className = 'ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-c';
                                  
                                  var place = autocomplete.getPlace();
                                  
                                  if (!place.geometry) {
                                  
                                  // Inform the user that the place was not found and return.
                                  
                                  input.className = 'ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-c';
                                  
                                  return;
                                  
                                  }
                                  
                                  if (place.geometry.viewport) {
                                  
                                  $("#"+latitudeid+"").val(place.geometry.location.lat());
                                  
                                  $("#"+longitudeid+"").val(place.geometry.location.lng());
                                  
                                  //UpdateGoogleMapFunc(mapid,place.geometry.location.lat(),place.geometry.location.lng());
                                  
                                  
                                  
                                  setradiusfunc(place.geometry.location.lat(),place.geometry.location.lng(),radiusval,mapid,txtsetradiusCity,checkboxcity);
                                  
                                  } else {
                                  
                                  $("#"+latitudeid+"").val(place.geometry.location.lat());
                                  
                                  $("#"+longitudeid+"").val(place.geometry.location.lng());
                                  
                                  //UpdateGoogleMapFunc(mapid,place.geometry.location.lat(),place.geometry.location.lng());
                                  
                                  setradiusfunc(place.geometry.location.lat(),place.geometry.location.lng(),radiusval,mapid,txtsetradiusCity,checkboxcity);
                                  
                                  }
                                  
                                  });
    
}



function onBlurFunForGeolocation(Value,Lati,Lng,Address,errId,pageid)

{
    
    geocoder.geocode({ 'address': Value }, function(results, status) {
                     
                     if (status == google.maps.GeocoderStatus.OK) {
                     
                     $("#"+Address+"").val(results[0].formatted_address);
                     
                     $("#"+Lati+"").val(results[0].geometry.location.lat());
                     
                     $("#"+Lng+"").val(results[0].geometry.location.lng());
                     
                     $("#"+errId+"").hide();
                     
                     
                     
                     revtmpaddval = results[0].formatted_address.split(',').reverse().join(',');
                     
                     splitval = revtmpaddval.split(',');
                     
                     if(splitval[2]!="")
                     
                     {
                     
                     var nvCityName = splitval[2];
                     
                     }
                     
                     else
                     
                     {
                     
                     if(splitval[1]!="")
                     
                     {
                     
                     var nvCityName = splitval[1];
                     
                     }
                     
                     else
                     
                     {
                     
                     var nvCityName = splitval[0];
                     
                     }
                     
                     }
                     
                     if(pageid=="settingpage")
                     
                     {
                     
                     /*$("#txtsetdefradiusCity").empty();
                      
                      $("#txtsetdefradiusCity").append('<input type="checkbox" name="acco-checkbox-city[]" id="acco-checkbox-city0" value="'+nvCityName+'" checked><label for="acco-checkbox-city0">'+nvCityName+'</label>');*/
                     
                     $("input[type='checkbox']").checkboxradio().checkboxradio("refresh");
                     
                     var radval = $("#txtsetradiuslocation").val();
                     
                     setradiusfunc(results[0].geometry.location.lat(),results[0].geometry.location.lng(),radval,"set_map_canvas","txtsetradiusCity","acco-checkbox-city");
                     
                     }
                     
                     else
                     
                     {
                     
                     /*$("#txtdefradiusCity").empty();
                      
                      $("#txtdefradiusCity").append('<input type="checkbox" name="checkbox-city[]" id="checkbox-city0" value="'+nvCityName+'" checked><label for="checkbox-city0">'+nvCityName+'</label>');*/
                     
                     $("input[type='checkbox']").checkboxradio().checkboxradio("refresh");
                     
                     var radval = $("#txtradiuslocation").val();
                     
                     setradiusfunc(results[0].geometry.location.lat(),results[0].geometry.location.lng(),radval,"map_canvas","txtradiusCity","checkbox-city");
                     
                     }
                     
                     
                     
                     return false;
                     
                     } else {
                     
                     var alertmsg = "Location information is unavailable. Please enable from phone settings.";
                     
                     navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
                     //alert(alertmsg);
                     
                     
                     }
                     
                     });
    
}



function enterkeyfuncation(Value,Lati,Lng,Address,errId,pageid)

{
    
	if (event.keyCode == 13)
        
	{
        
		geocoder.geocode({ 'address': Value }, function(results, status) {
                         
                         if (status == google.maps.GeocoderStatus.OK) {
                         
                         $("#"+Address+"").val(results[0].formatted_address);
                         
                         $("#"+Lati+"").val(results[0].geometry.location.lat());
                         
                         $("#"+Lng+"").val(results[0].geometry.location.lng());
                         
                         $("#"+errId+"").hide();
                         
                         
                         
                         revtmpaddval = results[0].formatted_address.split(',').reverse().join(',');
                         
                         splitval = revtmpaddval.split(',');
                         
                         if(splitval[2]!="")
                         
                         {
                         
                         var nvCityName = splitval[2];
                         
                         }
                         
                         else
                         
                         {
                         
                         if(splitval[1]!="")
                         
                         {
                         
                         var nvCityName = splitval[1];
                         
                         }
                         
                         else
                         
                         {
                         
                         var nvCityName = splitval[0];
                         
                         }
                         
                         }
                         
                         
                         
                         if(pageid=="settingpage")
                         
                         {
                         
                         /*$("#txtsetdefradiusCity").empty();
                          
                          $("#txtsetdefradiusCity").append('<input type="checkbox" name="acco-checkbox-city[]" id="acco-checkbox-city0" value="'+nvCityName+'" checked><label for="acco-checkbox-city0">'+nvCityName+'</label>');*/
                         
                         $("input[type='checkbox']").checkboxradio().checkboxradio("refresh");
                         
                         var radval = $("#txtsetradiuslocation").val();
                         
                         setradiusfunc(results[0].geometry.location.lat(),results[0].geometry.location.lng(),radval,"set_map_canvas","txtsetradiusCity","acco-checkbox-city");
                         
                         /*$(".settingpagecontcls").data("mobileIscrollview").refresh();
                          
                          $(".settingpagecontcls").jqmData("iscrollview").refresh();
                          
                          $(".settingpagecontcls").iscrollview("refresh");*/
                         
                         }
                         
                         else
                         
                         {
                         
                         /*$("#txtdefradiusCity").empty();
                          
                          $("#txtdefradiusCity").append('<input type="checkbox" name="checkbox-city[]" id="checkbox-city0" value="'+nvCityName+'" checked><label for="checkbox-city0">'+nvCityName+'</label>');*/
                         
                         $("input[type='checkbox']").checkboxradio().checkboxradio("refresh");
                         
                         var radval = $("#txtradiuslocation").val();
                         
                         setradiusfunc(results[0].geometry.location.lat(),results[0].geometry.location.lng(),radval,"map_canvas","txtradiusCity","checkbox-city");
                         
                         /*$(".profilepagecontcls").data("mobileIscrollview").refresh();
                          
                          $(".profilepagecontcls").jqmData("iscrollview").refresh();
                          
                          $(".profilepagecontcls").iscrollview("refresh");*/
                         
                         }
                         
                         return false;
                         
                         } else {
                         
                         var alertmsg = "Location information is unavailable. Please enable from phone settings.";
                         
                         navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
                         //alert(alertmsg);
                         }
                         
                         });
        
	}
    
}



function getcountrycodefunc()

{
    
	$.ajax({
           
           type: 'GET',
           
           data: 'FormType=countrycode',
           
           url: Url,
           
           success: function(Data){
           
           $("#provmobilecountrycode").val(Data);
           
           },
           
           error: function(){
           
           //alert('There was an error in register form');
           
           }
           
           });
    
	return false;
    
}



function UpdateGoogleMapFunc(mapId,lat,lng)

{
    
    
    
    latlon=new google.maps.LatLng(lat, lng);
    
    var myOptions={
        
    center:latlon,
        
    zoom:12,
        
    mapTypeId:google.maps.MapTypeId.ROADMAP,
        
    scrollwheel:false,
        
    mapTypeControl:false,
        
    zoomControl:false,
        
	panControl: false,
        
    streetViewControl:false,
        
    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
        
    };
    
    map = new google.maps.Map(document.getElementById(""+mapId+""), myOptions);
    
    var marker=new google.maps.Marker({icon: "http://towchoice.com/quotes/images/icon1.png",position:latlon,map:map});
    
    
    
    
    
    geocoder = new google.maps.Geocoder();
    
	
    
    setupEvents();
    
    centerChanged();
    
    reverseGeocode();
    
}



function getBoundsZoomLevel(bounds, mapDim) {
    
    var WORLD_DIM = { height: 256, width: 256 };
    
    var ZOOM_MAX = 21;
    
    
    
    function latRad(lat) {
        
        var sin = Math.sin(lat * Math.PI / 180);
        
        var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
        
    }
    
    
    
    function zoom(mapPx, worldPx, fraction) {
        
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
        
    }
    
    
    
    var ne = bounds.getNorthEast();
    
    var sw = bounds.getSouthWest();
    
    
    
    var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;
    
    
    
    var lngDiff = ne.lng() - sw.lng();
    
    var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;
    
    
    
    var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    
    var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);
    
    
    
    return Math.min(latZoom, lngZoom, ZOOM_MAX);
    
}



function createMarkerForPoint(point) {
    
    return new google.maps.Marker({
                                  
                                  position: new google.maps.LatLng(point.lat, point.lng)
                                  
                                  });
    
}



function createBoundsForMarkers(markers) {
    
    var bounds = new google.maps.LatLngBounds();
    
    $.each(markers, function() {
           
           bounds.extend(this.getPosition());
           
           });
    
    return bounds;
    
}



function setZoomForMapFunc(markers) {
    
	if(markers>=100)
        
	{
        
		return 7;
        
	}
    
	else if(markers>=40)
        
	{
        
		return 8;
        
	}
    
	else if(markers>=30)
        
	{
        
		return 9;
        
	}
    
	else if(markers>=20)
        
	{
        
		return 9;
        
	}
    
	else if(markers>=10)
        
	{
        
		return 10;
        
	}
    
	
    
	else if(markers>=5)
        
	{
        
		return 11;
        
	}
    
	else if(markers>=3)
        
	{
        
		return 12;
        
	}
    
	else if(markers>=2)
        
	{
        
		return 13;
        
	}
    
	else(markers>=1)
        
	{
        
		return 14;
        
	}
    
}

function isNumberKey(evt)

{
    
    var charCode = (evt.which) ? evt.which : event.keyCode
    
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        
        return false;
    
    
    
    return true;
    
}



function UpdBidsListFun(BidId,HelpId,ProvId,UrId)

{
    
	$("#countdown_dashboardwaittimer"+HelpId+"").stopCountDown();
    
	var nvCheckBidGreen = $("#HOL"+HelpId+"").hasClass("BidGreenCls");
    
	if(nvCheckBidGreen==true)
        
	{
        
		
        
	}
    
	else
        
	{
        
		$("#EnbDis"+HelpId+"").html('<p class="yellowmsg ui-li-desc">'+NotSelBtnTxt+'</p>');
        
		//$("#HOL"+HelpListEach.help_id+"").attr("style","background-color:#FF3535;");
        
		$("#HOL"+HelpId+"").removeClass("BidGreenCls");
        
		$("#HOL"+HelpId+"").removeClass("BidGrayCls");
        
		$("#HOL"+HelpId+"").addClass("BidRedCls");
        
	}
    
	$("#countdown_dashboardwaittimer"+HelpId+"").hide();
    
	$("#countdown_dashboardwaittimer"+HelpId+"").stopCountDown();
    
	return false;
    
}



function ProviderHelpRequestTotalFunc()

{
    
	var nvLocSes = sessionStorage.current;
    
	if(nvLocSes!="" && nvLocSes!=undefined)
        
	{
        
		$.ajax({
               
               type: 'POST',
               
               data: 'FormType=ProviderTotalNoOfRec&PrivId='+nvLocSes,
               
               url: Url,
               
               success: function(data){
               
               $("#TotalHelpReq").html(data);
               
               },
               
               error: function(){
               
               //console.log(data);
               
               }
               
               });
        
		return false;
        
	}
    
}



function checkemailexists(email,errId)

{
    
	var postData = $('#txtProviderEmailAdd').serialize();
    
	$.ajax({
           
           type: 'POST',
           
           data: postData+'&FormType=checkemailinsystem',
           
           url: Url,
           
           success: function(data){
           
           if(data=="OK")
           
           {
           
           $("#txtProviderEmailAddErrorMsg").hide();
           
           $("#"+errId+"").hide();
           
           return false;
           
           }
           
           else
           
           {
           
           $("#txtProviderEmailAddErrorMsg").hide();
           
           $("#"+errId+"").show();
           
           return false;
           
           }
           
           },
           
           error: function(){
           
           //console.log(data);
           
           }
           
           });
    
	return false;
    
}



function providerbidupdatefunc(Data)

{
    
	var split = Data.split(',');
    
    var HId = split[1];
    
    var PId = split[2];
    
    var nvLocSes = sessionStorage.current;
    
    if(nvLocSes==PId)
        
	{
        
    	$("#countdown_dashboard"+HId+"").stopCountDown();
        
		$("#countdown_dashboardwaittimer"+HId+"").stopCountDown();
        
    	updatehelprequeststatusfun("",HId);
        
	}
    
}



function googlelivemap(breckdownlat,breckdownlng,seclat,seclng,MainDivId)

{
    
	var directionsService = new google.maps.DirectionsService();
    
    var directionsDisplay = new google.maps.DirectionsRenderer();
    
    
    
    //directionsDisplay.setPanel(document.getElementById('panel'));
    
    if(seclat!="" && seclng!="")
        
	{
        
    	var map = new google.maps.Map(document.getElementById(''+MainDivId+''), {
                                      
                                      zoom:16,
                                      
                                      scrollwheel:false,
                                      
                                      streetViewControl: false,
                                      
                                      mapTypeControl:false,
                                      
                                      zoomControl:false,
                                      
									  panControl: false,
                                      
                                      mapTypeId: google.maps.MapTypeId.ROADMAP
                                      
                                      });
        
        
        
        directionsDisplay.setMap(map);
        
        
        
    	var request = {
            
        origin: new google.maps.LatLng(breckdownlat, breckdownlng),
            
        destination: new google.maps.LatLng(seclat, seclng),
            
        travelMode: google.maps.DirectionsTravelMode.DRIVING
            
        };
        
        
        
        directionsService.route(request, function(response, status) {
                                
                                if (status == google.maps.DirectionsStatus.OK) {
                                
                                directionsDisplay.setDirections(response);
                                
                                }
                                
                                });
        
        
        
        var start = new google.maps.LatLng(breckdownlat, breckdownlng);
        
        var stop = new google.maps.LatLng(seclat, seclng);
        
        
        
        var startMarker = new google.maps.Marker({ position: start, map: map, icon: 'http://towchoice.com/dispatch/images/iconcar.png' });
        
        var stopMarker = new google.maps.Marker({ position: stop, map: map, icon: 'http://towchoice.com/dispatch/images/icontarget.png' });
        
        
        
        directionsDisplay.setOptions( { suppressMarkers: true } );
        
	}
    
    else
        
	{
        
        
        
        var center = new google.maps.LatLng(breckdownlat, breckdownlng);
        
        var mapOptions = {
            
        zoom:16,
            
        scrollwheel:false,
            
        streetViewControl: false,
            
        mapTypeControl:false,
            
        zoomControl:false,
            
		panControl: false,
            
        mapTypeId: google.maps.MapTypeId.ROADMAP,
            
        center: center
            
        }
        
        map = new google.maps.Map(document.getElementById(''+MainDivId+''), mapOptions);
        
        var marker=new google.maps.Marker({position:center,map:map,icon: 'http://towchoice.com/dispatch/images/iconcar.png'});
        
        directionsDisplay.setMap(map);
        
	}
    
}



function setVisibility()

{
    
	$(".abc").show();
    
	$(".abcd").hide();
    
}

function setVisibility1()

{
    
	$(".abcd").show();
    
	$(".abc").hide();
    
}



function checkboxbindfunc()
{
	if($(".layers:checked").length > 0)
	{
		
		$("#selecallchk").attr("checked","checked");
        
		$("#selecallchk").checkboxradio("refresh");
        
		
		$("#selecallchk1").attr("checked","checked");
        
		$("#selecallchk1").checkboxradio("refresh");
        
	}
    
	else
        
	{
		
		$("#selecallchk").removeAttr("checked");
		
		$("#selecallchk").checkboxradio("refresh");
        
		
		$("#selecallchk1").removeAttr("checked");
        
		$("#selecallchk1").checkboxradio("refresh");
        
	}
	
}



function onLoad() {
    
    document.addEventListener("deviceready", onDeviceReady, false);
    
}



// Cordova is loaded and it is now safe to call Cordova methods

//

function onDeviceReady() {
    
    // Register the event listener
    
    document.addEventListener("backbutton", onBackKeyDown, false);
    
    checkConnection();
    
}



// Handle the back button

//

function onBackKeyDown() {
    
    if($.mobile.activePage.is("#sphelplistmain"))
        
    {
        
        navigator.app.exitApp();
        
    }
    
    if($.mobile.activePage.is("#signinpage"))
        
    {
        
        navigator.app.exitApp();
        
    }
    
    navigator.app.backHistory();
    
}



function checkConnection() {
    
    var networkState = navigator.connection.type;
    
    
    
    var states = {};
    
    states[Connection.UNKNOWN]  = 'UnknownConnection';
    
    states[Connection.ETHERNET] = 'Ethernet connection';
    
    states[Connection.WIFI]     = 'WiFi connection';
    
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    
    states[Connection.CELL]     = 'Cell generic connection';
    
    states[Connection.NONE]     = 'NoNetworkConnection';
    
    
    
    if(states[networkState]=="NoNetworkConnection")
        
    {
        
        var alertmsg = "No internet connection detected, please check your device settings.";
        
        navigator.notification.alert(''+alertmsg+'',alertDismissed,'Tow Choice','Done');
        //alert(alertmsg);
    }
    
}



// alert dialog dismissed

function alertDismissed() {
    
    // do something
    
}



function onConfirm(buttonIndex) {
    
    if(buttonIndex==2)
        
    {
        
        var HelpId = sessionStorage.decline;
        
        $('#EnbDis'+HelpId+' button:last').attr("disabled","disabled");
        
        $("#countdown_dashboard"+HelpId+"").stopCountDown();
        
        $("#countdown_dashboardwaittimer"+HelpId+"").stopCountDown();
        
        $("#countdown_dashboard"+HelpId+"").hide();
        
        $("#countdown_dashboardwaittimer"+HelpId+"").hide();
        
        //$('#HOL'+HelpId+'').attr("style","background-color:#cccccc;");
        
        $("#HOL"+HelpId+"").removeClass("BidRedCls");
        
        $("#HOL"+HelpId+"").removeClass("BidGreenCls");
        
        $("#HOL"+HelpId+"").addClass("BidGrayCls");
        
        $("#EnbDis"+HelpId+"").html('<p class="yellowmsg ui-li-desc">'+BidDecTxt+'</p>');
        
        DeclineHelpRequestInfoFun(HelpId);
        
    }
    
}