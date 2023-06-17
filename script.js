$(function() {
    const resetFilter = $('#resetFilter');

    var request = $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/categories.php",
        method: "GET",
        dataType: "json"
      });
       
      request.done(function( msg ) {
        let elementHTML = ``
        const boxContent = $('#boxContent');
        $.each(msg.categories, function(key, value) {
            elementHTML += `
            <div style='background: url("${msg.categories[key].strCategoryThumb}"); background-origin: border-box; background-position: center; background-repeat: no-repeat; background-size: cover;' class='max-w-[384px] w-full relative cursor-pointer min-h-[384px] rounded-lg shadow-[0_3px_8px_0px_rgba(99,99,99,0.2)] overflow-hidden'>
                <div class="detail-category absolute flex items-center justify-center inset-x-0 p-2 bottom-0 min-h-[100px] bg-black/50">
                    <input type="hidden" value="${msg.categories[key].strCategory
                    }">   
                    <h1 class="hover:underline hover:decoration-2 text-white break-words font-semibold text-3xl">${msg.categories[key].strCategory
                    }</h1>
                </div>
            </div>
            `
        })
        console.log(elementHTML);
        boxContent.append(elementHTML);

        const detailCategory = $('.detail-category');

        detailCategory.each(function() {
            $(this).on('click', function() {
                let elementHTML = ``
                const boxContent = $('#boxContent');
                let valueParameter = $(this).children()[0].value;
                var request = $.ajax({
                    url: "http://www.themealdb.com/api/json/v1/1/filter.php",
                    method: "GET",
                    data: { c : $(this).children()[0].value },
                    dataType: "json"
                  });
                   
                  request.done(function( msg ) {
                    $.each(msg.meals, function(key, value) {
                        elementHTML += `
                        <div id='listFilter' style='background: url("${msg.meals[key].strMealThumb
                        }"); background-origin: border-box; background-position: center; background-repeat: no-repeat; background-size: cover;' class='max-w-[384px] w-full relative cursor-pointer min-h-[384px] rounded-lg shadow-[0_3px_8px_0px_rgba(99,99,99,0.2)] overflow-hidden'>
                            <div class="absolute flex items-center justify-center inset-x-0 p-2 bottom-0 min-h-[100px] bg-black/50">  
                                <h1 class="hover:underline hover:decoration-2 text-white break-words font-semibold text-3xl">${msg.meals[key].strMeal}</h1>
                            </div>
                        </div>
                        `
                    })
                    boxContent.html(elementHTML);
                    const listFilterFood = $('#listFilter');
                    const titleListFilterFood = $('#title');
                    window.scrollTo(0,0);
                    $('#banner').remove();
                    titleListFilterFood.text('List Food ' + valueParameter);
                    resetFilter.removeClass( "hidden" );
                    resetFilter.on('click', function() {
                        window.location.reload();
                    })
                  });
                  
                  request.fail(function( jqXHR, textStatus ) {
                    alert( "Request failed: " + textStatus );
                  });
            })
        })
      });
    
      request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });
});