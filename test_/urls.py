from django.conf import settings
from django.urls import path
from app import views as app_views
from django.contrib import admin
from visualization import views as viz_views
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),


    path('', app_views.upload_view, name='upload'),
    path('upload/', app_views.upload_view, name='upload'),
    path('preview/', app_views.upload_file, name='preview'),
    path('preview_data/', app_views.preview_data, name='preview_data'),
    path('handle_drop_columns/', app_views.handle_drop_columns, name='handle_drop_columns'),
    path('update_statistics/', app_views.update_statistics, name='update_statistics'),
    path('download_csv/', app_views.download_csv, name='download_csv'),
    path('handle_fill_null_values/', app_views.handle_fill_null_values, name='handle_fill_null_values/'),
    path('handle_drop_rows/', app_views.handle_drop_rows, name='handle_drop_rows/'),
    path('convert_to_geodataframe/', app_views.convert_to_geodataframe, name='convert_to_geodataframe/'),
    path('getis_ord_gi_hotspot_analysis/', app_views.getis_ord_gi_hotspot_analysis, name='getis_ord_gi_hotspot_analysis/'),
    path('model_fb_prophet/', app_views.model_fb_prophet, name='model_fb_prophet/'),
    path('fetch_unique_districts/', app_views.fetch_unique_districts, name='fetch_unique_districts'),
    path('export_fb_cv_csv_zip/', app_views.export_fb_cv_csv_zip, name='export_fb_cv_csv_zip'),
    path('model_arima_family/', app_views.model_arima_family, name='model_arima_family'),
    path('export_arima_results/', app_views.export_arima_results, name='export_arima_results'),
    path('handle_data_type_conversion/', app_views.handle_data_type_conversion, name='handle_data_type_conversion'),
    path('handle_coordinate_system_conversion/', app_views.handle_coordinate_system_conversion, name='handle_coordinate_system_conversion'),
    path('save_data_to_database/', app_views.save_data_to_database, name='save_data_to_database'),
    path('save_geodata_to_database/', app_views.save_geodata_to_database, name='save_geodata_to_database'),
    path('save_fb_to_database/', app_views.save_fb_to_database, name='save_fb_to_database'),
    path('save_arima_to_database/', app_views.save_arima_to_database, name='save_arima_to_database'),
    path('grouped_data/', app_views.grouped_data, name='grouped_data'),



    #visualization
    path('home/', viz_views.home, name='home'),
    path('get_model_results/', viz_views.get_model_results, name='get_model_results'),
    path('Geodatafileselection/', viz_views.Geodatafileselection, name='Geodatafileselection'),
    path('retrieve_column_names/', viz_views.retrieve_column_names, name='retrieve_column_names'),
    path('get_prophet_results/', viz_views.get_prophet_results, name='get_prophet_results'),
    path('get_arima_results/', viz_views.get_arima_results, name='get_arima_results'),
    
    
    

    #Authentication
    path('Login/', app_views.Login, name='Login'),
    path('login_user/', app_views.login_user, name='login_user'),
    path('register/', app_views.register, name='register'),
    path('register_login/', app_views.register_login, name='register_login'),
    path('Logout/', app_views.Logout, name='Logout'),
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='password_reset.html'), name='password_reset'),
    path('password_reset_done/', auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'), name='password_reset_done'),
    path('password_reset_confirm/<uidb64>/<token>/',auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'), name='password_reset_confirm'),
    path('password_reset_complete/', auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'), name='password_reset_complete'),



    path('save_dataframe_to_database/', viz_views.save_dataframe_to_database, name='save_dataframe_to_database'),
    path('download_geodata/', app_views.download_geodata, name='download_geodata'),

]



# Serve media & static files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)