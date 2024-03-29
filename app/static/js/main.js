$(document).ready(function() {
    $('#register_form').submit(function(event) {
        event.preventDefault();

        // Retrieve form data
        var email = $('#email').val();
        var password = $('#password').val();
        var cpassword = $('#cpassword').val();
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        console.log("here")

        // Send the data using AJAX
        $.ajax({
            headers: { 'X-CSRFToken': csrftoken },
            type: 'POST',
            url: '/register_login/',
            data: {
                'email': email,
                'password': password,
                'cpassword': cpassword,

            },
            success: function(data) {
                console.log(data);
                $('#invalid-feedback').empty();
                $('#valid-feedback').empty();
                if (data.error){
                    showAlert('danger', data.error, '#invalid-feedback');
                }
                else{
                    showAlert('success', data.success, '#valid-feedback');
                    setTimeout(function() {
                        window.location.href = '/Login'; 
                    }, 3000);
                }
                
            },
            error: function(error) {
                console.log('Error Registration: ', error);
                // Handle error here
            }
        });
    });

    $('#login-form').on('submit', function (event) {
        event.preventDefault();  // Prevent the default form submission

        // Retrieve form data
        var email = $('#email').val();
        var password = $('#password').val();
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        console.log(email, password)
        // Send an AJAX POST request
        $.ajax({
            headers: { 'X-CSRFToken': csrftoken },
            url: '/login_user/',  
            type: 'POST',
            data: {
                'email': email,
                'password': password,

            },
            success: function (data) {
                console.log(data)
                if (data.error){
                    showAlert('danger', data.error, '#invalid-feedback');
                }
                else{
                    showAlert('success', data.success, '#valid-feedback');
                    window.location.href = '/preview/';
                }
            }
        });
    });

    // Function to display alert messages
    function showAlert(type, message, id) {
        // console.log(message);
        var alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        $(id).html(alertHtml);
    }
});


// ============= Form validation 

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
'use strict'

// Fetch all the forms we want to apply custom Bootstrap validation styles to
var forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.prototype.slice.call(forms)
.forEach(function (form) {
  form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.classList.add('was-validated')
  }, false)
})
})()

// ============= Form validation end

// ============= Alert box


        // Function to show the Bootstrap 5 alert with the dropped column name and hide it after a specified duration
        // function showDropAlert(columnName) {
        //     var alertHtml = `
        //         <div class="alert alert-success alert-dismissible fade show" role="alert">
        //             Column <strong>'${columnName}'</strong> has been dropped!
        //             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        //         </div>
        //     `;
    
        //     // Append the alert to the 'alert-container' div
        //     document.getElementById('alert-container').innerHTML = alertHtml;
    
        //     // Set a timer to hide the alert after 3 seconds (3000 milliseconds)
        //     setTimeout(function () {
        //         var alertElement = document.querySelector('.alert');
        //         if (alertElement) {
        //             alertElement.remove();
        //         }
        //     }, 3000); // 3000 milliseconds = 3 seconds
        // }

// ============= alert box end


// ============= Fill constant value 


    // Function to enable or disable the "Fill Constant" input field based on the selected radio button
    function handleConstantInput() {
        var strategyInput = document.getElementById('strategy_input');
        var strategyConstant = document.getElementById('strategy_constant');

        if (strategyInput.checked) {
            strategyConstant.removeAttribute('disabled');
        } else {
            strategyConstant.setAttribute('disabled', 'disabled');
        }
    }

    // Attach the handleConstantInput function to the onchange event of the radio inputs
    var radioInputs = document.querySelectorAll('input[type="radio"][name="strategy"]');
    radioInputs.forEach(input => {
        input.addEventListener('change', handleConstantInput);
    });

// ============= Fill constant value end





//============= function to handle the coordinae systems and units

    function updateDataUnitOptions() {
        const gcsRadio = document.getElementById('cord-sys-gcs');
        const pcsRadio = document.getElementById('cord-sys-pcs');
        const dgRadio = document.getElementById('cord-sys-unit-dg');
        const mtRadio = document.getElementById('cord-sys-unit-mt');
        const ftRadio = document.getElementById('cord-sys-units-ft');
        const kmRadio = document.getElementById('cord-sys-unit-km');

        if (gcsRadio.checked) {
            // If GCS radio button is checked, enable Decimal Degrees and disable the other data units
            dgRadio.disabled = false;
            mtRadio.disabled = true;
            ftRadio.disabled = true;
            kmRadio.disabled = true;
        } else if (pcsRadio.checked) {
            // If PCS radio button is checked, enable Meters, Feet, and Kilometers and disable Decimal Degrees
            dgRadio.disabled = true;
            mtRadio.disabled = false;
            ftRadio.disabled = false;
            kmRadio.disabled = false;
        }
    }

//============= function to handle the coordinae systems and units end

//============= function to handle star parameter option

function updateStarParameterOptions() {
    var selectStarParameterCheckbox = document.getElementById('select_star_parameter');
    var starParameterInput = document.getElementById('star_parameter');

    // Enable/disable the star_parameter input based on checkbox state
    if (selectStarParameterCheckbox.checked) {
        starParameterInput.removeAttribute('disabled');
        starParameterInput.setAttribute('required', 'true');
    } else {
        starParameterInput.setAttribute('disabled', 'true');
        starParameterInput.removeAttribute('required');
    }
}

