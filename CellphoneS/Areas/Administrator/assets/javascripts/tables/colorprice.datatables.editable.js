
(function ($) {

	'use strict';

	var table1 = $('#datatable-editable1');
	var table2 = $('#datatable-editable2');

	var datatableInit1 = function () {
		var $table = table1;
		var datatable1 = $table.dataTable({

			columns: [
				null,
				null,
				null,
				{
					data: null,
					className: "action",
					defaultContent: '<i class="fa fa-pencil editt-row" style="cursor:pointer;"/></i> <i class="fa fa-trash-o removeMemory" style="cursor:pointer;"/></i>',
					orderable: false
				}
			],
			"order": [[1, 'asc']],
			language: {
				"lengthMenu": "Hiển thị _MENU_ bản ghi trên trang",
				"zeroRecords": "Không có bản ghi nào",
				"info": "Trang _PAGE_ trong _PAGES_ trang",
				"infoEmpty": "Không có bản ghi nào",
				"infoFiltered": "(lọc từ _MAX_ bản ghi)"
			}, pageLength: 4,
			searching: false, ordering: false, bLengthChange: false
		});
	};

	var datatableInit2 = function () {
		var $table = table2;
		var datatable2 = $table.dataTable({

			columns: [
				null,
				null,
				null,
				null,
				{
					data: null,
					className: "action",
					defaultContent: '<i class="fa fa-pencil editt-row" style="cursor:pointer;"/></i> <i class="fa fa-trash-o removePriceColor"  style="cursor:pointer;"/></i>',
					orderable: false
				}
			],
			"order": [[1, 'asc']],
			language: {
				"lengthMenu": "Hiển thị _MENU_ bản ghi trên trang",
				"zeroRecords": "Không có bản ghi nào",
				"info": "Trang _PAGE_ trong _PAGES_ trang",
				"infoEmpty": "Không có bản ghi nào",
				"infoFiltered": "(lọc từ _MAX_ bản ghi)"
			}, pageLength: 4,
			searching: false, ordering: false, bLengthChange: false
		});
	};



	$('#datatable-editable1 tbody').on('click', 'tr', function () {
		if ($(this).hasClass('selected')) {
			$(this).removeClass('selected');
		}
		else {
			table1.DataTable().$('tr.selected').removeClass('selected');
			$(this).addClass('selected');
		}
	});

	$('#button').click(function () {
		table.row('.selected').remove().draw(false);
	});


	var countmemID = 1;
	$('#dialogAddmemory').click(function () {
		var memoryName = $('#memory')[0].value;
		var description = $('#memodiscription')[0].value;
		var t = table1.DataTable();
		t.row.add([
			countmemID,
			memoryName,
			description,
			{
				data: null,
				className: "action",
				defaultContent: '<i class="fa fa-pencil editt-row" style="cursor:pointer;"/></i> <i class="fa fa-trash-o removePriceColor" style="cursor:pointer;"/></i>',
				orderable: false
			}
		]).draw(false);
		countmemID++;

		t.on('draw.dt', function () {
			var PageInfo = $('#datatable-editable1').DataTable().page.info();
			t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
				cell.innerHTML = i + 1 + PageInfo.start;
			});
		});
	});

	$('.removeMemory').click(function () {
		console.log('ngu');
		//var t = table1.DataTable();
		//t.row($(this).parents('tr')).remove().draw();
	});

	$('#datatable-editable1 tbody').on('click', '.removeMemory', function () {
		var t = table1.DataTable();
		t.row($(this).parents('tr')).remove().draw();
	});


	$('.exit').click(function () {
		$('.workform').hide();
	});

	//$('#dialogAdd').click(function () {
	//	var ColorID =
	//	var ColorName =
	//	var Price =
	//	var Quantity =
	//	var ImageName =
 //   })

	$(function () {
		datatableInit2();
		datatableInit1();
	});

}).apply(this, [jQuery]);