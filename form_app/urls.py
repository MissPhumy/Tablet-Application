from django.contrib import admin
from django.urls import path, include, re_path
from .views import *
from . import views



urlpatterns = [

    # html forms path (home and shell_inspector)
    path('home/', views.home, name='home'),
    path('home/shell_inspection', views.shell_inspection, name='shell_inspection'),

    
    path('api/ProductionDataCreate/', ProductionDataCreate.as_view(), name='ProductionDataCreate'),
    path('api/ProductionDataList/', ProductionDataList.as_view(), name='ProductionDataList'),
    re_path(r'api/ProductionDataView/(?P<production_data_id>\d+)/$', 
        ProductionDataView.as_view(), name='ProductionDataView'),


    # production data view that also shows the inspection data api
    path('api/ProductionDataViewV2/', ProductionDataViewV2.as_view(), name='ProductionDataViewV2'),



    path('api/ShellInspectionCreate/', ShellInspectionCreate.as_view(), name='ShellInspectionCreate'),
    path('api/ShellInspectionDetailList/', ShellInspectionDetailList.as_view(), name='ShellInspectionDetailList'),
    re_path(r'api/ShellInspectionDetailView/(?P<shell_inspection_id>\d+)/$', 
        ShellInspectionDetailView.as_view(), name='ShellInspectionDetailView'),

    
    path('api/CriticalInspectionCreate/', CriticalInspectionCreate.as_view(), name='CriticalInspectionCreate'),
    path('api/CriticalInspectionDetailList/', CriticalInspectionDetailList.as_view(), name='CriticalInspectionDetailList'),
    re_path(r'api/CriticalInspectionDetailView/(?P<critical_inspection_id>\d+)/$', 
        CriticalInspectionDetailView.as_view(), name='CriticalInspectionDetailView'),


]