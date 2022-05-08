$(document).ready(function(){
 
    // show html form when 'create product' button was clicked
    $(document).on('click', '.create-product-button', function(){
        // categories api call will be here
        // load list of categories
        $.getJSON("https://localhost/RESTAPI/read.php", function(data){
            // loop through returned list of data
            var categories_options_html=`<select name='category_id' class='form-control'>`;
            $.each(data.records, function(key, val){
                categories_options_html+=`<option value='` + val.id + `'>` + val.name + `</option>`;
            });
            categories_options_html+=`</select>`;
            var create_product_html=`
 
    <!-- 'read products' button to show list of products -->
    <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
        <span class='glyphicon glyphicon-list'></span> Read Products
    </div>
        <!-- 'create product' html form -->
    <form id='create-product-form' action='#' method='post' border='0'>
        <table class='table table-hover table-responsive table-bordered'>
    
            <!-- name field -->
            <tr>
                <td>Title</td>
                <td><input type='text' name='title' class='form-control' required /></td>
            </tr>
    
            <!-- price field -->
            <tr>
                <td>Author</td>
                <td><input type='text' name='author' class='form-control' required /></td>
            </tr>
    
            <!-- description field -->
            <tr>
                <td>Price</td>
                <td><textarea type='number' name='price' class='form-control' required></textarea></td>
            </tr>
    
            
    
            <!-- button to submit form -->
            <tr>
                <td></td>
                <td>
                    <button type='submit' class='btn btn-primary'>
                        <span class='glyphicon glyphicon-plus'></span> Create Product
                    </button>
                </td>
            </tr>
    
        </table>
    </form>`;

        // inject html to 'page-content' of our app
    $("#page-content").html(create_product_html);
    
    // chage page title
    changePageTitle("Create Book");
        
        });
    });
 
    // 'create product form' handle will be here
    $(document).on('submit', '#create-product-form', function(){
        // form data will be here
        var form_data=JSON.stringify($(this).serializeObject());
        // submit form data to api
        $.ajax({
            url: "https://localhost/RESTAPI/create.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                // product was created, go back to products list
                showProducts();
            },
            error: function(xhr, resp, text) {
                // show error to console
                console.log(xhr, resp, text);
                console.log(form_data);
            }
        });
        
        return false;
    });
    

});