// Attach the onchange event handler to the checkbox
var selectStarParameter = document.getElementById('select_star_parameter');
if (selectStarParameter !== null) {
    selectStarParameter.onchange = updateStarParameterOptions;
}

//============= function to handle star parameter option end




$(document).ready(function () {
    function loadData(limit) {
        $.ajax({
            url: '/preview_data/',
            type: 'GET',
            data: { limit: limit },
            success: function (data) {
                if (data.error != 'Data not available') {
                // console.log('AJAX request succeeded:');
                // console.log('AJAX request succeeded:', data);
                // Parse the JSON data received from the server
                var jsonData = JSON.parse(data.data);
                // Check if the data is empty
                if (jsonData.length === 0) {
                    $('#preview-data-container').html('<p class="text-info"><b>Nothing to show.<b></p><br><p>Redirecting in 5 seconds...</p>');
                    // Set a timeout to redirect after 5 seconds
                    setTimeout(function () {
                        window.location.href = '/upload/'; // Replace with your desired URL
                    }, 5000); // 5000 milliseconds (5 seconds)
                    return; // Exit the function early
                }
                
                // console.log('jsonData:', jsonData);

                // console.log('JSON data received:', jsonData)

                // Create and populate the table with the JSON data
                var tableHtml = '<table class = "table table-light table-hover mb-0">';
                tableHtml += '<thead><tr>';
                for (var key in jsonData[0]) {
                    tableHtml += '<th>' + key + '</th>';
                }
                tableHtml += '</tr></thead>';

                tableHtml += '<tbody>';
                for (var i = 0; i < jsonData.length; i++) {
                    tableHtml += '<tr>';
                    for (var key in jsonData[i]) {
                        tableHtml += '<td>' + jsonData[i][key] + '</td>';
                    }
                    tableHtml += '</tr>';
                }
                tableHtml += '</tbody>';
                tableHtml += '</table>';

                // Update the container with the table
                // console.log(tableHtml);
                $('#preview-data-container').html(tableHtml);
            }
            },
            error: function (error) {
                console.log('Error fetching data:', error);
            }
        });
    }

    // Load default data on page load
    loadData(5); // Load default 10 rows
    updateStatistics()

    // Handle form submission
    $('#previewdata-limit').submit(function (event) {
        event.preventDefault();
        var selectedLimit = $('#datalimit').val();
        loadData(selectedLimit);

        // Update selected record info
        $('#selected-record-info').text('Showing ' + selectedLimit + ' records');
    });

    // Handle "Drop Column" form submission
    $('#dropcolumn-form').submit(function (event) {
        event.preventDefault();
        var selectedColumn = $('#dropcolumnmenu').val();
        // Perform AJAX request to handle column drop
        // Update the DataFrame in the session, and update statistics
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        $.ajax({
            headers: {'X-CSRFToken': csrftoken},
            url: '/handle_drop_columns/',
            type: 'POST',
            data: { 'column': selectedColumn },
            success: function (response) {
                showAlert('success', response.message, '#dropcolumn-alert-container');
                var selectedLimit = $('#datalimit').val();
                // console.log("here");
                // Update the DataFrame in the session
                response.data_frame;
                // Refresh data
                loadData(selectedLimit);
                updateStatistics()
                // Loop through each selected column and remove it from the dropdown menus
                selectedColumn.forEach(function(selectedColumn) {
                    var selectedColumnLowerCase = selectedColumn.toLowerCase();

                    // Remove the dropped column from the dropdown menu
                    $('#dropcolumnmenu option[value="' + selectedColumn + '"]').remove();
                    $('#fillnullvalues option[value="' + selectedColumn + '"]').remove();
                    $('#select-col-convert-dtype option[value="' + selectedColumn + '"]').remove();

                    // Remove the dropped column from the Bootstrap Selectpicker
                    $('#select-multi-drop-row option[value="' + selectedColumn + '"]').remove();
                });


                $('#select-multi-drop-row').selectpicker('deselectAll');
                $('#select-multi-drop-row').selectpicker('val', '');
                $('#select-multi-drop-row').selectpicker('refresh');


                // $('#fillnullvalues option[value="' + selectedColumn + '"]').remove();
                // $('#select-col-convert-dtype option[value="' + selectedColumn + '"]').remove();
                
                $('#select-multi-drop-row').selectpicker('deselectAll'); // Deselect all options
                $('#select-multi-drop-row').selectpicker('val', ''); // Clear the selected values
                $('#select-multi-drop-row').selectpicker('refresh'); // Refresh the Selectpicker


                $('#dropcolumnmenu').selectpicker('deselectAll'); // Deselect all options
                $('#dropcolumnmenu').selectpicker('val', ''); // Clear the selected values
                $('#dropcolumnmenu').selectpicker('refresh'); // Refresh the Selectpicker


                // Remove the dropped column from the Bootstrap Selectpicker
                // $('#select-multi-drop-row option[value="' + selectedColumn + '"]').remove();
                
                
            },
            error: function (error) {
                console.log('Error handling drop column:', error);
            }
        });
    });
    
    // Handle "Fill Null Values" form submission
    $('#fill_na_values').submit(function (event) {
        event.preventDefault();
        var selectedColumn = $('#fillnullvalues').val();
        var selectedStrategy = $('input[name="strategy"]:checked').val();
        if (selectedStrategy == 'input_constant'){
            var constantValue = $('input[name="strategy_constant"').val();
        }
        // Perform client-side validation to check the data type
        else if ((selectedStrategy === 'mean' || selectedStrategy === 'median') && !isNumericColumn(selectedColumn)) {
            showAlert('danger', '<b>Mean</b> or <b>Median</b> strategies can only be applied to numeric columns.', '#fillna-alert-container');
            return;
        }
        // console.log(selectedStrategy);
        // console.log(constantValue);
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        $.ajax({
            headers: { 'X-CSRFToken': csrftoken },
            url: '/handle_fill_null_values/',
            type: 'POST',
            data: {
                column: selectedColumn,
                strategy: selectedStrategy,
                constant_value: constantValue
            },
            success: function (response) {
                // console.log(response)
                showAlert('success', response.message, '#fillna-alert-container');
                var selectedLimit = $('#datalimit').val();
                loadData(selectedLimit);
                updateStatistics();
            },
            error: function (error) {
                console.log('Error handling fill null values:', error);
            }
        });

        // Function to check if a column is numeric (int or float)
        function isNumericColumn(columnName) {
            // Retrieve the DataFrame data types from a global variable or AJAX call
            var dataTypes = {}; // Replace with actual data types
            return dataTypes[columnName] === 'int64' || dataTypes[columnName] === 'float64';
        }
    });
    
    // Handle "Drop Rows" form submission
    $('#drop_null_rows').submit(function (event) {
        event.preventDefault();

        // Get selected columns and strategy
        var selectedColumns = $('#select-multi-drop-row').val();
        var selectedStrategy = $('input[name="row_drop_strategy"]:checked').val();

        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        $.ajax({
            headers: { 'X-CSRFToken': csrftoken },
            url: '/handle_drop_rows/',
            type: 'POST',
            data: {
                'select-multi-drop-row': selectedColumns, 
                row_drop_strategy: selectedStrategy,
                
            },
            success: function (response) {
                console.log(response);
                showAlert('success', response.message, '#dropnullrows-alert-container');

                var selectedLimit = $('#datalimit').val();
                loadData(selectedLimit);
                updateStatistics();
            },
            error: function (error) {
                console.log('Error handling drop rows:', error);
            }
        });
    });
    //Handle dtypes conversion
    $('#change_dtype_form').submit(function (event) {
        event.preventDefault();  // Prevent the default form submission

        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const formData = $(this).serialize();  // Serialize the form data

        // Make an AJAX request to handle data type conversion
        $.ajax({
            headers: { 'X-CSRFToken': csrftoken },
            url: '/handle_data_type_conversion/',  // Replace with your Django view URL
            type: 'POST',
            data: formData,  // Send the serialized form data
            success: function (response) {
                console.log(response);
                if (response.error){
                    $('#changedtype-alert-container').empty();
                    showAlert('danger', response.error, '#changedtype-alert-container');
                }
                else{
                    $('#changedtype-alert-container').empty();
                    showAlert('success', response.message, '#changedtype-alert-container');
                }

                var selectedLimit = $('#datalimit').val();
                loadData(selectedLimit);
                updateStatistics();
                // Handle success response as needed
            },
            error: function (error) {
                console.log('Error handling data type conversion:', error);
            }
        });
    });

    //handle coodinate system
    $('#coordinate-system-conversion-form').submit(function (event) {
        event.preventDefault();  // Prevent the default form submission

        // Prepare the data to be sent in the AJAX request
        var formData = $(this).serialize();

        // Make an AJAX request to the Django view
        $.ajax({
            url: '/handle_coordinate_system_conversion/',  // Replace with your Django view URL
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function (response) {
                console.log(response)
                if (response.error) {
                    $('#alert_cont_cordSys').empty();
                    showAlert('danger', response.error, '#alert_cont_cordSys');
                    // Handle error message here
                    // alert('Error: ' + response.error);
                } else {
                    $('#alert_cont_cordSys').empty();
                    // Handle success message and updated data here
                    showAlert('success', response.message, '#alert_cont_cordSys');
                    var selectedLimit = $('#datalimit').val();
                    loadData(selectedLimit);
                    updateStatistics();
                    // alert('Conversion Successful');
                    // You can update your page with the modified data if needed
                }
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    // Hide the loading spinner initially
    // hideLoadingSpinner();
    // Function to reload the page and show the spinner
    function reloadPageWithSpinner(response) {
        // Show the loading spinner before reloading the page
        showLoadingSpinner('#loading-spinner-preview-gdf');
        // window.location.reload();
        showAlert('success', response.message, '#geodataframe-alert-container');

    }
    // Handle GeoDataFrame conversion form submission
    $('#geodata-conversion-form').submit(function (event) {
        event.preventDefault();
        // conv-spinner-geodata
        $('#conv-spinner-geodata').removeClass('d-none');
        $('#preview_body').css('pointer-events', 'none');
        $('#convert_geodata_btn').prop('disabled', true);


        // Show the loading spinner when the request starts
        // showLoadingSpinner();
        showLoadingSpinner('#loading-spinner-preview-gdf');
        
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const selectedX = $('#select-x').val();
        const selectedY = $('#select-y').val();
        // console.log(selectedX, selectedY);
        if ((selectedX == null || selectedY == null) || (selectedX === selectedY)){
            showAlert('warning', `Please select valid columns.<br> Selected columns <b> ${selectedX}</b> and <b>${selectedY}</b>.`, '#geodataframe-alert-container');
            return;
        }

        $.ajax({
            headers: { 'X-CSRFToken': csrftoken },
            url: '/convert_to_geodataframe/',
            type: 'POST',
            data: {
                'select-x': selectedX,
                'select-y': selectedY,
            },
            success: function (response) {
                // Hide the loading spinner when the request is successful
                hideLoadingSpinner('#loading-spinner-preview-gdf');
                
                // Handle the response, e.g., show a success message
                // console.log(response);

                // Check if the response contains the GeoDataFrame
                // Check if the response contains the GeoDataFrame and its columns
                if (response.geodataframe && response.columns) {
                    // Display the GeoDataFrame in the specified container
                    $('#geodataframe-container').html(response.geodataframe);

                    // Populate the select menus with the new column names
                    populateSelectMenus(response.columns);
            
                    // Show success message
                    reloadPageWithSpinner(response);
                    $('#Loading').removeClass('d-none');
                    $('#preview_dataframe_title').addClass('d-none');

                }
                else if (response.error) {
                    // Show error message
                    showAlert('danger', response.error, '#geodataframe-alert-container');
                    $('#conv-spinner-geodata').addClass('d-none');
                    $('#preview_body').css('pointer-events', 'auto'); 
                    $('#convert_geodata_btn').prop('disabled', false);// Enable button interaction
                } else {
                    showAlert('danger', 'An error occurred during conversion.', '#geodataframe-alert-container');
                    $('#conv-spinner-geodata').addClass('d-none');
                    $('#preview_body').css('pointer-events', 'auto'); 
                    $('#convert_geodata_btn').prop('disabled', false);// Enable button interaction
                }
            },
            error: function (error) {
                hideLoadingSpinner('#loading-spinner-preview-gdf');
                console.log('Error converting to GeoDataFrame:', error);
                // Show error message
                // showAlert('danger', `An error occurred during conversion. `, '#geodataframe-alert-container');
            },
            complete: function () {
                // Hide the spinner after the request is complete (whether successful or not) and enable the button
                $('#conv-spinner-geodata').addClass('d-none');
                $('#preview_body').css('pointer-events', 'auto'); 
                $('#convert_geodata_btn').prop('disabled', false);// Enable button interaction

            },
        });

    });

    // Handle Getis-Ord Gi* Hotspot Analysis form submission
    $('#gistar-form').submit(function (event) {
        event.preventDefault();

        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const selectedKVal = $('#choose-opt-k').val();
        const selectedGIFeature = $('#select_gi_feature').val();
        const selectStarParameter = $('#select_star_parameter').is(':checked');
        const starParameter = selectStarParameter ? $('#star_parameter').val() : null;
        const calc_hotspot_btn = $('#calc_hotspot').val();
        // Show the spinner and disable the pointer event
        $('#calc-spinner-htspot').removeClass('d-none');
        $('#preview_body').css('pointer-events', 'none');
        $('#calc_hotspot').prop('disabled', true);
        $.ajax({
            headers: { 'X-CSRFToken': csrftoken },
            url: '/getis_ord_gi_hotspot_analysis/',
            type: 'POST',
            data: {
                K_val: selectedKVal,
                select_gi_feature: selectedGIFeature,
                select_star_parameter: selectStarParameter,
                star_parameter: starParameter,
            },
            success: function (response) {
                console.log(response)
                if (response.error) {
                    showAlert('danger', response.error, '#gistar-alert-container');
                    $('#calc-spinner-htspot').addClass('d-none');
                    $('#preview_body').css('pointer-events', 'auto'); 
                    $('#calc_hotspot').prop('disabled', false);// Enable button interaction
                }
                // Handle the response, e.g., display results
                console.log(response.json_response);
                var uniqueBins = JSON.parse(response.json_response.unique_bins);
                // Sort the uniqueBins array in ascending order
                uniqueBins.sort(function(a, b) {
                    return a - b;
                });

                // Check if the response contains the analysis results
                if (response.json_response) {
                    // Get the span element by its ID
                    var spanElement = document.getElementById('extra_stats_unique_bins');

                    // Set the text content of the span element
                    spanElement.textContent = uniqueBins.join(', '); // Join array elements with a comma and space
                    
                    $('#gi-star-reportbody').html(response.json_response.analysis_results);
                    $('#geodataframe-container').html(response.json_response.geodataframe);
                    $('#stats').html(response.json_response.stats);
                    $("#graph-container").html('<img class="img-fluid" src="data:image/png;base64,' + response.json_response.sangi + '" alt="Moran\'s Scatterplot">');
                    // $('#extra_stats_unique_bins').html(uniqueBins);
                    // $('#extra_stats_unique_significance_levels').text(unique_significance_levels);
                    showAlert('success', response.message, '#gistar-alert-container');

                }

                // Enable the "View report", button
                $('#view_hotspot_report').prop('disabled', false);
                $('#hotspot_analysis_savebtn').prop('disabled', false);

            },
           
            error: function (error) {
                console.log('Error performing Getis-Ord Gi* Hotspot Analysis:', error);
            },
            complete: function () {
                // Hide the spinner after the request is complete (whether successful or not) and enable the button
                $('#calc-spinner-htspot').addClass('d-none');
                $('#preview_body').css('pointer-events', 'auto'); 
                $('#calc_hotspot').prop('disabled', false);// Enable button interaction

            },
        });
    });

    
    // Handle Facebook Prophet model form submission
    $('#fb_prophet_modeling_form').submit(function (event) {
        event.preventDefault();
        $('#fbprop_report_btn').prop('disabled', true);
        $('#fbprop_save_cnfrm_btn').prop('disabled', true);

        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const selectedDateFeature = $('#select-date-column-fb').val();
        const selectedDistrictFeature = $('#select-district-column-fb').val();
        const selecteduniquedistrictvalue = $('#select-unique-district').val();
        const selectedForecastFeature = $('#select-forecast-column-fb').val();
        const selectedForecastFreq = $('#select-forecast-mode-fb').val();
        const selectedForecastPeriod = parseInt($('#Enter-forecast-interval-fb').val());
        const selectedSeasonalityMode = $('#select-seasonality-mode-fb').val();
        const changepoint_prior_scale = $('#changepoint_prior_scale-fb').val();
        const seasonality_prior_scale = $('#seasonality_prior_scale-fb').val();
        //Diagnostics
        const horizon = $('#Horizon').val();
        const period = $('#period').val();
        const initial = $('#initial-fbpv').val();

        $.ajax({
            headers: { 'X-CSRFToken': csrftoken },
            url: '/model_fb_prophet/',
            type: 'POST',
            data: {
                'select-date-column-fb': selectedDateFeature,
                'select-district-column-fb': selectedDistrictFeature,
                'select-unique-district':selecteduniquedistrictvalue,
                'select-forecast-column-fb': selectedForecastFeature,
                'select-forecast-mode-fb': selectedForecastFreq,
                'Enter-forecast-interval-fb': selectedForecastPeriod,
                'select-seasonality-mode-fb': selectedSeasonalityMode,
                'Horizon':horizon,
                'period':period,
                'initial-fbpv':initial,
                'seasonality_prior_scale': seasonality_prior_scale,
                'changepoint_prior_scale': changepoint_prior_scale,
            },
            success: function (response) {
                // Handle the response, e.g., display results
                console.log(response);
                console.log('selected district', selecteduniquedistrictvalue)
                // Check if the response contains the Prophet model results
                if (response.prophet_results) {
                    // Display the results in the prophet-results container
                    $('#op_range').html(response.prophet_results.forecasted_range);
                    $('#cv_tail_data').html(response.prophet_results.df_cv_tail);
                    $('#p_tail_data').html(response.prophet_results.df_p_tail);

                    var received_pred_Figure = JSON.parse(response.prophet_results.pred_result_fig);

                    Plotly.newPlot('pred-res-fig-container', received_pred_Figure);
                    // var received_component_Figure = JSON.parse(response.prophet_results.forcast_component_fig);

                    // Plotly.newPlot('forcast_component_fig_container', received_component_Figure);

                    $("#performance_metric_fig_img").html('<img class="img-fluid" src="data:image/png;base64,' + response.prophet_results.p_fig + '" alt="Performance metric plot">');
                    showAlert('success', response.message, '#fbprop-alert-container');

                }
                else if(response.error){
                    showAlert('danger', response.error, '#fbprop-alert-container');
                }
                else{
                    showAlert('danger', `Error: `, '#fbprop-alert-container');

                }
                $('#fbprop_report_btn').prop('disabled', false);
                $('#fbprop_save_cnfrm_btn').prop('disabled', false);


            },
            error: function (error) {
                console.log('Error modeling with Facebook Prophet:', error);
                // alert(error.responseText)
            }
        });
    });


    $(document).ready(function () {
        $("#find_best_params_auto_arima_checkbox").change(function () {
            if ($(this).is(":checked")) {
                $("#start_p, #end_p, #start_q, #end_q, #d").prop("disabled", false);
                $("#autoarima_seasonality_checkbox").prop("disabled", false);
                $("#Enter-arima_p_val, #Enter-arima_d_val, #Enter-arima_q_val, #Enter-arima_p_val_seasonal, #Enter-arima_seasonal_period, #Enter-arima_d_val_seasonal, #Enter-arima_q_val_seasonal").prop("disabled", true);
                $("#know_arima_params_cb, #know_arima_params_cb_seasonal").prop("disabled", true).prop("checked", false);
            } else {
                $("#start_p, #end_p, #start_q, #end_q, #d, #start_P, #start_Q, #end_P, #end_Q, #D, #m").prop("disabled", true);
                $("#autoarima_seasonality_checkbox").prop("disabled", true).prop("checked", false);
                $("#know_arima_params_cb").prop("disabled", false);
            }
        });

        $("#autoarima_seasonality_checkbox").change(function () {
            if ($(this).is(":checked")) {
                $("#start_P, #start_Q, #end_P, #end_Q, #D, #m").prop("disabled", false);
            } else {
                $("#start_P, #start_Q, #end_P, #end_Q, #D, #m").prop("disabled", true);
            }
        });

        $("#know_arima_params_cb").change(function () {
            if ($(this).is(":checked")) {
                $("#know_arima_params_cb_seasonal").prop("disabled", false);
                $("#Enter-arima_p_val, #Enter-arima_d_val, #Enter-arima_q_val").prop("disabled", false);
                $("#Enter-arima_p_val_seasonal, #Enter-arima_d_val_seasonal, #Enter-arima_q_val_seasonal, #Enter-arima_seasonal_period").prop("disabled", true);
            } else {
                $("#know_arima_params_cb_seasonal").prop("disabled", true).prop("checked", false);
                $("#Enter-arima_p_val, #Enter-arima_d_val, #Enter-arima_q_val, #Enter-arima_p_val_seasonal, #Enter-arima_seasonal_period, #Enter-arima_d_val_seasonal, #Enter-arima_q_val_seasonal").prop("disabled", true);
            }
        });

        $("#know_arima_params_cb_seasonal").change(function () {
            if ($(this).is(":checked")) {
                $("#Enter-arima_p_val, #Enter-arima_d_val, #Enter-arima_q_val, #Enter-arima_p_val_seasonal, #Enter-arima_seasonal_period,  #Enter-arima_d_val_seasonal, #Enter-arima_q_val_seasonal").prop("disabled", false);
            } else {
                $("#Enter-arima_p_val, #Enter-arima_d_val, #Enter-arima_q_val, #Enter-arima_p_val_seasonal, #Enter-arima_seasonal_period,  #Enter-arima_d_val_seasonal, #Enter-arima_q_val_seasonal").prop("disabled", true);
            }
        });
    });
    
    $(document).ready(function() {
        $('#arima-form').submit(function(event) {
            event.preventDefault();
            $('#arima-spinner').removeClass('d-none');
            $('#preview_body').css('pointer-events', 'none');
            $('#arima_forecast_btn').prop('disabled', true);

            $('#arima_report_btn').prop('disabled', true);
            $('#save_db_modal_btn').prop('disabled', true);

            console.log("here")
            $.ajax({
                type: 'POST',
                url: '/model_arima_family/',  // Specify the URL to your Django view
                data: $('#arima-form').serialize(),  // Serialize the form data
                success: function(data) {
                    console.log(data);

                    arima_figure = JSON.parse(data.arima_results.arima_fig)
                    Plotly.newPlot('arima-fig', arima_figure);
                    
                    
                    // Update the result placeholders with the received data
                    $('#arima_model_dignostic_fig').html('<img class="img-fluid" src="data:image/png;base64,' + data.arima_results.model_dignostics_fig + '" alt="Model Diagnostics">');

                    $('#forecasted_arima_table').html(data.arima_results.forecasted_head)
                    $('#aic-arima').html(data.arima_results.AIC)
                    $('#bic-arima').html(data.arima_results.BIC)
                    $('#hqic-arima').html(data.arima_results.HQIC)
                    $('#nobs-arima').html(data.arima_results.num_observations)
                    $('#MAE-arima').html(data.arima_results.mae)
                    $('#MSE-arima').html(data.arima_results.mse)
                    $('#RMSE-arima').html(data.arima_results.rmse)
                    
                    $('#arima_report_btn').prop('disabled', false);
                    $('#save_db_modal_btn').prop('disabled', false);
                },
                error: function(error) {
                    // Handle errors here
                console.log('Error modeling with arima: ', error);

                },
                complete: function () {
                    // Hide the spinner after the request is complete (whether successful or not) and enable the button
                    $('#arima-spinner').addClass('d-none');
                    $('#preview_body').css('pointer-events', 'auto');
                    $('#arima_forecast_btn').prop('disabled', false);
                }
            });
        });
    });
    


    // Function to populate select menus with column names
    function populateSelectMenus(columns) {
        // Clear existing options
        $('#select-x, #select-y').empty();

        // Add a default disabled option
        $('#select-x').append('<option selected disabled value="">Select Long</option>');
        $('#select-y').append('<option selected disabled value="">Select Lat</option>');

        // Add columns as options
        columns.forEach(function (column) {
            $('#select-x').append('<option value="' + column + '">' + column + '</option>');
            $('#select-y').append('<option value="' + column + '">' + column + '</option>');
        });
    }


    // Function to show the loading spinner
    function showLoadingSpinner(id) {
        $(id).removeClass('d-none');
        $(id).addClass('d-inline-block');
        
    }

    // Function to hide the loading spinner
    function hideLoadingSpinner(id) {
        $(id).addClass('d-none');
        $(id).removeClass('d-inline-block');

    }

    function updateStatistics() {
        $.ajax({
            url: '/update_statistics/',  
            type: 'GET',
            success: function (data) {
                if (data.error != 'Invalid request method'){
                // Parse the JSON data received from the server
                var stats = data.stats;
                var describe_data = data.describe_data;
                var unique_dtypes = data.unique_dtypes;
                var null_colwise = data.null_colwise;
                var nonull_colwise = data.nonull_colwise;
                var datatypes = data.datatypes;
    
                // Update the statistics on the page
                $('#num-rows').text(stats.num_rows);
                $('#num-cols').text(stats.num_cols);
                $('#tot_null').text(stats.total_nulls);
                $('#total_notnulls').text(stats.total_notnull);
                $('#describe-data-container').html(describe_data);
                $('#unique-vals-cols').html(unique_dtypes);
                $('#nullwise').html(null_colwise);
                $('#nonullwise').html(nonull_colwise);
                $('#datatypes-table').html(datatypes)
                }

                // Update other statistics elements similarly...
            },
            error: function (error) {
                console.log('Error updating statistics:', error);
            }
        });
    }
    // Function to display alert messages
    function showAlert(type, message, id) {
        // console.log(message);
        var alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        $(id).html(alertHtml);
    }


});


// document.addEventListener('DOMContentLoaded', function () {
//     // Get a reference to the "save_initail_dataset_form" form
//     const initialDatasetForm = document.getElementById('save_initail_dataset_form');

//     // Get a reference to the "hotspot_save" button
//     const hotspotSaveButton = document.getElementById('hotspot_save');

//     // Add an event listener to the form submission
//     initialDatasetForm.addEventListener('submit', function (event) {
//         // Prevent the default form submission behavior
//         event.preventDefault();

//         // Perform any additional validation or processing here if needed

//         // Enable the "hotspot_save" button
//         hotspotSaveButton.disabled = false;

//         // Submit the form manually if desired
//         initialDatasetForm.submit();
//     });
// });

$(document).ready(function () {
    // Event listener for changes in the district column select menu
    $('#select-district-column-autoarima').change(function () {
        var selectedDistrictColumn = $(this).val();
        console.log(selectedDistrictColumn);
        $('#autoarima-select-unique-district').selectpicker();
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        // Make an AJAX request to fetch unique district values
        $.ajax({
            headers: { 'X-CSRFToken': csrftoken },
            url: '/fetch_unique_districts/',
            type: 'POST', 
            data: {
                selected_district_column: selectedDistrictColumn
            },
            success: function (response) {
                console.log(response);

                // Clear existing options in the unique district select menu
                // $('#select-unique-district').empty();
                $('#autoarima-select-unique-district').selectpicker('deselectAll'); // Deselect all options
                $('#autoarima-select-unique-district').selectpicker('val', '');
                $('#autoarima-select-unique-district').selectpicker('refresh'); // Refresh the select picker
                
                // Populate the unique district values from the response
                for (var i = 0; i < response.unique_districts.length; i++) {
                    var districtValue = response.unique_districts[i];
                    $('#autoarima-select-unique-district').append($('<option>', {
                        value: districtValue,
                        text: districtValue
                    }));
                }
            $('#autoarima-select-unique-district').prop('disabled', false); // Enable the select
            $('#autoarima-select-unique-district').selectpicker('refresh'); // Refresh the select picker
            $('#autoarima-select-unique-district').selectpicker('render'); // Render the select picker
            $('#autoarima-select-unique-district').selectpicker('refresh'); // Refresh the select picker
            },
            error: function (error) {
                console.log('Error fetching unique districts:', error);
            }
        });
    });
});

$(document).ready(function () {
    // Event listener for changes in the district column select menu
    $('#select-district-column-fb').change(function () {
        var selectedDistrictColumn = $(this).val();
        console.log(selectedDistrictColumn);
        $('#select-unique-district').selectpicker();
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        // Make an AJAX request to fetch unique district values
        $.ajax({
            headers: { 'X-CSRFToken': csrftoken },
            url: '/fetch_unique_districts/',
            type: 'POST', 
            data: {
                selected_district_column: selectedDistrictColumn
            },
            success: function (response) {
                console.log(response);
                // Clear existing options in the unique district select menu
                // $('#select-unique-district').empty();
                $('#select-unique-district').selectpicker('deselectAll'); // Deselect all options
                $('#select-unique-district').selectpicker('val', '');
                $('#select-unique-district').selectpicker('refresh'); // Refresh the select picker
                
                // Populate the unique district values from the response
                for (var i = 0; i < response.unique_districts.length; i++) {
                    var districtValue = response.unique_districts[i];
                    $('#select-unique-district').append($('<option>', {
                        value: districtValue,
                        text: districtValue
                    }));
                }
            $('#select-unique-district').prop('disabled', false); // Enable the select
            $('#select-unique-district').selectpicker('refresh'); // Refresh the select picker
            $('#select-unique-district').selectpicker('render'); // Render the select picker
            $('#select-unique-district').selectpicker('refresh'); // Refresh the select picker
            },
            error: function (error) {
                console.log('Error fetching unique districts:', error);
            }
        });
    });
});

//reset password
$(document).ready(function () {
    var $emailInput = $('#id_email'); // Get the jQuery object representing the input field
    $emailInput.addClass('form-control'); // Add the 'form-control' class to the input field
});





$(document).ready(function () {
    $('#save_initail_dataset_form').submit(function (event) {
        console.log("debugging");
        event.preventDefault();
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        var save_db = $('#save_db_btn').val();

        $('#save-spinner-initial').removeClass('d-none');
        $('#preview_body').css('pointer-events', 'none');
        $('#save_db_btn').prop('disabled', true);

        $.ajax({
            headers: { 'X-CSRFToken': csrftoken },
            type: 'POST',
            url: '/save_data_to_database/',
            data: {
                save_db:save_db,
            },
            success: function (data) {
                if (data.error) {
                    // Handle the error
                    alert(data.error);
                } else {
                    $('#hotspot_tab_link').removeClass('disabled');
                    // $('#modeling_tab_ink').removeClass('disabled');
                    
                    alert(data.message);
                }
            },
            error: function (xhr, status, error) {
                // Handle the AJAX error
                console.log(xhr.responseText);
            },
            complete: function () {
                // Hide the spinner after the request is complete (whether successful or not) and enable the button
                $('#save-spinner-initial').addClass('d-none');
                $('#preview_body').css('pointer-events', 'auto'); 
                $('#save_db_btn').prop('disabled', false);// Enable button interaction

            }
        });
    });

    $('#save_hotspot_to_db_form').submit(function (event) {
        event.preventDefault();
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        var save_db_hotspot = $('#hotspot_save').val();
    
        // Show the spinner and disable the pointer event
        $('#save-spinner').removeClass('d-none');
        $('#preview_body').css('pointer-events', 'none');
        $('#hotspot_save').prop('disabled', true);
    
        $.ajax({
            headers: { 'X-CSRFToken': csrftoken },
            type: 'POST',
            url: '/save_geodata_to_database/',
            data: {
                save_db_hotspot: save_db_hotspot,
            },
            success: function (data) {
                if (data.error) {
                    // Handle the error
                    alert(data.error);
                } else {
                    $('#hotspot_tab_link').removeClass('disabled');
                    $('#modeling_tab_ink').removeClass('disabled');
                    alert(data.message);
                }
            },
            error: function (xhr, status, error) {
                // Handle the AJAX error
                console.log(xhr.responseText);
            },
            complete: function () {
                // Hide the spinner after the request is complete (whether successful or not) and enable the button
                $('#save-spinner').addClass('d-none');
                $('#preview_body').css('pointer-events', 'auto'); 
                $('#hotspot_save').prop('disabled', false);// Enable button interaction
                $('#save_hotspot_modal').modal('hide');
            }
        });
    });


    $('#save_fb_to_db_form').submit(function (event) {
        event.preventDefault();
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        var save_db_prophet = $('#save_fb_db').val();
    
        // Show the spinner and disable the pointer event
        $('#save-spinner-fb').removeClass('d-none');
        $('#preview_body').css('pointer-events', 'none');
        $('#save_fb_db').prop('disabled', true);
    
        $.ajax({
            headers: { 'X-CSRFToken': csrftoken },
            type: 'POST',
            url: '/save_fb_to_database/',
            data: {
                save_db_prophet: save_db_prophet,
            },
            success: function (data) {
                if (data.error) {
                    // Handle the error
                    alert(data.error);
                } else {
                    $('#hotspot_tab_link').removeClass('disabled');
                    $('#modeling_tab_ink').removeClass('disabled');
                    alert(data.message);
                }
            },
            error: function (xhr, status, error) {
                // Handle the AJAX error
                console.log(xhr.responseText);
            },
            complete: function () {
                // Hide the spinner after the request is complete (whether successful or not) and enable the button
                $('#save-spinner-fb').addClass('d-none');
                $('#preview_body').css('pointer-events', 'auto'); 
                $('#save_fb_db').prop('disabled', false);// Enable button interaction
                $('#fbprop_save_cnfrm_btn_modal').modal('hide');
                

            }
        });
    });
    

    $('#save_arima_to_db_form').submit(function (event) {
        event.preventDefault();
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        var save_db_arima = $('#save_arima_db').val();
    
        // Show the spinner and disable the pointer event
        $('#save-spinner-arima').removeClass('d-none');
        $('#preview_body').css('pointer-events', 'none');
        $('#save_arima_db').prop('disabled', true);
    
        $.ajax({
            headers: { 'X-CSRFToken': csrftoken },
            type: 'POST',
            url: '/save_arima_to_database/',
            data: {
                save_db_arima: save_db_arima,
            },
            success: function (data) {
                if (data.error) {
                    // Handle the error
                    alert(data.error);
                } else {
                    $('#hotspot_tab_link').removeClass('disabled');
                    $('#modeling_tab_ink').removeClass('disabled');
                    alert(data.message);
                }
            },
            error: function (xhr, status, error) {
                // Handle the AJAX error
                console.log(xhr.responseText);
            },
            complete: function () {
                // Hide the spinner after the request is complete (whether successful or not) and enable the button
                $('#save-spinner-arima').addClass('d-none');
                $('#preview_body').css('pointer-events', 'auto'); 
                $('#save_arima_db').prop('disabled', false);// Enable button interaction
                $('#arima_save_cnfrm_btn_modal').modal('hide');
                

            }
        });
    });
});

// grouped data view handling

$(document).ready(function() {
    $('#grouped_data_form').submit(function(event) {
        event.preventDefault();
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        var selectedDate = $('#select_date_var_gd').val();
        var selectedFeature = $('#select_desired_feature_gd').val();
        var forecast_col_fb = $('#select-forecast-column-fb').val();

        $.ajax({
            headers: { 'X-CSRFToken': csrftoken },
            type: 'POST',
            url: '/grouped_data/',  
            data: {
                'select_date_var_gd': selectedDate,
                'select_desired_feature_gd': selectedFeature
            },
            success: function(response) {

                console.log(response); 
                if (response.success) {

                    if (response.pred_col_names){
                    //FB
                    $('#select-forecast-column-fb').empty();
                    $('#select-district-column-fb').empty();
                    $('#select-date-column-fb').empty();

                    //arima
                    $('#autoarima-feature-to-forecast').empty();
                    $("#select-date-column-autoarima").empty();
                    $("#select-district-column-autoarima").empty();
                    
                    
                    
                    // Populate the unique district values from the response
                    $('#select-forecast-column-fb, #select-district-column-fb, #select-date-column-fb, #autoarima-feature-to-forecast, #select-date-column-autoarima, #select-district-column-autoarima').append($('<option disabled selected value="">Select one </option>'))
                    for (var i = 0; i < response.pred_col_names.length; i++) {
                        var pred_col_names_values = response.pred_col_names[i];
                        $('#select-forecast-column-fb, #select-district-column-fb, #select-date-column-fb, #autoarima-feature-to-forecast, #select-date-column-autoarima, #select-district-column-autoarima').append($('<option>', {
                            value: pred_col_names_values,
                            text: pred_col_names_values
                        }));
                    }
                }
                    showAlert('success', response.success, '#group_data_alert_container');
                }
                else{
                    showAlert('danger', response.success, '#group_data_alert_container');
                }
            },
            error: function(error) {                            
                console.error('Error:', error);
            }
        });
    });

    // Function to display alert messages
    function showAlert(type, message, id) {
        // console.log(message);
        $(id).empty();
        var alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        $(id).html(alertHtml);
    }
});