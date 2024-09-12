from rest_framework import serializers
from .models import ProductionData, ShellInspection, CriticalInspection


class ProductionDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionData
        fields = '__all__'



class ShellInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShellInspection
        fields = '__all__' 
        


# link mother to children
class ProductionDataViewSerializer(serializers.ModelSerializer):
    # ProductionData = serializers.StringRelatedField(many=True)
    ProductionData = ShellInspectionSerializer(many=True)

    class Meta:
        model = ProductionData
        fields = '__all__'



class CriticalInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CriticalInspection
        fields = '__all__'