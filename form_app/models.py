from django.db import models

# Models for saving the forms data - parent.

class ProductionData(models.Model):
    
    # Production related field
    product = models.CharField(max_length=100)
    operation = models.CharField(max_length=100)
    operator = models.CharField(max_length=100)
    supervisor = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    # Rework = models.BooleanField(default=False)
    # Scrap = models.BooleanField(default=False)


    def __str__(self):
        return self.operator


class ShellInspectionManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(deleted=False)


class ShellInspection(models.Model):
    """Model to track shell inspections"""
    shell_no = models.CharField(max_length=100)
    # batch = models.CharField(max_length=100)
    result = models.CharField(max_length=10, blank=True, null=True)#, choices=[('pass', 'Pass'), ('rework', 'Rework'), ('scrap', 'Scrap')])
    comments = models.TextField(blank=True, null=True)
    deleted = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    objects = ShellInspectionManager()  # Default manager excluding deleted records
    all_objects = models.Manager()  # access all records including deleted ones
    
    ProductionData = models.ForeignKey(ProductionData, on_delete=models.CASCADE, related_name='ProductionData')

    def __str__(self):
        return str(self.ProductionData) + " - " + str(self.shell_no) + " - " + str(self.result) + " - " + str(self.comments)




class CriticalInspection(models.Model):
    """Model to track critcal inspections"""
    ShellInspection = models.ForeignKey(ShellInspection, on_delete=models.CASCADE, related_name='ShellInspection')

    dimension = models.CharField(max_length=100, blank=True, null=True)
    # dimension_2 = models.CharField(max_length=100)
    # dimension_3 = models.CharField(max_length=100)
    # dimension_4 = models.CharField(max_length=100)
    # dimension_5 = models.CharField(max_length=100)
    # dimension_6 = models.CharField(max_length=100)
    # dimension_7 = models.CharField(max_length=100)
    # dimension_8 = models.CharField(max_length=100)
    # dimension_9 = models.CharField(max_length=100)
    # dimension_10 = models.CharField(max_length=100)

    def __str__(self):
        return str(self.ShellInspection) + " - " + str(self.dimension)