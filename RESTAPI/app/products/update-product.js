$(document).ready(function(){
 
    // show html form when 'update product' button was clicked
    $(document).on('click', '.update-product-button', function(){
        // product ID will be here
        // get product id
        var id = $(this).attr('data-id');

        // read one record based on given product id
        $.getJSON("https://localhost/RESTAPI/read_one.php?id=" + id, function(data){
        
            // values will be used to fill out our form
            var title = data.title;
            var author = data.author;
            var price = data.price;

            // load list of categories will be here


        // load list of categories
        $.getJSON("https://localhost/RESTAPI/read.php", function(data){
        
            // build 'categories option' html
            
        
            // update product html will be here
            // store 'update product' html to this variable
            var update_product_html=`
            <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
                <span class='glyphicon glyphicon-list'></span> Read Products
            </div>
            <!-- build 'update product' html form -->
            <!-- we used the 'required' html5 property to prevent empty fields -->
            <form id='update-product-form' action='#' method='post' border='0'>
                <table class='table table-hover table-responsive table-bordered'>
            
                    <!-- name field -->
                    <tr>
                        <td>Title</td>
                        <td><input value=\"` + title + `\" type='text' name='title' class='form-control' required /></td>
                    </tr>
            
                    <!-- price field -->
                    <tr>
                        <td>Author</td>
                        <td><input value=\"` + author + `\" type='text' name='author' class='form-control' required /></td>
                    </tr>
            
                    <!-- description field -->
                    <tr>
                        <td>Price</td>
                        <td><input value=\"` + price + `\" type='number' name='price' class='form-control' required /></td>
                    </tr>
            
            
                    <tr>
            
                        <!-- hidden 'product id' to identify which record to delete -->
                        <td><input value=\"` + id + `\" name='id' type='hidden' /></td>
            
                        <!-- button to submit form -->
                        <td>
                            <button type='submit' class='btn btn-info'>
                                <span class='glyphicon glyphicon-edit'></span> Update Product
                            </button>
                        </td>
            
                    </tr>
            
                </table>
            </form>`;

            // inject to 'page-content' of our app
            $("#page-content").html(update_product_html);
            
            // chage page title
            changePageTitle("Update Book");
        });
        });
    });
 
    // 'update product form' submit handle will be here

    // will run if 'create product' form was submitted
    $(document).on('submit', '#update-product-form', function(){
    
        // get form data will be here 
        // get form data
        var form_data=JSON.stringify($(this).serializeObject());
        // submit form data to api
        $.ajax({
            url: "https://localhost/RESTAPI/update.php",
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
            }
        });
    
        return false;
    });
});