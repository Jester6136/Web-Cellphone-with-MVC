var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

$(document).ready(function () {
  /* Load serial */
  var species, product;
  CKEDITOR.replace('textEdit');
  $.each($('.table-species tbody tr .serial'), function (ind, el) { 
      this.innerHTML = ind+1;  
  });
  $.each($('.table-product tbody tr .serial'), function (ind, el) { 
      this.innerHTML = ind+1;  
  });

  $('.fa-times').click(function() {
      $(this).parent().parent().remove();
      var tr = document.querySelectorAll('.table-species tbody tr .serial');
      for(var i = 1; i <= tr.length; i++){
              tr[i-1].innerHTML = i;
      }
  })

  // form add
  function ID() {
      return Math.random().toString(36).substr(2, 8);
  }
  /* Change Image */
  const img = document.querySelectorAll('.change-img');
  const btnFile = document.querySelectorAll('.form-control-file');

  $(btnFile).each(function (index, element) {
      // element == this
      element.addEventListener('change', function() {
          const file = this.files[0];
          if(file){
              const reader = new FileReader();
              reader.onload = function(){
                  const result = reader.result;
                  img[index].setAttribute('src', result);
              }
              reader.readAsDataURL(file);
          }
      })
      
  });

  /* Search */
  $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
  });
  $('.list-group-item-action').click(function(){
      $('.list-group-item-action').removeClass('active');
      $(this).addClass('active');
      $('.content').css('display', 'none');
      if($(this).hasClass('btn-species'))
          $('.species').css('display', 'block');
      else if($(this).hasClass('btn-product'))
          $('.products').css('display', 'block');
  })
  $('.btn-add').click(function(){
      $('.mood ').css('display', 'block')
      var id = ID();
      if($(this).attr('name') == 'btn-add-species'){
          $('.form-add-species').css('display', 'block');
          $('.form-add-species .id').val(id);
          $('.mood .name-species').val('');
          $('.mood .des-species').val('');
      }
      else if($(this).attr('name') == 'btn-add-product'){
          $('.form-add-product').css('display', 'block');
          $('.form-add-product .id').val(id);
          $('.mood .name-product').val('');
          $('.mood .des-product').val('');
      }
  })
  $('.btn-exit').click(function(){
      $(this).parents('.mood').css('display', 'none');
      $(this).parents('.mood .form-add').css('display', 'none');
  })
  $('.btn-save').click(function(){
      console.log($(this).parents('.form-add-product').length)
      if($(this).parents('.form-add-species').length){
          var scr_img = $(this).parents('.container').find('.species-img').attr('src');
          var id = $(this).parents('.container').find('.id').val();
          var name_species = $(this).parents('.container').find('.name-species').val();
          var description = $(this).parents('.container').find('.des-species').val();
          species = {
              'img_link': scr_img,
              'id': id,
              'name': name_species,
              'description': description
          }
  
          $('.content-species').find('tbody').prepend(`
          <tr>
              <td scope="row" class="serial"></td>
              <td class="current-id">${species.id}</td>
              <td class="current-name">${species.name}</td>
              <td class="current-description">${species.description}</td>
              <td class="text-center"><img class="table-img species-img" src="${species.img_link}" alt=""></td>
              <td class="d-flex justify-content-between text-danger">
                  <i class="fas fa-edit  p-1  "></i>
                  <i class="fas fa-times p-1 "></i>
              </td>
          </tr>`);
      }
      else if($(this).parents('.form-add-product').length){
          var scr_img = $(this).parents('.container').find('.product-img').attr('src');
          var id = $(this).parents('.container').find('.id').val();
          var name_species = $(this).parents('.container').find('.cob-species option:selected').text();
          var name_product = $(this).parents('.container').find('.name-product').val();
          var price_product = $(this).parents('.container').find('.price-product').val();
          var sales = $(this).parents('.container').find('.sales-product').val();
          var quantity = $(this).parents('.container').find('.quantity-product').val();
          var description = $(this).parents('.container').find('.des-product').val();
          var detail = $(this).parents('.container').find('.detail-product').val();
          product = {
              'img_link': scr_img,
              'id': id,
              'name_species': name_species,
              'name_product': name_product,
              'price': price_product,
              'sale': sales,
              'quantity':quantity,
              'description': description,
              'detail': detail,
          }
  
          $('.content-product').find('tbody').prepend(`
          <tr>
              <td scope="row" class="serial"></td>
              <td class="current-id">${product.id}</td>
              <td class="current-species-name">${product.name_species}</td>
              <td class="current-product-name">
              ${product.name_product}
              </td>
              <td>${product.quantity}</td>
              <td class="current-price">
              ${product.price}
              </td>
              <th>${product.sale}</th>
              <td class="text-center">
              <img class="product-img table-img" src="${product.img_link}" alt="" />
              </td>
              <td class="d-flex justify-content-between text-danger">
              <i class="fas fa-edit p-1"></i>
              <i class="fas fa-times p-1"></i>
              </td>
          </tr>`);
      }
      $('.mood').css('display', 'none');
      $('.form-add').css('display', 'none');

      $('.fa-times').click(function() {
          $(this).parent().parent().remove();
          var tr = document.querySelectorAll('.table-species tbody tr .serial');
          for(var i = 1; i <= tr.length; i++){
                  tr[i-1].innerHTML = i;
          }
      })
      $.each($('.table-species tbody tr .serial'), function (ind, el) { 
          this.innerHTML = ind+1;  
      });
      $.each($('.table-product tbody tr .serial'), function (ind, el) { 
          this.innerHTML = ind+1;  
      });
  })
  $('.fa-edit').click(function(){
      $('.mood').css('display', 'block');
      var eThis = $(this);
      if($(this).parents('.content-species').length){
          $('.form-add-species').css('display', 'block');
          $('.add-title').text('Sửa loại sản phẩm')
          var scr_img = $(this).parents('tr').find('.species-img').attr('src');
          var id = $(this).parents('tr').find('.current-id').text();
          var name_species = $(this).parents('tr').find('.current-name').text();
          var description = $(this).parents('tr').find('.current-description').text();
          var species = {
              'img_link': scr_img.trim(),
              'id': id.trim(),
              'name': name_species.trim(),
              'description': description.trim()
          }
          $('.form-add-species .change-img').attr('src', species.scr_img);
          $('.form-add-species .id').val(species.id);
          $('.form-add-species .name-species').val(species.name);
          $('.form-add-species .des-species').val(species.description);
          
          $('.btn-save').click(function() {
              $(eThis).parent().parent().remove();
              $.each($('.table-species tbody tr .serial'), function (ind, el) { 
                  this.innerHTML = ind+1;  
              });
          })
      }
      else if($(this).parents('.content-product').length){
          $('.form-add-product').css('display', 'block');
          $('.add-title').text('Sửa sản phẩm');
          var scr_img = $(this).parents('tr').find('.product-img').attr('src');
          var id = $(this).parents('tr').find('.current-id').text();
          var current_species_name = $(this).parents('tr').find('.current-species-name').text();
          var current_product_name = $(this).parents('tr').find('.current-product-name').text();
          var current_price = $(this).parents('tr').find('.current-price').text();
          var current_discount = $(this).parents('tr').find('.current-discount').text();
          var product = {
              'img_link': scr_img.trim(),
              'id': id.trim(),
              'name_species': current_species_name.trim(),
              'name_product': current_product_name.trim(),
              'price': current_price.trim(),
              'discount': current_discount.trim()
          }
          console.log(product)
          $('.form-add-product .change-img').attr('src', product.scr_img);
          $('.form-add-product .id').val(product.id);
          $('.form-add-product .cob-species option').each(function (index, element) {
              if($(this).text === product.name_species){
                  $(this).selected;
              }
              
          });
          
          $('.form-add-product .name-product').val(product.name_product);
          $('.form-add-product .price-product').val(product.price);
          $('.form-add-product .quantity-product').val(product.quantity);
          $('.form-add-product .sales-product').val(product.discount);
          $('.btn-save').click(function() {
              $(eThis).parent().parent().remove();
              $.each($('.table-product tbody tr .serial'), function (ind, el) { 
                  this.innerHTML = ind+1;  
              });
          })
      }
  })
  $('.refresh').click(function(){
      $('.fa-edit').click(function(){
          $('.mood').css('display', 'block');
          var eThis = $(this);
          if($(this).parents('.content-species').length){
              $('.form-add-species').css('display', 'block');
              $('.add-title').text('Sửa loại sản phẩm')
              var scr_img = $(this).parents('tr').find('.species-img').attr('src');
              var id = $(this).parents('tr').find('.current-id').text();
              var name_species = $(this).parents('tr').find('.current-name').text();
              var description = $(this).parents('tr').find('.current-description').text();
              var species = {
                  'img_link': scr_img.trim(),
                  'id': id.trim(),
                  'name': name_species.trim(),
                  'description': description.trim()
              }
              $('.form-add-species .change-img').attr('src', species.scr_img);
              $('.form-add-species .id').val(species.id);
              $('.form-add-species .name-species').val(species.name);
              $('.form-add-species .des-species').val(species.description);
              
              $('.btn-save').click(function() {
                  $(eThis).parent().parent().remove();
                  $.each($('.table-species tbody tr .serial'), function (ind, el) { 
                      this.innerHTML = ind+1;  
                  });
              })
          }
          else if($(this).parents('.content-product').length){
              $('.form-add-product').css('display', 'block');
              $('.add-title').text('Sửa sản phẩm');
              var scr_img = $(this).parents('tr').find('.product-img').attr('src');
              var id = $(this).parents('tr').find('.current-id').text();
              var current_species_name = $(this).parents('tr').find('.current-species-name').text();
              var current_product_name = $(this).parents('tr').find('.current-product-name').text();
              var current_price = $(this).parents('tr').find('.current-price').text();
              var product = {
                  'img_link': scr_img.trim(),
                  'id': id.trim(),
                  'name_species': current_species_name.trim(),
                  'name_product': current_product_name.trim(),
                  'price': current_price.trim()
              }
              console.log(product)
              $('.form-add-product .change-img').attr('src', product.scr_img);
              $('.form-add-product .id').val(product.id);
              $('.form-add-product .cob-species option').each(function (index, element) {
                  if($(this).text === product.name_species){
                      $(this).selected;
                  }
                  
              });
              
              $('.form-add-product .name-product').val(product.name_product);
              $('.form-add-product .price-product').val(product.price);
              
              $('.btn-save').click(function() {
                  $(eThis).parent().parent().remove();
                  $.each($('.table-product tbody tr .serial'), function (ind, el) { 
                      this.innerHTML = ind+1;  
                  });
              })
          }
      })
  })
});