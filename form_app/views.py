from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ProductionData, ShellInspection, CriticalInspection
from .serializers import ProductionDataSerializer, ShellInspectionSerializer, ProductionDataViewSerializer, CriticalInspectionSerializer
from django.http import HttpResponse
from django.template import loader



# to serve the static file i,e html, css, bootstrap, javascrip ...
# def production_data(request):

#     context = {
#         'data': "data",
#         }
    
#     return render(request, 'form_app\templates\form_app\initial_form.html', context)


def home(request):
  template = loader.get_template('home.html')
  return HttpResponse(template.render())


def shell_inspection(request):
  template = loader.get_template('shell_inspection.html')
  return HttpResponse(template.render())


# views for form data serializing
class ProductionDataCreate(generics.CreateAPIView):
    queryset = ProductionData.objects.all()
    serializer_class = ProductionDataSerializer

class ProductionDataList(generics.ListAPIView):
    queryset = ProductionData.objects.all()
    serializer_class = ProductionDataSerializer


    
class ProductionDataView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductionDataSerializer
    lookup_url_kwarg = 'production_data_id'
    queryset = ProductionData.objects.all()


# production data view that also shows the inspection data api
class ProductionDataViewV2(generics.ListAPIView):
    queryset = ProductionData.objects.all()
    serializer_class = ProductionDataViewSerializer



class ShellInspectionCreate(generics.CreateAPIView):
    queryset = ShellInspection.objects.all()
    serializer_class = ShellInspectionSerializer


class ShellInspectionDetailList(generics.ListAPIView):
    # queryset = ShellNumberDetail.objects.all()
    serializer_class = ShellInspectionSerializer


    def get_queryset(self):
        production_data_id = str(self.request.query_params.get('production_data_id')).upper()
        result = self.request.query_params.get('result')
        print("production_data_id: ", production_data_id)

        if production_data_id == 'NONE':
            queryset = ShellInspection.objects.all()

        else:
            queryset = ShellInspection.objects.filter(ProductionData=production_data_id)

        return queryset

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs) 



class ShellInspectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ShellInspectionSerializer
    lookup_url_kwarg = 'shell_inspection_id'
    queryset = ShellInspection.objects.all()

    # def perform_destroy(self, instance):
    #     # Mark instance as deleted
    #     instance.deleted = True
    #     instance.save()

    # def delete(self, request, *args, **kwargs):
    #     # Get the object
    #     inspection = self.get_object()
    #     # Perform soft delete
    #     self.perform_destroy(inspection)
    #     return Response(status=status.HTTP_204_NO_CONTENT)


    
    
# CriticalInspection
class CriticalInspectionCreate(generics.CreateAPIView):
    queryset = CriticalInspection.objects.all()
    serializer_class = CriticalInspectionSerializer


class CriticalInspectionDetailList(generics.ListAPIView):
    # queryset = ShellNumberDetail.objects.all()
    serializer_class = CriticalInspectionSerializer


    def get_queryset(self):
        shellinspection_data_id = str(self.request.query_params.get('shellinspection_data_id')).upper()
        result = self.request.query_params.get('result')
        print("production_data_id: ", shellinspection_data_id)

        if shellinspection_data_id == 'NONE':
            queryset = CriticalInspection.objects.all()

        else:
            queryset = CriticalInspection.objects.filter(ShellInspection=shellinspection_data_id)

        return queryset

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs) 



class CriticalInspectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CriticalInspectionSerializer
    lookup_url_kwarg = 'critical_inspection_id'
    queryset = CriticalInspection.objects.all()



""" 
def ProductionDataForm_view(request):
    if request.method == 'POST':
        form = ProductionDataForm(request.POST)
        if form.is_valid():
            # Save the initial form data to the session or database as needed
            request.session['operator_id'] = form.cleaned_data['operator'].id
            return redirect('ProductionDataFormview')
    else:
        form = ProductionDataForm()
    return render(request, 'initial_form.html', {'form': form})

def ShellInspectionForm_view(request):
    operator_id = request.session.get('operator_id')
    if not operator_id:
        return redirect('ShellInspectionForm_view')

    operator = ProductionDataTracker.objects.get(id=operator_id)
    
    if request.method == 'POST':
        form = ShellInspectionForm(request.POST)
        if form.is_valid():
            inspection = form.save(commit=False)
            inspection.operator = operator
            inspection.save()
            # Process the scanned shell data here
            return redirect('ShellInspectionForm_view')
    else:
        form = ShellInspectionForm()

    return render(request, 'shell_inspection.html', {'form': form, 'operator': operator}) """