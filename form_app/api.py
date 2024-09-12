from rest_framework import viewsets
from .models import ShellInspection
from .serializers import ShellInspectionSerializer

class ShellInspectionViewSet(viewsets.ModelViewSet):
    queryset = ShellInspection.objects.all()
    serializer_class = ShellInspectionSerializer