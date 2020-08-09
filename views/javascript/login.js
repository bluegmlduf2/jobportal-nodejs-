$(function () {

});

//OPEN BTN:function
var openModalFunc=function () {
	//LoginCookieCheck 
	var cookieVal = $.cookie("userID");
	if (cookieVal != undefined || cookieVal != null) {
		$('#chkSaveID').attr('checked', true);
		$('#MNG_ID').val(cookieVal);
	}

	$('#modalBox').modal('show').css({
		'margin-top': function () { //vertical centering
			//return -($(this).height() / 2);
			return 250;
		},
		'margin-left': function () { //Horizontal centering
			return 0;
		}
	});
}

//OPEN BTN
$('#openModalBtn').on('click',openModalFunc);

//OPEN BTN
$('#openModalBtn').on('click', function () {
	//LoginCookieCheck 
	var cookieVal = $.cookie("userID");
	if (cookieVal != undefined || cookieVal != null) {
		$('#chkSaveID').attr('checked', true);
		$('#MNG_ID').val(cookieVal);
	}

	$('#modalBox').modal('show').css({
		'margin-top': function () { //vertical centering
			//return -($(this).height() / 2);
			return 250;
		},
		'margin-left': function () { //Horizontal centering
			return 0;
		}
	});;
})

// CANCEL BTN
$('#closeModalBtn').on('click', function () {
	$('#MNG_ID').val('');
	$('#MNG_PW').val('');
	$('#modalBox').modal('hide');
});

// OK (CONFIRM) BTN
$('#confirmBtn').on('click', function () {
	var MNG_ID = $('#MNG_ID').val();
	var MNG_PW = $('#MNG_PW').val();

	if (MNG_ID == null || MNG_PW == null) {
		swal("Please Input Value");
		return;
	}

	var obj = {
		"MNG_ID": MNG_ID,
		"MNG_PW": MNG_PW,
		"CHK": $("#chkSaveID").is(":checked") ? 1 : 0
	};

	$.ajax({
		type: "POST",
		url: "/login",
		data: {
			"data": JSON.stringify(obj)
		},
		dataType: "json",
		async: false,
		//dataType: "json",//서버에서 받을 데이터 형식을 지적한다.그러나 반환값이 없으므로 에러가 발생하므로 주석처리
		success: function (result) {
			var loginId = result.JsonParam.result[0].LOGIN_ID;
			loginChk = result.JsonParam.result;  //global value
			
			swal("Welcome!", "Welcome to Login [ " + loginId + " ] !", "success");

			$('#userInfo').text("  Welcome!!  [  " + loginId + "  ]  ");
			$('#openModalBtn').text('LOG OUT');
			$('#openModalBtn').off('click');
			$('#openModalBtn').attr('id', 'logOutBtn');
			$('#closeModalBtn').trigger('click');

			// LOGOUT BTN
			$('#logOutBtn').on('click', function () {
				swal({
					title: "LogOut",
					text: "Would you like to Logout?",
					icon: "info",
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					buttons: true
				}).then((selectYN) => {
					if (selectYN) {
						loginChk = null; //global value
						$('#userInfo').text("");
						$('#logOutBtn').text('LOGIN ( SIGNUP )');
						$('#logOutBtn').off('click');
						$('#logOutBtn').attr('id', 'openModalBtn');
						//OPEN BTN
						$('#openModalBtn').on('click',openModalFunc);
					}
				});
			});                     
		},
		error: function (request, status, error) {
			var errMsg = request['responseJSON']['error'];
			swal("Error!", errMsg, "error");
		}
	});
});


