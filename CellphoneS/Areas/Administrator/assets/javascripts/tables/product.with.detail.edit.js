

(function ($) {

    'use strict';
    var GetProductDetail = function (details) {
                var detailContents = [];
                for (var i = 0; i < details.length; i++) {
                    detailContents.push(`
                        <tr>
                            <td>${details[i].ColorID}</td>
                            <td>${details[i].ColorName}</td>
                            <td><img class="image_index" src="/assets/images/`+details[i].ColorImage+`"/></td>
                            <td>${details[i].NewPrice}</td>
                            <td>${details[i].OldPrice}</td>
                        </tr>
                    `);}
                return detailContents;
            }

    //var EditMember = function (member, callback) {
    //    $.ajax({
    //        url: "http://api.duocmyphamhaiduong.com/UpdateMember",
    //        type: "PUT",
    //        contentType: "application/json;charset=utf-8",
    //        data: JSON.stringify(member),
    //        dataType: "json",
    //        success: function (response) {
    //            callback()
    //        },

    //        error: function (x, e) {
    //            alert('Failed');
    //        }
    //    });
    //}

    //var AddMember = function (member, callback) {
    //    $.ajax({
    //        url: "http://api.duocmyphamhaiduong.com/api/Members",
    //        type: "POST",
    //        contentType: "application/json;charset=utf-8",
    //        data: JSON.stringify(member),
    //        dataType: "json",
    //        success: function (response) {
    //            callback()
    //        },

    //        error: function (x, e) {
    //            alert('Failed');
    //        }
    //    });
    //}

    //var DeleteMember = function (id, callback) {
    //    $('.details').remove();
    //    $.ajax({
    //        url: "http://api.duocmyphamhaiduong.com/api/Members/" + id,
    //        type: "DELETE",
    //        contentType: "application/json",
    //        success: function () {
    //            callback()
    //        },
    //        error: function (XMLHttpRequest, textStatus, errorThrown) {
    //            alert("some error");
    //        }
    //    });
    //}

    var datatableInit = function () {
        var $table = $('#datatable-details');

        // format function for row details
        var fnFormatDetails = function (datatable, tr, productID, memoryID) {
            $.get(`https://localhost:44364/Administrator/Product/GetProductDetailsADMIN?productID=${productID}&memoryID=${memoryID}`)
                .done(function (details) {
                    var data = GetProductDetail(details);
                    console.log(details)
                    console.log(data);
                    var subtable= `<table class="table mb-none">
                        <thead>
                            <tr>
                                <th>Mã màu</th>
                                <th>Màu</th>
                                <th>Ảnh</th>
                                <th>Giá hiện tại</th>
                                <th>Giá khởi điểm</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.join(' ')}
                        </tbody>
                    </table>`
                    datatable.fnOpen(tr, subtable, 'details')
            })
        };

        // initialize
        var datatable = $table.dataTable({
            ajax: {
                "url": `https://localhost:44364/Administrator/Product/GetProductsByCategory?categoryID=CT00000001`,
                "dataSrc": ""
            },
            columns: [
                {
                    data: null,
                    className: "text-center",
                    defaultContent: '<i data-toggle class="fa fa-plus-square-o text-primary h5 m-none" style="cursor: pointer;"></i>',
                    orderable: false
                },
                {data: "ProductID"},
                { data: "ProductName" },
                {data: "MemoryName"},
                { data: "CategoryName"},
                {data: "BrandName"},
                {
                    data: "ImageName",
                    "render": function (url, type, full) {
                        return '<img class="image_index" src="/assets/images/' +url+ '"/>';
                    }
                },

                {
                    data: null,
                    className: "action",
                    defaultContent: '<i class="fa fa-pencil editt-row" style="cursor:pointer;"/></i> <i class="fa fa-trash-o removeMember" style="cursor:pointer;"/></i>',
                    orderable: false
                }
            ],
            "order": [[1, 'asc']],
            "language": {
                "lengthMenu": "Hiển thị _MENU_ bản ghi trên trang",
                "zeroRecords": "Không có bản ghi nào",
                "info": "Trang _PAGE_ trong _PAGES_ trang",
                "infoEmpty": "Không có bản ghi nào",
                "infoFiltered": "(lọc từ _MAX_ bản ghi)"
            }
        });
        // add a listener
        $table.on('click', 'i[data-toggle]', function () {
            var $this = $(this),
                tr = $(this).closest('tr').get(0),
                productID = $(this).parent().siblings()[0].textContent,
                memoryName = $(this).parent().siblings()[2].textContent;
            if (datatable.fnIsOpen(tr)) {
                $this.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
                datatable.fnClose(tr);
            } else {
                $this.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
                fnFormatDetails(datatable, tr, productID, memoryName);
            }
        });
    };
    
    ////Handle
    //$(document).ready(function () {
    //    name = "";
        $('#addToTablee').click(function () {
            $('#dialogAddproduct').show();
        });

    //    //Edit---------------------------------------------------------------------------
    //    $(document).on('click', '.editt-row', function () {
    //        var id = ($(this).parent().siblings()[1]).textContent
    //        var member = {};
    //        $.get(``).done(
    //            function (data) {
    //                ($('#efid')[0]).value = data[0].MemberID;
    //                ($('#efname')[0]).value = data[0].FullName;
    //                ($('#ereferralID')[0]).value = data[0].ReferralID;
    //                ($('#egender')[0]).value = data[0].Gender;
    //                ($('#edob')[0]).value = data[0].Birthday;
    //                ($('#eaddress')[0]).value = data[0].Address;
    //                ($('#eemail')[0]).value = data[0].Email;
    //                ($('#ephone')[0]).value = data[0].Phone;
    //                ($('#eIDCard')[0]).value = data[0].IDCard;
    //                ($('#eIDCard_PlaceIssue')[0]).value = data[0].IDCard_PlaceIssue;
    //                ($('#eIDCard_DateIssue')[0]).value = data[0].IDCard_DateIssue;
    //                ($('#epassword')[0]).value = data[0].Password;
    //                ($('#eposition')[0]).value = data[0].PositionID;
    //                var role = data[0].RoleID;
    //                if (role == 1) { role = "Chủ sở hữu" } else if (role == 2) { role = "Quản trị viên" } else role = "Thành viên";
    //                ($('#erole')[0]).value = role;
    //                var active = data[0].IsActive;
    //                if (active) active = "Đã active"; else active = "Chưa active";
    //                ($('#eisactive')[0]).value = active;
    //                ($('#eavatar')[0]).value = data[0].Avatar;
    //                console.log(data);
    //            }
    //        )
    //        $('#dialogEditmember').show();
    //    });
    //    //Edit Member-----------------------------------------------------------------------------------------
    //    $(document).on('click', '#dialogEditmember .save', function () {
            
    //        if ($('#frmedit').valid()) {
    //        $('.workform#dialogEditmember').hide();
    //        var member = {};
    //        var fid = ($('#efid')[0]).value
    //        var fname = ($('#efname')[0]).value
    //        var referralID = ($('#ereferralID')[0]).value
    //        var gender = ($('#egender')[0]).value
    //        if (gender == 'Nam') gender = true; else gender = false;
    //        var dob = (new Date(($('#edob')[0]).value)).toISOString()
    //        var address = ($('#eaddress')[0]).value
    //        var email = ($('#eemail')[0]).value
    //        var phone = ($('#ephone')[0]).value
    //        var IDCard = ($('#eIDCard')[0]).value
    //        var IDCard_PlaceIssue = ($('#eIDCard_PlaceIssue')[0]).value
    //        var IDCard_DateIssue = (new Date(($('#eIDCard_DateIssue')[0]).value)).toISOString()
    //        var password = ($('#epassword')[0]).value
    //        var position = ($('#eposition')[0]).value
    //        if (position == "Trưởng phòng") { position = 1 } else if (position == "Trưởng phòng dự bị") { position = 2 } else if (position == "Trưởng nhóm") { position = 3 } else if (position == "Thành viên đạt chuẩn") { position = 4 } else if (position == "Thành viên tích cực") { position = 5 } else if (position == "Thành viên 300") { position = 6 } else position = 7
    //        var role = ($('#erole')[0]).value
    //        if (role = "Thành viên") role = 3; else if (role = "Quản trị viên") role = 2; else role = 1;
    //        var isactive = ($('#eisactive')[0]).value
    //        if (isactive == 'Đã active') isactive = true; else isactive = false
    //        var avatar = ($('#eavatar')[0]).value


    //        member.MemberID = fid;
    //        member.FullName = fname;
    //        member.ReferralID = referralID;
    //        member.Gender = gender;
    //        member.Birthday = dob;
    //        member.Address = address;
    //        member.Email = email;
    //        member.Phone = phone;
    //        member.IDCard = IDCard;
    //        member.IDCard_PlaceIssue = IDCard_PlaceIssue;
    //        member.IDCard_DateIssue = IDCard_DateIssue;
    //        member.Password = password;
    //        member.PositionID = position;
    //        member.RoleID = role;
    //        member.IsActive = isactive;
    //        member.Avatar = null;

    //            EditMember(member, () => {
    //                const table = $("#datatable-details").DataTable();
    //                table.ajax.reload(null, false);
    //            })
    //        }
    //    });

    //    //Insert Member-----------------------------------------------------------------------------------------
    //    $(document).on('click', '#dialogAddmember .save', function () {
           
    //        if ($('#frmadd').valid()) {
    //        var member = {};
    //        var fid = ($('#fid')[0]).value
    //        var fname = ($('#fname')[0]).value
    //        var referralID = ($('#referralID')[0]).value
    //        var gender = ($('#gender')[0]).value
    //        if (gender == 'Nam') gender = true; else gender = false;
    //        var dob = ($('#dob')[0]).value
    //        var address = ($('#address')[0]).value
    //        var email = ($('#email')[0]).value
    //        var phone = ($('#phone')[0]).value
    //        var IDCard = ($('#IDCard')[0]).value
    //        var IDCard_PlaceIssue = ($('#IDCard_PlaceIssue')[0]).value
    //        var IDCard_DateIssue = ($('#IDCard_DateIssue')[0]).value
    //        var password = ($('#password')[0]).value
    //        var position = ($('#position')[0]).value
    //        if (position == "Trưởng phòng") { position = 1 } else if (position == "Trưởng phòng dự bị") { position = 2 } else if (position == "Trưởng nhóm") { position = 3 } else if (position == "Thành viên đạt chuẩn") { position = 4 } else if (position == "Thành viên tích cực") { position = 5 } else if (position == "Thành viên 300") { position = 6 } else position = 7
    //        var role = ($('#role')[0]).value
    //        if (role = "Thành viên") role = 3; else if (role = "Quản trị viên") role = 2; else role = 1;
    //        var isactive = ($('#isactive')[0]).value
    //        if (isactive == 'Đã active') isactive = true; else isactive = false
    //        var avatar = ($('#avatar')[0]).value


    //        member.MemberID = fid;
    //        member.FullName = fname;
    //        member.ReferralID = referralID;
    //        member.Gender = gender;
    //        member.Birthday = dob;
    //        member.Address = address;
    //        member.Email = email;
    //        member.Phone = phone;
    //        member.IDCard = IDCard;
    //        member.IDCard_PlaceIssue = IDCard_PlaceIssue;
    //        member.IDCard_DateIssue = IDCard_DateIssue;
    //        member.Password = password;
    //        member.PositionID = position;
    //        member.RoleID = role;
    //        member.IsActive = isactive;
    //        member.Avatar = null;
            
    //            AddMember(member, () => {
    //                const table = $("#datatable-details").DataTable();
    //                table.ajax.reload(null, false);
    //            })
    //            $('.workform#dialogAddmember').hide();
    //        }
           
          
    //    });


    //    $(document).on('click', '.pas', function () {
    //        var nodes = Array.prototype.slice.call(document.getElementsByTagName('tbody')[0].children);
    //        var thistr = $(this).parent().parent().parent().parent().parent().parent('tr')[0]

    //        var index = nodes.indexOf(thistr);
    //        var name = $($($('tbody')[0]).children()[index - 1]).find('td')[2].textContent
    //        $('#sur span').text(name);
    //    });

    //});
    //$(document).on('click', '.exit', function () {
    //    $('.workform').hide();
    //});

    //$(document).ready(function () {

    //    $(document).on('click', '.removeMember', function () {
    //        var _self = {
    //            $cancel: $('#dialogCancel'),
    //            $confirm: $("#dialogConfirm"),
    //            $wrapper: $("#dialog")
    //        };
    //        var hang = $(this).parent().parent()
    //        var id = ($(this).parent().siblings()[1]).textContent
    //        // $.post("./google.com", data ,function(response){

    //        // }, 'json')
    //        $.magnificPopup.open({
    //            items: {
    //                src: '#dialog',
    //                type: 'inline'
    //            },
    //            preloader: false,
    //            modal: true,
    //            callbacks: {
    //                change: function () {
    //                    _self.$confirm.on('click', function (e) {
    //                        e.preventDefault();
    //                        hang.detach();

    //                        DeleteMember(id, () => {
    //                            const table = $("#datatable-details").DataTable();
    //                            table.ajax.reload(null, false);
    //                        })

    //                        $.magnificPopup.close();
    //                    });

    //                    _self.$cancel.on('click', function (e) {
    //                        e.preventDefault();
    //                        $.magnificPopup.close();
    //                    });
    //                },
    //                close: function () {
    //                    _self.$cancel.on('click', function (e) {
    //                        e.preventDefault();
    //                        $.magnificPopup.close();
    //                    });
    //                }
    //            }
    //        });
    //        return false;
    //    });
    //});

    //function change(id) {
    //    $.ajax({
    //        url: ``,
    //        type: 'PUT',
    //        success: function (data) {
    //            $.post('', {
    //                NotifyID: 0,
    //                Sender: localStorage.getItem('userID'),
    //                Title: "Công ty TNHH DMP Hải Dương - ĐỔI MẬT KHẨU",
    //                Content: `Mật khẩu mới: ${data}`,
    //                Receiver: id,
    //                IsSendAll: false,
    //                CreateDate: (new Date()).toISOString()
    //            }).success(function () {
    //                toastr.success("Đổi mật khẩu thành công");
    //            });
    //        },
    //        error: function () {

    //        }
    //    })
    //}

    //$(document).on('click', '.pas', function (e) {
    //    e.preventDefault();
    //    var _self = {
    //        $cancel: $('#dialogCancel1'),
    //        $confirm: $("#dialogConfirm1"),
    //        $wrapper: $("#dialog")
    //    };
    //    var row = $('.editt-row').parent().parent().children('td')[1];
    //    var hang = $(this).parent().parent()
    //    var data = $($(this).parent().parent().parent().parent().parent().parent().prev().children()[1]).text()
        
    //    $.magnificPopup.open({
    //        items: {
    //            src: '#dialog2',
    //            type: 'inline'
    //        },
    //        preloader: false,
    //        modal: true,
    //        callbacks: {
    //            change: function () {
    //                _self.$confirm.on('click', function (e) {
    //                    e.preventDefault();
    //                    change(data);
    //                    $.magnificPopup.close();
    //                });

    //                _self.$cancel.on('click', function (e) {
    //                    e.preventDefault();
    //                    $.magnificPopup.close();
    //                });
    //            },
    //            close: function () {
    //                _self.$cancel.on('click', function (e) {
    //                    e.preventDefault();
    //                    $.magnificPopup.close();
    //                });
    //            }
    //        }
    //    });
    //    return false;
    //});



    $(function () {
        datatableInit();
    });

    $('#datepick').click(function () {
        $('.datepicker').css('z-index', '10000000000');
    })

    

}).apply(this, [jQuery]);